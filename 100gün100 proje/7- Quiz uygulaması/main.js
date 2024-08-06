const quizData = [
    {
        question: "Hangisi bir web tarayicisinda çalisir?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "CSS'içi Açalim.",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {

        question: "Html i Açalim.",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {

        question: "Javascript hangi yil piyasaya sürüldü?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "1999",
        correct: "b",
    },
];


const quiz = document.getElementById('quiz');
const answerElements = document.querySelectorAll('.answer');
const questionElement = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitButton = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

// tüm cevap seçeneklerini sıfırlamak için
const deselectAnswers = () => {
    answerElements.forEach((answer) => (answer.checked = false));
};

// seçilenleri getiriyor
const getSelected = function () {
    let answer;
    answerElements.forEach(answerElement => {
        if (answerElement.checked) {
            answer = answerElement.id;
        }
    });
    return answer;
};

// seçimi sıfrlayıp soruları getirme functionu
const loadQuzi = () => {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionElement.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
};


loadQuzi();

// seçim bölümü
submitButton.addEventListener('click', function () {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct){
            score++;
        } 
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuzi(); //data'da olanları getir
        } else {
            quiz.innerHTML = `
            <h2>cavaplardan ${quizData.length} / ${score}  Adedi doğru</h2>
            <button onclick="history.go(0)">Tekrar Oyna</button>
            `
        }
    }
});




