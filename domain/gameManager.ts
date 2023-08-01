import Board from "./board";
import PieceFactory from "./pieceFactory";
import input from "./input";

class GameManager {
  board: Board;

  constructor() {
    const factory = new PieceFactory();
    const pieces = factory.makePieces();
    this.board = new Board(pieces);
  }

  async play() {
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
    console.log(board[x][y]);
    console.log(
      "가능한 이동경로는 다음과같습니다",
      board[x][y]?.getPossibleMove(this.board)
    );
    const inputValue2 = await input.possibleMoveQuery();
    const [dx, dy] = inputValue2.split(" ").map(Number);
    board[x][y]?.move(dx, dy, this.board);
    console.log(
      this.board
        .makeBoardArray()
        .map((row) =>
          row
            .map((piece) => {
              if (piece === null) return "-";
              return piece.makeName();
            })
            .join("")
        )
        .join("\n")
    );
  }
}

export default GameManager;
