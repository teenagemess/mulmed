/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: ["Charles Dickens", "William Shakespeare", "J.K. Rowling", "Mark Twain"],
        correct: 1
    },
    {
        question: "What is the smallest prime number?",
        answers: ["0", "1", "2", "3"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const questionNumberElement = document.getElementById('question-number');
const answerButtons = document.querySelectorAll('.answer');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const quizContainer = document.getElementById('quiz');
const scoreElement = document.getElementById('score');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    nextQuestion();
}

function nextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionNumberElement.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionElement.innerText = question.question;
    question.answers.forEach((answer, index) => {
        const button = answerButtons[index];
        button.innerText = answer;
        button.classList.remove('correct', 'wrong', 'selected');
    });
}

function resetState() {
    nextButton.classList.add('hidden');
    answerButtons.forEach(button => {
        button.disabled = false;
        button.classList.remove('selected');
    });
}

function selectAnswer(index) {
    answerButtons.forEach(button => button.disabled = true);
    const correct = questions[currentQuestionIndex].correct;
    if (index === correct) {
        score++;
    }
    answerButtons[index].classList.add(index === correct ? 'correct' : 'wrong');
    nextButton.classList.remove('hidden');
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.innerText = 'Finish';
    }
}

function highlightSelected(index) {
    answerButtons.forEach((button, btnIndex) => {
        button.classList.remove('selected');
        if (btnIndex === index) {
            button.classList.add('selected');
        }
    });
}

answerButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        highlightSelected(index);
        selectAnswer(index);
    });
});

function finishQuiz() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreElement.innerText = `${score} out of ${questions.length}`;
}

function restartQuiz() {
    nextButton.innerText = 'Next';
    startQuiz();
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        nextQuestion();
    } else {
        finishQuiz();
    }
});

startQuiz();



