document.addEventListener('DOMContentLoaded', function() {;
  var chessBoard = []; // holds entire number of coins
  var filter2x0 = [];
  var filter2x1 = [];
  var filter2x2 = [];
  var filter2x3 = [];
  var filter2x4 = [];
  var filter2x5 = [];

  var parityString, parityStringBackward, decCoinToFlip;
  var assessParityBtn = document.getElementById('assess-parity');
  var autoCoinPlacement = document.getElementById('auto-creation');
  var manualCoinPlacement = document.getElementById('manual-creation');
  var wichToFlip = document.getElementById('wich-to-flip');
  var printData = document.querySelector('.console');
  var board = document.getElementById('board');
  var hideButton = document.getElementById('hide-button');
  var calculations = document.querySelector('.calculations');




  board.addEventListener('click', function(event) {
    var target = event.target;
    flipping(target.getAttribute('id'));
  }, false);

  hideButton.addEventListener('click', function() {
    calculations.style.display = (calculations.style.display == 'none') ? 'block' : 'none';
    hideButton.textContent = (calculations.style.display == 'none') ? 'show' : 'hide';
  });
  wichToFlip.addEventListener('click', whichCoinToFlip);
  autoCoinPlacement.addEventListener('click', automaticallyCreateChessBoard);
  manualCoinPlacement.addEventListener('click', manualChessBoard);

  assessParityBtn.addEventListener('click', assessParity);


  // calculating odd/even parity for each of the 6 coin sets
  function assessParity() {

    var _filter2x0 = filter2x0, _filter2x1 = filter2x1, _filter2x2 = filter2x2, _filter2x3 = filter2x3, _filter2x4 = filter2x4, _filter2x5 = filter2x5;
    //var _filter2x0 = [], _filter2x1 = [], _filter2x2 = [], _filter2x3 = [], _filter2x4 = [], _filter2x5 = [];
    // hold all odd values for each of the coin sets
    var odd2x0 = [], odd2x1 = [], odd2x2 = [], odd2x3 = [], odd2x4 = [], odd2x5 = [];   
    // these hold board parity value for each of the coin sets;            
    var is2x0Odd, is2x1Odd, is2x2Odd, is2x3Odd, is2x4Odd, is2x5Odd, decParity;                     

    for (var j = 0; j < _filter2x0.length; j++) {
      if (chessBoard[_filter2x0[j]] == 0) {
        odd2x0.push(chessBoard[_filter2x0[j]])
      }
    }
    for (var j = 0; j < _filter2x1.length; j++) {
      if (chessBoard[_filter2x1[j]] == 0) {
        odd2x1.push(chessBoard[_filter2x1[j]])
      }
    }
    for (var j = 0; j < _filter2x2.length; j++) {
      if (chessBoard[_filter2x2[j]] == 0) {
        odd2x2.push(chessBoard[_filter2x2[j]])
      }
    }
    for (var j = 0; j < _filter2x3.length; j++) {
      if (chessBoard[_filter2x3[j]] == 0) {
        odd2x3.push(chessBoard[_filter2x3[j]])
      }
    }
    for (var j = 0; j < _filter2x4.length; j++) {
      if (chessBoard[_filter2x4[j]] == 0) {
        odd2x4.push(chessBoard[_filter2x4[j]])
      }
    }
    for (var j = 0; j < _filter2x5.length; j++) {
      if (chessBoard[_filter2x5[j]] == 0) {
        odd2x5.push(chessBoard[_filter2x5[j]])
      }
    };

    if (odd2x0.length % 2 == 0) {
      is2x0Odd = '0';
    } else {
      is2x0Odd = '1';
    };

    if (odd2x1.length % 2 == 0) {
      is2x1Odd = '0';
    } else {
      is2x1Odd = '1';
    };

    if (odd2x2.length % 2 == 0) {
      is2x2Odd = '0';
    } else {
      is2x2Odd = '1';
    };

    if (odd2x3.length % 2 == 0) {
      is2x3Odd = '0';
    } else {
      is2x3Odd = '1';
    };

    if (odd2x4.length % 2 == 0) {
      is2x4Odd = '0';
    } else {
      is2x4Odd = '1';
    };

    if (odd2x5.length % 2 == 0) {
      is2x5Odd = '0';
    } else {
      is2x5Odd = '1';
    };


    parityStringBackward = is2x5Odd + is2x4Odd + is2x3Odd + is2x2Odd + is2x1Odd + is2x0Odd;
    decParity = parseInt(parityStringBackward, 2);
    printData.innerHTML = printData.innerHTML + '<p>board binary mask: .......................' + parityStringBackward + ' (dec: ' + decParity + ')</p>';
    console.log(parityStringBackward);
  };





  function automaticallyCreateChessBoard() {
    _chessBoard = chessBoard;
    board.innerHTML = '';
    for (var i = 0; i < 64; i++) {
      var coinOnCell = document.createElement('img');
      var brake = document.createElement('br');
      var cell = Math.round(Math.random());

      coinOnCell.setAttribute('width', '11%');
      coinOnCell.setAttribute('style', 'margin-right: 1%');
      coinOnCell.setAttribute('title', 'coin #' + i);
      _chessBoard.push(cell)
      if (cell == 1) {
        coinOnCell.setAttribute('src', 'imges/phpympv7ZAM.jpg');
        coinOnCell.setAttribute('id', i);
      } else {
        coinOnCell.setAttribute('src', 'imges/United_States_penny,_reverse.jpg');
        coinOnCell.setAttribute('id', i);
      }
      if (i % 8 == 0 && i != 0) {
        board.appendChild(brake);
      }

      board.appendChild(coinOnCell);
    }
    filtering();
    //printData.innerHTML = printData.innerHTML + '<p>' + chessBoard + '</p>';
    console.log(_chessBoard);
  };

  function manualChessBoard() {
    _chessBoard = chessBoard;
    board.innerHTML = '';
    for (i = 0; i < 64; i++) {
      var coinOnCell = document.createElement('img');
      var brake = document.createElement('br');
      //coinOnCell.setAttribute('height', '11%');
      coinOnCell.setAttribute('width', '11%');
      coinOnCell.setAttribute('style', 'margin-right: 4px');
      var cell = parseInt(prompt('cell #' + i + ': head or tail? to quit enter "101"'));
      if ((cell > 1 && cell != 101) || isNaN(cell)) {
        do {
          cell = parseInt(prompt('cell #' + i + ': just numbers 0 or 1!! to quit enter "101"'))
        } while ((cell > 1 && cell != 101) || isNaN(cell));
      }

      if (cell == 101) break;
      _chessBoard.push(cell);
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
    console.log(_chessBoard);
  }

  function filtering() { // devide coins to 6 sets

    var _filter2x0 = filter2x0, _filter2x1 = filter2x1, _filter2x2 = filter2x2, _filter2x3 = filter2x3, _filter2x4 = filter2x4, _filter2x5 = filter2x5;

    for (var i = 0; i < chessBoard.length + 1; i++) {
      if (i % 2 != 0) {
        _filter2x0.push(i);
      }
      if (i % 4 == 0 && i < 64) {
        _filter2x1.push(i + 2);
        _filter2x1.push(i + 3);
      }
      if (i > 0 && i % 8 == 0) {
        _filter2x2.push(i - 4);
        _filter2x2.push(i - 3);
        _filter2x2.push(i - 2);
        _filter2x2.push(i - 1);
      }
      if (i > 0 && i % 16 == 0) {
        _filter2x3.push(i - 8);
        _filter2x3.push(i - 7);
        _filter2x3.push(i - 6);
        _filter2x3.push(i - 5);
        _filter2x3.push(i - 4);
        _filter2x3.push(i - 3);
        _filter2x3.push(i - 2);
        _filter2x3.push(i - 1);
      }
      if (i > 0 && i % 32 == 0) {
        _filter2x4.push(i - 16);
        _filter2x4.push(i - 15);
        _filter2x4.push(i - 14);
        _filter2x4.push(i - 13);
        _filter2x4.push(i - 12);
        _filter2x4.push(i - 11);
        _filter2x4.push(i - 10);
        _filter2x4.push(i - 9);
        _filter2x4.push(i - 8);
        _filter2x4.push(i - 7);
        _filter2x4.push(i - 6);
        _filter2x4.push(i - 5);
        _filter2x4.push(i - 4);
        _filter2x4.push(i - 3);
        _filter2x4.push(i - 2);
        _filter2x4.push(i - 1);
      }
      if (i == 64) {
        _filter2x5.push(i - 32);
        _filter2x5.push(i - 31)
        _filter2x5.push(i - 30)
        _filter2x5.push(i - 29)
        _filter2x5.push(i - 28)
        _filter2x5.push(i - 27)
        _filter2x5.push(i - 26)
        _filter2x5.push(i - 25)
        _filter2x5.push(i - 24)
        _filter2x5.push(i - 23)
        _filter2x5.push(i - 22)
        _filter2x5.push(i - 21)
        _filter2x5.push(i - 20)
        _filter2x5.push(i - 19)
        _filter2x5.push(i - 18)
        _filter2x5.push(i - 17)
        _filter2x5.push(i - 16)
        _filter2x5.push(i - 15)
        _filter2x5.push(i - 14)
        _filter2x5.push(i - 13)
        _filter2x5.push(i - 12)
        _filter2x5.push(i - 11)
        _filter2x5.push(i - 10)
        _filter2x5.push(i - 9)
        _filter2x5.push(i - 8)
        _filter2x5.push(i - 7)
        _filter2x5.push(i - 6)
        _filter2x5.push(i - 5)
        _filter2x5.push(i - 4)
        _filter2x5.push(i - 3)
        _filter2x5.push(i - 2)
        _filter2x5.push(i - 1)
      }
    }

  }

  function whichCoinToFlip() {
    var coinToFlip = '';
    var magicCell = parseInt(document.getElementById('magic-cell-input').value).toString(2);
    for (var i = 0; i < 7; i++) {
      if (i > magicCell.length) {
        magicCell = '0' + magicCell;
      }
    }
    for (var i = 0; i < magicCell.length; i++) {
      //console.log(magicCell[i]);
      if ((magicCell[i] == 1 && parityStringBackward[i] == 1) || (magicCell[i] == 0 && parityStringBackward[i] == 0)) {
        coinToFlip = coinToFlip.concat('0');
      } else {
        coinToFlip = coinToFlip.concat('1');
      }
    }
    printData.innerHTML = printData.innerHTML + '<p>cell picked by jailer: .....................' + magicCell + '</p>';
    console.log(magicCell);
    printData.innerHTML = printData.innerHTML + '<p>coin that has to be flipped(bin): ....' + coinToFlip + '</p>';
    console.log(coinToFlip);
    decCoinToFlip = parseInt(coinToFlip, 2);
    printData.innerHTML = printData.innerHTML + '<p>coin that has to be flipped(dec): ....' + decCoinToFlip + '</p>';
    console.log(decCoinToFlip);


  }

  function flipping(coin) {
    var flippinCoin = board.getElementsByTagName('img')[coin];
    if (chessBoard[coin] == 1) {
      chessBoard[coin] = 0;
      flippinCoin.setAttribute('src', 'imges/United_States_penny,_reverse.jpg')
    } else {
      chessBoard[coin] = 1;
      flippinCoin.setAttribute('src', 'imges/phpympv7ZAM.jpg')
    }
  }
  filtering();
}());