import { ControllerInterface } from '../controller/controllerInterface';

export interface MonitorInterface {
  readonly _controller: ControllerInterface;

  getController(): ControllerInterface;
  trigger(event: any): void;
}
