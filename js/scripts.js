const winCombos = [["00","01","02"], ["10","11","12"], ["20","21","22"], ["00","01","20"], ["00","01","02"], ["00","01","02"], ["00","11","22"], ["02","11","20"]];
const x = "<img src='img/x.png'>";
const o = "<img src='img/o.png'>";

function Game() {
  this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];  // 1 for player1, 2 for player2
  this.currentPlayer = 1;             // player one always starts first
}

Game.prototype.updateBoard = function(id, player) {
  let row = parseInt(id.charAt(0));
  let col = parseInt(id.charAt(1));
  this.board[row][col] = player;
}

Game.prototype.done = function(player) {
  //loop through winning combos to check if player matches one
  for(let i=0; i<winCombos.length; ++i) {
    let row1 = parseInt(winCombos[i][0].charAt(0));
    let col1 = parseInt(winCombos[i][0].charAt(1));
    let row2 = parseInt(winCombos[i][1].charAt(0));
    let col2 = parseInt(winCombos[i][1].charAt(1));
    let row3 = parseInt(winCombos[i][2].charAt(0));
    let col3 = parseInt(winCombos[i][2].charAt(1));
    if(this.board[row1][col1] === player && this.board[row2][col2] === player && this.board[row3][col3] === player) {
      return true;
    }
  }
  return false;
}

$(function() {

  var game = new Game();

  $("td").click(function() {

    var id = $(this).attr("id");

    if ($("#"+id).children().length === 0 ) {  // if the table cell has no children
      //replace symbol in cell for current player
      if(game.currentPlayer === 1) {
        $("#"+id).html(x);
        game.updateBoard(id, 1);
        if(game.done(1) !== true) {
          game.currentPlayer = 2;
        } else {
          $("#turn").text("Player1 Wins!!!!!!!");
        }
      }
      else {
        $("#"+id).html(o);
        game.updateBoard(id, 2);
        if(game.done(2) !== true) {
          game.currentPlayer = 1;
        } else {
          $("#turn").text("Player2 Wins!!!!!!!");
        }
      }
    }

  });
});
