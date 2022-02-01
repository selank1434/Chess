import { Console } from "console";
import React, { useEffect, useState } from "react";
import { useRef} from "react";
import referee from "../referee/referee";
import Tile from "../tiles/tiles";
import './chessboard.css'
const vertArray = ["1","2","3","4","5","6","7","8"];
const horArray = ["a","b","c","d","e","f","g","h"];
export interface Piece{
    Image: string;
    x: number;
    y: number;
    type: PieceType;
    side: TeamType;
}
export enum PieceType{
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    QUEEN,
    KING
}
export enum TeamType{
    OPPONENT,
    PLAYER
}
const initalBoardState: Piece[] = [];
for( let i = 0; i < horArray.length; i++){
    initalBoardState.push({Image: "Chesspieces/pawn_b.png", x: i, y: 6, type: PieceType.PAWN, side:TeamType.OPPONENT});
    initalBoardState.push({Image: "Chesspieces/pawn_w.png", x: i, y: 1, type: PieceType.PAWN, side:TeamType.PLAYER})
}
initalBoardState.push({Image: "Chesspieces/rook_b.png", x: 0, y: 7,type: PieceType.ROOK, side:TeamType.OPPONENT});
initalBoardState.push({Image: "Chesspieces/rook_b.png", x: 7, y: 7,type: PieceType.ROOK, side:TeamType.OPPONENT});
initalBoardState.push({Image: "Chesspieces/rook_w.png", x: 0, y: 0,type: PieceType.ROOK, side:TeamType.PLAYER});
initalBoardState.push({Image: "Chesspieces/rook_w.png", x: 7, y: 0,type: PieceType.ROOK, side:TeamType.PLAYER});
initalBoardState.push({Image: "Chesspieces/knight_b.png", x: 1, y: 7,type: PieceType.KNIGHT, side:TeamType.OPPONENT});
initalBoardState.push({Image: "Chesspieces/knight_b.png", x: 6, y: 7, type: PieceType.KNIGHT, side:TeamType.OPPONENT});
initalBoardState.push({Image: "Chesspieces/knight_w.png", x: 1, y: 0, type: PieceType.KNIGHT, side:TeamType.PLAYER});
initalBoardState.push({Image: "Chesspieces/knight_w.png", x: 6, y: 0, type: PieceType.KNIGHT, side:TeamType.PLAYER});
initalBoardState.push({Image: "Chesspieces/bishop_b.png", x: 2, y: 7, type: PieceType.BISHOP, side:TeamType.OPPONENT});
initalBoardState.push({Image: "Chesspieces/bishop_b.png", x: 5, y: 7, type: PieceType.BISHOP, side:TeamType.OPPONENT});
initalBoardState.push({Image: "Chesspieces/bishop_w.png", x: 2, y: 0,type: PieceType.BISHOP, side:TeamType.PLAYER});
initalBoardState.push({Image: "Chesspieces/bishop_w.png", x: 5, y: 0,type: PieceType.BISHOP, side:TeamType.PLAYER});
initalBoardState.push({Image: "Chesspieces/queen_b.png", x: 3, y: 7,type: PieceType.QUEEN, side:TeamType.OPPONENT});
initalBoardState.push({Image: "Chesspieces/king_b.png", x: 4, y: 7,type: PieceType.KING, side:TeamType.OPPONENT});
initalBoardState.push({Image: "Chesspieces/queen_w.png", x: 3, y: 0,type: PieceType.QUEEN, side:TeamType.PLAYER});
initalBoardState.push({Image: "Chesspieces/king_w.png", x: 4, y: 0,type: PieceType.KING, side:TeamType.PLAYER});

export default function Chessboard(){
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const[gridX, setgridX] = useState(0);
    const [gridY, setgridY] = useState(0);
    const [pieces, setPieces] = useState<Piece[]>(initalBoardState);
    const chessboardRef = useRef<HTMLDivElement>(null);
    let board = [];
    const Referee = new referee;
function grabPiece(e: React.MouseEvent){
    const element = e.target as HTMLElement;
    const chessboard =chessboardRef.current;

    if(element.classList.contains("chess-piece") && chessboard){
        const x = e.clientX - 50;
        const y = e.clientY - 50;
   
        setgridX(Math.floor((e.clientX-chessboard.offsetLeft)/100));
        setgridY(Math.abs(Math.ceil((e.clientY-chessboard.offsetTop - 800)/100)));
        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        setActivePiece(element);
    }
}
function movePiece(e: React.MouseEvent){
    const chessboard =chessboardRef.current;
    if(activePiece && chessboard){
    const element = e.target as HTMLElement;
    const minX = chessboard.offsetLeft - 25;
    const minY = chessboard.offsetTop - 25;
    const maxY = chessboard.offsetTop + chessboard.clientHeight -75;
    const maxX = chessboard.offsetLeft + chessboard.clientWidth -75;
    const x = e.clientX - 50;
    const y = e.clientY - 50;
    activePiece.style.position = "absolute";
    if (x < minX){
    activePiece.style.left = `${minX}px`;
    }
    else if (x > maxX){
        activePiece.style.left = `${maxX}px`;
    }
    else{
        activePiece.style.left = `${x}px`; 
    }
    if (y < minY){
        activePiece.style.top = `${minY}`;
    }
    else if (y >maxY){
        activePiece.style.top = `${maxY}`;
    }
    else{
    activePiece.style.top = `${y}px`;
}
    }
}
function dropPiece(e: React.MouseEvent){
    const chessboard = chessboardRef.current;
    if(activePiece && chessboard){
        const x = Math.floor((e.clientX-chessboard.offsetLeft)/100);
        const y = Math.abs(Math.ceil((e.clientY-chessboard.offsetTop - 800)/100));
        setPieces((value) => {
            const pieces = value.map((p) =>{
              if (p.x === gridX && p.y === gridY){
                const validMove = Referee.isValidMove(gridX,gridY,x,y,p.type,p.side,value);
                console.log(validMove);
                if(validMove){ 
                  p.x =x;
                  p.y = y;
                }else{
                    activePiece.style.position = "relative";
                    activePiece.style.removeProperty("top");
                    activePiece.style.removeProperty("left");
                }
              }
              return p;
            });
            return pieces;
        });
        setActivePiece(null);
    
}
}
    for (let j = vertArray.length-1;j >= 0; j--){
        for (let i = 0; i < horArray.length;i++){
        const number = i+j+2;
        let image = undefined;
        pieces.forEach(p=>{
            if( p.x === i && p.y === j){
                image = p.Image;
            }
        })
        board.push(<Tile key = {'${j}, ${i}'} image = {image}number = {number}/>);
    }
};
    return (
    <div onMouseUp = {e => dropPiece(e)} 
    onMouseMove = {e => movePiece(e)}
    onMouseDown = {e => grabPiece(e)} 
    id = "board"
    ref = {chessboardRef}>
    {board}</div>
    )
}