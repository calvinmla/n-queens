// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      //o: boolean, if there is a conflict or not
      //i: number, specific index of a piece
      //c: no constraints
      //e: if the board is empty
      //explanation: if the board is empty, return false. We will find the rowIndex, iterate through the row, if there is a conflict (1), return true, else return false

      //loop through inner array from given index (Board[index].length)
      //if element isn't 0 , then counter variable + 1,
      //outside the loop
      //if the counter is greater than 1 , then there is a conflict, return true

      //this.attributes[rowIndex]
      var counter = 0;
      for (var i = 0; i < this.attributes[rowIndex].length; i++) {
        var row = this.attributes[rowIndex];
        if (row[i] === 1) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      //get the board size 'n'
      var boardSize = this.get('n');
      //iterate through the board size
      for (var i = 0; i < boardSize; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      //call hasRowConflictAt(i)
      //if hasRowConflictAt(i), return true
      return false; // fixme
    },


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      // return false; // fixme
      // i - integer
      // o - boolean indciating if there is more than one "1" in a column
      // c - none
      // e - false if board is empty
      // test if a specific column on this board contains a conflict
      // if board is empty then there are no conflicts. count the number of "1s" in the given column integer. if there is a "1" add to our counter. if the counter is > 1 then there is a conflict at that column
      // create counter var
      var counter = 0;
      // iterate through the board object
      for (var key in this.attributes) {
        // create a var for the row at element
        var row = this.attributes[key];
        // if row at colIndex is = 1
        if (row[colIndex] === 1) {
          // increase counter
          counter++;
        }
      }
      // if counter is bigger than 1
      if (counter > 1) {
        // return true
        return true;
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      //get the board size 'n'
      var boardSize = this.get('n');
      //iterate through the board size
      for (var i = 0; i < boardSize; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      //call hasRowConflictAt(i)
      //if hasRowConflictAt(i), return true
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      // O - boolean indicating if there is a diagonal conflict
      // I - intger (column index)
      // C - none
      // E - if board is empty, no conflicts
      // we are given colIndex. the boolean is determined by going along a diagonal starting at given index and identifying if the currentIndex = 1
      //row[columnIndex + i]
      // create var to get board size
      var boardSize = this.get('n');
      // create counter var
      var counter = 0;
      // create colIndex var
      var colIndex = majorDiagonalColumnIndexAtFirstRow;
      // create rowIndex var = 0
      var rowIndex = 0;
      // iterate through the board, increment both rowIndex and colIndex by 1
      for (; rowIndex < boardSize && colIndex < boardSize; colIndex++, rowIndex++) {
        var row = this.get(rowIndex);
        if (row[colIndex] === 1) {
          counter++;
        }
      }
      // if rowIndex[colIndex] at row is = 1
      // add to counter if true
      // if counter is bigger than 1
      // return true
      if (counter > 1) {
        // return true
        return true;
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      var boardSize = this.get('n');
      //iterate through the board size
      for (var i = 1 - boardSize; i < boardSize; i++) {
        //i = - 3, -2, -1, 0, 1, 2, 3, 4
      // [1, 1, 1, 0],
      // [1, 1, 1, 1],
      // [0, 0, 0, 0],
      // [0, 0, 0, 0]
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      var boardSize = this.get('n');
      // create counter var
      var counter = 0;
      // create colIndex var
      var colIndex = minorDiagonalColumnIndexAtFirstRow;
      // create rowIndex var = 0
      var rowIndex = 0;
      // iterate through the board, increment both rowIndex and colIndex by 1
      for (; rowIndex < boardSize && colIndex >= 0; colIndex--, rowIndex++) {
        var row = this.get(rowIndex);
        if (row[colIndex] === 1) {
          counter++;
        }
      }
      // if rowIndex[colIndex] at row is = 1
      // add to counter if true
      // if counter is bigger than 1
      // return true
      if (counter > 1) {
        // return true
        return true;
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      var boardSize = this.get('n');
      //iterate through the board size
      for (var i = (boardSize * 2) - 1; i >= 0; i--) {
        //i = 7, 6, 5, 4, 3, 2, 1, 0
      // [1, 1, 1, 0],
      // [1, 1, 1, 1],
      // [0, 0, 0, 0],
      // [0, 0, 0, 0]
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());


// Time complexity

// hasRowConflictAt: O(n)
// hasAnyRowConflicts: O(n^2)
// hasColConflictAt: O(n)
// hasAnyRowConflicts: O(n^2)
// hasMajorDiagonalConflictAt: O(n)
// hasAnyMajorDiagonalConflicts: O(n^2)
// hasMinorDiagonalConflictAt: O(n)
// hasAnyMinorDiagonalConflicts: O(n^2)