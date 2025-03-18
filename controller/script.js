const quizData = [
  {
      question: "Qual alternativa descreve essa informação?",
      description: "Pioneira da computação, foi uma das primeiras programadoras do computador Harvard Mark I, desenvolveu o primeiro compilador para linguagens de programação",
      a: "Maria da Penha",
      b: "Grace Hopper",
      c: "Ada Lovelace",
      d: "Margaret Thatcher",
      correct: "b",
  },
  {
    question: "Quem foi a primeira programadora da história?",
    description: "Ela é considerada a primeira programadora de computador da história e desenvolveu o primeiro algoritmo para uma máquina.",
    a: "Grace Hopper",
    b: "Ada Lovelace",
    c: "Hedy Lamarr",
    d: "Radia Perlman",
    correct: "b",
},
{
    question: "Quem foi a primeira mulher a desenvolver um software operacional?",
    description: "Ela foi uma pioneira em sistemas operacionais e é conhecida como a 'mãe dos sistemas operacionais modernos'.",
    a: "Grace Hopper",
    b: "Margaret Hamilton",
    c: "Ada Lovelace",
    d: "Karen Spärck Jones",
    correct: "b",
},
{
    question: "Quem é a fundadora da Zappos, uma das primeiras empresas a se destacar no e-commerce de sapatos?",
    description: "Ela ajudou a transformar o comércio eletrônico com a sua visão inovadora.",
    a: "Sheryl Sandberg",
    b: "Anne Wojcicki",
    c: "Tony Hsieh",
    d: "Michaela Johnson",
    correct: "d",
},
{
    question: "Quem foi uma das principais desenvolvedoras do primeiro computador portátil?",
    description: "Ela era engenheira de software e ajudou a criar o primeiro computador portátil da IBM nos anos 80.",
    a: "Grace Hopper",
    b: "Karen Spärck Jones",
    c: "Mary Lou Jepsen",
    d: "Barbara Liskov",
    correct: "c",
},
{
    question: "Quem fundou a empresa de inteligência artificial chamada 'C3.ai'?",
    description: "Ela é uma das mulheres mais proeminentes na área de inteligência artificial e uma das fundadoras da empresa 'C3.ai'.",
    a: "Jennifer Doudna",
    b: "Sheryl Sandberg",
    c: "Catherine B. Bessant",
    d: "Thomas Siebel",
    correct: "a",
},
{
    question: "Quem foi uma das inventoras do Wi-Fi?",
    description: "Ela foi uma das inventoras da tecnologia que revolucionou a comunicação sem fio.",
    a: "Hedy Lamarr",
    b: "Grace Hopper",
    c: "Megan Smith",
    d: "Martha Stewart",
    correct: "a",
}
];

const questionElement = document.getElementById("question");
const descriptionElement = document.getElementById("description");
const answerElements = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next");
const resultText = document.getElementById("result");

let currentQuiz = 0;
let score = 0;

// Função para leitura do texto com voz feminina
const speakText = (text) => {
  const speech = new SpeechSynthesisUtterance(text);  // Cria um objeto SpeechSynthesisUtterance
  speech.lang = 'pt-BR';  // Define o idioma como português
  speech.pitch = 1;  // Ajuste da altura da voz (1 é a padrão)
  speech.rate = 1;  // Velocidade da fala (1 é a padrão)
  speech.volume = 1;  // Volume (0.0 a 1.0)

  // Se houver uma voz feminina disponível, escolhe ela
  const voices = window.speechSynthesis.getVoices();
  const femaleVoice = voices.find(voice => voice.name.includes('Google') && voice.name.includes('Feminine'));
  if (femaleVoice) {
    speech.voice = femaleVoice;  // Define a voz feminina
  }

  window.speechSynthesis.speak(speech);  // Faz a leitura
};

const loadQuiz = () => {
  const currentQuizData = quizData[currentQuiz];
  questionElement.innerText = currentQuizData.question;
  descriptionElement.innerText = currentQuizData.description;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;

  // Lê a pergunta e a descrição
  speakText(currentQuizData.question);
  speakText(currentQuizData.description);

  // Lê as opções
  speakText(`Alternativa A: ${currentQuizData.a}`);
  speakText(`Alternativa B: ${currentQuizData.b}`);
  speakText(`Alternativa C: ${currentQuizData.c}`);
  speakText(`Alternativa D: ${currentQuizData.d}`);
};

const getSelected = () => {
  let selectedAnswer = null;
  answerElements.forEach((answer) => {
      if (answer.checked) {
          selectedAnswer = answer.id;
      }
  });
  return selectedAnswer;
};

submitButton.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
      if (answer === quizData[currentQuiz].correct) {
          resultText.innerText = "Correto!";
          resultText.style.color = "lime";
          speakText("Resposta correta!");
      } else {
          resultText.innerText = "Errado!";
          resultText.style.color = "red";
          speakText("Resposta errada.");
      }
      resultText.classList.remove("hidden");
      submitButton.classList.add("hidden");
      nextButton.classList.remove("hidden");
  }
});

nextButton.addEventListener("click", () => {
  currentQuiz++;
  answerElements.forEach((answer) => {
      answer.checked = false; // Resetar os botões de seleção
  });

  if (currentQuiz < quizData.length) {
      loadQuiz();
      resultText.classList.add("hidden");
      submitButton.classList.remove("hidden");
      nextButton.classList.add("hidden");

      // Lê "Próxima pergunta" quando o botão aparecer
      speakText("Próxima pergunta");
  } else {
      document.querySelector(".quiz-container").innerHTML = `
          <h2>Você respondeu ${score}/${quizData.length} corretamente</h2>
          <button onclick="location.reload()">Jogar Novamente</button>
      `;
      speakText("Fim do quiz. Você pode jogar novamente.");
  }
});

// Carregar a primeira pergunta ao iniciar
loadQuiz();
