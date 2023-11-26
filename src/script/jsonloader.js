title = "英単GO!"

function loadFile() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
  
    if (file) {
      var reader = new FileReader();
      reader.onload = function(event) {
        var contents = event.target.result;
        var data = JSON.parse(contents);
  
        // JSONファイルから読み込んだデータを各変数に代入
        words = data.words;
        title = data.title;
        testconfig = data.testconfig;
  
        console.log("Words:", words);
        console.log("Title:", title);
        console.log("Test Config:", testconfig);
        
        //main.jsをロード
        var script = document.createElement('script');
        script.src = 'src/script/main.js';
        document.head.appendChild(script);
        document.getElementById('questionContainer').innerHTML = '    <div id="question"></div><div id="remainingCount"></div><input type="text" id="answer" placeholder="回答を入力してください" onkeydown="handleKeyPress(event)"><div class="action-button" id="buttonContainer"><button onclick="checkAnswer()">回答する</button></div><div id="remainingQuestions"></div>';
        document.getElementById('questionContainer').insertAdjacentHTML('afterend', '  <div id=scshot>');
//        document.getElementById('questionContainer').innerHTML += '  <div id=scshot>';
        document.getElementById('scshot').innerHTML += '    <button onclick="screenshot()">スクリーンショット</button><br>';
        document.getElementById('scshot').innerHTML += '    <img style="text-align: center;" id="shotResult" />';


      };
  
      reader.readAsText(file);
    } else {
      alert('ファイルを選択してください');
    }
  }