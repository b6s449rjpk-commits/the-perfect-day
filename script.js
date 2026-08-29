const questions = [
  "What made you smile today?",
  "If today had a color, what would it be?",
  "What’s one small thing you’re grateful for right now?",
  "Describe your perfect 1 hour today",
  "What feeling do you want to carry into tomorrow?",
  "What song matches your mood today?",
  "What did you learn about yourself this week?",
  "If you could gift yourself one word today, what would it be?",
  "What’s something beautiful you noticed today?",
  "What would make today a 10/10?"
];

let currentQuestion = "";

const diceBtn = document.getElementById("diceBtn");
const questionEl = document.getElementById("question");
const answerBox = document.getElementById("answerBox");
const saveBtn = document.getElementById("saveBtn");
const diaryEntries = document.getElementById("diaryEntries");

let diary = JSON.parse(localStorage.getItem("perfectDayDiary")) || [];
renderDiary();

diceBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  currentQuestion = questions[randomIndex];
  questionEl.textContent = currentQuestion;
  diceBtn.textContent = "🎲 Roll Again";
});

saveBtn.addEventListener("click", () => {
  if (!currentQuestion || answerBox.value.trim() === "") {
    alert("Roll the dice and write something first 💛");
    return;
  }

  const entry = {
    date: new Date().toLocaleString(),
    question: currentQuestion,
    answer: answerBox.value
  };

  diary.unshift(entry);
  localStorage.setItem("perfectDayDiary", JSON.stringify(diary));

  answerBox.value = "";
  currentQuestion = "";
  questionEl.textContent = "Click the dice for your next reflection question";
  renderDiary();
});

function renderDiary() {
  diaryEntries.innerHTML = "";
  diary.forEach(entry => {
    diaryEntries.innerHTML += `
      <div class="entry">
        <div class="date">${entry.date}</div>
        <div class="q">Q: ${entry.question}</div>
        <div class="a">A: ${entry.answer}</div>
      </div>
    `;
  });
}