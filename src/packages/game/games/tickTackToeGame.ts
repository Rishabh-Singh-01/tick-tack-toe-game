import { BoardInterface } from '../../board/boardInterface';
import { PlayerFactory } from '../../players/playerFactory';
import { PlayerInterface } from '../../players/playerInterface';
import { PlayerTypes } from '../../players/playerTypes';
import { GameInterface } from '../gameInterface';
import { GameStatus } from '../gameStatus';
import { GameType } from '../gameType';

export class TickTackToeGame implements GameInterface {
  readonly _id: number;
  readonly _name: GameType;
  readonly _player1: PlayerInterface;
  readonly _player2: PlayerInterface;
  readonly _board: BoardInterface;
  _status: GameStatus;
  _currentPlayer: PlayerInterface | null;
  _winner: PlayerInterface | null;
  _moves: string[];

  constructor(board: BoardInterface) {
    const playerFactory = new PlayerFactory();
    this._id = Math.floor(Math.random() * 100);
    this._name = GameType.tickTackToe;
    const player1 = playerFactory.getPlayer(PlayerTypes.tickTackToe, 0);
    if (!player1) throw new Error('Error in creating game and player');
    this._player1 = player1;
    const player2 = playerFactory.getPlayer(PlayerTypes.tickTackToe, 1);
    if (!player2) throw new Error('Error in creating game and player');
    this._player2 = player2;
    this._board = board;
    this._status = GameStatus.start;
    this._currentPlayer = this._player1;
    this._winner = null;
    this._moves = [];
  }

  getCurrentPlayer() {
    return this._currentPlayer;
  }
  setCurrentPlayer(curPlayer: PlayerInterface | null) {
    this._currentPlayer = curPlayer;
  }
  getBoard() {
    return this._board;
  }

  getMoves(): string[] {
    return this._moves;
  }
  getName(): GameType {
    return this._name;
  }
  addMove(move: string): void {
    this._moves.push(move);
  }
  getPlayer(id: number): PlayerInterface {
    if (id === 0) return this._player1;
    return this._player2;
  }
  getWinner() {
    return this._winner;
  }
  setWinner(player: PlayerInterface) {
    this._winner = player;
  }
  getStatus(): GameStatus {
    return this._status;
  }
  setStatus(status: GameStatus): void {
    this._status = status;
  }
}
