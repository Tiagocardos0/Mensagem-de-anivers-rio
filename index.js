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
    text.innerHTML = '';
    let message = `
    ✨ Feliz Aniversário!!! ✨\n
    Ao grandioso Pedro Moretti,\n 
    desejo que o futuro te surpreenda\n
    com tudo o que você merece:\n 
    conquistas enormes,\n 
    reconhecimento\n 
    e uma jornada que só vai te elevar ainda mais.\n 
    Que você seja exaltado pelas suas vitórias,\n 
    e que a cada novo passo, seu brilho só aumente. \n
    O que está por vir será épico!\n
    Ao MELHOR, desejo todo sucesso do mundo!\n
    saudaçães: Tiago cardoso.\n
    🎉🎂🎈🎊🎁🎊🎈🎂🎉

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
        button.disabled = true;
      } else {
        button.disabled = false;
        setTimeout(() => {
            location.reload();
        },3000)
      }
      text.scrollTop = text.scrollHeight;
    }
  
    letter();
  });
