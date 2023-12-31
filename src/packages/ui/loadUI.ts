import { URL } from 'url';
import { GameInterface } from '../game/gameInterface';
import { UIInterface } from './uiInterface';

export class LoadUI implements UIInterface {
  _game: GameInterface;
  private _rootContainer: HTMLElement;
  constructor(game: GameInterface) {
    this._game = game;
    const rootContainer = document.getElementById('root-container');
    if (!rootContainer) throw new Error('Root Container not found');
    this._rootContainer = rootContainer;
  }
  getGame() {
    return this._game;
  }
  setGame(game: GameInterface) {
    this._game = game;
  }
  getRootContainer() {
    return this._rootContainer;
  }

  private loadExtraInfo() {
    const extraInfoContainer = document.createElement('div');
    extraInfoContainer.classList.add('extra-info-container');
    extraInfoContainer.innerHTML =
      "Turn of player: <span class='highlight'>" +
      (this._game.getCurrentPlayer()!.getId() === 0 ? '1' : '2') +
      '</span>';
    this._rootContainer.appendChild(extraInfoContainer);
  }

  private syncExtraInfo() {
    const extraInfoContainer = document.querySelector('.extra-info-container')!;
    let htmlStr = '';
    if (!this._game.getWinner() && !this._game.getCurrentPlayer())
      htmlStr = "<span class='highlight'>Game Tied !!!!</span>";
    else if (this._game.getWinner())
      htmlStr = `<span class='highlight'>Congratulations! Player ${
        this._game.getWinner()!.getId() === 0 ? '1' : '2'
      } won !!!!</span>`;
    else
      htmlStr =
        "Turn of player: <span class='highlight'>" +
        (this._game.getCurrentPlayer()!.getId() === 0 ? '1' : '2') +
        '</span>';

    extraInfoContainer.innerHTML = htmlStr;
  }

  private loadHeading() {
    const headingContainer = document.createElement('div');
    headingContainer.classList.add('heading-container');
    headingContainer.innerHTML = 'Tick Tack Toe Game !!!';
    this._rootContainer.appendChild(headingContainer);
  }

  private loadBoard() {
    let tileNo = 0;
    const boardContainer = document.createElement('div');
    boardContainer.classList.add('board-container');
    for (let i = 0; i < this._game.getBoard().getSize(); i++) {
      const boardRow = document.createElement('div');
      boardRow.classList.add('board-row');
      for (let j = 0; j < this._game.getBoard().getSize(); j++) {
        const tile = document.createElement('div');
        const gameTile = this._game.getBoard().getTileDetails(tileNo);
        tile.classList.add('tile');
        tile.id = `tile-${gameTile.getId()}`;
        tile.style.width = `${
          gameTile.getSize() * this._game.getBoard().getBasicTileSize()
        }px`;
        tile.style.height = `${
          gameTile.getSize() * this._game.getBoard().getBasicTileSize()
        }px`;
        tile.style.backgroundColor = gameTile.getColor();
        tileNo++;
        boardRow.appendChild(tile);
      }
      boardContainer.appendChild(boardRow);
    }
    this._rootContainer.appendChild(boardContainer);
  }

  private loadPieces(): void {
    const allMoves = this._game.getMoves();
    const lastMove = allMoves.at(-1)!;
    const lastMovePlayer =
      allMoves.length % 2 === 0
        ? this._game.getPlayer(1)
        : this._game.getPlayer(0);

    const container = this._rootContainer.querySelector('.board-container');
    if (!container) throw new Error('Issue in listening of continaer');
    for (const node of Array.from(container.childNodes)) {
      for (const tileNode of Array.from(node.childNodes)) {
        const completeId = (tileNode as HTMLInputElement).id;
        const idStr = completeId.split('-').at(-1);
        if (!idStr) throw new Error('Unable to get id');

        if (idStr === lastMove) {
          const imgType =
            lastMovePlayer.getId() === 0 ? 'circle.png' : 'cross.png';
          const imgDiv = document.createElement('img');
          if (imgType === 'circle.png')
            imgDiv.src = require('../../public/tickTackToe/circle.png');
          else imgDiv.src = require('../../public/tickTackToe/cross.png');

          tileNode.appendChild(imgDiv);
          const tileEl = document.getElementById(completeId);
          tileEl?.classList.add('align-middle');
        }
      }
    }
  }

  load() {
    this.loadHeading();
    this.loadBoard();
    this.loadExtraInfo();
  }

  sync(): void {
    this.loadPieces();
    this.syncExtraInfo();
  }
}
