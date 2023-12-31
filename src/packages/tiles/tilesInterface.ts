import { TickTackToePiece } from '../utils/TickTackToePiece';
import { TileColor } from '../utils/tileColor';

export interface TilesInterface {
  readonly _id: number;
  readonly _color: TileColor;
  readonly _size: number;
  _piece: TickTackToePiece | null;

  getId(): number;
  getColor(): TileColor;
  getSize(): number;
  getPiece(): TickTackToePiece | null;
  setPiece(piece: TickTackToePiece | null): void;
}
