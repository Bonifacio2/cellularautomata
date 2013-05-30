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
		
	drawGrid();
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
	drawGrid();
	for (var i=0;i < columnCount;i++){
		for (var j=0;j < rowCount;j++){
			if (grid[i][j]){
				context.fillRect(leftOffset + (i * tileSize), topOffset + (j * tileSize), tileSize, tileSize);
			}
			
		}
	}
	
	context.stroke();
}








