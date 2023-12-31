import { GameInterface } from '../game/gameInterface';
import { EventInterface } from '../event/EventInterface';

export interface ControllerInterface {
  readonly _game: GameInterface;
  processEvent(event: EventInterface): void;
}
