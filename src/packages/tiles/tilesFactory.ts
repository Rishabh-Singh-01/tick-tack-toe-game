import { TilesTypes } from './tilesTypes';
import { TickTackToeTile } from './tile/tickTackToeTile';

export class TilesFactory {
  getTiles(tilesType: TilesTypes, tilesId: number) {
    if (tilesType === TilesTypes.tickTackToe)
      return new TickTackToeTile(tilesId);

    return null;
  }
}
