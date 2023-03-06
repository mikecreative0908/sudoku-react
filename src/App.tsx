import React, { useState } from "react";
import "./App.css";

function App() {
  const [grid, setGrid] = useState<string[]>([
    "",
    "",
    "",
    "2",
    "6",
    "",
    "7",
    "",
    "1",
    "6",
    "8",
    "",
    "",
    "7",
    "",
    "",
    "9",
    "",
    "1",
    "9",
    "",
    "",
    "",
    "4",
    "5",
    "",
    "",
    "8",
    "2",
    "",
    "1",
    "",
    "",
    "",
    "4",
    "",
    "",
    "",
    "4",
    "6",
    "",
    "2",
    "9",
    "",
    "",
    "",
    "5",
    "",
    "",
    "",
    "3",
    "",
    "2",
    "8",
    "",
    "",
    "9",
    "3",
    "",
    "",
    "",
    "7",
    "4",
    "",
    "4",
    "",
    "",
    "5",
    "",
    "",
    "3",
    "6",
    "7",
    "",
    "3",
    "",
    "1",
    "8",
    "",
    "",
    "",
  ]);

  const [solved, setSolved] = useState<boolean>(false);

  function updateGrid(vert: number, horiz: number, value: string) {
    let newGrid = [...grid];
    if (value === "") newGrid[vert * 9 + horiz] = value;
    else newGrid[vert * 9 + horiz] = value;

    setGrid(newGrid);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement>,
    row: number,
    col: number
  ): void {
    e.preventDefault();
    console.log(e.target.value);
    const vert = row;
    const horiz = col;

    let validChar = /^$|[1-9]/;
    if (validChar.test(e.target.value)) {
      updateGrid(vert, horiz, e.target.value);
    }
  }

  function clickHandler(e: React.MouseEvent<HTMLTextAreaElement>): void {
    e.currentTarget.select();
  }

  function checkGrid() {
    setSolved(checkRows() && checkColumns() && checkSquares());
  }

  function checkRows() {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      let row = get_row(rowIndex);
      if (!containsOneToNine(row)) {
        return false;
      }
    }
    return true;
  }

  function checkColumns() {
    for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
      let column = get_col(columnIndex);
      if (!containsOneToNine(column)) {
        return false;
      }
    }
    return true;
  }

  function checkSquares() {
    for (let squareIndex = 0; squareIndex < 9; squareIndex++) {
      let square = get_square(squareIndex);
      if (!containsOneToNine(square)) {
        return false;
      }
    }
    return true;
  }

  function get_row(rowIndex: number) {
    return grid.slice(rowIndex * 9, rowIndex * 9 + 9);
  }

  function get_col(columnIndex: number) {
    let column = [];
    for (let index = columnIndex; index < 81; index += 9) {
      column.push(grid[index]);
    }
    return column;
  }

  function get_square(squareIndex: number) {
    const square = [];
    for (let row = 0; row < 3; row++) {
      let start =
        Math.floor(squareIndex / 3) * 27 + (squareIndex % 3) * 3 + row * 9;
      square.push(...grid.slice(start, start + 3));
    }
    return square;
  }

  function containsOneToNine(numbers: string[]) {
    for (let i = 1; i <= 9; i++) {
      if (!numbers.includes(i.toString())) {
        return false;
      }
    }
    return true;
  }

  return (
    <div className="App">
      <div className="sudokuBoxContainer">
        {solved && <h3 className="notice">Completed</h3>}
        <div className="sudokuBox">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
            <div className="row" key={`row-${row}`}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col) => (
                <textarea
                  className="box"
                  maxLength={1}
                  onClick={clickHandler}
                  key={`col-${col}`}
                  value={grid[row * 9 + col]}
                  onChange={(e) => handleChange(e, row, col)}
                  style={{ color: solved ? "Green" : "" }}
                ></textarea>
              ))}
            </div>
          ))}
        </div>
      </div>

      <button onClick={checkGrid}>Check Solution</button>
    </div>
  );
}

export default App;
