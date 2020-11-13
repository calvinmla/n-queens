/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function (n) {
  //o: return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
  //i: an integer ranging from 1 - 8
  //e: non number, 0, or greated than 8

  //calling this function will create a chess board that is n big and position n rooks on the board where they are not attacking each other

  //our input a number "n" which is equal to our row count, col count, and rook count. the function would create a martix where we would iterate through the board and make sure there are no conflicts with the placements of our n rooks by calling the any row and column conflicts helper functions after each placement
  //array of arrays = [];
  //do a loop to tooggle pieces in row
  var newBoard = new Board({ 'n': n }); //fixme


  // [0, 0, 0, 0], but now we want to find nRooks Solution
  // [0, 0, 0, 0], to do that, we need to toggle a piece in every Row
  // [0, 0, 0, 0], beginning at firstRow, and firstIndex
  // [0, 0, 0, 0]  firstRow + 1 and firstIndex + 1

  // [1, 0, 0, 0], but now we want to find nRooks Solution
  // [0, 1, 0, 0], to do that, we need to toggle a piece in every Row
  // [0, 0, 1, 0], beginning at firstRow, and firstIndex
  // [0, 0, 0, 1]
  //start a loop for (var i = 0; i < n; i ++) to track rows
  var toggleFunction = function (startRow) {
    var startRow = startRow || 0;
    if (n === startRow) {
      return newBoard.rows();
    } else {
      for (var i = 0; i < n; i++) {
        newBoard.togglePiece(startRow, i);
        if (!newBoard.hasAnyRooksConflicts()) {
          return toggleFunction(startRow + 1);
        }
        // if there is a conflict, toggle new piece
        newBoard.togglePiece(startRow, i);
      }

    }
  };

  var solution = toggleFunction();


  //findNRooksSolution(n = 6, startRow = 0)
  //toggle Piece on board
  //couldnt increment startRow in accordance with index
  //this.togglePiece(startRow, Index (i));
  //check if (!this.hasAnyRooksConflicts())
  //run findNRooksSolution(boardSize, startRow + 1) to toggle more pieces

  //}
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0; //fixme
  var newBoard = new Board({ 'n': n });

  var toggleFunction = function (startRow) {
    var startRow = startRow || 0;
    if (n === startRow) {
      solutionCount++;
    } else {
      for (var i = 0; i < n; i++) {
        newBoard.togglePiece(startRow, i);
        if (!newBoard.hasAnyRooksConflicts()) {
          toggleFunction(startRow + 1);
        }
        // if there is a conflict, toggle new piece
        newBoard.togglePiece(startRow, i);
      }
    }
  };

  toggleFunction();

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  //o: a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
  //i: an integer, n, 0-9, designating the size of the board
  //e: 2, 3 don't have solutions
  //explanation: the input determines first, the size of our board, and how many queens we'll need to place. Because they're queens, we need to test for row, column, major and minor diagonal collisions. If there are no collisions, we can place our queen, but we need to make sure number of queens = n (size of board). The output is our newBoard, with n pieces toggled, with no collisions.


  var newBoard = new Board({ 'n': n }); //fixme

  var testCase = function (backTrackVar) {
    var startRow = backTrackVar;
    if (backTrackVar === n) {
      return true;
    }
    for (var i = 0; i < n; i++) {
      newBoard.togglePiece(startRow, i);
      backTrackVar++;
      if (!newBoard.hasAnyQueenConflictsOn(startRow, i)) {
        if (testCase(backTrackVar)) {
          return true;
        }

      }
      newBoard.togglePiece(startRow, i);
      backTrackVar--;
    }
  };

  testCase(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(newBoard.rows()));
  return newBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = 0; //fixme
  var newBoard = new Board({ 'n': n }); //fixme

  var testCase = function (backTrackVar) {
    var startRow = backTrackVar;
    if (backTrackVar === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      newBoard.togglePiece(startRow, i);
      backTrackVar++;
      if (!newBoard.hasAnyQueenConflictsOn(startRow, i)) {
        testCase(backTrackVar);

      }
      newBoard.togglePiece(startRow, i);
      backTrackVar--;
    }
  };

  testCase(0);


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
