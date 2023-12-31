import { GameInterface } from '../../game/gameInterface';
import { EventInterface } from '../../event/EventInterface';
import { TickTackToePiece } from '../../utils/TickTackToePiece';
import { GameStatus } from '../../game/gameStatus';

export class TickTackToeController {
  readonly _game: GameInterface;

  private _row: number[];
  private _col: number[];
  private _diag: number;
  private _revDiag: number;

  constructor(game: GameInterface) {
    this._game = game;

    this._row = [];
    for (let i = 0; i < this._game.getBoard().getSize(); i++) this._row.push(0);
    this._col = [];
    for (let i = 0; i < this._game.getBoard().getSize(); i++) this._col.push(0);
    this._diag = 0;
    this._revDiag = 0;
  }

  private gameWonBy() {
    const payload = this._game.getCurrentPlayer()!.getId() === 0 ? -1 : 1;
    const lastMoveTileId = parseInt(this._game.getMoves().at(-1)!);
    const boardSize = this._game.getBoard().getSize();
    const row = Math.floor(lastMoveTileId / boardSize);
    const col = lastMoveTileId % boardSize;

    this._row[row] += payload;
    this._col[col] += payload;
    if (row === col) this._diag += payload;
    if (row + col === boardSize - 1) this._revDiag += payload;

    console.log('rowNo', row);
    console.log('colNo', col);
    console.log('row', this._row);
    console.log('col', this._col);
    console.log('diag', this._diag);
    console.log('revdiag', this._revDiag);

    if (
      this._row[row] === payload * boardSize ||
      this._col[col] === payload * boardSize ||
      this._diag === payload * boardSize ||
      this._revDiag === payload * boardSize
    )
      return this._game.getCurrentPlayer()!.getId();

    return null;
  }

  private updateGameStatus() {
    if (this._game.getStatus() === GameStatus.finished)
      throw new Error('Game Already Finished');
    if (this._game.getStatus() !== GameStatus.inProgress)
      this._game.setStatus(GameStatus.inProgress);
  }

  private updateLatestMove(event: EventInterface) {
    const curPlayer = this._game.getCurrentPlayer();
    if (!curPlayer) throw new Error('Something went wrong');

    const id = parseInt(event.getDestTileId());
    if (isNaN(id)) throw new Error('Unable to parse the id to a number');

    const destinationTile = this._game.getBoard().getTileDetails(id);
    if (destinationTile.getPiece() !== null)
      throw new Error('Already used picked tile');
    destinationTile.setPiece(
      curPlayer.getId() === 0 ? TickTackToePiece.circle : TickTackToePiece.cross
    );

    this._game.addMove(event.getDestTileId());
  }

  private updateGameInfo() {
    const curPlayer = this._game.getCurrentPlayer()!;
    if (this.gameWonBy() === curPlayer.getId()) {
      // some player one
      this._game.setWinner(this._game.getCurrentPlayer()!);
      this._game.setStatus(GameStatus.finished);
      console.log('Game Won by Player' + curPlayer.getId());
      return;
    }

    if (
      this._game.getBoard().getSize() * this._game.getBoard().getSize() ===
      this._game.getMoves().length
    ) {
      // ties but no one won
      this._game.setStatus(GameStatus.finished);
      this._game.setCurrentPlayer(null);
      console.log('Game Tied');
      return;
    }

    this._game.setCurrentPlayer(
      curPlayer.getId() === 0
        ? this._game.getPlayer(1)
        : this._game.getPlayer(0)
    );
  }

  processEvent(event: EventInterface) {
    this.updateGameStatus();
    this.updateLatestMove(event);
    this.updateGameInfo();
    console.log(this._game);
  }
}
