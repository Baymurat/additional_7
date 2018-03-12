/**
 * Method solves sudoku via brute force algorithm.
 * 
 * @param  matrix sudoku puzzle.
 * @returns solved sudoku puzzle.
 */
module.exports = function solveSudoku(matrix) {
  // Clues are "fixed cells", remainig cells are "not fixed".
  // Variable holds indexes of not fixed cells. 
  var variableCells = new Array();

  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix.length; j++) {
        if (matrix[i][j] == 0) {
            addValue(matrix, i, j, 0, variableCells);
            variableCells.push(i);
            variableCells.push(j);
        }
    }
}

return matrix;
}

/**
 * Method adds to empty (not fixed) cells values, according to brute force algorithm.
 * 
 * @param  matrix sudoku puzzle
 * @param  row row of the value 
 * @param  column column of the value
 * @param  value digit from 1 to 9.
 * @param  variableCells kind of stack of indexes of not fixed cells
 */
function addValue(matrix, row, column, value, variableCells) {
    //Repeat while all cells will not get a valid values.
  while (true) {
      for (var i = value + 1; i <= 9; i++) {
          if (isSingleInBox(matrix, row, column, i) && isSingleInVerticalAndHorizontal(matrix, row, column, i)) {
              matrix[row][column] = i;
              return;
          }
      }

      //If a cell is discovered where none of the 9 digits is allowed, 
      //then the algorithm leaves that cell blank and moves back to the previous cell
      value = 0;
      matrix[row][column] = 0;

      //For backtracking process at first we retrieve idexes of previous not fixed cells
      var tempColumn = variableCells.pop();
      var tempRow = variableCells.pop();

      //And increment the value until it's not valid
      addValue(matrix, tempRow, tempColumn, matrix[tempRow][tempColumn], variableCells);

      //After succesfull increment we psuh back indexes of preivous cells to the stack
      variableCells.push(tempRow);
      variableCells.push(tempColumn);
  }
}

/**
 * Method checks if specified <i>value</i> is single in horizontal and vertical way.
 * 
 * @param  matrix sudoku puzzle
 * @param  row row of the value
 * @param  column column of the value
 * @param  value digit from 1 to 9, that should be a single one in each sudoku puzzle's row and column.
 * @returns true if <i>value</i> sinle.
 */
function isSingleInVerticalAndHorizontal(matrix, row, column, value) {
  for (var i = 0; i < matrix.length; i++) {
      if (i == column) {
          //just do nothing
          //Guess it's not good write empty body of "if" statement.
          //But it's still good than "continue".
      } else {
          if (matrix[row][i] == value) return false;
      }

      if (i == row) {
          //just do nothing
      } else {
          if (matrix[i][column] == value) return false;
      }
  }

  return true;
}

/**
 * Sudoku contains from 9 boxes. Method checks if specified <i>value</i> is single in the box to which it belongs.
 * 
 * @param  matrix sudoku puzzle
 * @param  row row of the value
 * @param  column column of the value
 * @param  value digit from 1 to 9, that should be a single one in each sudoku puzzle's box.
 * @returns true if <i>value</i> is single in the box.
 */
function isSingleInBox(matrix, row, column, value) {
  var rowStart = determineBeginingOfBox(row)
  var columnStart = determineBeginingOfBox(column);

  for (var i = rowStart; i < rowStart + 3; i++) {
      for (var j = columnStart; j < columnStart + 3; j++) {
          if (i == row && j == column) continue;
          if (matrix[i][j] == value) return false;
      }
  }

  return true;
}

/**
 * Sudoku contains from 9 boxes. Based on index, method determines to wich box it belongs and 
 * returns begining (left top corner) that box.
 * 
 * @param  number is a row or column.
 * @returns  begining of the box.
 */
function determineBeginingOfBox(number) {
  if (number <= 2) {
    return 0;
}

if (number <= 5) {
    return 3;
}

return 6;
}