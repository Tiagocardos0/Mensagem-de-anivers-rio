const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
const button = document.querySelector("button");
const cake = document.querySelector(".cake");
const text = document.querySelector(".text");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetes = [];

function criarConfetes() {
    confetes = [];
    for (let i = 0; i < 150; i++) {
        confetes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 10 + 5,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`,
            tilt: Math.random() * 10 - 5
        });
    }
}

function desenharConfetes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetes.forEach((c, i) => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, false);
        ctx.fillStyle = c.color;
        ctx.fill();

        c.y += c.d * 0.5;
        c.x += Math.sin(c.y / 10) * 2;

        if (c.y > canvas.height) {
            confetes[i] = { ...c, y: -10, x: Math.random() * canvas.width };
        }
    });

    if (confetes.length > 0) {
        requestAnimationFrame(desenharConfetes);
    }
}

function startConfetti() {
    criarConfetes();
    desenharConfetes();
}

button.addEventListener("click", () => {
    startConfetti();
    cake.style.display = 'block';
  
    let message = `
    🎀✨ Feliz Aniversário, Ana! ✨🎀\n
    Hoje é o dia em que o universo se alinha para celebrar você! 🌟\n
    Uma garota incrível, cheia de luz, sonhos e uma energia que contagia todos ao seu redor.\n
    Que este novo ano da sua vida seja repleto de:\n
    💖 Amor que aquece o coração,\n
    🌈 Aventuras que fazem os olhos brilharem,\n
    📚 Conquistas que enchem a alma de orgulho,\n
    🎨 Criatividade para colorir cada dia,\n
    e, claro, muitos doces para adoçar ainda mais a vida! 🍰🍭\n
    Feliz 18tão!\n
    AÍ está algo diferenciado,  Ass: você sabe quem!😉
    `.trim();
  
    let i = 0;
  
    text.innerHTML = '';
  
    function letter() {
      // Substitui \n por <br>
      const char = message[i] === '\n' ? '<br>' : message[i];
      text.innerHTML += char;
      i++;
  
      if (i < message.length) {
        setTimeout(letter, 100);
      }
      text.scrollTop = text.scrollHeight;
    }
  
    letter();
  });
