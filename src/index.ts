import { BoardFactory } from './packages/board/boardFactory';
import { BoardTypes } from './packages/board/boardTypes';
import { ControllerFactory } from './packages/controller/controllerFactory';
import { GameFactory } from './packages/game/gameFactory';
import { GameType } from './packages/game/gameType';
import { Monitor } from './packages/monitor/monitors/web';
import { LoadUI } from './packages/ui/loadUI';

const board = new BoardFactory().getBoard(BoardTypes.tickTackToe);
if (!board) throw new Error('Unable to initalize board');

const game = new GameFactory().createGame(GameType.tickTackToe, board);
if (!game) throw new Error('Unable to initialize game');

console.log(game);
const ui = new LoadUI(game);
const controller = new ControllerFactory().createController(game);
if (!controller) throw new Error('Unable to initalize controller');
const monitor = new Monitor(ui, controller);
ui.load();

monitor.startListening();
