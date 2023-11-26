const wordElement = document.getElementById("word");
const meaningElement = document.getElementById("meaning");
const nextButton = document.getElementById("next-button");
const showAllButton = document.getElementById("show-all-button");
const randomCheckbox = document.getElementById("random-checkbox");
let randomizedWords = [...words];

var h1title = document.querySelector('h1.h1title');
h1title.textContent = title+"カード";
document.title = "[カード]"+title;
let currentIndex = 0;

function shuffleArray(array) {
  let shuffledArray = [...array]; // 元の配列を変更しないようにコピーを作成
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// 次の行を修正
randomCheckbox.addEventListener("change", function () {
  if (randomCheckbox.checked) {
    randomizedWords = shuffleArray(words);
  } else {
    randomizedWords = [...words];
  }
  currentIndex = 0;
  displayWord();
});

function displayWord() {
  const currentWord = randomizedWords[currentIndex];
  wordElement.textContent = currentWord.word;
  meaningElement.textContent = currentWord.meaning;
}

function nextWord() {
  currentIndex = (currentIndex + 1) % randomizedWords.length;
  displayWord();
}

function showAllWords() {
  let allWords = "";
  for (let i = 0; i < words.length; i++) {
    allWords += `${words[i].word} - ${words[i].meaning}<br>`;
  }
  meaningElement.innerHTML = allWords;
}

nextButton.addEventListener("click", nextWord);

showAllButton.addEventListener("click", showAllWords);

randomCheckbox.addEventListener("change", function () {
  if (randomCheckbox.checked) {
    randomizedWords = shuffleArray([...words]);
  } else {
    randomizedWords = [...words];
  }
  currentIndex = 0;
  displayWord();
});

displayWord();
