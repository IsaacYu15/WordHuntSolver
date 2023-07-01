// import {readFileSync, promises as fsPromises} from 'fs';
const {promises: fsPromises} = require('fs');

const GRID_SIZE = 4;
const ALPHABET = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
]
const DIRECTION = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1]
  ];
const allWords = [];

const initGrid = (gridSize) => {

    const t_grid = [];

    for (let i = 0; i < gridSize; i ++) {

        const t_row = [];

        for (let j = 0; j < gridSize; j ++) {
            const randomKey = Math.floor (Math.random() * ALPHABET.length);
            t_row.push(ALPHABET[randomKey]);
        }

        t_grid.push(t_row);

    }

    return t_grid;
};

const printGrid = (grid) => {

    for (let i = 0; i < GRID_SIZE; i ++) {

        let rowString = "";

        for (let j = 0; j < GRID_SIZE; j ++) {
            rowString += grid[i][j] + " ";
        }

        console.log (rowString);
    }

};

const solveGrid = (grid) => {

    for (let i = 0; i < GRID_SIZE; i ++) {
        for (let j = 0; j < GRID_SIZE; j ++) {
            const discoveredPaths = [];
            discoveredPaths.push (i + " " + j);
            recursiveSearch (i, j, grid, discoveredPaths);
        }
    }



};

const recursiveSearch = (xPos, yPos, grid, discoveredPaths) => {

    
    for (let i = 0; i < DIRECTION.length; i ++) {        
        const t_discovered = [...discoveredPaths];

        const newX = xPos + DIRECTION[i][0];
        const newY = yPos + DIRECTION[i][1];

        if (! (newX > GRID_SIZE - 1 || newX < 0 || newY < 0 || newY > GRID_SIZE - 1) ) {

            const position = newX + " " + newY;

            if (!t_discovered.includes(position) && t_discovered.length < 3) {
                
                t_discovered.push (position);
                allWords.push [getWord];
                recursiveSearch(newX, newY, grid, t_discovered);

            }

        }
    }



};

const getWord = (path, grid) => {
    let word = "";

    for (let i = 0; i < path.length; i ++) {
        const pos = path[i].split(" ");
        word += grid[parseInt(pos[0])][parseInt(pos[1])];
    }
    return word;
};


async function checkIfContainsAsync(str) {

    filename = "./valid-wordle-words.txt";

    try {
      const contents = await fsPromises.readFile(filename, 'utf-8');
  
      const result = contents.includes(str);
      console.log(result);
  
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
}



const grid = initGrid(GRID_SIZE);
printGrid(grid);
console.log ("---------");
solveGrid(grid);


