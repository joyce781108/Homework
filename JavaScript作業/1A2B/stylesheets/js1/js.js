let guessResults = document.getElementById("guessResults");
guessResults.innerHTML = "";
let answer = [];
let input = [];
let a = 0;
let b = 0;


const startGame = document.getElementById("start");
startGame.addEventListener("click", function () {
  document.getElementById("restart").removeAttribute('disabled'); //removeAttribute:刪除屬性
  document.getElementById("cheat").removeAttribute('disabled');
  document.getElementById("start").setAttribute('disabled', true);
  if (answer.length == 0) {
    getRandomInt(0, 9)
  }
  else {
    return;
  };
})


const abortGame = document.getElementById("restart");
abortGame.addEventListener("click", function () {
  guessResults.innerHTML = null;
  answer = [];
  document.getElementById("restart").setAttribute('disabled', true); //setAttribute:設定屬性
  document.getElementById("cheat").setAttribute('disabled', true);
  document.getElementById("start").removeAttribute('disabled');
});


const showAnswer = document.getElementById("cheat");
showAnswer.addEventListener("click", function () {
  if (answer == 0) {
    return;
  };
  let answerstring = answer.join('');
  alert(answerstring);
});

const doGuess = document.getElementById("guess");
function guess(){
  let inputNumber = document.getElementById("userGuess").value;
  input = Array.from(inputNumber);
  if (inputLengthConfirm(input) == true) {
    return;
  }
  if (nanNumberConfirm(input) == true) {
    return;
  }
  if (repeatedNumberConfirm(input) == true) {
    return;
  }
  contrast(input);
  if (a == 4) {
    guessTheContent(input, 'label label-success');
    setTimeout(pass,1000);
    
  } else {
    guessTheContent(input, 'label label-danger');
  }
  document.getElementById("userGuess").value = '';
}


doGuess.addEventListener("click", function () {
  guess();
});

document.getElementById("userGuess").onkeyup = function(event){
  if(event.keyCode == 13){
    guess();
  }
}

function contrast(input) {
  a = 0;
  b = 0;
  answer.forEach((item, index) => {

    if (item == input[index]) {
      a++;
    }
    else if (input.includes(item)) {
      b++;
    };
  });
};


function inputLengthConfirm(input) {
  if (input.length != 4) {
    debugger
    alert("請輸入4位數字!");
    return true;
  };
};

function nanNumberConfirm(input) {
  let isNan = input.map(x => isNaN(x));
  let every = isNan.every(function (item) {
    return item == false;
  });
  if (every == false) {
    alert("請輸入數字!");
    return true;
  };
};

function repeatedNumberConfirm(input) {
  var isRepeat = false;
  for (i = 0; i < input.length - 1; i++) {
    for (j = i + 1; j < input.length; j++) {
      if (input[i] == input[j]) {
        isRepeat = true;
      };
    }
  };
  if (isRepeat) {
    alert("請勿輸入重複數字");
    return true;
  };
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let n = 0;
  for (i = 0; i <= 3; i++) {
    n = Math.floor(Math.random() * (max - min) + min);
    if (answer.includes(n.toString())) {
      i -= 1;
      continue;
    } else {
      answer.push(n.toString());
    };
  };
};


let ul = document.getElementById("guessResults");
function guessTheContent(input, style) {
  let inputstring = input.join('');
  let li = document.createElement("li")
  li.className = 'list-group-item';
  let span = document.createElement("span");
  span.className = style;
  span.innerText = `${a}A${b}B`;
  li.append(span, inputstring);
  ul.appendChild(li);
};

function pass(){
  alert("恭喜過關!");
  document.getElementById("restart").setAttribute('disabled', true); //setAttribute:設定屬性
  document.getElementById("cheat").setAttribute('disabled', true);
  document.getElementById("start").removeAttribute('disabled');
}
