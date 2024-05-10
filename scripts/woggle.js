window.onload =  initPage;

var frequencyTable = new Array("a","a","a","a","a","a","a","a","b","c","c","c","d",
	"d","d","e","e","e","e","e","e","e","e","e","e","e","e","f","f","g","g","h","h","h","h",
	"h","h","i","i","i","i","i","i","i","i","j","k","l","l","l","l","m","m","n","n","n","n",
	"n","n","o","o","o","o","o","o","o","o","p","p","q","q","q","q","q","q","r","r","r","r",
	"r","r","s","s","s","s","s","s","s","s","t","t","t","u","u","v","v","w","y","y","z");

function initPage() {
	randomizerTiles();
}

var randomizerTiles = function(){
	var tiles = document.getElementById("letterbox").getElementsByTagName("a");
	for(var i=0; i< tiles.length; i++){
		var index = Math.floor(Math.random() * 100);
		var letter = frequencyTable[index];
		tiles[i].className = tiles[i].className + ' l' + letter;
		tiles[i].onclick = addLetter;
	}
}

var addLetter = function(){
	var tileClasses = this.className.split(" ");
	//console.log(tileClasses);
	var letterClass = tileClasses[2];
	//console.log(letterClass);
	var tileLetter = letterClass.substring(1,2);
	//alert(tileLetter);

	var currentWordDiv = document.getElementById("currentWord");
	if(currentWordDiv.childNodes.length === 0){
		var p = document.createElement("p");
		currentWordDiv.appendChild(p);
		var letterText = document.createTextNode(tileLetter);
		p.appendChild(letterText);

		var submitDiv = document.getElementById("submit");
		var a = submitDiv.firstChild;
		while(a.nodeName === "#text"){
			a = a.nextSibling;
		}
		a.onclick = submitWord;
	}
	else{
		var p = currentWordDiv.firstChild;
		var letterText = p.firstChild;
		letterText.nodeValue += tileLetter;
	}


	this.className += " disabled";
	this.onclick = "";
}

var submitWord = function(){
	var request = createRequest();
	if(request === null){
		alert("unable to create request");
		return;
	}
	var currentWordDiv = document.getElementById("currentWord");
	var userWord = currentWordDiv.firstChild.firstChild.nodeValue;
	var url = "lookup-word.php?word=" + escape(userWord);
	request.open("GET",url,false);
	request.send(null);

	//alert("your score is: " + request.responseText);

	if(request.responseText === -1){
		alert("you have entered an invalid word, try again");
	}
	else{
		var wordListDiv = document.getElementById("wordList");
		var p = document.createElement("p");
		var newWord = document.createTextNode(userWord);
		p.appendChild(newWord);
		wordListDiv.appendChild(p);


		var scoreDiv = document.getElementById("score");
		var scoreNode = scoreDiv.firstChild;
		var scoreText = scoreNode.nodeValue;
		var pieces = scoreText.split(" ");
		var currentScore = parseInt(pieces[1]);
		currentScore += parseInt(request.responseText);
		scoreNode.nodeValue = "Score: " + currentScore;	
	}

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
			tiles[i].onclick = addLetter;
		}

	}
}