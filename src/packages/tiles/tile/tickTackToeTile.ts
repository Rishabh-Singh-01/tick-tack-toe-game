import { TickTackToePiece } from '../../utils/TickTackToePiece';
import { TileColor } from '../../utils/tileColor';
import { TilesInterface } from '../tilesInterface';

export class TickTackToeTile implements TilesInterface {
  readonly _id: number;
  readonly _color: TileColor;
  readonly _size: number;
  _piece: TickTackToePiece | null;
  constructor(id: number) {
    this._id = id;
    this._color = TileColor.white;
    this._size = 1;
    this._piece = null;
  }

  getId(): number {
    return this._id;
  }
  getColor(): TileColor {
    return this._color;
  }
  getSize(): number {
    return this._size;
  }
  getPiece(): TickTackToePiece | null {
    return this._piece;
  }
  setPiece(piece: TickTackToePiece | null) {
    this._piece = piece;
  }
}
