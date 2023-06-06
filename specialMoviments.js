import { Bishop } from "./Bishop.js";
import { King } from "./King.js";
import { Knigth } from "./Knight.js";
import { Pawn } from "./Pawn.js";
import { Queen } from "./Queen.js";
import { Rook } from "./Rook.js";

export function rock(king, pieces, isChechmate, piecePositions) {
  let rockPositions = {};
  if (isChechmate === true) return rockPositions;

  if (king.team === "white") {
    if (king.canSmallRock) {
      let canRock = true;
      pickElementsList("61", "71").forEach((pos) => {
        const positionIsInCheckmate = verifyIfPositionIsInCheckmate(
          pos.id,
          pieces,
          piecePositions,
          king.team
        );
        if (positionIsInCheckmate === true) {
          canRock = false;
        }
      });
      if (canRock === true) {
        const rockPosition = document.getElementById("71");
        const rook = pieces.find((piece) => piece.position === "81");
        rockPosition.classList.add("possiblePosition");
        rockPositions.whiteSmallRock = {
          king: king,
          rook: rook,
        };
      }
    }

    if (king.canBigRock) {
      let canRock = true;
      pickElementsList("21", "31", "41").forEach((pos) => {
        const positionIsInCheckmate = verifyIfPositionIsInCheckmate(
          pos.id,
          pieces,
          piecePositions,
          king.team
        );
        if (positionIsInCheckmate === true) {
          canRock = false;
        }
      });
      if (canRock === true) {
        const rockPosition = document.getElementById("31");
        const rook = pieces.find((piece) => piece.position === "11");
        rockPosition.classList.add("possiblePosition");
        rockPositions.whiteBigRock = {
          king: king,
          rook: rook,
        };
      }
    }
  }

  if (king.team === "black") {
    if (king.canSmallRock) {
      let canRock = true;
      pickElementsList("68", "78").forEach((pos) => {
        const positionIsInCheckmate = verifyIfPositionIsInCheckmate(
          pos.id,
          pieces,
          piecePositions,
          king.team
        );
        if (positionIsInCheckmate === true) {
          canRock = false;
        }
      });
      if (canRock === true) {
        const rockPosition = document.getElementById("78");
        const rook = pieces.find((piece) => piece.position === "88");
        rockPosition.classList.add("possiblePosition");
        rockPositions.blackSmallRock = {
          king: king,
          rook: rook,
        };
      }
    }

    if (king.canBigRock) {
      let canRock = true;
      pickElementsList("28", "38", "48").forEach((pos) => {
        const positionIsInCheckmate = verifyIfPositionIsInCheckmate(
          pos.id,
          pieces,
          piecePositions,
          king.team
        );
        if (positionIsInCheckmate === true) {
          canRock = false;
        }
      });
      if (canRock === true) {
        const rockPosition = document.getElementById("38");
        const rook = pieces.find((piece) => piece.position === "18");
        rockPosition.classList.add("possiblePosition");
        rockPositions.blackBigRock = {
          king: king,
          rook: rook,
        };
      }
    }
  }

  return rockPositions;
}

export function promotion(pawn, pieces, promotedPieceName) {
  let promotedPiece;
  switch (promotedPieceName) {
    case "pawn":
      promotedPiece = new Pawn(pawn.position, pawn.team);
      break;
    case "rook":
      promotedPiece = new Rook(pawn.position, pawn.team);
      break;
    case "knight":
      promotedPiece = new Knigth(pawn.position, pawn.team);
      break;
    case "bishop":
      promotedPiece = new Bishop(pawn.position, pawn.team);
      break;
    case "queen":
      promotedPiece = new Queen(pawn.position, pawn.team);
      break;
  }
  const indexPawn = pieces.findIndex((piece) => piece === pawn);
  pieces.splice(indexPawn, 1, promotedPiece);
  const promotionDiv = document.getElementById("promotionsDiv");
  promotionDiv.innerHTML = "";
}

export function passant(pawnsWithPassant, position) {
  pawnsWithPassant.forEach((pawn) => {
    pawn.possiblePassantPositions.push(position);
  });
}

function pickElementsList(...position) {
  const elements = position.map((pos) => {
    return document.getElementById(pos);
  });
  return elements;
}

function verifyIfPositionIsInCheckmate(
  position,
  pieces,
  piecePositions,
  kingTeam
) {
  let positionIsInCheckmate = false;
  pieces.forEach((piece) => {
    if (piece.team === kingTeam) return;

    const possibleMoviments = piece.clickPiece(piecePositions);
    possibleMoviments.clearPositions.forEach((pos) => {
      if (pos === position) {
        positionIsInCheckmate = true;
      }
    });
  });

  return positionIsInCheckmate;
}
