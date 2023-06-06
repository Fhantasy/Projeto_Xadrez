export class King {
  constructor(position, team) {
    this.team = team;
    this.position = position;
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
    let posId = 0;
    if (side === "right") {
      posId = (Number(position[0]) + 1).toString() + position[1];
    }
    if (side === "left") {
      posId = (Number(position[0]) - 1).toString() + position[1];
    }
    if (side === "top") {
      posId = position[0] + (Number(position[1]) + 1).toString();
    }
    if (side === "bottom") {
      posId = position[0] + (Number(position[1]) - 1).toString();
    }
    const pos = piecePositions.find((pos) => pos[0] === posId);
    if (!pos) return;

    if (pos[1] === "blackPiece") {
      if (this.team === "white") {
        this.possibleEnemyPositions.push(pos[0]);
        return;
      }
      return;
    } else if (pos[1] === "whitePiece") {
      if (this.team === "black") {
        this.possibleEnemyPositions.push(pos[0]);
        return;
      }
      return;
    } else {
      this.possibleClearPositions.push(pos[0]);
    }
  }

  pickPossibleMovimentsDiagonal(side, position, piecePositions) {
    let posId = "";

    if (side === "rightTop") {
      posId =
        (Number(position[0]) + 1).toString() +
        (Number(position[1]) + 1).toString();
    }
    if (side === "leftTop") {
      posId =
        (Number(position[0]) - 1).toString() +
        (Number(position[1]) + 1).toString();
    }
    if (side === "rightBottom") {
      posId =
        (Number(position[0]) + 1).toString() +
        (Number(position[1]) - 1).toString();
    }
    if (side === "leftBottom") {
      posId =
        (Number(position[0]) - 1).toString() +
        (Number(position[1]) - 1).toString();
    }

    const pos = piecePositions.find((pos) => pos[0] === posId);
    if (!pos) return;

    if (pos[1] === "blackPiece") {
      if (this.team === "white") {
        this.possibleEnemyPositions.push(pos[0]);
      }
    } else if (pos[1] === "whitePiece") {
      if (this.team === "black") {
        this.possibleEnemyPositions.push(pos[0]);
      }
    } else {
      this.possibleClearPositions.push(pos[0]);
    }
  }
}
