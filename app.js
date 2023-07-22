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
        //console.log(name);
        const inputValue = document.getElementById(name).value.toLowerCase();

        //catch all non letter values
        if (inputValue.toLowerCase() != inputValue.toUpperCase()) {
            t_row.push (inputValue);
        } else {
            alert("INVALID GRID!");
            clearGrid();
            break;
        }


        if (i % GRID_SIZE == 0) {
            t_grid.push (t_row);
            t_row = [];
        }

        const respectiveInputField = document.getElementById(name);
        respectiveInputField.style.border = "none";

    }

    //printGrid(t_grid);
    solveGrid(t_grid);
}

function clearGrid(){

    for (let i = 1; i <= GRID_SIZE*GRID_SIZE; i ++) {

        const name = ("input" + (i-1)).toString();

        const respectiveInputField = document.getElementById(name);
        respectiveInputField.value = "";
        respectiveInputField.placeholder = "____";
        respectiveInputField.style.border = "none";

    }

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
            recursiveSearch (i, j, grid, discoveredPaths, DICTIONARY);
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

const recursiveSearch = (xPos, yPos, grid, discoveredPaths, t_dic) => {

    //search in every single possible direction that will not cause repeated path
    for (let i = 0; i < DIRECTION.length; i ++) {        
        const t_discovered = [...discoveredPaths];

        const newX = xPos + DIRECTION[i][0];
        const newY = yPos + DIRECTION[i][1];

        if (! (newX > GRID_SIZE - 1 || newX < 0 || newY < 0 || newY > GRID_SIZE - 1) ) {

            const position = newX + " " + newY;

            if (!t_discovered.includes(position) ) { 
                
                t_discovered.push (position);

                const word = getInfo(t_discovered, grid);

                //only keep searching if the path we are on is 
                const filt_t_dic = [];

                for (let j = 0; j < t_dic.length; j ++) {
                    
                    if (t_dic[j].substring(0, t_discovered.length) == word) {
                        filt_t_dic.push(t_dic[j]);
                    }

                    if(t_dic[j] == word &! ALLWORDS.includes(word)) {
                        let info = [];
                        info.push(word);
                        info.push(t_discovered);
                        ALLWORDS.push (info);
                    }
                }

                //add to all words found
                if (t_dic.length > 0) {
                    recursiveSearch(newX, newY, grid, t_discovered, filt_t_dic);
                }



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

    for (let i = 3; i < 8; i ++) {

        const element = document.getElementById("title" + i);

        while (element.childNodes.length > 1) {

            element.removeChild(element.lastChild);

        }
    }


    for (let [index, words] of list.entries() ) {
        
        if (words.length > 2) {

            const para = document.createElement("button");
            const node = document.createTextNode(words.toString());
      
            para.onclick = function(){showPath(path[index])};  

            para.appendChild(node);

            var wordLength = words.length;

            if (wordLength > 7 ) {
                wordLength = 7;
            }

            const element = document.getElementById("title" + wordLength);

            element.appendChild(para);
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

          
    window.scrollTo(0,0);

}

async function fileToArr() {

    const response = await fetch('./valid-wordle-words.txt');
    var data = await response.text();

    DICTIONARY = data.split("\n"); //split automatically turns it into an array!
}

fileToArr();


