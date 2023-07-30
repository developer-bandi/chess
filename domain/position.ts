// import Board from "./board";

class Position {
  x;
  y;
  size;

  constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  delete() {
    this.x = -1;
    this.y = -1;
  }

  moveTo(x: number, y: number) {
    console.log("이동위치정보", x, y);
    this.x = x;
    this.y = y;
  }

  moveToParamAmount(dx: number, dy: number) {
    this.x = this.x + dx;
    this.y = this.y + dy;
  }

  // writePositionToBoard(board: any[][], name: string) {
  //   board[this.x][this.y] = name;

  //   return board;
  // }

  isEqual(x: number, y: number) {
    return this.x === x && this.y === y;
  }

  isDeleted() {
    return this.x === -1 && this.y === -1;
  }

  getPosition() {
    return [this.x, this.y];
  }

  addReturn(x: number, y: number) {
    const newX = x + this.x;
    const newY = y + this.y;

    if (newX < 0 || newX > 7 || newY < 0 || newY < 0) return null;
    return [newX, newY];
  }
}

export default Position;
