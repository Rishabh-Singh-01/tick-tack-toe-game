import { GameInterface } from '../game/gameInterface';

export interface UIInterface {
  readonly _game: GameInterface;

  getGame(): GameInterface;
  setGame(game: GameInterface): void;
  load(): void;
  sync(): void;
}
