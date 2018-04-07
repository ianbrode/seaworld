const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateEmptyGrid = (x, y) => [...Array(x)].map(e => Array(y).fill(0));

const randomLocation = grid => {
  const x = getRandomNum(0, grid.length - 1);
  const y = getRandomNum(0, grid[0].length - 1);    
  return [x, y];
};

const checkShipCell = (grid, start) => {
  const x = start[0];
  const y = start[1];
  const width = grid.length;
  const height = grid[0].length;

  const top = y - 1;
  const bottom = y + 1;
  const left = x - 1;
  const right = x + 1;

  const leftInbounds = left >= 0 
  const rightInBounds = right < width;
  const topInBounds = top >= 0;
  const bottomInBounds = bottom < height;

  if (x < 0 || x >= width || y < 0 || y >= height || grid[x][y] === 1) {
    return false;
  }

  ///

  if (leftInbounds && grid[left][y] === 1) {
    return false
  }

  if (rightInBounds && grid[right][y] === 1) {
   return false 
  }

  if (bottomInBounds && grid[x][bottom] === 1) {
    return false 
  }

  if (topInBounds && grid[x][top] === 1) {
    return false
  }

  ////

  if (leftInbounds && topInBounds && grid[left][top] === 1) {
    return false
  }

  if (rightInBounds && topInBounds && grid[right][top] === 1) {
    return false
  }

  if (leftInbounds && bottomInBounds && grid[left][bottom] === 1) {
    return false
  }

  if (rightInBounds && bottomInBounds && grid[right][bottom] === 1) {
    return false
  }

  ////

  return true;
}

const checkShipCoords = (grid, ship, start) => {
  const _start = [...start];

  return ship.some(e => {
    _start[0] = e[0] + _start[0];
    _start[1] = e[1] + _start[1];

    const result = checkShipCell(grid, _start);

    return !result;
  })
}

const placeShip = (grid, ship) => {
  const start = randomLocation(grid);

  if (checkShipCoords(grid, ship, start)) {
    placeShip(grid, ship)
  } else {
    ship.forEach(e => {
      const x = start[0] = e[0] + start[0];
      const y = start[1] = e[1] + start[1];

      grid[x][y] = 1;
    })
  }
};

const generateGrid = (x, y, ships) => {
  const grid = generateEmptyGrid(x, y);

  ships.forEach((e) => placeShip(grid, e));

  return grid;
}

export { generateGrid };