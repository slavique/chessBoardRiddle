document.addEventListener('DOMContentLoaded', function(){;
var chessBoard = [];
var filter2x0 = [];
var filter2x1 = [];
var filter2x2 = [];
var filter2x3 = [];
var filter2x4 = [];
var filter2x5 = [];
    var odd2x0 = [];
    var odd2x1 = [];
    var odd2x2 = [];
    var odd2x3 = [];
    var odd2x4 = [];
    var odd2x5 = [];
    var parityString, parityStringBackward, decCoinToFlip;
    var assessParity = document.getElementById('assess_parity');
	var flipButton = document.getElementById('flip_button');
	var autoCoinPlacement = document.getElementById('auto-creation');
	var manualCoinPlacement = document.getElementById('manual-creation'); 
	var wichToFlip = document.getElementById('wich_to_flip');
	var printData = document.getElementById('console');
	var board = document.getElementById('board');
	var hideButton = document.getElementById('hide-button');
	var calculations = document.querySelector('.calculations');
	
	hideButton.addEventListener('click', function() {
		calculations.setAttribute('style', 'display: none');
	});
	wichToFlip.addEventListener('click', whichCoinToFlip);
	flipButton.addEventListener('click', flipping);
	autoCoinPlacement.addEventListener('click', automaticallyCreateChessBoard);
	manualCoinPlacement.addEventListener('click', manualChessBoard);
	assessParity.addEventListener('click', function() {
		var is2x0Odd, is2x1Odd, is2x2Odd, is2x3Odd, is2x4Odd, is2x5Odd, decParity;
	
    for (var j = 0; j < filter2x0.length; j++) {
        if(chessBoard[filter2x0[j]] == 0) {
            odd2x0.push(chessBoard[filter2x0[j]])    
        } 
    }
    for (var j = 0; j < filter2x1.length; j++) {
        if(chessBoard[filter2x1[j]] == 0) {
            odd2x1.push(chessBoard[filter2x1[j]])
        }
    }
    for (var j = 0; j < filter2x2.length; j++) {
        if(chessBoard[filter2x2[j]] == 0) {
            odd2x2.push(chessBoard[filter2x2[j]])
        }
    }
    for (var j = 0; j < filter2x3.length; j++) {
        if(chessBoard[filter2x3[j]] == 0) {
            odd2x3.push(chessBoard[filter2x3[j]])
        }
    }
    for (var j = 0; j < filter2x4.length; j++) {
        if(chessBoard[filter2x4[j]] == 0) {
            odd2x4.push(chessBoard[filter2x4[j]])
        }
    }
    for (var j = 0; j < filter2x5.length; j++) {
        if(chessBoard[filter2x5[j]] == 0) {
            odd2x5.push(chessBoard[filter2x5[j]])
        }
    };
	
    if(odd2x0.length % 2 == 0) {
      is2x0Odd = '0';  
    } else {
        is2x0Odd = '1';
    };
	
    if(odd2x1.length % 2 == 0) {
      is2x1Odd = '0';  
    } else {
        is2x1Odd = '1';
    };
	
    if(odd2x2.length % 2 == 0) {
      is2x2Odd = '0';  
    } else {
        is2x2Odd = '1';
    };
	
     if(odd2x3.length % 2 == 0) {
      is2x3Odd = '0';  
    } else {
        is2x3Odd = '1';
    };
	
     if(odd2x4.length % 2 == 0) {
      is2x4Odd = '0';  
    } else {
        is2x4Odd = '1';
    };
	
     if(odd2x5.length % 2 == 0) {
      is2x5Odd = '0';  
    } else {
        is2x5Odd = '1';
    };
	
  
	parityStringBackward = is2x5Odd + is2x4Odd + is2x3Odd + is2x2Odd + is2x1Odd + is2x0Odd;
  	decParity = parseInt(parityStringBackward, 2);
	printData.innerHTML = printData.innerHTML + '<p class="calculations">board binary mask: .......................' + parityStringBackward + ' (dec: ' + decParity + ')</p>';
	console.log(parityStringBackward);
}); 

	function automaticallyCreateChessBoard() {
			
    	for (var i = 0; i < 64; i++) {
			var coinOnCell = document.createElement('img');
			var brake = document.createElement('br');
        	var cell = Math.round(Math.random());
			coinOnCell.setAttribute('height', '80px');
		    coinOnCell.setAttribute('width', '80px');
			coinOnCell.setAttribute('style', 'margin-right: 4px');
        	chessBoard.push(cell)
			if (cell == 1) {
				coinOnCell.setAttribute('src', 'imges/phpympv7ZAM.jpg');
			} else {
				coinOnCell.setAttribute('src', 'imges/United_States_penny,_reverse.jpg');
			}
			if (i % 8 == 0) {
				board.appendChild(brake);
			}
			
			board.appendChild(coinOnCell);
    	}
		filtering();
		//printData.innerHTML = printData.innerHTML + '<p>' + chessBoard + '</p>';
		console.log(chessBoard);	
	};
	function manualChessBoard() {
		
		for(i = 0; i < 64; i++) {
			var coinOnCell = document.createElement('img');
		var brake = document.createElement('br');
		coinOnCell.setAttribute('height', '80px');
		coinOnCell.setAttribute('width', '80px');
			coinOnCell.setAttribute('style', 'margin-right: 4px');
			var cell = parseInt(prompt('cell #' + i + ': head or tail? to quit enter "101"'));
			if ((cell > 1 && cell != 101) || isNaN(cell)) {
				do {
					cell = parseInt(prompt('cell #' + i + ': just numbers 0 or 1!! to quit enter "101"'))
				} while ((cell > 1 && cell != 101) || isNaN(cell));
			}
		
			if (cell == 101) break;
			chessBoard.push(cell);
			if (cell == 1) {
				coinOnCell.setAttribute('src', 'imges/phpympv7ZAM.jpg');
			} else {
				coinOnCell.setAttribute('src', 'imges/United_States_penny,_reverse.jpg');
			}
			if (i % 8 == 0) {
				board.appendChild(brake);
			}
			
			board.appendChild(coinOnCell);
		}
		filtering();
		console.log(chessBoard);
	}

function filtering() {

    for(var i = 0; i < chessBoard.length + 1; i++) {
        if(i % 2 != 0) {
           filter2x0.push(i);
           }
         if(i % 4 == 0 && i < 64) {
           filter2x1.push(i + 2);
           filter2x1.push(i + 3);
           }
         if(i > 0 && i % 8 == 0) { 
           filter2x2.push(i - 4);
           filter2x2.push(i - 3);
           filter2x2.push(i - 2);
           filter2x2.push(i - 1);
           }
         if(i > 0 && i % 16 == 0) {
           filter2x3.push(i - 8);
           filter2x3.push(i - 7);
           filter2x3.push(i - 6);
           filter2x3.push(i - 5);
           filter2x3.push(i - 4);
           filter2x3.push(i - 3);
           filter2x3.push(i - 2);
           filter2x3.push(i - 1);
           }
         if(i > 0 && i % 32 == 0) {
           filter2x4.push(i - 16);
           filter2x4.push(i - 15);
           filter2x4.push(i - 14);
           filter2x4.push(i - 13);
           filter2x4.push(i - 12);
           filter2x4.push(i - 11);
           filter2x4.push(i - 10);
           filter2x4.push(i - 9);
           filter2x4.push(i - 8);
           filter2x4.push(i - 7);
           filter2x4.push(i - 6);
           filter2x4.push(i - 5);
           filter2x4.push(i - 4);
           filter2x4.push(i - 3);
           filter2x4.push(i - 2);
           filter2x4.push(i - 1);
           }
         if(i == 64) {
           filter2x5.push(i - 32);
           filter2x5.push(i - 31)
           filter2x5.push(i - 30)
           filter2x5.push(i - 29)
           filter2x5.push(i - 28)
           filter2x5.push(i - 27)
           filter2x5.push(i - 26)
           filter2x5.push(i - 25)
           filter2x5.push(i - 24)
           filter2x5.push(i - 23)
           filter2x5.push(i - 22)
           filter2x5.push(i - 21)
           filter2x5.push(i - 20)
           filter2x5.push(i - 19)
           filter2x5.push(i - 18)
           filter2x5.push(i - 17)
           filter2x5.push(i - 16)
           filter2x5.push(i - 15)
           filter2x5.push(i - 14)
           filter2x5.push(i - 13)
           filter2x5.push(i - 12)
           filter2x5.push(i - 11)
           filter2x5.push(i - 10)
           filter2x5.push(i - 9)
           filter2x5.push(i - 8)
           filter2x5.push(i - 7)
           filter2x5.push(i - 6)
           filter2x5.push(i - 5)
           filter2x5.push(i - 4)
           filter2x5.push(i - 3)
           filter2x5.push(i - 2)
           filter2x5.push(i - 1)
           }
    }

}

function whichCoinToFlip() {
	var coinToFlip = '';
    var magicCell = parseInt(document.getElementById('magic_cell').value).toString(2);
    for(var i = 0; i < 7; i++) {
        if(i > magicCell.length) {
            magicCell = '0' + magicCell;
        } 
    }
    for (var i = 0; i < magicCell.length; i++) {
		//console.log(magicCell[i]);
        if((magicCell[i] == 1 && parityStringBackward[i] == 1) || (magicCell[i] == 0 && parityStringBackward[i] == 0)) {
            coinToFlip = coinToFlip.concat('0');
        } else {
            coinToFlip = coinToFlip.concat('1');
        }
    }
	printData.innerHTML = printData.innerHTML + '<p class="calculations">cell picked by jailer: .....................' + magicCell + '</p>';
    console.log(magicCell);
	printData.innerHTML = printData.innerHTML + '<p class="calculations">coin that has to be flipped(bin): ....' + coinToFlip + '</p>';
    console.log(coinToFlip);
	decCoinToFlip = parseInt(coinToFlip, 2);
	printData.innerHTML = printData.innerHTML + '<p class="calculations">coin that has to be flipped(dec): ....' + decCoinToFlip + '</p>';
	console.log(decCoinToFlip);

	
}
function flipping() {
	var coin = parseInt(prompt('enter a number from 0 to 63'));
	var flippinCoin = board.getElementsByTagName('img')[coin];
	if(chessBoard[coin] == 1) {
		chessBoard[coin] = 0;
		flippinCoin.setAttribute('src', 'imges/United_States_penny,_reverse.jpg')
	} else {
		chessBoard[coin] = 1;
		flippinCoin.setAttribute('src', 'imges/phpympv7ZAM.jpg')
	}
	console.log(chessBoard);
}
filtering();
}());