import  {PieceType, TeamType, Piece} from "../chessboard/chessboard";
export default class Referee{
tileOccupied(x: number,y: number, boardState: Piece[]): boolean{
    const piece = boardState.find(p => p.x === x && p.y == y);
    if(piece){
        return true;
    }
    else{
        return false;
    }
}
isValidMove(px: number, py: number,x: number,y: number,type: PieceType, side: TeamType, boardState: Piece[]){
    console.log('prev');
    console.log(px);
    console.log(py);
    console.log('current');
    console.log(x);
    console.log(y);
    if(type === PieceType.PAWN){
        if(side === TeamType.PLAYER){
        if(py- y === -1 && px-x === 0){
            if(!this.tileOccupied(x,y,boardState)){
                return true;
            }
            
        }
        if(py-y ==-2 && py== 1){
            if(!this.tileOccupied(x,y,boardState) && !this.tileOccupied(x,y-1,boardState)){
                return true;
            }
            
        }
    }
    if (side === TeamType.OPPONENT){
        if(py === 6){
            if (py-y ==2 && px-x === 0){
                if(!this.tileOccupied(x,y,boardState)&&!this.tileOccupied(x,y+1,boardState)){
                    return true;
                }
            }
        }
        if(py-y ==1 && px-x ==0){
            if(!this.tileOccupied(x,y,boardState)){
                return true;
            }
        }
    }
    }
  else if (type == PieceType.KNIGHT){
    if(side === TeamType.PLAYER){
        if(py- y === -2 && (px-x === -1 || px-x === 1)){
            if(!this.tileOccupied(x,y,boardState)){
                return true;
            }
            
        }
        if(py- y === 2 && (px-x === -1 || px-x === 1)){
            if(!this.tileOccupied(x,y,boardState)){
                return true;
            }
            
        }
        if(px - x === -2 && (py-y === -1)){
            if(!this.tileOccupied(x,y,boardState)){
                return true;
            }
            
        }
        if(px - x === 2 && (py-y === -1)){
            if(!this.tileOccupied(x,y,boardState)){
                return true;
            }
            
        }
        if(px - x === 2 && (py-y === -1)){
            if(!this.tileOccupied(x,y,boardState)){
                return true;
            }
            
        }
    }
    if (side === TeamType.OPPONENT){
        if(py === 6){
            if (py-y ==2 && px-x === 0){
                if(!this.tileOccupied(x,y,boardState)&&!this.tileOccupied(x,y+1,boardState)){
                    return true;
                }
            }
        }
        if(py-y ==1 && px-x ==0){
            if(!this.tileOccupied(x,y,boardState)){
                return true;
            }
        }
    }
  }
    else{
        if(type == PieceType.KING ||type == PieceType.QUEEN || type == PieceType.BISHOP || type == PieceType.ROOK ){
            return true;
        }
        return false;
    }
}
}