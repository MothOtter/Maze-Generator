let cols, rows;
let w = 25;
let grid = [];
let current;
let stack = [];

function setup() {
    createCanvas(400, 400);
    cols = floor(width / w);
    rows = floor(height / w);

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let cell = new Cell(i, j);
            grid.push(cell);
        }
    }

    current = grid[0];
}

function draw() {
    background(0, 75, 0);

    for (let i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    current.visited = true;
    current.highlight();

    // STEP 1
    let next = current.checkNeighbors();
    if (next) {
        next.visited = true;

        // STEP 2
        stack.push(current);

        // STEP 3
        removeWalls(current, next);

        // STEP 4
        current = next;
    } else if (stack.length > 0) {
        current.oldRect();
        current = stack.pop();
    }

}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;
}
