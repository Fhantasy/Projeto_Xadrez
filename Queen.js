export class Queen {
  constructor(position, team) {
    this.team = team;
    this.position = position;
    this.possibleClearPositions = [];
    this.possibleEnemyPositions = [];
  }

  clickPiece(piecePositions) {
    this.possibleClearPositions = [];
    this.possibleEnemyPositions = [];
    this.pickPossibleMovimentsSide("top", this.position, piecePositions);
    this.pickPossibleMovimentsSide("left", this.position, piecePositions);
    this.pickPossibleMovimentsSide("right", this.position, piecePositions);
    this.pickPossibleMovimentsSide("bottom", this.position, piecePositions);

    this.pickPossibleMovimentsDiagonal(
      "rightTop",
      this.position,
      piecePositions
    );
    this.pickPossibleMovimentsDiagonal(
      "leftTop",
      this.position,
      piecePositions
    );
    this.pickPossibleMovimentsDiagonal(
      "rightBottom",
      this.position,
      piecePositions
    );
    this.pickPossibleMovimentsDiagonal(
      "leftBottom",
      this.position,
      piecePositions
    );

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

  pickPossibleMovimentsDiagonal(side, position, piecePositions) {
    let indexX = 0;
    let indexY = 0;

    if (side === "rightTop") {
      indexX = Number(position[1]) + 1;
      indexY = Number(position[0]) + 1;
    }
    if (side === "leftTop") {
      indexX = Number(position[1]) + 1;
      indexY = Number(position[0]) - 1;
    }
    if (side === "rightBottom") {
      indexX = Number(position[1]) - 1;
      indexY = Number(position[0]) + 1;
    }
    if (side === "leftBottom") {
      indexX = Number(position[1]) - 1;
      indexY = Number(position[0]) - 1;
    }

    for (
      indexX;
      side === "rightTop" || side === "leftTop" ? indexX <= 8 : indexX >= 1;
      side === "rightBottom" || side === "leftBottom" ? indexX-- : indexX++
    ) {
      const pos = piecePositions.find((pos) => {
        return pos[0] === indexY.toString() + indexX.toString();
      });

      if (indexY > 8 || indexY < 1) {
        indexX = side === "rightTop" || side === "leftTop" ? 9 : 0;
        return;
      }

      if (!(pos[1] === "blackPiece" || pos[1] === "whitePiece")) {
        this.possibleClearPositions.push(pos[0]);
      } else {
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
      side === "rightTop" || side === "rightBottom" ? indexY++ : indexY--;
    }
  }
}
