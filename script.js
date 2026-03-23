let current = 0;
let selectedOption = null;
let userAnswers = new Array(questions.length).fill(null);

const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const resultEl = document.getElementById("result");

// Start Exam
startBtn.onclick = () => {
  startScreen.classList.add("hidden");
  quiz.classList.remove("hidden");

  loadQuestion();
};

// Load Question
function loadQuestion() {
  selectedOption = userAnswers[current];

  let q = questions[current];
  questionEl.innerText = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    let btn = document.createElement("button");
    btn.innerText = option;

    if (option === selectedOption) {
      btn.classList.add("selected");
    }

    btn.onclick = () => {
      document.querySelectorAll("#options button").forEach(b => {
        b.classList.remove("selected");
      });

      btn.classList.add("selected");
      selectedOption = option;
    };

    optionsEl.appendChild(btn);
  });

  // Hide prev button for first question
  prevBtn.style.display = current === 0 ? "none" : "block";
}

// Next Button
nextBtn.onclick = () => {
  if (!selectedOption) {
    alert("Please select an option!");
    return;
  }

  userAnswers[current] = selectedOption;
  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    calculateResult();
  }
};

// Previous Button
prevBtn.onclick = () => {
  if (current > 0) {
    current--;
    loadQuestion();
  }
};

// Calculate Result
function calculateResult() {
  let score = 0;

  userAnswers.forEach((ans, index) => {
    if (ans === questions[index].answer) {
      score++;
    }
  });

  showResult(score);
}

// Show Result
function showResult(score) {
  quiz.classList.add("hidden");
  resultEl.classList.remove("hidden");

  resultEl.innerHTML = `
    <h2>Exam Completed</h2>
    <h3>Your Score: ${score}/${questions.length}</h3>
  `;
}