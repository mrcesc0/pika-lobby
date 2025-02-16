import { z } from 'zod';

import { configSchema, Config } from './config.schema';
import { tilesSchema } from './tile.schema';

type Maybe<T> = T | null | undefined;

export class GamesService {
  private static _instance: GamesService;
  private _baseUrl: string = 'https://casino.api.pikakasino.com/v1/pika';
  private _config: Maybe<Config>;

  static get Instance(): GamesService {
    return (
      GamesService._instance || (GamesService._instance = new GamesService())
    );
  }

  private constructor() {
    this._init();
  }

  private async _init() {
    this._config = await this._fetchConfig();
  }

  private _parseError(error: unknown) {
    if (error instanceof z.ZodError) {
      console.error('Validation failed:', error.errors);
    } else {
      console.error('Fetch error:', error);
    }
  }

  private async _fetchConfig() {
    try {
      const response = await fetch(`${this._baseUrl}/en/config`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const maybeData = await response.json();
      return configSchema.parse(maybeData);
    } catch (error) {
      this._parseError(error);
      return null;
    }
  }

  private async _fetchTiles(
    search: string = '',
    pageNumber: number = 1,
    pageSize: number = 10,
  ) {
    const queryParams = new URLSearchParams();

    if (search) {
      queryParams.append('search', search);
    }

    queryParams.append('pageNumber', pageNumber.toString());
    queryParams.append('pageSize', pageSize.toString());

    const url = `${this._baseUrl}/en/games/tiles?${queryParams.toString()}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const maybeData = await response.json();
      return tilesSchema.parse(maybeData);
    } catch (error) {
      this._parseError(error);
      return null;
    }
  }
}
