import { ControllerInterface } from '../../controller/controllerInterface';
import { TickTackToeEvent } from '../../event/events/tickTackToeEvent';
import { LoadUI } from '../../ui/loadUI';
import { MonitorInterface } from '../monitorInterface';

export class Monitor implements MonitorInterface {
  private _loadedUI: LoadUI;
  readonly _controller: ControllerInterface;
  constructor(loadedUI: LoadUI, controller: ControllerInterface) {
    if (!loadedUI) throw new Error('Error in initalizing monitor due to ui');
    this._loadedUI = loadedUI;
    this._controller = controller;
  }

  getController(): ControllerInterface {
    return this._controller;
  }

  startListening() {
    const container = this._loadedUI
      .getRootContainer()
      .querySelector('.board-container');
    if (!container) throw new Error('Issue in listening of continaer');
    for (const node of Array.from(container.childNodes)) {
      for (const tileNode of Array.from(node.childNodes)) {
        tileNode.addEventListener('click', (e) => this.trigger(e));
      }
    }
  }
  trigger(e: Event) {
    const id = (e.target as HTMLInputElement).id.split('-').at(-1);
    if (!id) throw new Error('Unable to get id');
    console.log(id);
    this._controller.processEvent(new TickTackToeEvent(id));
    this._loadedUI.sync();
  }
}
