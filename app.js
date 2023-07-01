const GRID_SIZE = 4;
const ALPHABET = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
]

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


const grid = initGrid(GRID_SIZE);
printGrid(grid);