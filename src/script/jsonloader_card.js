title = "英単GO!カード"

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
    
        
        document.getElementById('word-container').innerHTML == 'loading';
        //main.jsをロード
        var script = document.createElement('script');
        script.src = 'src/script/card.js';
        document.head.appendChild(script);
        document.getElementById('word-container').innerHTML += '      <h2 id="word">単語</h2>';
        document.getElementById('word-container').innerHTML += '      <p id="meaning">意味</p>';


      };
  
      reader.readAsText(file);
    } else {
      alert('ファイルを選択してください');
    }
  }