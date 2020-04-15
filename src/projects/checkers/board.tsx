import React, { Component } from 'react';
import { GameBoard } from './gameBoard';

const P1 = 1;
const P2 = 2;
const PLAYERS = {
    [P1]: {
        name: "Player One",
        class: "player-one"
    },
    [P2]: {
        name: "Player Two",
        class: "player-two"
    }
} as any;

export default class Board extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            boardSize: '',
            board: new GameBoard(8, 1, 2) as GameBoard,
            turn: 1,
            selectedSquare: null,
            winner: null,
            checkerShape: 'default-shape',
            checkerColor: 'default-color',
            suggestedMoves: []
        } as {
            boardSize: number | string,
            board: GameBoard,
            turn: number,
            selectedSquare: null,
            winner: null,
            checkerShape: string,
            checkerColor: string,
            suggestedMoves: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setSuggestedMoves = this.setSuggestedMoves.bind(this);
    }

    handleChange(event: { target: { value: any; }; }) {
        this.setState({ boardSize: Number(event.target.value) });
    }

    handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        this.setState({ board: new GameBoard(this.state.boardSize, 1, 2) })
    }

    componentDidUpdate(prevProps: any, prevState: { turn: any; }) {
        if (prevProps) { };
        if (prevState.turn !== this.state.turn) {
            let board = this.state.board;
            if (!board.hasMoves(this.state.turn)) {
                console.log("no available moves!!!");
                this.setState({ winner: this.nextPlayer() });
            }
        }
    }


    componentDidMount() {
        // set size here to avoid form error in constructor
        let saveState = localStorage.getItem('game');
        if (saveState !== null) {
            this.setState(JSON.parse(saveState));
            localStorage.removeItem('game');
        } else this.setState({ boardSize: 8 });
    }

    selectSquare(row: any, col: any) {
        console.log(row, col)
        let selected = this.state.selectedSquare;

        if (this.canSelectSquare(row, col)) {
            this.setSquare(row, col);
            this.setSuggestedMoves(row, col);
        } else if (selected !== null) this.handleMove(row, col);
    }

    setSuggestedMoves(row: React.Key, col: React.Key) {
        let board = this.state.board;
        let moves = board.getSuggestedMoves(board.board[row][col], row, col)
        this.setState({ suggestedMoves: moves });
    }

    handleMove(row: number, col: any) {
        let board = this.state.board;
        let selected = this.state.selectedSquare;
        let start = board.board[selected.row][selected.column];
        if (!board.canMoveChecker(start, row, col)) {
            console.log("illegal move");
            return;
        }

        let isJump = board.isJumpMove(start, row, col);
        let becameKing = false;
        board.moveChecker(start, row, col);
        this.setState({ suggestedMoves: [] });
        if ((!board.isKing(start) && (board.getPlayer(start) === 1 && row === 0)) || (board.getPlayer(start) === 2 && row === ((board.board.length) - 1))) {
            console.log("making King....");
            becameKing = true;
            board.makeKing(start);
        }

        if (!becameKing && isJump && board.canKeepJumping(start)) {
            this.setState({ board: board, selectedSquare: { row: row, column: col } });
            this.setSuggestedMoves(row, col);
        } else {
            this.setState({ board: board, turn: this.nextPlayer(), selectedSquare: null });
        }
    }

    canSelectSquare(row: React.Key, col: React.Key) {
        let square = this.state.board.board[row][col];
        if (!square) return false;
        let player = this.state.board.checkers[square].player;

        return player === this.state.turn;
    }

    setSquare(row: any, col: any) {
        this.setState({ selectedSquare: { row: row, column: col } });
    }

    nextPlayer() {
        return (this.state.turn === 1 ? 2 : 1)
    }

    restart() {
        this.setState({
            board: new GameBoard(8, 1, 2),
            boardSize: 8,
            turn: 1, selectedSquare: null, winner: null
        });
    }



    // checker style change functions below ----------------- //

    onShapeChange(e: { target: { value: any; }; }) {
        this.changeChecker(e.target.value, 'checkerShape');
    }

    onColorChange(e: { target: { value: any; }; }) {
        this.changeChecker(e.target.value, 'checkerColor')
    }

    changeChecker(shape: any, key: string) {
        this.setState({
            [key]: shape
        });
    }

    saveToLocal() {
        const local = this.state;
        localStorage.setItem('game', JSON.stringify(local));
    }

    render() {
        window.scrollTo(0, 0)

        return (
            <div className='app-container'>
                <form>
                    <label>
                        Board Size:
                        <input type='number' value={this.state.boardSize} onChange={this.handleChange} />
                        <input type="submit" value="Resize/Reset Board" onClick={this.handleSubmit.bind(this)} />
                    </label>
                    <label>
                        Checker Default:
                        <input
                            type='radio'
                            value='default-shape'
                            checked={this.state.checkerShape === 'default-shape'}
                            onChange={this.onShapeChange.bind(this)}></input>
                    </label>
                    <label>
                        Checker Square:
                        <input
                            type='radio'
                            value='square-piece'
                            checked={this.state.checkerShape === 'square-piece'}
                            onChange={this.onShapeChange.bind(this)}></input>
                    </label>
                    <label>
                        Checker Oval:
                        <input
                            type='radio'
                            value='oval-piece'
                            checked={this.state.checkerShape === 'oval-piece'}
                            onChange={this.onShapeChange.bind(this)}></input>
                    </label>
                    <br />
                    <label>
                        Color Default:
                        <input
                            type='radio'
                            value='default-color'
                            checked={this.state.checkerColor === 'default-color'}
                            onChange={this.onColorChange.bind(this)}></input>
                    </label>
                    <label>
                        Light Blue and Pink:
                        <input
                            type='radio'
                            value='blue'
                            checked={this.state.checkerColor === 'blue'}
                            onChange={this.onColorChange.bind(this)}></input>
                    </label>
                    <label>
                        Light Green and Yellow:
                        <input
                            type='radio'
                            value='green'
                            checked={this.state.checkerColor === 'green'}
                            onChange={this.onColorChange.bind(this)}></input>
                    </label>
                    <label>
                        <input type='button' value="Save Game" onClick={this.saveToLocal.bind(this)}></input>
                    </label>
                </form>

                <div className='boardContainer'>
                    <div className='current'>
                        <h3>Current Turn: {PLAYERS[this.state.turn].name}</h3>
                        <Piece
                            checker={{ player: this.state.turn }}
                            checkerShape={this.state.checkerShape}
                            checkerColor={this.state.checkerColor} />
                    </div>
                    {this.state.winner &&
                        <div id="winner">
                            <div>
                                <p>{PLAYERS[this.state.winner].name} has won the game!</p>
                                <button onClick={this.restart.bind(this)}>Play again?</button>
                            </div>
                        </div>}
                    {this.state.boardSize && this.state.board && this.state.board.board &&
                        <Game board={this.state.board}
                            selectedSquare={this.state.selectedSquare}
                            selectSquare={this.selectSquare.bind(this)}
                            checkerShape={this.state.checkerShape}
                            checkerColor={this.state.checkerColor}
                            suggestedMoves={this.state.suggestedMoves}></Game>
                    }
                </div>
            </div>
        )
    }
}


class Game extends Component<any, any> {
    render() {
        let selectedRow = this.props.selectedSquare ? this.props.selectedSquare.row : null;
        let rows = this.props.board.board.map((row: any, i: React.Key) => {
            return <Row key={i}
                row={row}
                selectedSquare={i === selectedRow ? this.props.selectedSquare : null}
                rowNum={i}
                checkers={this.props.board.checkers}
                selectSquare={this.props.selectSquare}
                checkerShape={this.props.checkerShape}
                checkerColor={this.props.checkerColor}
                suggestedMoves={this.props.suggestedMoves} />;
        });
        return (
            <div className="board">
                {rows}
            </div>
        )

    }
}

class Row extends Component<any, any> {
    render() {
        let selectedCol = this.props.selectedSquare ? this.props.selectedSquare.column : null;
        let squares = this.props.row.map((square: React.Key, i: React.Key) => {
            let suggested = false;
            this.props.suggestedMoves.map((move: { row: any; col: any; }) => {
                if (move.row === this.props.rowNum && move.col === i) suggested = true;

                return move;
            });

            return <Square key={i}
                val={square !== null ? this.props.checkers[square] : null}
                row={this.props.rowNum}
                column={i}
                selected={i === selectedCol ? true : false}
                selectSquare={this.props.selectSquare}
                checkerShape={this.props.checkerShape}
                checkerColor={this.props.checkerColor}
                suggestedMove={suggested} />
        });
        return (
            <div className="row">
                {squares}
            </div>
        )
    }
}

class Square extends Component<any, any> {
    render() {
        let color = (this.props.row + this.props.column) % 2 === 0 ? "old-lace" : "black";
        let selection = this.props.selected ? " selected" : "";
        let suggested = this.props.suggestedMove ? ' suggested' : '';
        let classes = "square " + color + selection + suggested;
        return (
            <div className={classes} onClick={() => this.props.selectSquare(this.props.row, this.props.column)}>
                {this.props.val !== null &&
                    <Piece
                        checker={this.props.val}
                        checkerShape={this.props.checkerShape}
                        checkerColor={this.props.checkerColor} />
                }
            </div>
        )
    }
}

function Piece(props: { checker: { player: React.Key; isKing?: any; }; checkerShape: any; checkerColor: any; }) {
    let classes = "";
    if (props.checker) {
        classes += 'checker ';
        classes += PLAYERS[props.checker.player].class;
        classes += ` ${props.checkerShape} ${props.checkerColor}`;
        if (props.checker.isKing) {
            classes += " king";
        }
    }
    return (
        <div className={classes}></div>
    )
}