import Board from "./board";
import PieceFactory from "./pieceFactory";
import input from "./input";

class GameManager {
  board: Board;
  turn: string;

  constructor() {
    const factory = new PieceFactory();
    const pieces = factory.makePieces();
    this.board = new Board(pieces);
    this.turn = "black";
  }

  changeTurn() {
    if (this.turn === "black") this.turn = "white";
    this.turn = "black";
  }

  async play() {
    while (true) {
      console.log(`${this.turn}의 차례입니다.`);
      const board = this.board.makeBoardArray();
      const viewBoard = board
        .map((row) =>
          row
            .map((piece) => {
              if (piece === null) return "-";
              return piece.makeName();
            })
            .join("")
        )
        .join("\n");
      console.log(viewBoard);
      const inputValue = await input.possibleMoveQuery();
      const [x, y] = inputValue.split(" ").map(Number);

      console.log(
        "가능한 이동경로는 다음과같습니다",
        board[x][y]?.getPossibleMove(this.board)
      );
      const inputValue2 = await input.realMoveQuery();
      const [dx, dy] = inputValue2.split(" ").map(Number);
      board[x][y]?.move(dx, dy, this.board);
      this.changeTurn();
    }
  }
}

export default GameManager;
