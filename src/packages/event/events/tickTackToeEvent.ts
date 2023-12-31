import { EventInterface } from '../EventInterface';

export class TickTackToeEvent implements EventInterface {
  readonly _destTileId: string;
  constructor(destinationTile: string) {
    this._destTileId = destinationTile;
  }

  getDestTileId(): string {
    return this._destTileId;
  }
}
