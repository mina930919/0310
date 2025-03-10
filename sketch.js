let radio;
let button;
let result = "";
let table;
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

function preload() {
  // 載入 Excel 檔案
  table = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#E8CCFF");

  // 建立 radio 選項
  radio = createRadio();
  radio.style('width', '300px');
  radio.style('font-size', '30px');
  radio.position(width / 2 - 150, height / 2);

  // 建立按鈕
  button = createButton('提交');
  button.position(width / 2 - 50, height / 2 + 100);
  button.style('font-size', '30px');
  button.mousePressed(checkAnswer);

  // 顯示第一題
  displayQuestion();
}

function draw() {
  background("#E8CCFF");
  // 顯示題目
  textSize(30);
  textAlign(CENTER);
  text("今天星期幾：", width / 2, height / 2 - 50);

  // 顯示結果
  text(result, width / 2, height / 2 + 200); // 調整結果顯示位置
}

function displayQuestion() {
  let question = table.getString(currentQuestionIndex, 'question');
  let options = table.getString(currentQuestionIndex, 'options').split(',');

  // 顯示題目
  text(question, width / 2, height / 2 - 100);

  // 清空 radio 選項
  radio.elt.innerHTML = '';
  options.forEach(option => {
    radio.option(option);
  });
}

function checkAnswer() {
  let answer = radio.value();
  let correctAnswer = table.getString(currentQuestionIndex, 'answer');

  if (answer === 星期一) {
    result = "答對了！";
    correctCount++;
  } else {
    result = "答錯了，再試一次。";
    incorrectCount++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < table.getRowCount()) {
    displayQuestion();
  } else {
    displayResult();
  }
}

function displayResult() {
  result = `測驗結束！答對題數：${correctCount}，答錯題數：${incorrectCount}`;
}
