import { GameInterface } from '../game/gameInterface';
import { GameType } from '../game/gameType';
import { TickTackToeController } from './controllers/tickTackToeController';

export class ControllerFactory {
  createController(game: GameInterface) {
    if (game.getName() === GameType.tickTackToe)
      return new TickTackToeController(game);
    return null;
  }
}
