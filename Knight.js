export class Knigth {
  constructor(position, team) {
    this.team = team;
    this.position = position;
    this.possibleClearPositions = [];
    this.possibleEnemyPositions = [];
  }

  clickPiece(piecePositions) {
    this.possibleClearPositions = [];
    this.possibleEnemyPositions = [];
    this.pickPossibleMovimentsSide("top", piecePositions);
    this.pickPossibleMovimentsSide("left", piecePositions);
    this.pickPossibleMovimentsSide("right", piecePositions);
    this.pickPossibleMovimentsSide("bottom", piecePositions);

    return {
      clearPositions: this.possibleClearPositions,
      enemyPositions: this.possibleEnemyPositions,
    };
  }

  pickPossibleMovimentsSide(side, piecePositions) {
    let pos1;
    let pos2;
    if (side === "right") {
      pos1 = piecePositions.find((pos) => {
        return (
          pos[0] ===
          (Number(this.position[0]) + 2).toString() +
            (Number(this.position[1]) + 1).toString()
        );
      });
      pos2 = piecePositions.find((pos) => {
        return (
          pos[0] ===
          (Number(this.position[0]) + 2).toString() +
            (Number(this.position[1]) - 1).toString()
        );
      });
    }
    if (side === "left") {
      pos1 = piecePositions.find((pos) => {
        return (
          pos[0] ===
          (Number(this.position[0]) - 2).toString() +
            (Number(this.position[1]) + 1).toString()
        );
      });
      pos2 = piecePositions.find((pos) => {
        return (
          pos[0] ===
          (Number(this.position[0]) - 2).toString() +
            (Number(this.position[1]) - 1).toString()
        );
      });
    }
    if (side === "top") {
      pos1 = piecePositions.find((pos) => {
        return (
          pos[0] ===
          (Number(this.position[0]) - 1).toString() +
            (Number(this.position[1]) + 2).toString()
        );
      });
      pos2 = piecePositions.find((pos) => {
        return (
          pos[0] ===
          (Number(this.position[0]) + 1).toString() +
            (Number(this.position[1]) + 2).toString()
        );
      });
    }
    if (side === "bottom") {
      pos1 = piecePositions.find((pos) => {
        return (
          pos[0] ===
          (Number(this.position[0]) + 1).toString() +
            (Number(this.position[1]) - 2).toString()
        );
      });
      pos2 = piecePositions.find((pos) => {
        return (
          pos[0] ===
          (Number(this.position[0]) - 1).toString() +
            (Number(this.position[1]) - 2).toString()
        );
      });
    }

    if (pos1) {
      if (pos1[1] === "whitePiece") {
        if (this.team === "black") {
          this.possibleEnemyPositions.push(pos1[0]);
        }
      } else if (pos1[1] === "blackPiece") {
        if (this.team === "white") {
          this.possibleEnemyPositions.push(pos1[0]);
        }
      } else {
        this.possibleClearPositions.push(pos1[0]);
      }
    }

    if (pos2) {
      if (pos2[1] === "whitePiece") {
        if (this.team === "black") {
          this.possibleEnemyPositions.push(pos2[0]);
        }
      } else if (pos2[1] === "blackPiece") {
        if (this.team === "white") {
          this.possibleEnemyPositions.push(pos2[0]);
        }
      } else {
        this.possibleClearPositions.push(pos2[0]);
      }
    }
  }
}
