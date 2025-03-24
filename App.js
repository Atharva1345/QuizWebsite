// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

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
    question: "What is React?",
    options: ["A framework", "A library", "A programming language", "A database"],
    answer: "A library"
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
  auth.signInAnonymously().then(() => {
    const user = auth.currentUser;
    db.collection('leaderboard').add({
      uid: user.uid,
      score: score,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  });
}

// Load leaderboard
function loadLeaderboard() {
  db.collection('leaderboard')
    .orderBy('score', 'desc')
    .limit(10)
    .onSnapshot(snapshot => {
      leaderboardList.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        leaderboardList.innerHTML += `<li>Score: ${data.score}</li>`;
      });
    });
}

// Initialize
loadQuiz();
loadLeaderboard();