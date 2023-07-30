import { Bishop, King, Knight, Pawn, Queen, Rook } from "./piece";

class PieceFactory {
  private makeKing() {
    const blackPieces = [new King(0, 4, 8, "black")];
    const whitePieces = [new King(7, 4, 8, "white")];

    return { whitePieces, blackPieces };
  }

  private makeQueen() {
    const blackPieces = [new Queen(0, 3, 8, "black")];
    const whitePieces = [new Queen(7, 3, 8, "white")];

    return { whitePieces, blackPieces };
  }

  private makeRook() {
    const blackPieces = [
      new Rook(0, 0, 8, "black"),
      new Rook(0, 7, 8, "black"),
    ];
    const whitePieces = [
      new Rook(7, 0, 8, "white"),
      new Rook(7, 7, 8, "white"),
    ];

    return { whitePieces, blackPieces };
  }

  private makeBishop() {
    const blackPieces = [
      new Bishop(0, 2, 8, "black"),
      new Bishop(0, 5, 8, "black"),
    ];
    const whitePieces = [
      new Bishop(7, 2, 8, "white"),
      new Bishop(7, 5, 8, "white"),
    ];

    return { whitePieces, blackPieces };
  }

  private makeKnight() {
    const blackPieces = [
      new Knight(0, 1, 8, "black"),
      new Knight(0, 6, 8, "black"),
    ];
    const whitePieces = [
      new Knight(7, 1, 8, "white"),
      new Knight(7, 6, 8, "white"),
    ];

    return { whitePieces, blackPieces };
  }

  private makePawn() {
    const whitePieces = new Array(8)
      .fill(0)
      .map((_, index) => new Pawn(6, index, 8, "white"));

    const blackPieces = new Array(8)
      .fill(0)
      .map((_, index) => new Pawn(1, index, 8, "black"));

    return { whitePieces, blackPieces };
  }

  makePieces() {
    const king = this.makeKing();
    const queen = this.makeQueen();
    const rook = this.makeRook();
    const bishop = this.makeBishop();
    const knight = this.makeKnight();
    const pawn = this.makePawn();

    const whitePieces = [
      ...king.whitePieces,
      ...queen.whitePieces,
      ...rook.whitePieces,
      ...bishop.whitePieces,
      ...knight.whitePieces,
      ...pawn.whitePieces,
    ];

    const blackPieces = [
      ...king.blackPieces,
      ...queen.blackPieces,
      ...rook.blackPieces,
      ...bishop.blackPieces,
      ...knight.blackPieces,
      ...pawn.blackPieces,
    ];

    return [...whitePieces, ...blackPieces];
  }
}

export default PieceFactory;
