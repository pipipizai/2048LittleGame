var board = new Array();
var score = 0;
var hasConflited = new Array();

$(document).ready(function () {
    newGame();
});

function newGame() {
    //initialize grid
    init();

    //gernerate number randomly
    generateOneNumber();
    generateOneNumber();

  //  alert("newGame");
}

function init() {
    for(var i=0 ; i<4 ; i++) {
        for (var j=0; j<4; j++) {

            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));

        }
    }

    for(var i=0 ; i<4 ; i++) {

        board[i]=new Array();
        hasConflited[i] = new Array();

        for (var j=0; j<4; j++) {

            board[i][j]=0;
            hasConflited[i][j] = false;
        }
    }

    updateBoardView();

    score = 0;
}

function updateBoardView() {

    $(".number-cell").remove()

    for(var i=0 ; i<4 ; i++) {
        for (var j=0; j<4; j++) {

            $("#grid-container").append('<div class="number-cell"  id="number-cell-'+ i +'-'+j+'"></div>');

            var theNumberCell = $('#number-cell-'+ i +'-'+ j );

            if(board[i][j] === 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j) + 50);
                theNumberCell.css('left',getPosLeft(i,j) + 50);
            }
            else {
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }

            hasConflited[i][j] = false;
        }
    }
}

function generateOneNumber() {

    if(nospace(board))
        return false;

    //position randomly
    var randx = parseInt(Math.floor (Math.random() * 4));
    var randy = parseInt(Math.floor ( Math.random() * 4 ));

    while(true){

        if( board[randx][randy] == 0 )
            break;

        randx = parseInt(Math.floor ( Math.random() * 4 ));
        randy = parseInt(Math.floor ( Math.random() * 4 ));
    }

    //position number
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //display number
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);

    return true;
}

$(document).keydown(function (event){


   // alert("down");

    switch (event.which) {
        case 37: //left
          //  alert("zuo");
            if( moveLeft() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 38: //up
            if( moveUp() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 39: //right
            if( moveRight() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 40: //down
            if( moveDown() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        default:
            break;
    }
});

function isGameOver() {

    if(nospace(board) && noMove(board)){
        gameOver();
    }
}

function gameOver() {
    alert("Game  Over!")
}

function moveLeft() {

    if(!canMoveLeft(board))
        return false;

    //move left
    for(var i=0; i<4 ; i++)
        for(var j=1 ; j<4 ; j++){
            if( board[i][j] !== 0 ){

                for( var k = 0 ; k<j ; k++){
                    if( board[i][k] === 0 && noBlockHorizontal(i,k,j,board)){

                        //move
                        showMoveAnimation(i,j,i,k);
                       // alert("ik=ij");
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] === board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflited[i][k] ){

                        //move
                        showMoveAnimation(i,j,i,k);

                        //add
                    //    alert("ik++++ij");
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[i][k];
                        updateScore(score);

                        hasConflited[i][k] = true;
                        continue;

                    }
                }
            }
        }

   // updateBoardView();
    setTimeout("updateBoardView()",200);

    return true;
}

function moveUp() {

    if(!canMoveUp(board))
        return false;

    //move up
    for(var j=0; j<4 ; j++)
        for(var i=1 ; i<4 ; i++){
            if( board[i][j] !== 0 ){

                for( var k = 0 ; k<i ; k++){
                    if( board[k][j] === 0 && noBlockVerticalUp(j,k,i,board)){

                        //move
                        showMoveAnimation(i,j,k,j);
                        // alert("ik=ij");
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] === board[i][j] && noBlockVerticalUp(j,k,i,board) && !hasConflited[k][j] ){

                        //move
                        showMoveAnimation(i,j,k,j);

                        //add
                        //    alert("ik++++ij");
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score +=  board[k][j];
                        updateScore(score);

                        hasConflited[k][j] = true;

                        continue;

                    }
                }
            }
        }

    // updateBoardView();
    setTimeout("updateBoardView()",200);

    return true;
}

function moveRight() {

    if(!canMoveRight(board))
        return false;

    //move right
    for(var i=3; i>=0 ; i--)
        for(var j=2 ; j>=0 ; j--){
            if( board[i][j] !== 0 ){

                for( var k = 3 ; k>j ; k--){
                    if( board[i][k] === 0 && noBlockHorizontalRgiht(i,k,j,board)){

                        //move
                        showMoveAnimation(i,j,i,k);
                        // alert("ik=ij");
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] === board[i][j] && noBlockHorizontalRgiht(i,k,j,board) && !hasConflited[i][k] ){

                        //move
                        showMoveAnimation(i,j,i,k);

                        //add
                        //    alert("ik++++ij");
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[i][k];
                        updateScore(score);

                        hasConflited[i][k] = true;

                        continue;

                    }
                }
            }
        }

    // updateBoardView();
    setTimeout("updateBoardView()",200);

    return true;
}

function moveDown() {

    if(!canMoveDown(board))
        return false;

    //move up
    for(var j=3; j>=0 ; j--)
        for(var i=2 ; i>=0 ; i--){
            if( board[i][j] !== 0 ){

                for( var k = 3 ; k>i ; k--){
                    if( board[k][j] === 0 && noBlockVerticalDown(j,k,i,board)){

                        //move
                        showMoveAnimation(i,j,k,j);
                        // alert("ik=ij");
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] === board[i][j] && noBlockVerticalDown(j,k,i,board) && !hasConflited[k][j] ){

                        //move
                        showMoveAnimation(i,j,k,j);

                        //add
                        //    alert("ik++++ij");
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score +=  board[k][j];
                        updateScore(score);

                        hasConflited[k][j] = true;

                        continue;

                    }
                }
            }
        }

    // updateBoardView();
    setTimeout("updateBoardView()",200);

    return true;
}