import { TilesTypes } from '../tiles/tilesTypes';
import { TickTackToeBoard } from './board/tickTackToeBoard';
import { BoardTypes } from './boardTypes';

export class BoardFactory {
  getBoard(boardType: BoardTypes) {
    if (boardType === BoardTypes.tickTackToe)
      return new TickTackToeBoard(3, TilesTypes.tickTackToe);

    return null;
  }
}
