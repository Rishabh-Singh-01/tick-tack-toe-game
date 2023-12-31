import { TilesFactory } from '../../tiles/tilesFactory';
import { TilesInterface } from '../../tiles/tilesInterface';
import { TilesTypes } from '../../tiles/tilesTypes';
import { BoardInterface } from '../boardInterface';

export class TickTackToeBoard implements BoardInterface {
  readonly _size: number;
  readonly _basicTileSize: number;
  readonly _tileType: TilesTypes;
  readonly _allTiles: TilesInterface[];

  constructor(size: number, tileType: TilesTypes) {
    this._size = size;
    this._basicTileSize = 100;
    this._tileType = tileType;

    const tileFactory: TilesFactory = new TilesFactory();
    const allTileArr: TilesInterface[] = [];
    for (let i = 0; i < this._size * this._size; i++) {
      const tile = tileFactory.getTiles(tileType, i);
      if (!tile) throw new Error('Tile Creation Failed');
      allTileArr.push(tile);
    }
    this._allTiles = allTileArr;
  }

  getTileDetails(tileId: number) {
    if (tileId < 0 || tileId >= this._allTiles.length)
      throw new Error('Invalid TileId present');
    return this._allTiles[tileId];
  }
  getSize(): number {
    return this._size;
  }
  getBasicTileSize(): number {
    return this._basicTileSize;
  }
}
