import Board from "./board";
import Position from "./position";

export abstract class Piece {
  position;
  color;

  constructor(x: number, y: number, size: number, color: string) {
    this.position = new Position(x, y, size);
    this.color = color;
  }

  abstract attack(): void;
  abstract makeName(): string;
  abstract getPossibleMove(board: Board): number[][];

  public move(x: number, y: number, board: Board) {
    const boardWithPiece = board.makeBoardArray();
    if (boardWithPiece[x][y] !== undefined) {
      boardWithPiece[x][y].dead();
    }
    this.position.moveTo(x, y);
  }

  public dead() {
    this.position.delete();
  }

  public markPositionToBoard(board: Piece[][]) {
    const [x, y] = this.position.getPosition();
    board[x][y] = this;
  }

  public isMyPiece(x: number, y: number, color: string) {
    const positionEqual = this.position.isEqual(x, y);
    const colorEqual = this.color === color;

    return positionEqual && colorEqual;
  }

  public isSameColor(color: string) {
    return color === this.color;
  }

  public isDead() {
    return this.position.isDeleted();
  }

  protected moveDirection(dx: number, dy: number, boardWithPiece: Piece[][]) {
    const result = [];
    const [x, y] = this.position.getPosition();
    const curPosition = new Position(x, y, 8);

    while (true) {
      const movePosition = curPosition.addReturn(dx, dy);

      if (movePosition === null) break;
      if (boardWithPiece[movePosition[0]][movePosition[1]] !== undefined) {
        if (
          boardWithPiece[movePosition[0]][movePosition[1]].isSameColor(
            this.color
          )
        )
          break;
        result.push(movePosition);
        break;
      }

      result.push(movePosition);
      curPosition.moveToParamAmount(dx, dy);
    }

    return result;
  }
}

export class King extends Piece {
  possibleMove;

  constructor(x: number, y: number, size: number, color: string) {
    super(x, y, size, color);
    this.possibleMove = [
      [-1, -1],
      [-1, 1],
      [-1, 0],
      [1, -1],
      [1, 1],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
  }

  getPossibleMoveList(board: any) {}

  attack(): void {}

  makeName() {
    if (this.color === "white") return "K";
    return "k";
  }

  getPossibleMove(board: Board) {
    const boardWithPiece = board.makeBoardArray();
    return this.possibleMove
      .map(([x, y]) => this.position.addReturn(x, y))
      .filter((value): value is number[] => {
        if (value === null) return false;
        const [x, y] = value;
        if (boardWithPiece[x][y].isSameColor(this.color)) return false;
        return true;
      });
  }
}

export class Queen extends Piece {
  constructor(x: number, y: number, size: number, color: string) {
    super(x, y, size, color);
  }

  move(): void {}

  getPossibleMoveList(board: any) {}

  attack(): void {}

  makeName() {
    if (this.color === "white") return "Q";
    return "q";
  }

  getPossibleMove(board: Board) {
    const boardWithPiece = board.makeBoardArray();
    return [
      [-1, 1],
      [1, 1],
      [1, -1],
      [-1, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]
      .map(([dx, dy]) => this.moveDirection(dx, dy, boardWithPiece))
      .flat();
  }
}

export class Rook extends Piece {
  constructor(x: number, y: number, size: number, color: string) {
    super(x, y, size, color);
  }

  move(): void {}

  getPossibleMoveList(board: any) {}

  attack(): void {}

  makeName() {
    if (this.color === "white") return "R";
    return "r";
  }

  getPossibleMove(board: Board) {
    const boardWithPiece = board.makeBoardArray();
    return [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]
      .map(([dx, dy]) => this.moveDirection(dx, dy, boardWithPiece))
      .flat();
  }
}

export class Bishop extends Piece {
  constructor(x: number, y: number, size: number, color: string) {
    super(x, y, size, color);
  }

  move(): void {}

  getPossibleMoveList(board: any) {}

  attack(): void {}

  makeName() {
    if (this.color === "white") return "B";
    return "b";
  }

  getPossibleMove(board: Board) {
    const boardWithPiece = board.makeBoardArray();
    return [
      [-1, 1],
      [1, 1],
      [1, -1],
      [-1, -1],
    ]
      .map(([dx, dy]) => this.moveDirection(dx, dy, boardWithPiece))
      .flat();
  }
}

export class Knight extends Piece {
  possibleMove;

  constructor(x: number, y: number, size: number, color: string) {
    super(x, y, size, color);
    this.possibleMove = [
      [-2, -1],
      [-1, -2],
      [1, -2],
      [2, -1],
      [2, 1],
      [1, 2],
      [-1, 2],
      [-2, 1],
    ];
  }

  move(): void {}

  getPossibleMoveList(board: any) {}

  attack(): void {}

  makeName() {
    if (this.color === "white") return "N";
    return "n";
  }

  getPossibleMove(board: Board) {
    const boardWithPiece = board.makeBoardArray();
    return this.possibleMove
      .map(([x, y]) => this.position.addReturn(x, y))
      .filter((value): value is number[] => !!value);
  }
}

export class Pawn extends Piece {
  firstMove;

  constructor(x: number, y: number, size: number, color: string) {
    super(x, y, size, color);
    this.firstMove = true;
  }

  move(): void {}

  getPossibleMoveList(board: any) {}

  attack(): void {}

  makeName() {
    if (this.color === "white") return "P";
    return "p";
  }

  getPossibleMove(board: Board) {
    const boardWithPiece = board.makeBoardArray();

    if (this.color === "black") {
      const result: number[][] = [];

      [
        [1, -1],
        [1, 1],
      ]
        .map(([x, y]) => this.position.addReturn(x, y))
        .filter((value): value is number[] => !!value)
        .filter(([x, y]) => {
          const targetPiece = boardWithPiece[x][y];
          if (targetPiece === undefined) return false;
          return !boardWithPiece[x][y].isSameColor(this.color);
        })
        .forEach((value) => {
          result.push(value);
        });

      const oneMovePosition = this.position.addReturn(1, 0);
      if (oneMovePosition !== null) {
        const targetPiece1 =
          boardWithPiece[oneMovePosition[0]][oneMovePosition[1]];

        if (targetPiece1 === undefined) {
          result.push(oneMovePosition);
          const twoMovePosition = this.position.addReturn(2, 0);
          if (twoMovePosition !== null) {
            const targetPiece2 =
              boardWithPiece[twoMovePosition[0]][twoMovePosition[1]];
            if (targetPiece1 === undefined) {
              result.push(twoMovePosition);
            }
          }
        }
      }

      return result;
    } else {
      const result = [];

      [
        [-1, -1],
        [-1, 1],
      ]
        .map(([x, y]) => this.position.addReturn(x, y))
        .filter((value): value is number[] => !!value)
        .filter(([x, y]) => {
          const targetPiece = boardWithPiece[x][y];
          if (targetPiece === undefined) return false;
          return !boardWithPiece[x][y].isSameColor(this.color);
        })
        .forEach((value) => {
          result.push(value);
        });

      const oneMovePosition = this.position.addReturn(-1, 0);
      if (oneMovePosition !== null) {
        const targetPiece1 =
          boardWithPiece[oneMovePosition[0]][oneMovePosition[1]];

        if (targetPiece1 === undefined) {
          result.push(oneMovePosition);
          const twoMovePosition = this.position.addReturn(-2, 0);
          if (twoMovePosition !== null) {
            const targetPiece2 =
              boardWithPiece[twoMovePosition[0]][twoMovePosition[1]];
            if (targetPiece1 === undefined) {
              result.push(twoMovePosition);
            }
          }
        }
      }
      return result;
    }
  }
}
