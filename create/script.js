function addRow() {
  var table = document.getElementById('myTable');
  var row = table.insertRow(table.rows.length);

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);

  var input1 = document.createElement('input');
  input1.type = 'text';
  cell1.appendChild(input1);

  var input2 = document.createElement('input');
  input2.type = 'text';
  cell2.appendChild(input2);

  var deleteButton = document.createElement('button');
  deleteButton.textContent = '行を削除';
  deleteButton.onclick = function() {
      deleteRow(row);
  };
  cell2.appendChild(deleteButton);
}

function deleteRow(row) {
  var table = document.getElementById('myTable');
  var rowIndex = row.rowIndex;
  table.deleteRow(rowIndex);
}

function generateSentences() {
  var table = document.getElementById('myTable');
  var sentencesContainer = document.getElementById('sentencesContainer');

  sentencesContainer.innerHTML = ''; // 以前の結果をクリア

  var sentencePrefix = '<br>var words = [<br>';
  var sentenceSuffix = '<br>  ];<br>';

  var rowCount = table.rows.length;

  if (rowCount > 2) {
      var firstRowData = table.rows[1].cells;
      var lastRowData = table.rows[rowCount - 1].cells;

      var firstValue1 = firstRowData[0].querySelector('input').value;
      var firstValue2 = firstRowData[1].querySelector('input').value;

      var lastValue1 = lastRowData[0].querySelector('input').value;
      var lastValue2 = lastRowData[1].querySelector('input').value;

      var firstSentence = sentencePrefix + '    { word: "' + firstValue1 + '", meaning: "' + firstValue2 + '" },';
      var lastSentence = '    { word: "' + lastValue1 + '", meaning: "' + lastValue2 + '" },' + sentenceSuffix;

      var firstParagraph = document.createElement('p');
      firstParagraph.innerHTML = firstSentence;
      sentencesContainer.appendChild(firstParagraph);

      for (var i = 2; i < rowCount - 1; i++) {
          var rowData = table.rows[i].cells;
          var value1 = rowData[0].querySelector('input').value;
          var value2 = rowData[1].querySelector('input').value;

          var sentence = '    { word: "' + value1 + '", meaning: "' + value2 + '" },';

          var paragraph = document.createElement('p');
          paragraph.textContent = sentence;
          sentencesContainer.appendChild(paragraph);
      }

      var lastParagraph = document.createElement('p');
      lastParagraph.innerHTML = lastSentence;
      sentencesContainer.appendChild(lastParagraph);
  }
  appendAddTitle()
  downloadSentences()
}

function downloadSentences() {
  var sentencesContainer = document.getElementById('sentencesContainer');
  var sentencesText = sentencesContainer.innerText;

  var blob = new Blob([sentencesText], { type: 'text/plain' });
  var url = URL.createObjectURL(blob);

  var link = document.createElement('a');
  link.href = url;
  link.download = 'list.js.txt';
  link.click();
}

function appendAddTitle() {
  var addTitleInput = document.getElementById("addTitle");
  var addTitle = addTitleInput.value.trim();
  var addTitle = 'var title = "'+addTitle +'"';
  if (addTitle !== "") {
      var sentencesContainer = document.getElementById("sentencesContainer");
      var customParagraph = document.createElement("p");
      customParagraph.textContent = addTitle;
      sentencesContainer.appendChild(customParagraph);
      addTitleInput.value = ""; // テキストボックスをクリアする
  }
}