const addQuestionBtn = document.getElementById('addQuestionBtn');
const updateQuestionsBtn = document.getElementById('updateQuestionsBtn');
const adminForm = document.getElementById('adminForm');

let questions = JSON.parse(localStorage.getItem('quizQuestions')) || [
  { question: "What is the capital of France?", correct: "B", options: ["London", "Paris", "Berlin", "Rome"] },
  { question: "Which planet is known as the Red Planet?", correct: "A", options: ["Mars", "Jupiter", "Venus", "Saturn"] },
  { question: "What is 5 + 3?", correct: "C", options: ["5", "6", "8", "9"] },
  { question: "Which animal is called the king of the jungle?", correct: "A", options: ["Lion", "Tiger", "Elephant", "Bear"] },
  { question: "What color is the sky on a clear day?", correct: "D", options: ["Red", "White", "Green", "Blue"] },
];

function renderAdminForm() {
  adminForm.innerHTML = '';
  questions.forEach((question, index) => {
    const questionBlock = document.createElement('div');
    questionBlock.classList.add('question-block');

    const questionTitle = document.createElement('input');
    questionTitle.type = 'text';
    questionTitle.value = question.question;
    questionTitle.placeholder = 'Enter question text';
    questionBlock.appendChild(questionTitle);

    ['A', 'B', 'C', 'D'].forEach((opt, i) => {
      const optionLabel = document.createElement('label');
      const optionInput = document.createElement('input');
      optionInput.type = 'radio';
      optionInput.name = `question${index}`;
      optionInput.value = opt;
      optionInput.checked = question.correct === opt;
      
      const optionText = document.createElement('input');
      optionText.type = 'text';
      optionText.value = question.options[i];
      optionText.placeholder = `Option ${opt}`;

      optionLabel.appendChild(optionInput);
      optionLabel.appendChild(optionText);
      questionBlock.appendChild(optionLabel);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete Question';
    deleteBtn.onclick = () => deleteQuestion(index);
    questionBlock.appendChild(deleteBtn);

    adminForm.appendChild(questionBlock);
  });
}

addQuestionBtn.onclick = () => {
  const newQuestion = { question: "New Question?", correct: "A", options: ["Option 1", "Option 2", "Option 3", "Option 4"] };
  questions.push(newQuestion);
  renderAdminForm();
};

function deleteQuestion(index) {
  questions.splice(index, 1);
  renderAdminForm();
}

updateQuestionsBtn.onclick = () => {
  localStorage.setItem('quizQuestions', JSON.stringify(questions));
  alert('Questions saved!');
};

renderAdminForm();
