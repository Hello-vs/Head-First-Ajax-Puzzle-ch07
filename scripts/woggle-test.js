window.onload = initPage;

function initPage(){

	generateAnchorIDs();
	lettersLookupTable = generateRandomLetterstoTiles();
	addEventHandlers();
}	

let addEventHandlers = function(){

	let tiles = getTiles();
	for (var i = 0; i < tiles.length; i++){
		tiles[i].onclick = tileClick;
	}
}

let tileClick = function(){
	
	addLetterToCurrentWord(this);
}

let addLetterToCurrentWord = function(selectedTile){
	let currentWord = document.getElementById("currentWord");
	let key = selectedTile.className;
	let letter = lettersLookupTable[key];
	if (currentWord.childNodes.length == 0){
		let pTag = document.createElement("p");
		currentWord.appendChild(pTag);
		let tNode = document.createTextNode(letter);
		pTag.appendChild(tNode);

		var submitDiv = document.getElementById("submit");
		var a = submitDiv.firstChild;
		while(a.nodeName === "#text"){
			a = a.nextSibling;
		}
		a.onclick = submitWord;
	} else {
		let p = currentWord.firstElementChild;
		let letterText = p.firstChild;
		letterText.nodeValue += letter;
	}

	selectedTile.className += " disabled";
}

var submitWord = function(){

	var currentWordDiv = document.getElementById("currentWord");
	var userWord = currentWordDiv.firstChild.firstChild.nodeValue;

	var wordListDiv = document.getElementById("wordList");
	var p = document.createElement("p");
	var newWord = document.createTextNode(userWord);
	p.appendChild(newWord);
	wordListDiv.appendChild(p);

	var currentWordP = currentWordDiv.firstChild;
	currentWordDiv.removeChild(currentWordP);
	enableAllTiles();
	var submitDiv = document.getElementById("submit");
	var a = submitDiv.firstChild;
	while(a.nodeName === "#text"){
		a = a.nextSibling;
	}

	a.onclick = function(){
		alert("Please click tiles to add letters and create a word");
	};
}


var enableAllTiles = function(){
	tiles = document.getElementById("letterbox").getElementsByTagName("a");
	for(var i=0; i<tiles.length; i++){
		var tileClasses = tiles[i].className.split(" ");
		if(tileClasses.length === 4){
			var newClass = tileClasses[0] + " " + tileClasses[1] + " " + tileClasses[2];
			tiles[i].className = newClass;
			tiles[i].onclick = tileClick;
		}
	}
}

let generateRandomLetterstoTiles  = function(){
	
	let lettersLookup = {};
	let tiles = getTiles();
	for (var i = 0; i < tiles.length; i++){
		let tile = tiles[i].id;
		let letter = getLetterFromFrequencyTable();
		tiles[i].className += ' l' + letter;
		lettersLookup[tiles[i].className] = letter;
	}
	return lettersLookup;
}

function getLetterFromFrequencyTable()
{
	let frequencyTable = createFrequencyTable();
	let ltrIdx = Math.floor(Math.random() * 100);
	let letter = frequencyTable[ltrIdx];
	return letter;
}

let FreqAssignment = function(){
	
	let dict = {
		a: 8,
		b: 1,
		c: 3,
		d: 3,
		e: 12,
		f: 2,
		g: 2,
		h: 6,
		i: 7,
		j: 1,
		k: 1,
		l: 4,
		m: 2,
		n: 6,
		o: 8,
		p: 2,
		q: 6,
		r: 6,
		s: 8,
		t: 3,
		u: 2,
		v: 2,
		w: 1,
		x: 1,
		y: 2, 
		z: 1
	};

	return dict;
}


let createFrequencyTable = function(){
	
	let dict = FreqAssignment();
	let size = 0;
	for (key in dict){
		size += dict[key]
	}
	let frequencyTable = new Array(size);
	let from = 0;
	let until = 100;
	frequencyTable.fill("0", from, until);
	for (key in dict){
		until = dict[key];
		frequencyTable.fill(key, from, from + until);
		from += until; 
	}
	//console.log(frequencyTable);
	return frequencyTable;
}

let generateAnchorIDs = function(){

	let tiles = getTiles();
	let rowColumnSize = Math.sqrt(tiles.length);
	let k = 0;
	let attArray = new Array(tiles.length);
	for (var i = 1; i <= rowColumnSize; i++){
		for (var j = 1; j <= rowColumnSize; j++){
			attArray[k]  = "T" + i.toString() + j.toString();
			k++;
		}
	}

	for (var i = 0; i < tiles.length; i++){
		tiles[i].setAttribute("id", attArray[i]);
	}
}

let getTiles = function(){

	let letterBox = document.getElementById("letterbox");
	let tiles = document.getElementsByTagName("a");
	return tiles;
}



