var canvas = '';
var context = '';

var grid = '';

var tileSize = 10;
var leftOffset = 0;
var topOffset = 0;

var rowCount = 0;
var columnCount = 0;

function start(){
	canvas = document.getElementById('canvas') ;
	context = canvas.getContext("2d");
	
	canvas.addEventListener("click", canvasClick, false);
	
	rowCount = canvas.height / tileSize;
	columnCount = canvas.width / tileSize;
	
	createInitialArray();
		
	//drawGrid();
	window.setInterval(nextGeneration, 100);
}

function drawGrid(){
	
	for (var i=1; i<= columnCount;i++){
        context.moveTo(leftOffset + (i * tileSize) + 0.5, topOffset);
        context.lineTo(leftOffset + (i * tileSize) + 0.5, canvas.height - topOffset);
    }
    
    for (var i=1; i<= rowCount;i++){
        context.moveTo(leftOffset + 0.5, (i * tileSize) + topOffset + 0.5);
        context.lineTo(canvas.width - leftOffset + 0.5, (i * tileSize) + topOffset + 0.5);
    }
	
	context.stroke();
}

function canvasClick(e){
	var x = e.pageX - canvas.offsetLeft;
	var y = e.pageY - canvas.offsetTop;
	
	if ((x < canvas.width - leftOffset) && (x > leftOffset) && (y > topOffset) && (y < canvas.height - topOffset)){
		var gridx = Math.floor((x - leftOffset)/ tileSize);
		var gridy = Math.floor((y - topOffset)/ tileSize);
		
		grid[gridx][gridy] = !grid[gridx][gridy]

		paintGrid();
	}
	console.log(x + ',' + y)	
}

function createInitialArray(){
	grid = new Array();
	for (var j=0;j < columnCount;j++){
		var column = new Array();
		for (var i=0;i < rowCount;i++){
			column[i] = false
		}
		grid[j] = column
	}
	
}

function paintGrid(){
	canvas.width = canvas.width;
	//drawGrid();
	for (var i=0;i < columnCount;i++){
		for (var j=0;j < rowCount;j++){
			if (grid[i][j]){
				context.fillRect(leftOffset + (i * tileSize), topOffset + (j * tileSize), tileSize, tileSize);
			}
			
		}
	}
	
	context.stroke();
}


function nextGeneration(){
	var newGrid = new Array();
	var rule = new Rule();

	for (var columnIndex=0; columnIndex < columnCount; columnIndex++){
		var newColumn = new Array();
		for (var rowIndex=0; rowIndex < rowCount; rowIndex++){
			var tile = new Tile(columnIndex, rowIndex);

			var neighborCount = countNeighbors(tile);

			if (grid[columnIndex][rowIndex] && (neighborCount < 2)){
				newColumn[rowIndex] = false
			} else if (grid[columnIndex][rowIndex] && (neighborCount == 2 || neighborCount == 3)) {
				newColumn[rowIndex] = true
			} else if (grid[columnIndex][rowIndex] &&(neighborCount > 3)){
				newColumn[rowIndex] = false
			} else if (!grid[columnIndex][rowIndex] && (neighborCount == 3)){
				newColumn[rowIndex] = true
			} else {
				newColumn[rowIndex] = grid[columnIndex][rowIndex]
			}

			newGrid[columnIndex] = newColumn;
		}
	}
	grid = newGrid;

	paintGrid();
}

function Rule(){
	this.pattern = [false, true, false, false, false, false, true, false];
}


function Tile(x, y){
	this.x = x;
	this.y = y;
}

function tileMatchesRule(tile, rule){
	var tileNeighborhood = getNeighborhood(tile);

	for (var i=0; i < rule.pattern.length; i ++){
		if (rule.pattern[i] != tileNeighborhood[i]){
			return false;
		}
	}

	return true;
}

function getNeighborhood(tile){
	if (tile.x == 0 || tile.x >= columnCount - 1 || tile.y == 0 || tile.y >= rowCount - 1){
		return [];
	} else {
		var neighborhood = new Array();
		neighborhood.push(grid[tile.x - 1][tile.y - 1]);
		neighborhood.push(grid[tile.x    ][tile.y - 1]);
		neighborhood.push(grid[tile.x + 1][tile.y - 1]);
		neighborhood.push(grid[tile.x - 1][tile.y    ]);
		neighborhood.push(grid[tile.x + 1][tile.y    ]);
		neighborhood.push(grid[tile.x - 1][tile.y + 1]);
		neighborhood.push(grid[tile.x    ][tile.y + 1]);
		neighborhood.push(grid[tile.x + 1][tile.y + 1]);
		return neighborhood;
	}
}

function randomGrid(){
	grid = new Array();
	for (var j=0;j < columnCount;j++){
		var column = new Array();
		for (var i=0;i < rowCount;i++){
			column[i] = Math.random() > 0.5
		}
		grid[j] = column
	}

	paintGrid();

}

function countNeighbors(tile){
	var aliveNeighbors = 0;
	var neighborhood = getNeighborhood(tile);
	for (var i=0; i < neighborhood.length; i++){
		if (neighborhood[i]){
			aliveNeighbors++;
		}
	}

	return aliveNeighbors;

}



