import { PlayerInterface } from '../playerInterface';

export class TickTackToePlayer implements PlayerInterface {
  readonly _id: number;
  constructor(id: number) {
    this._id = id;
  }

  getId(): number {
    return this._id;
  }

  makeMove(): void {
    // do somthign
  }
}
