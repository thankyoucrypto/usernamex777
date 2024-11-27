


document.addEventListener("DOMContentLoaded", function () {
  // Ожидаем полной загрузки страницы
  setTimeout(function () {
    // После завершения загрузки убираем экран загрузки
    document.getElementById("loading-screen").style.opacity = 0;

    // Через 1 секунду (для плавного исчезновения) скрываем его полностью
    setTimeout(function () {
      document.getElementById("loading-screen").style.display = "none";
      document.querySelector(".content").style.display = "block"; // Показываем основной контент

      // Запускаем функции матрицы и печатания текста
      startMatrix();
      typeText();
    }, 1000); // 1 секунда для плавного исчезновения загрузочного экрана
  }, 2000); // Подождем 2 секунды на загрузку
});

function startMatrix() {
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let fontSize = window.innerWidth < 768 ? 10 : 16; // Меньший шрифт на мобильных
  let columns = canvas.width / fontSize;

  const drops = Array(Math.floor(columns)).fill(0);

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff99";
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, x) => {
      const text = matrix[Math.floor(Math.random() * matrix.length)];
      ctx.fillText(text, x * fontSize, y * fontSize);

      drops[x] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
    });
  }

  setInterval(drawMatrix, 50);
}

function typeText() {
  const text = "Hello, my name is YOLO!";
  let index = 0;

  function type() {
    const target = document.getElementById("typed-text");
    target.style.fontSize = window.innerWidth < 768 ? "1.5rem" : "3rem"; // Адаптивный шрифт
    if (index < text.length) {
      target.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }

  type();
}

// Обновляем размеры при ресайзе
window.addEventListener("resize", () => {
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let fontSize = window.innerWidth < 768 ? 10 : 16; // Переключение размера шрифта для матрицы
  let columns = canvas.width / fontSize;
  drops.length = Math.floor(columns);

  // Обновляем шрифт печатающегося текста
  const target = document.getElementById("typed-text");
  target.style.fontSize = window.innerWidth < 768 ? "1.5rem" : "3rem";
});

// Для управления классом .open при клике описания
function toggleDescription(element) {
  const description = element.querySelector('.description');
  if (description) {
    description.classList.toggle('open');
  }
}
