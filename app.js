const GRID_SIZE = 4;

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

let ALLWORDS = [];

let DICTIONARY;

function initGrid(){

    let t_grid = [];
    let t_row = [];

    for (let i = 1; i <= GRID_SIZE*GRID_SIZE; i ++) {

        const name = ("input" + (i-1)).toString();
        t_row.push (document.getElementById(name).value.toLowerCase());

        if (i % GRID_SIZE == 0) {
            t_grid.push (t_row);
            t_row = [];
        }

    }

    //printGrid(t_grid);
    solveGrid(t_grid);
}

function printGrid (grid) {
    for (let i = 0; i < GRID_SIZE; i ++) {

        let rowString = "";

        for (let j = 0; j < GRID_SIZE; j ++) {
            rowString += grid[i][j] + " ";
        }

        console.log (rowString);
    }
}

const solveGrid = (grid) => {

    ALLWORDS = [];

    for (let i = 0; i < GRID_SIZE; i ++) {
        for (let j = 0; j < GRID_SIZE; j ++) {
            const discoveredPaths = [];
            discoveredPaths.push (i + " " + j);
            recursiveSearch (i, j, grid, discoveredPaths);
        }
    }

    const t_list = [];
    const t_paths = [];

    for (const items of ALLWORDS) {

        if (!t_list.includes(items[0])) {
            t_list.push(items[0]);
            t_paths.push(items[1]);
        }

    }

    verifyList (t_list, t_paths);

};

const recursiveSearch = (xPos, yPos, grid, discoveredPaths) => {

    //search in every single possible direction that will not cause repeated path
    for (let i = 0; i < DIRECTION.length; i ++) {        
        const t_discovered = [...discoveredPaths];

        const newX = xPos + DIRECTION[i][0];
        const newY = yPos + DIRECTION[i][1];

        if (! (newX > GRID_SIZE - 1 || newX < 0 || newY < 0 || newY > GRID_SIZE - 1) ) {

            const position = newX + " " + newY;

            if (!t_discovered.includes(position) && t_discovered.length < 6) { //a temporary limiter so it doesn't search too much
                
                t_discovered.push (position);

                const word = getInfo(t_discovered, grid);

                if (!ALLWORDS.includes (word)) {
                    let info = [];
                    info.push(word);
                    info.push(t_discovered);
                    ALLWORDS.push (info);
                }

                recursiveSearch(newX, newY, grid, t_discovered);

            }

        }
    }



};

const getInfo = (path, grid) => {

    let word = "";

    for (let i = 0; i < path.length; i ++) {
        const pos = path[i].split(" ");
        const x = parseInt(pos[0]);
        const y = parseInt(pos[1]);

        word += grid[x][y];
    }

    return word;
};

const verifyList = (list, path) => {

    const element = document.getElementById("wordsPossible");

    //clear all previously add children
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }

    for (let [index, words] of list.entries() ) {
        
        if (words.length > 2) {

            if (DICTIONARY.includes(words)) {
                const para = document.createElement("button");
                const node = document.createTextNode(words.toString());
      
                para.onclick = function(){showPath(path[index])};  

                para.appendChild(node);
                element.appendChild(para);
            } 

        }

    }

}

const showPath =(element)=> {

    //reset all borders
    for (let i = 0; i < GRID_SIZE*GRID_SIZE; i++) {
        const name = ("input" + (i)).toString();
        const respectiveInputField = document.getElementById(name);
        respectiveInputField.style.border = "none";
    }

    for (let i = 0; i < element.length; i ++) {


        const pos = element[i].split(" ");
        const x = parseInt(pos[0]);
        const y = parseInt(pos[1]);

        
        const name = "input"+(4*x +y).toString();
        const respectiveInputField = document.getElementById(name);

        console.log(name);
        console.log(respectiveInputField);

        respectiveInputField.style.border = "thick solid rgb(255, 0, 0)";
        
    }

}

async function fileToArr() {

    const response = await fetch('./valid-wordle-words.txt');
    var data = await response.text();

    DICTIONARY = data.split("\n"); //split automatically turns it into an array!
}

fileToArr();


