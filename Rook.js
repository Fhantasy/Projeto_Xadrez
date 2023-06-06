export class Rook {
  constructor(position, team, side) {
    this.team = team;
    this.position = position;
    this.side = side;
    this.possibleClearPositions = [];
    this.possibleEnemyPositions = [];
    this.alreadyMove = false;
    this.canBigRock = false;
    this.canSmallRock = false;
  }

  clickPiece(piecePositions) {
    this.possibleClearPositions = [];
    this.possibleEnemyPositions = [];
    this.pickPossibleMovimentsSide("top", this.position, piecePositions);
    this.pickPossibleMovimentsSide("left", this.position, piecePositions);
    this.pickPossibleMovimentsSide("right", this.position, piecePositions);
    this.pickPossibleMovimentsSide("bottom", this.position, piecePositions);

    return {
      clearPositions: this.possibleClearPositions,
      enemyPositions: this.possibleEnemyPositions,
    };
  }

  pickPossibleMovimentsSide(side, position, piecePositions) {
    let index = 0;
    if (side === "right") {
      index = Number(position[0]) + 1;
    }
    if (side === "left") {
      index = Number(position[0]) - 1;
    }
    if (side === "top") {
      index = Number(position[1]) + 1;
    }
    if (side === "bottom") {
      index = Number(position[1]) - 1;
    }
    for (
      index;
      side === "right" || side === "top" ? index <= 8 : index >= 1;
      side === "right" || side === "top" ? index++ : index--
    ) {
      const pos = piecePositions.find((pos) => {
        return (
          pos[0] ===
          (side === "bottom" || side === "top"
            ? position[0] + index
            : index + position[1])
        );
      });

      if (!(pos[1] === "blackPiece" || pos[1] === "whitePiece")) {
        this.possibleClearPositions.push(pos[0]);
      } else {
        index = 9;
        if (pos[1] === "blackPiece") {
          if (this.team === "white") {
            this.possibleEnemyPositions.push(pos[0]);
            return;
          }
          return;
        }
        if (pos[1] === "whitePiece") {
          if (this.team === "black") {
            this.possibleEnemyPositions.push(pos[0]);
            return;
          }
          return;
        }
      }
    }
  }
}
