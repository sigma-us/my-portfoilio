export interface GameBoard {
    playerOne: number,
    playerTwo: number,
    size: number,
    board: number[][] | null[][],
    checkers: any[],
}

export class GameBoard {
    constructor(size: any, p1: any, p2: any) {
        this.playerOne = p1;
        this.playerTwo = p2;
        this.size = Number(size) < 6 ? 6 : Math.floor(Number(size) / 2) * 2;
        this.board = this.fillBoard(this.makeBoard());
        this.checkers = this.makeCheckers();
        this.moveChecker = this.moveChecker.bind(this);
        this.canMoveChecker = this.canMoveChecker.bind(this);
        this.getPlayer = this.getPlayer.bind(this);
        this.canKeepJumping = this.canMoveChecker.bind(this);
        this.getSuggestedMoves = this.getSuggestedMoves.bind(this);
        this.isJumpMove = this.isJumpMove.bind(this);
    }

    setCheckers = (checkers: any[]) => {
        this.checkers = checkers;
    }
    setBoard = (board: number[][]) => {
        this.board = board;
        console.log(this.board, this.checkers)
    }
    
    makeBoard = (): number[][] => {
        let board = [];

        for (let i = 0; i < this.size; ++i) {
            board.push(Array(this.size).fill(null));
        }
        return board;
    }

    // fill top 2 and bottom 2 rows of board with checker piece index values
    fillBoard = (board: number[][]): number[][] => {
        let size = this.size;
        let count = 0;
        let row = size - 1, row2 = 0;

        for (let i = 0; i < 2; i++) {
            for (let col = 0; col < size; col += 2) {
                if (i % 2 === 1) {
                    board[row - i][col + 1] = count;
                    board[row2 + i][col] = (size / 2) * 2 + count;
                } else {
                    board[row - i][col] = count;
                    board[row2 + i][col + 1] = (size / 2) * 2 + count;
                }
                count++;
            }
        }

        return board;
    }

    getAllMoves = ( player: any) => {
        let moves = { jumps: [] as any, singles: [] as any };
        let checkers = this.checkers;
        checkers.forEach((checker: { player: any; removed: any; }, i: any) => {
            if (checker.player === player && !checker.removed) {
                let cMoves = this.getMoves(i);
                moves.jumps = (moves.jumps).concat(cMoves.jumps);
                moves.singles = (moves.singles).concat(cMoves.singles);
            }
        });
        console.log("moves: ", (moves));
        return moves;
    }

    hasMoves =  ( player: any) => {
        let moves = this.getAllMoves(player);
        return moves.jumps.length + moves.singles.length > 0;
    }

    // to do winner screen/reset button
    canMoveChecker =  ( checker: number, row: number, col: number): boolean => {
        let player = this.checkers[checker].player;
        let moves = this.getAllMoves(player);
        let movesToCheck = moves.singles;
        let check = this.checkers[checker];

        if (moves.jumps.length) {
            for (let move of moves.jumps) {
                let collisionCheck = (move.index === checker);

                if (move.row === row && move.col === col) {
                    let colCheck = (check.col - 2 === col || check.col + 2 === col);

                    if ((player === 1 || check.isKing)
                        && (check.row - 2 === row && (colCheck))
                        && collisionCheck
                    ) return true;

                    if ((player === 2 || check.isKing)
                        && (check.row + 2 === row && (colCheck))
                        && collisionCheck
                    ) return true;
                }
            }
        } else {
            for (let move of movesToCheck) {
                if (move.row === row && move.col === col) {
                    let colCheck = (check.col - 1 === col || check.col + 1 === col);

                    if ((player === 1 || check.isKing)
                        && (check.row - 1 === row && (colCheck))) return true;
                    if ((player === 2 || check.isKing)
                        && (check.row + 1 === row && (colCheck))) return true;
                }
            }

        }
        return false;
    }

    getSuggestedMoves =  ( checker: number, row: number, col: number) => {
        let player = this.checkers[checker].player;
        let moves = this.getAllMoves(player);
        let movesToCheck = moves.singles;
        let suggested = [];
        let map = {} as any;

        if (moves.jumps.length) return moves.jumps;

        let check = this.checkers[checker];

        if (player === 1 || check.isKing) {
            for (let move of movesToCheck) {
                if (move.row + 1 === row && (move.col - 1 === col || move.col + 1 === col)) {
                    if (!map[`${move.col}${move.row}`]) suggested.push(move);
                    map[`${move.col}${move.row}`] = true;
                }
            }
        }
        if (player === 2 || check.isKing) {
            for (let move of movesToCheck) {
                if (move.row - 1 === row && (move.col - 1 === col || move.col + 1 === col)) {
                    if (!move[`${move.col}${move.row}`]) suggested.push(move);
                    map[`${move.col}${move.row}`] = true;
                }
            }
        }

        return suggested;
    }

    isJumpMove = (checker: number, row: number) => {
        return Math.abs(this.checkers[checker].row - row) === 2;
    }

    canKeepJumping = (checker: any) => {
        let moves = this.getMoves(checker).jumps;
        // console.log(JSON.stringify(moves));
        if (moves.length) {
            return true;
        }
        return false;
    }

    makeKing = (checker: number) => {
        let c = this.checkers[checker];
        c.isKing = true;
    }

    isKing =  (checker: number) => {
        let c = this.checkers[checker];
        return c.isKing;
    }

    getPlayer =  (checker: number) => {
        let c = this.checkers[checker];
        return c.player;
    }

    moveChecker =  (checker: number, row: number, col: number) => {
        let c = this.checkers[checker];
        let cRow = c.row;
        let cCol = c.col;
        
        if (this.isJumpMove(checker, row)) {
            let midRow = (cRow + row) / 2;
            let midCol = (cCol + col) / 2;
            let removedPlayer = this.board[midRow][midCol];
            this.board[midRow][midCol] = null;
            this.checkers[removedPlayer as number].removed = true;
        }
        c.row = row;
        c.col = col;
        this.board[cRow][cCol] = null;
        this.board[row][col] = checker;
    }

    getMoves =  (checker: number) => {
        let singles = [] as any[];
        let jumps = [] as any[];
        let c = this.checkers[checker];

        let topRow = c.row - 1;
        let bottomRow = c.row + 1;
        let leftCol = c.col - 1;
        let rightCol = c.col + 1;

        if (c.player === this.playerOne || c.isKing) {
            jumps = this.checkJumps(topRow, topRow - 1, leftCol, rightCol, leftCol - 1, rightCol + 1, c.player, checker);
            if (!jumps.length) {
                singles = this.checkAdjacent(topRow, leftCol, rightCol, checker);
            }
        }
        if (c.player === this.playerTwo || c.isKing) {
            jumps = jumps.concat(this.checkJumps(bottomRow, bottomRow + 1, leftCol, rightCol, leftCol - 1, rightCol + 1, c.player, checker));
            if (!jumps.length) {
                singles = singles.concat(this.checkAdjacent(bottomRow, leftCol, rightCol, checker));
            }
        }
        return { singles: singles, jumps: jumps };
    }

    checkAdjacent =  (row: number, left: number, right: number, i: any) => {
        let moves: { row: any; col: any; index: any; }[] = [];
        if (row >= this.board.length || row < 0) {
            return moves;
        }
        if (this.board[row][left] === null) {
            moves.push({ row: row, col: left, index: i });
        }
        if (this.board[row][right] === null) {
            moves.push({ row: row, col: right, index: i });
        }
        return moves;
    }

    checkJumps =  (row: number, nextRow: number, left: number, right: number, nextLeft: number, nextRight: number, player: any, i: any) => {
        let moves: { row: any; col: any; index: any; }[] = [];
        if (row >= this.board.length || row < 0 || nextRow >= this.board.length ||
            nextRow < 0
        ) {
            return moves;
        }
        let adjacent = this.board[row][left];
        if (adjacent && this.checkers[adjacent].player !== player) {
            if (this.board[nextRow][nextLeft] === null) {
                moves.push({ row: nextRow, col: nextLeft, index: i });
            }
        }
        adjacent = this.board[row][right];
        if (adjacent && this.checkers[adjacent].player !== player) {
            if (this.board[nextRow][nextRight] === null) {
                moves.push({ row: nextRow, col: nextRight, index: i });
            }
        }

        // const check
        return moves;
    }

    makeCheckers =  (): any[] => {
        let checkers = [];
        let num = (this.size / 2) * 2;
        let row = this.size - 1, col = 0;

        for (let i = 0; i < num; ++i) {
            if (i && i % (this.size / 2) === 0) {
                --row;
                col = i === this.size ? 0 : 1;
            }
            checkers.push({ player: this.playerOne, isKing: false, row: row, col: col, removed: false });
            col += 2
        }
        row = 0;
        col = 1;
        for (let i = 0; i < num; ++i) {
            if (i && i % (this.size / 2) === 0) {
                ++row;
                col = i === this.size ? 1 : 0;
            }
            checkers.push({ player: this.playerTwo, isKing: false, row: row, col: col, removed: false });
            col += 2
        }

        return checkers;
    }

}
