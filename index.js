import { King } from "./King.js";
import { Pawn } from "./Pawn.js";
import { Table } from "./Table.js";
import { passant, promotion, rock } from "./specialMoviments.js";
let gameRound = 1;
let turnTeam = "white";
const table = new Table();

function play() {
  let gameRound = 1;
  let turnTeam = "white";
  table.createTable();
  table.createInitialPiecePositions();
  table.renderTable("white", pieceClick);

  document.getElementById("teamName").textContent =
    turnTeam === "white" ? "Brancas" : "Pretas";
  document.getElementById("turn").textContent = gameRound;
}

function pieceClick(ev) {
  table.renderTable(turnTeam, pieceClick);
  const piece = table.pieces.find(
    (piece) => piece.position === ev.currentTarget.id
  );
  if (piece instanceof King) {
    const isCheckmate = checkCheckmate(
      table.pieces,
      table.piecePositions,
      turnTeam
    );
    const rockPossibilities = rock(
      piece,
      table.pieces,
      isCheckmate,
      table.piecePositions
    );
    if (rockPossibilities.whiteSmallRock) {
      document.getElementById("71").addEventListener("click", () => {
        rockPossibilities.whiteSmallRock.king.position = "71";
        rockPossibilities.whiteSmallRock.rook.position = "61";
        turnChange();
        table.renderTable(turnTeam, pieceClick);
      });
    }
    if (rockPossibilities.whiteBigRock) {
      document.getElementById("31").addEventListener("click", () => {
        rockPossibilities.whiteBigRock.king.position = "31";
        rockPossibilities.whiteBigRock.rook.position = "41";
        turnChange();
        table.renderTable(turnTeam, pieceClick);
      });
    }
    if (rockPossibilities.blackSmallRock) {
      document.getElementById("78").addEventListener("click", () => {
        rockPossibilities.blackSmallRock.king.position = "78";
        rockPossibilities.blackSmallRock.rook.position = "68";
        turnChange();
        table.renderTable(turnTeam, pieceClick);
      });
    }
    if (rockPossibilities.blackBigRock) {
      document.getElementById("38").addEventListener("click", () => {
        rockPossibilities.blackBigRock.king.position = "38";
        rockPossibilities.blackBigRock.rook.position = "48";
        turnChange();
        table.renderTable(turnTeam, pieceClick);
      });
    }
  }

  const possibleMoviments = piece.clickPiece(table.piecePositions);

  possibleMoviments.clearPositions.forEach((position) => {
    const pos = document.getElementById(position);

    pos.classList.add("possiblePosition");

    pos.addEventListener("click", () => {
      const oldPosition = piece.position;
      piece.position = pos.id;
      table.renderTable(turnTeam, pieceClick);

      const isCheckmate = checkCheckmate(
        table.pieces,
        table.piecePositions,
        turnTeam
      );
      if (isCheckmate === true) {
        piece.position = oldPosition;
        table.renderTable(turnTeam, pieceClick);
      } else {
        const pawnsWithPassant = checkPassant(oldPosition, piece);
        if (pawnsWithPassant && pawnsWithPassant.length > 0) {
          passant(pawnsWithPassant, pos.id);
        }
        if (piece instanceof Pawn) {
          if (checkPromotion(piece)) {
            renderChooseCardPromotion(piece, (ev) => {
              promotion(piece, table.pieces, ev.currentTarget.name);
              turnChange();
            });
          } else {
            turnChange();
          }
        } else {
          turnChange();
        }
      }
    });
  });

  possibleMoviments.enemyPositions.forEach((position) => {
    const pos = document.getElementById(position);

    pos.classList.add("enemyPosition");

    pos.addEventListener("click", () => {
      const pieceToRemove = table.pieces.findIndex(
        (piece) => piece.position === position
      );
      const oldPosition = piece.position;
      const pieceRemoved = table.pieces.splice(pieceToRemove, 1);

      piece.position = pos.id;
      table.renderTable(turnTeam, pieceClick);

      const isCheckmate = checkCheckmate(
        table.pieces,
        table.piecePositions,
        turnTeam
      );
      if (isCheckmate === true) {
        piece.position = oldPosition;
        table.pieces.push(pieceRemoved[0]);
        table.renderTable(turnTeam, pieceClick);
      } else {
        const pawnsWithPassant = checkPassant(oldPosition, piece);
        if (pawnsWithPassant && pawnsWithPassant.length > 0) {
          passant(pawnsWithPassant, pos.id);
        }
        if (piece instanceof Pawn) {
          if (checkPromotion(piece)) {
            renderChooseCardPromotion(piece, () => {
              promotion(piece, table.pieces, ev.currentTarget.name);
              turnChange();
            });
          } else {
            turnChange();
          }
        } else {
          turnChange();
        }
      }
    });
  });

  if (possibleMoviments.passantPositions) {
    possibleMoviments.passantPositions.forEach((position) => {
      const pos = document.getElementById(
        position[0] +
          (Number(position[1]) + (turnTeam === "black" ? -1 : +1)).toString()
      );

      pos.classList.add("enemyPosition");

      pos.addEventListener("click", () => {
        const pieceToRemove = table.pieces.findIndex(
          (piece) => piece.position === position
        );

        const oldPosition = piece.position;
        const pieceRemoved = table.pieces.splice(pieceToRemove, 1);

        piece.position = pos.id;
        table.renderTable(turnTeam, pieceClick);

        const isCheckmate = checkCheckmate(
          table.pieces,
          table.piecePositions,
          turnTeam
        );
        if (isCheckmate === true) {
          piece.position = oldPosition;
          table.pieces.push(pieceRemoved[0]);
          table.renderTable(turnTeam, pieceClick);
        } else {
          turnChange();
        }
      });
    });
  }
}

function checkPassant(pawnPosition, pieceMoved) {
  table.pieces.forEach((piece) => {
    if (!(piece instanceof Pawn)) return;
    piece.possiblePassantPositions = [];
  });

  if (!(pieceMoved instanceof Pawn)) return;
  if (
    pieceMoved.position ===
    pawnPosition[0] +
      (
        Number(pawnPosition[1]) + (pieceMoved.team === "white" ? +2 : -2)
      ).toString()
  ) {
    const pawnsWithPassant = table.pieces.filter((piece) => {
      if (piece instanceof Pawn) {
        if (piece.team !== pieceMoved.team) {
          if (
            piece.position ===
              (Number(pieceMoved.position[0]) + 1).toString() +
                pieceMoved.position[1] ||
            piece.position ===
              (Number(pieceMoved.position[0]) - 1).toString() +
                pieceMoved.position[1]
          ) {
            return piece;
          }
        }
      }
    });
    return pawnsWithPassant;
  }
}
function checkCheckmate(pieces, piecePositions, turnTeam) {
  let isCheckmate = false;
  const king = pieces.find(
    (piece) => piece instanceof King && piece.team === turnTeam
  );
  pieces.forEach((piece) => {
    if (piece.team !== turnTeam) {
      const possiblePositions = piece.clickPiece(piecePositions);
      possiblePositions.enemyPositions.forEach((pos) => {
        if (pos === king.position) {
          isCheckmate = true;
        }
      });
    }
  });

  return isCheckmate;
}

function checkPromotion(pawn) {
  if (pawn.team === "white") {
    if (pawn.position[1] === "8") {
      return true;
    }
  } else {
    if (pawn.position[1] === "1") {
      return true;
    }
  }
  return false;
}

function renderChooseCardPromotion(pawn, choosePieceToPromote) {
  table.tablePositions.forEach((position) => {
    const pos = document.getElementById(position);
    pos.replaceWith(pos.cloneNode(true));
  });

  const promotionDiv = document.getElementById("promotionsDiv");
  const promotionCard = document.createElement("div");
  promotionCard.className = "promotionCard";
  const promotionText = document.createElement("p");
  promotionText.className = "promotionText";
  promotionText.textContent = "Escolhar uma peça para a promoção";

  promotionCard.appendChild(promotionText);
  promotionDiv.appendChild(promotionCard);

  function createPieceOption(...piecesName) {
    piecesName.forEach((pieceName) => {
      const pieceImg = document.createElement("img");
      pieceImg.src = `./images/${pawn.team}_${pieceName}.png`;
      pieceImg.className = "promotionImg";
      pieceImg.name = pieceName;
      pieceImg.addEventListener("click", choosePieceToPromote);
      promotionCard.appendChild(pieceImg);
    });
  }

  createPieceOption("pawn", "rook", "knight", "bishop", "queen");
}

function canOutOfCheckmate() {
  let canOutOfCheckmate = false;
  table.pieces.forEach((piece) => {
    if (piece.team !== turnTeam) return;

    const possibleMoviments = piece.clickPiece(table.piecePositions);
    possibleMoviments.enemyPositions.forEach((pos) => {
      const oldPosition = piece.position;
      const piecePositionIndex = table.piecePositions.findIndex(
        (position) => position[0] === piece.position
      );
      const tablePositionIndex = table.piecePositions.findIndex(
        (position) => position[0] === pos
      );

      const indexToRemove = table.pieces.findIndex(
        (piece) =>
          piece.position === table.piecePositions[tablePositionIndex][0]
      );
      const pieceRemoved = table.pieces.splice(indexToRemove, 1);
      table.piecePositions[piecePositionIndex].pop();
      piece.position = table.piecePositions[tablePositionIndex][0];
      table.piecePositions[tablePositionIndex][1] = `${piece.team}Piece`;

      const isChechmate = checkCheckmate(
        table.pieces,
        table.piecePositions,
        turnTeam
      );
      if (isChechmate === false) {
        canOutOfCheckmate = true;
      }
      piece.position = oldPosition;
      table.piecePositions[piecePositionIndex][1] = `${piece.team}Piece`;
      table.piecePositions[tablePositionIndex][1] = `${pieceRemoved.team}Piece`;
      table.pieces.push(pieceRemoved[0]);
    });

    possibleMoviments.clearPositions.forEach((pos) => {
      const oldPosition = piece.position;
      const piecePositionIndex = table.piecePositions.findIndex(
        (position) => position[0] === piece.position
      );
      const tablePositionIndex = table.piecePositions.findIndex(
        (position) => position[0] === pos
      );

      table.piecePositions[piecePositionIndex].pop();
      piece.position = table.piecePositions[tablePositionIndex][0];
      table.piecePositions[tablePositionIndex].push(`${piece.team}Piece`);

      const isChechmate = checkCheckmate(
        table.pieces,
        table.piecePositions,
        turnTeam
      );
      if (isChechmate === false) {
        canOutOfCheckmate = true;
      }
      piece.position = oldPosition;
      table.piecePositions[tablePositionIndex].pop();
      table.piecePositions[piecePositionIndex].push(`${piece.team}Piece`);
    });
  });

  if (canOutOfCheckmate === false) {
    gameOver(turnTeam === "white" ? "Pretas" : "Brancas");
  }
}

function turnChange() {
  if (turnTeam === "white") {
    turnTeam = "black";
  } else {
    turnTeam = "white";
  }

  document.getElementById("teamName").textContent =
    turnTeam === "white" ? "Brancas" : "Pretas";
  gameRound += 1;
  document.getElementById("turn").textContent = gameRound;

  table.renderTable(turnTeam, pieceClick);
  canOutOfCheckmate();
}

function gameOver(winnerTeam) {
  const tableDiv = document.getElementById("table");
  tableDiv.innerHTML = "";
  const gameOverDiv = document.createElement("div");
  const gameOverText = document.createElement("p");
  const playAgainBtn = document.createElement("button");
  gameOverDiv.className = "gameOverDiv";
  playAgainBtn.textContent = "Jogar Novamente";
  playAgainBtn.className = "playAgainBtn";
  gameOverText.textContent = "XEQUE-MATE - time ganhador: " + winnerTeam;
  gameOverText.className = "gameOverText";

  playAgainBtn.addEventListener("click", () => {
    tableDiv.innerHTML = "";
    play();
  });
  gameOverDiv.append(gameOverText, playAgainBtn);
  tableDiv.appendChild(gameOverDiv);
}

play();
