import { Bishop } from "./Bishop.js";
import { King } from "./King.js";
import { Knigth } from "./Knight.js";
import { Pawn } from "./Pawn.js";
import { Queen } from "./Queen.js";
import { Rook } from "./Rook.js";

export class Table {
  constructor() {
    this.tablePositions = [];
    this.pieces = [];
    this.piecePositions = [];
    this.checkmate = false;
  }

  createTable() {
    this.tablePositions = [];
    this.piecePositions = [];
    const tableDiv = document.getElementById("table");
    const divLine = document.createElement("div");

    const letters = {
      1: "A",
      2: "B",
      3: "C",
      4: "D",
      5: "E",
      6: "F",
      7: "G",
      8: "H",
    };

    let lineStartColor = "white";

    for (let indexX = 8; indexX >= 0; indexX--) {
      let line = document.createElement("div");
      line.id = "line" + indexX;
      line.className = "d-flex justify-content-center line";
      divLine.appendChild(line);
      let positionColor = "";
      lineStartColor === "black"
        ? (positionColor = "black")
        : (positionColor = "white");

      if (indexX !== 0) {
        let lineName = document.createElement("span");
        lineName.className = "quad columnRowTitle";
        lineName.textContent = indexX;
        line.appendChild(lineName);
      } else {
        let lineName = document.createElement("span");
        lineName.className = "quad";
        line.appendChild(lineName);
      }

      for (let indexY = 1; indexY < 9; indexY++) {
        if (indexX === 0) {
          let rowName = document.createElement("span");
          rowName.className = "quad columnRowTitle";
          rowName.textContent = letters[indexY];
          line.appendChild(rowName);
        } else {
          let pos = document.createElement("span");
          pos.className = "quad";
          if (positionColor === "black") {
            pos.classList.add("blackPosition");
            positionColor = "white";
          } else {
            pos.classList.add("whitePosition");
            positionColor = "black";
          }

          pos.id = `${indexY}${indexX}`;
          this.tablePositions.push(`${indexY}${indexX}`);
          this.piecePositions.push([`${indexY}${indexX}`]);
          line.appendChild(pos);
        }
      }
      lineStartColor === "black"
        ? (lineStartColor = "white")
        : (lineStartColor = "black");
    }
    tableDiv.appendChild(divLine);
  }

  createInitialPiecePositions() {
    this.pieces = [];

    this.tablePositions.forEach((position) => {
      if (position[1] === "2") {
        this.createPawn(position, "white");
      }
      if (position[1] === "7") {
        this.createPawn(position, "black");
      }
      if (position === "11") {
        this.createRook(position, "white", "left");
      }
      if (position === "81") {
        this.createRook(position, "white", "right");
      }
      if (position === "18") {
        this.createRook(position, "black", "left");
      }
      if (position === "88") {
        this.createRook(position, "black", "right");
      }
      if (position === "21" || position === "71") {
        this.createKnight(position, "white");
      }
      if (position === "28" || position === "78") {
        this.createKnight(position, "black");
      }
      if (position === "31" || position === "61") {
        this.createBishop(position, "white");
      }
      if (position === "38" || position === "68") {
        this.createBishop(position, "black");
      }
      if (position === "41") {
        this.createQueen(position, "white");
      }
      if (position === "48") {
        this.createQueen(position, "black");
      }
      if (position === "51") {
        this.createKing(position, "white");
      }
      if (position === "58") {
        this.createKing(position, "black");
      }
    });
  }

  pushPieceOnPiecePositions(position, team) {
    let positionIndex = 0;
    this.piecePositions.forEach((pos, index) => {
      if (pos[0] === position) positionIndex = index;
    });
    this.piecePositions[positionIndex].push(`${team}Piece`);
  }

  createPawn(position, team) {
    const pawn = new Pawn(position, team);
    this.pieces.push(pawn);
    this.pushPieceOnPiecePositions(position, team);
  }

  createRook(position, team, side) {
    const rook = new Rook(position, team, side);
    this.pieces.push(rook);
    this.pushPieceOnPiecePositions(position, team);
  }

  createKnight(position, team) {
    const knight = new Knigth(position, team);
    this.pieces.push(knight);
    this.pushPieceOnPiecePositions(position, team);
  }

  createBishop(position, team) {
    const bishop = new Bishop(position, team);
    this.pieces.push(bishop);
    this.pushPieceOnPiecePositions(position, team);
  }

  createQueen(position, team) {
    const queen = new Queen(position, team);
    this.pieces.push(queen);
    this.pushPieceOnPiecePositions(position, team);
  }

  createKing(position, team) {
    const king = new King(position, team);
    this.pieces.push(king);
    this.pushPieceOnPiecePositions(position, team);
  }

  renderPieces(position, turnTeam, pieceClick, pieceType, pieceName) {
    this.pieces.forEach((piece) => {
      if (piece.position === position && piece instanceof pieceType) {
        const pos = document.getElementById(position);

        if (turnTeam === piece.team) {
          pos.addEventListener("click", pieceClick);
        }
        pos.classList.add(`${piece.team}${pieceName}`, `${piece.team}Piece`);
        this.pushPieceOnPiecePositions(piece.position, piece.team);
      }
    });
  }

  renderTable(turnTeam, pieceClick) {
    this.canRock();
    this.piecePositions.forEach((pos) => {
      if (pos.length > 1) pos.pop();
    });

    this.tablePositions.forEach((position) => {
      const pos = document.getElementById(position);

      if (pos.classList.contains("whitePosition")) {
        pos.className = "whitePosition quad";
      } else {
        pos.className = "blackPosition quad";
      }

      pos.replaceWith(pos.cloneNode(true));

      this.renderPieces(position, turnTeam, pieceClick, Pawn, "Pawn");
      this.renderPieces(position, turnTeam, pieceClick, Rook, "Rook");
      this.renderPieces(position, turnTeam, pieceClick, Knigth, "Knigth");
      this.renderPieces(position, turnTeam, pieceClick, Bishop, "Bishop");
      this.renderPieces(position, turnTeam, pieceClick, Queen, "Queen");
      this.renderPieces(position, turnTeam, pieceClick, King, "King");
    });
  }

  canRock() {
    const rockPieces = this.rockPiecesAlreadyMoveVerify();
    if (rockPieces.leftWhiteRook) {
      if (
        rockPieces.whiteKing.alreadyMove === false &&
        rockPieces.leftWhiteRook.alreadyMove === false
      ) {
        const piecesBetween = this.pieces.filter((piece) => {
          return (
            piece.position === "21" ||
            piece.position === "31" ||
            piece.position === "41"
          );
        });
        if (piecesBetween.length === 0) {
          rockPieces.whiteKing.canBigRock = true;
          rockPieces.leftWhiteRook.canBigRock = true;
        }
      } else {
        rockPieces.whiteKing.canBigRock = false;
        rockPieces.leftWhiteRook.canBigRock = false;
      }
    } else {
      rockPieces.whiteKing.canBigRock = false;
    }
    if (rockPieces.rightWhiteRook) {
      if (
        rockPieces.whiteKing.alreadyMove === false &&
        rockPieces.rightWhiteRook.alreadyMove === false
      ) {
        const piecesBetween = this.pieces.filter(
          (piece) => piece.position === "61" || piece.position === "71"
        );
        if (piecesBetween.length === 0) {
          rockPieces.whiteKing.canSmallRock = true;
          rockPieces.rightWhiteRook.canSmallRock = true;
        }
      } else {
        rockPieces.whiteKing.canSmallRock = false;
        rockPieces.rightWhiteRook.canSmallRock = false;
      }
    } else {
      rockPieces.whiteKing.canSmallRock = false;
    }

    if (rockPieces.leftBlackRook) {
      if (
        rockPieces.blackKing.alreadyMove === false &&
        rockPieces.leftBlackRook.alreadyMove === false
      ) {
        const piecesBetween = this.pieces.filter((piece) => {
          return (
            piece.position === "28" ||
            piece.position === "38" ||
            piece.position === "48"
          );
        });
        if (piecesBetween.length === 0) {
          rockPieces.blackKing.canBigRock = true;
          rockPieces.leftBlackRook.canBigRock = true;
        }
      } else {
        rockPieces.blackKing.canBigRock = false;
        rockPieces.leftBlackRook.canBigRock = false;
      }
    } else {
      rockPieces.blackKing.canBigRock = false;
    }
    if (rockPieces.rightBlackRook) {
      if (
        rockPieces.blackKing.alreadyMove === false &&
        rockPieces.rightBlackRook.alreadyMove === false
      ) {
        const piecesBetween = this.pieces.filter(
          (piece) => piece.position === "68" || piece.position === "78"
        );
        if (piecesBetween.length === 0) {
          rockPieces.blackKing.canSmallRock = true;
          rockPieces.rightBlackRook.canSmallRock = true;
        }
      } else {
        rockPieces.blackKing.canSmallRock = false;
        rockPieces.rightBlackRook.canSmallRock = false;
      }
    } else {
      rockPieces.blackKing.canSmallRock = false;
    }
  }

  rockPiecesAlreadyMoveVerify() {
    let rockPieces = {};
    this.pieces.forEach((piece) => {
      if (piece instanceof King && piece.team === "white") {
        if (piece.position !== "51") {
          piece.alreadyMove = true;
        }
        rockPieces.whiteKing = piece;
      }
      if (piece instanceof King && piece.team === "black") {
        if (piece.position !== "58") {
          piece.alreadyMove = true;
        }
        rockPieces.blackKing = piece;
      }
      if (piece instanceof Rook && piece.team === "white") {
        if (piece.side === "left" && piece.position !== "11") {
          piece.alreadyMove = true;
        }
        if (piece.side === "right" && piece.position !== "81") {
          piece.alreadyMove = true;
        }
        if (piece.side === "left") {
          rockPieces.leftWhiteRook = piece;
        }
        if (piece.side === "right") {
          rockPieces.rightWhiteRook = piece;
        }
      }
      if (piece instanceof Rook && piece.team === "black") {
        if (piece.side === "left" && piece.position !== "18") {
          piece.alreadyMove = true;
        }
        if (piece.side === "right" && piece.position !== "88") {
          piece.alreadyMove = true;
        }
        if (piece.side === "left") {
          rockPieces.leftBlackRook = piece;
        }
        if (piece.side === "right") {
          rockPieces.rightBlackRook = piece;
        }
      }
    });
    return rockPieces;
  }
}
