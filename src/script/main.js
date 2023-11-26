// #### V6.0 ####
// update : 202301109
// made by chitoheymu_kakka ｜　https://chitotan.com/

var h1title = document.querySelector('h1.h1title');
h1title.textContent = title;
document.title = title;
  // 問題の順番をランダムに並び替える
  shuffleArray(words);
  
  var currentWordIndex = 0;
  var score = 0;
  var incorrectWords = [];
  var isTestCompleted = false;
  

  
  // 配列をランダムにシャッフルする関数
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  
  
// 残りの問題数を取得する関数
function getRemainingQuestionCount() {
  return words.length - currentWordIndex;
}

// 問題と残りの問題数を表示する関数
function showQuestion() {
  var questionElement = document.getElementById("question");
  questionElement.innerHTML = words[currentWordIndex].meaning;

  var remainingCountElement = document.getElementById("remainingCount");
  remainingCountElement.innerHTML = "残りの問題数: " + getRemainingQuestionCount();

  var buttonContainer = document.getElementById("buttonContainer");
  buttonContainer.innerHTML = '<button onclick="checkAnswer()">回答する</button>';
}
  
  // 回答をチェックする関数
  function checkAnswer() {
    var answerElement = document.getElementById("answer");
    var resultElement = document.getElementById("result");
    var scoreElement = document.getElementById("score");
    var answer = answerElement.value.toLowerCase().trim();
  
    if (answer === words[currentWordIndex].word) {
      resultElement.innerHTML = "正解！";
      score++;
    } else {
      resultElement.innerHTML = "不正解！ 正しい答えは「" + words[currentWordIndex].word + "」でした。";
      incorrectWords.push({
        word: words[currentWordIndex].word,
        meaning: words[currentWordIndex].meaning,
        answer: answer
      });
    }
  
    currentWordIndex++;
    answerElement.value = ""; // 入力欄をクリア
  
    if (currentWordIndex < words.length) {
      showQuestion();
    } else {
      // 全ての問題が終了した場合の処理
      isTestCompleted = true;
      var questionContainer = document.getElementById("questionContainer");
      questionContainer.style.display = "none";
      resultElement.innerHTML += " 全ての問題が終了しました。";
      scoreElement.innerHTML = "スコア: " + score + " / " + words.length;

      // 間違えた問題のみ出題する
      if (incorrectWords.length > 0) {
        var incorrectWordsElement = document.getElementById("incorrectWords");
        if (!incorrectWordsElement) {
          incorrectWordsElement = document.createElement("div");
          incorrectWordsElement.id = "incorrectWords";
          incorrectWordsElement.innerHTML = "<h3>間違えた問題</h3>";
          document.body.appendChild(incorrectWordsElement);
        }
  
        for (var i = 0; i < incorrectWords.length; i++) {
          incorrectWordsElement.innerHTML +=
            "<p>問題: " +
            incorrectWords[i].meaning +
            "<br>正解: " +
            incorrectWords[i].word +
            "<br>回答: " +
            incorrectWords[i].answer +
            "</p><br>";
        }
      }
  if (words.length==score){
    var restartButton = document.getElementById("restartButton");

    if (!restartButton) {
      restartButton = document.createElement("button");
      restartButton.id = "restartButton";
      restartButton.innerHTML = "もう一度テストする";
      restartButton.onclick = restartTest;
      document.body.appendChild(restartButton);
    }
  }else{
      var retryButton = document.getElementById("retryButton");
      var restartButton = document.getElementById("restartButton");

      if (!retryButton) {
        retryButton = document.createElement("button");
        retryButton.id = "retryButton";
        retryButton.style = "text-align:center"
        retryButton.innerHTML = "間違えた問題をもう一度出題する";
        retryButton.onclick = retryIncorrectWords;
        document.body.appendChild(retryButton);
      }
  
      if (!restartButton) {
        restartButton = document.createElement("button");
        restartButton.id = "restartButton";
        restartButton.innerHTML = "もう一度テストする";
        restartButton.onclick = restartTest;
        document.body.appendChild(restartButton);
      }

    }
  }
  }
  
    // 間違えた問題のスクショ
    function resultShot(){
      html2canvas(document.getElementById("incorrectWordsElement"),{
        onrendered: function(canvas){
  
          //imgタグのsrcの中に、html2canvasがレンダリングした画像を指定する。
          var imgData = canvas.toDataURL();
          document.getElementById("shotResult").src = imgData;
        }
      })
    }
  

  // 間違えた問題のみ出題する関数
  function retryIncorrectWords() {
    words = incorrectWords;
    currentWordIndex = 0;
    score = 0;
    incorrectWords = [];
    isTestCompleted = false;
    document.getElementById('result').innerHTML = '';

    var incorrectWordsElement = document.getElementById("incorrectWords");
    var retryButton = document.getElementById("retryButton");
    var restartButton = document.getElementById("restartButton");
  
    incorrectWordsElement.parentNode.removeChild(incorrectWordsElement);
    retryButton.parentNode.removeChild(retryButton);
    restartButton.parentNode.removeChild(restartButton);
  
    var questionContainer = document.getElementById("questionContainer");
    questionContainer.style.display = "block";
  
    showQuestion();
  }
  
  // テストをやり直す関数
  function restartTest() {
    location.reload();

  }
  
  // 最初の問題を表示
  showQuestion();
  
