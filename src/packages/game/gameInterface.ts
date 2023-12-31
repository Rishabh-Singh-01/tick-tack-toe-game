import { BoardInterface } from '../board/boardInterface';
import { PlayerInterface } from '../players/playerInterface';
import { GameStatus } from './gameStatus';
import { GameType } from './gameType';

export interface GameInterface {
  readonly _id: number;
  readonly _name: GameType;
  readonly _player1: PlayerInterface;
  readonly _player2: PlayerInterface;
  readonly _board: BoardInterface;
  _status: GameStatus;
  _currentPlayer: PlayerInterface | null;
  _winner: PlayerInterface | null;
  _moves: string[];

  getCurrentPlayer(): PlayerInterface | null;
  setCurrentPlayer(curPlayer: PlayerInterface | null): void;
  getBoard(): BoardInterface;
  getMoves(): string[];
  getName(): GameType;
  addMove(move: string): void;
  getPlayer(id: number): PlayerInterface;
  getWinner(): PlayerInterface | null;
  setWinner(player: PlayerInterface): void;
  getStatus(): GameStatus;
  setStatus(status: GameStatus): void;
}
