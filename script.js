const questions = [
  { 
    question: "What is the capital of France?", 
    correct: "B", 
    options: ["London", "Paris", "Berlin", "Rome"] 
  },
  { 
    question: "Which planet is known as the Red Planet?", 
    correct: "A", 
    options: ["Mars", "Jupiter", "Venus", "Saturn"] 
  },
  { 
    question: "What is 5 + 3?", 
    correct: "C", 
    options: ["5", "6", "8", "9"] 
  },
  { 
    question: "Which animal is called the king of the jungle?", 
    correct: "A", 
    options: ["Lion", "Tiger", "Elephant", "Bear"] 
  },
  { 
    question: "What color is the sky on a clear day?", 
    correct: "D", 
    options: ["Red", "White", "Green", "Blue"] 
  },
  { 
    question: "Which gas do plants absorb?", 
    correct: "B", 
    options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"] 
  },
  { 
    question: "What is the largest ocean on Earth?", 
    correct: "A", 
    options: ["Pacific", "Atlantic", "Indian", "Arctic"] 
  },
  { 
    question: "Which language is spoken in Brazil?", 
    correct: "C", 
    options: ["Spanish", "English", "Portuguese", "French"] 
  },
  { 
    question: "How many days are in a leap year?", 
    correct: "B", 
    options: ["364", "366", "365", "360"] 
  },
  { 
    question: "Which organ pumps blood in the human body?", 
    correct: "A", 
    options: ["Heart", "Liver", "Brain", "Lung"] 
  },
  { 
    question: "What is the boiling point of water?", 
    correct: "D", 
    options: ["50°C", "90°C", "80°C", "100°C"] 
  },
  { 
    question: "Which shape has 4 equal sides?", 
    correct: "B", 
    options: ["Rectangle", "Square", "Triangle", "Circle"] 
  },
  { 
    question: "What is the opposite of 'hot'?", 
    correct: "C", 
    options: ["Warm", "Cool", "Cold", "Heat"] 
  },
  { 
    question: "How many legs does a spider have?", 
    correct: "D", 
    options: ["6", "10", "4", "8"] 
  },
  { 
    question: "What is the freezing point of water?", 
    correct: "A", 
    options: ["0°C", "32°C", "10°C", "-10°C"] 
  }
];

let current = 0;
let answers = Array(questions.length).fill(null);
let timerSeconds = 1800; // 30 minutes

const quizForm = document.getElementById('quizForm');
const tracker = document.getElementById('questionTracker');
const submitBtn = document.getElementById('submitBtn');

function renderTimer() {
  const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
  const secs = String(timerSeconds % 60).padStart(2, '0');
  document.getElementById("timer").textContent = `Time Left: ${mins}:${secs}`;
  
  if (timerSeconds === 0) {
    finishQuiz();
  } else {
    timerSeconds--;
  }
}
setInterval(renderTimer, 1000);

function renderTracker() {
  tracker.innerHTML = '';
  questions.forEach((q, i) => {
    const dot = document.createElement('div');
    dot.className = 'question-dot' + (answers[i] !== null ? ' answered' : '');
    dot.textContent = i + 1;
    tracker.appendChild(dot);
  });
}

function renderQuestion(index) {
  quizForm.querySelectorAll(".question-block").forEach(q => q.remove());
  const block = document.createElement('div');
  block.className = 'question-block';

  const qTitle = document.createElement('h2');
  qTitle.textContent = `Q${index + 1}: ${questions[index].question}`;
  block.appendChild(qTitle);

  ['A', 'B', 'C', 'D'].forEach((opt, i) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `q${index}`;
    input.value = opt;
    input.checked = answers[index] === opt;
    input.addEventListener('change', () => {
      answers[index] = opt;
      renderTracker();
      checkIfAllAnswered();
    });
    label.appendChild(input);
    label.append(` ${questions[index].options[i]}`);
    block.appendChild(label);
    block.appendChild(document.createElement('br'));
  });

  quizForm.insertBefore(block, quizForm.querySelector(".buttons"));
  document.getElementById('prevBtn').disabled = index === 0;
  document.getElementById('nextBtn').disabled = index === questions.length - 1;
}

document.getElementById('prevBtn').onclick = () => {
  if (current > 0) current--;
  renderQuestion(current);
};

document.getElementById('nextBtn').onclick = () => {
  if (current < questions.length - 1) current++;
  renderQuestion(current);
};

function checkIfAllAnswered() {
  if (answers.every(a => a !== null)) {
    submitBtn.disabled = false;
  }
}

function finishQuiz() {
  let score = 0;
  answers.forEach((ans, i) => {
    if (ans === questions[i].correct) score++;
  });

  localStorage.setItem('quizScore', score);
  window.location.href = 'thankyou.html';
}

quizForm.onsubmit = (e) => {
  e.preventDefault();
  finishQuiz();
};

renderTracker();
renderQuestion(current);
