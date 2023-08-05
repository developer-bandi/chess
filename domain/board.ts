import { King, Piece } from "./piece";

class Board {
  pieces: Piece[];

  constructor(pieces: Piece[]) {
    this.pieces = pieces;
  }

  findTargetPiece(x: number, y: number, color: string) {
    return this.pieces.find((piece) => piece.isMyPiece(x, y, color));
  }

  makeBoardArray() {
    const board = new Array(8)
      .fill(0)
      .map(() => new Array<Piece | null>(8).fill(null));
    this.pieces
      .filter((piece) => !piece.isDead())
      .forEach((piece) => piece.markPositionToBoard(board));

    return board;
  }

  checkKingExist() {
    const piece = this.pieces.find(
      (piece) => piece instanceof King && piece.isDead()
    );
    if (!piece) return false;
    return piece.color;
  }
}

export default Board;
