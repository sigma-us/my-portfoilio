import React, { Component } from 'react';
import { GameBoard } from './gameBoard';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    
    padding-top: 20px;
    text-align: left;

    label {
        height: fit-content;
        padding: 6px;

        input[type="button"] {
            cursor: pointer;
        }
        input[type="submit"] {
            cursor: pointer;
        }
    }
`;

const GameContainer = styled.div`
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    position: relative;
    padding-top: 70px;
    display: flex;
    
    justify-content: space-around;
    flex-wrap: wrap;
    height: fit-content;
    background-color: rgba(30,33,40,1);
    color: white;
    letter-spacing: 1.7px;
    font-weight: 100;


`;

const BoardCol = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 60vw;
    height: 100%;
`;

const Label = styled.label`
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    margin-right: 40px;
    cursor: pointer;
    font-size: 14px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    span {
        position: absolute;
        top: 2px;
        right: -30px;
        height: 25px;
        width: 25px;
        background-color: #eee;
        transition: all 0.5s ease;
    }

    /* On mouse-over, add a grey background color */
    &:hover input ~ span {
        background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    input:checked ~ span {
        background-color: rgba(45,45,65,1);
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    span:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    input:checked ~ span:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    span:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
`;

const Input = styled.input`
    height: ${params => params.type == "number" ? "29.5px" : "40px"};
    color: rgb(245, 245, 245);
    background-color: rgb(96, 96, 96);
    width: ${params => params.type == "number" ? "32px" : "fit-content"};
    font-size: 1em;
    padding: 0.25em 1em;
    border: ${params => params.type == "number" ? "none"  : "2px solid rgb(30, 33, 40)"};
    border-bottom: ${params => params.type == "number" ? "2px solid rgb(30,33,40)"  : ""};
    border-radius: 5px;
    letter-spacing: 0.7px;
    font-weight: 300;
    text-align: ${params => params.type == "number" ? "right": "center"};

    &::-webkit-inner-spin-button, 
    ::-webkit-outer-spin-button { 
      -webkit-appearance: none;
      margin: 0; /* Removes leftover margin */
    }

    transition: background-color 0.5s ease;

    &:hover {
        background-color: rgb(72, 72, 72);
    }

    &:focus {
        border: ${params => params.type == "number" ? "none"  : "2px solid rgb(30, 33, 40)"};
        border-bottom: ${params => params.type == "number" ? "2px solid rgb(30,33,40)"  : ""};
        outline: none;
    }
    &:active {
        transform: ${params => params.type == "number" ? "none"  : "scale(0.99)"};
    }

`;


const saveBtnStyle = {
    display: 'flex',
    justifyContent: "flex-end",
    alignItems: "center"
}

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

    componentDidUpdate(prevProps: any, prevState: { turn: any, board: any }) {
        if (prevProps) { };
        if (prevState.turn !== this.state.turn) {
            let board = this.state.board;
            if (board && !board.hasMoves(this.state.turn)) {
                console.log("no available moves!!!");
                this.setState({ winner: this.nextPlayer() });
            }
        }
    }


    componentDidMount() {
        // set size here to avoid form error in constructor
        window.scrollTo(0, 0)

        let saveState: any = localStorage.getItem('game');
        if (saveState !== null) {
            saveState = JSON.parse(saveState);
            // keep class methods from board this is required because local storage is saves as a string and removes the class functions
            saveState.board = { ...this.state.board, ...saveState.board };
            saveState.board.setCheckers(saveState.board.checkers);
            saveState.board.setBoard(saveState.board.board);
            this.setState(saveState);
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
        alert("Game Saved");
    }

    render() {

        return (
            <GameContainer>
                <Form>
                    <label>
                        Board Size:
                        <Input type='number' value={this.state.boardSize} onChange={this.handleChange} />
                        <Input type="submit" value="Resize/Reset Board" onClick={this.handleSubmit.bind(this)} />
                    </label>
                    <Label>
                        Checker Default:
                        <input
                            type='radio'
                            value='default-shape'
                            checked={this.state.checkerShape === 'default-shape'}
                            onChange={this.onShapeChange.bind(this)}></input>
                            <span></span>

                    </Label>
                    <Label>
                        Checker Square:
                        <input
                            type='radio'
                            value='square-piece'
                            checked={this.state.checkerShape === 'square-piece'}
                            onChange={this.onShapeChange.bind(this)}></input>
                            <span></span>

                    </Label>
                    <Label>
                        Checker Oval:
                        <input
                            type='radio'
                            value='oval-piece'
                            checked={this.state.checkerShape === 'oval-piece'}
                            onChange={this.onShapeChange.bind(this)}></input>
                            <span></span>

                    </Label>
                    <br />
                    <Label>
                        Color Default:
                        <input
                            type='radio'
                            value='default-color'
                            checked={this.state.checkerColor === 'default-color'}
                            onChange={this.onColorChange.bind(this)}></input>
                            <span></span>

                    </Label>
                    <Label>
                        Light Blue and Pink:
                        <input
                            type='radio'
                            value='blue'
                            checked={this.state.checkerColor === 'blue'}
                            onChange={this.onColorChange.bind(this)}></input>
                            <span></span>

                    </Label>
                    <Label>
                        Light Green and Yellow:
                        <input
                            type='radio'
                            value='green'
                            checked={this.state.checkerColor === 'green'}
                            onChange={this.onColorChange.bind(this)}></input>
                            <span></span>
                    </Label>
                    <label style={saveBtnStyle}>
                        <Input type='button' value="Save Game" onClick={this.saveToLocal.bind(this)}></Input>
                    </label>
                </Form>

                <BoardCol>
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
                </BoardCol>
                
            </GameContainer>
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