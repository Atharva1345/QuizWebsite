// Quiz data
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which language is used for web development?",
    options: ["Java", "Python", "JavaScript", "C++"],
    answer: "JavaScript"
  },
    {
    "question": "Who wrote 'Romeo and Juliet'?",
    "options": ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    "answer": "William Shakespeare"
  },
  {
    "question": "Which planet is known as the Red Planet?",
    "options": ["Earth", "Mars", "Jupiter", "Venus"],
    "answer": "Mars"
  },
  {
    "question": "What is the largest ocean on Earth?",
    "options": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    "answer": "Pacific Ocean"
  },
  {
    "question": "Who painted the Mona Lisa?",
    "options": ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    "answer": "Leonardo da Vinci"
  },
  {
    "question": "What is the chemical symbol for water?",
    "options": ["H2O", "CO2", "O2", "NaCl"],
    "answer": "H2O"
  },
  {
    "question": "Which country is famous for inventing pizza?",
    "options": ["France", "Italy", "Spain", "Greece"],
    "answer": "Italy"
  },
  {
    "question": "What is the smallest prime number?",
    "options": ["1", "2", "3", "5"],
    "answer": "2"
  },
  {
    "question": "Who discovered gravity?",
    "options": ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
    "answer": "Isaac Newton"
  },
  {
    "question": "What is the currency of Japan?",
    "options": ["Yuan", "Won", "Yen", "Ringgit"],
    "answer": "Yen"
  }
  
];

let currentQuestion = 0;
let score = 0;

// DOM elements
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const leaderboardList = document.getElementById('leaderboard');

// Load quiz questions
function loadQuiz() {
  const questionData = quizData[currentQuestion];
  quizContainer.innerHTML = `
    <div>
      <h3>${questionData.question}</h3>
      ${questionData.options.map(option => `
        <label>
          <input type="radio" name="option" value="${option}">
          ${option}
        </label><br>
      `).join('')}
    </div>
  `;
}

// Submit quiz
submitButton.addEventListener('click', () => {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    if (selectedOption.value === quizData[currentQuestion].answer) {
      score++;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuiz();
    } else {
      showResults();
      updateLeaderboard();
    }
  }
});

// Show results
function showResults() {
  quizContainer.innerHTML = '';
  resultsContainer.innerHTML = `Your score: ${score}/${quizData.length}`;
}

// Update leaderboard
function updateLeaderboard() {
  const username = prompt("Enter your name for the leaderboard:");
  if (username) {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ name: username, score: score });
    leaderboard.sort((a, b) => b.score - a.score); // Sort by score (descending)
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    loadLeaderboard();
  }
}

// Load leaderboard
function loadLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  leaderboardList.innerHTML = '';
  leaderboard.forEach((entry, index) => {
    leaderboardList.innerHTML += `<li>${index + 1}. ${entry.name}: ${entry.score}</li>`;
  });
}

// Initialize
loadQuiz();
loadLeaderboard();