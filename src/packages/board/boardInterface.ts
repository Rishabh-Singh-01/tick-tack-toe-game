import { TilesInterface } from '../tiles/tilesInterface';
import { TilesTypes } from '../tiles/tilesTypes';

export interface BoardInterface {
  readonly _size: number;
  readonly _basicTileSize: number;
  readonly _tileType: TilesTypes;
  readonly _allTiles: TilesInterface[];

  getTileDetails(tileId: number): TilesInterface;
  getSize(): number;
  getBasicTileSize(): number;
}
