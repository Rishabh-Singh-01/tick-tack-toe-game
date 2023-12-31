import { PlayerTypes } from './playerTypes';
import { TickTackToePlayer } from './players/tickTackToePlayer';

export class PlayerFactory {
  getPlayer(playerType: PlayerTypes, playerId: number) {
    if (playerType === PlayerTypes.tickTackToe)
      return new TickTackToePlayer(playerId);

    return null;
  }
}
