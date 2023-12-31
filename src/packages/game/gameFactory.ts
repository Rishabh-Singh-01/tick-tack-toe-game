import { BoardInterface } from '../board/boardInterface';
import { GameType } from './gameType';
import { TickTackToeGame } from './games/tickTackToeGame';

export class GameFactory {
  createGame(gameType: GameType, board: BoardInterface) {
    if (gameType === GameType.tickTackToe) return new TickTackToeGame(board);
    return null;
  }
}
