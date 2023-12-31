export interface PlayerInterface {
  readonly _id: number;

  makeMove(): void;
  getId(): number;
}
