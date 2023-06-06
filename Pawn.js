export class Pawn {
  constructor(position, team) {
    this.team = team;
    this.position = position;
    this.possibleClearPositions = [];
    this.possibleEnemyPositions = [];
    this.possiblePassantPositions = [];
  }

  clickPiece(piecePositions) {
    this.possibleClearPositions = [];
    this.possibleEnemyPositions = [];

    if (this.team === "white") {
      if (this.position[1] === "2") {
        this.possibleClearPositions = [
          this.position[0] + (Number(this.position[1]) + 1),
          this.position[0] + (Number(this.position[1]) + 2),
        ];
      } else {
        this.possibleClearPositions = [
          this.position[0] + (Number(this.position[1]) + 1),
        ];
      }
    }

    if (this.team === "black") {
      if (this.position[1] === "7") {
        this.possibleClearPositions = [
          this.position[0] + (Number(this.position[1]) - 1),
          this.position[0] + (Number(this.position[1]) - 2),
        ];
      } else {
        this.possibleClearPositions = [
          this.position[0] + (Number(this.position[1]) - 1),
        ];
      }
    }

    if (this.position[1] === "1" || this.position[1] === "8") {
      this.possibleClearPositions = [];
    }

    let positionInFront = [];
    let position2InFront = [];
    let positionInFrontLeft = [];
    let positionInFrontRight = [];

    piecePositions.forEach((pos) => {
      if (
        pos[0] ===
        this.position[0] +
          (Number(this.position[1]) + (this.team === "white" ? +2 : -2))
      ) {
        position2InFront = pos;
      }
      if (
        pos[0] ===
        this.position[0] +
          (Number(this.position[1]) + (this.team === "white" ? +1 : -1))
      ) {
        positionInFront = pos;
      }
      if (
        pos[0] ===
        (Number(this.position[0]) - 1).toString() +
          (Number(this.position[1]) + (this.team === "white" ? +1 : -1))
      ) {
        positionInFrontLeft = pos;
      }
      if (
        pos[0] ===
        (Number(this.position[0]) + 1).toString() +
          (Number(this.position[1]) + (this.team === "white" ? +1 : -1))
      ) {
        positionInFrontRight = pos;
      }
    });

    if (position2InFront) {
      if (
        position2InFront[1] === "blackPiece" ||
        position2InFront[1] === "whitePiece"
      ) {
        this.possibleClearPositions = [
          this.position[0] +
            (Number(this.position[1]) + (this.team === "white" ? +1 : -1)),
        ];
      }
    }

    if (positionInFront) {
      if (
        positionInFront[1] === "blackPiece" ||
        positionInFront[1] === "whitePiece"
      ) {
        this.possibleClearPositions = [];
      }
    }

    if (this.team === "white") {
      if (positionInFrontLeft && positionInFrontLeft[1] === "blackPiece") {
        this.possibleEnemyPositions.push(positionInFrontLeft[0]);
      }
      if (positionInFrontRight && positionInFrontRight[1] === "blackPiece") {
        this.possibleEnemyPositions.push(positionInFrontRight[0]);
      }
    }

    if (this.team === "black") {
      if (positionInFrontLeft && positionInFrontLeft[1] === "whitePiece") {
        this.possibleEnemyPositions.push(positionInFrontLeft[0]);
      }
      if (positionInFrontRight && positionInFrontRight[1] === "whitePiece") {
        this.possibleEnemyPositions.push(positionInFrontRight[0]);
      }
    }

    return {
      clearPositions: this.possibleClearPositions,
      enemyPositions: this.possibleEnemyPositions,
      passantPositions: this.possiblePassantPositions,
    };
  }
}
