// Canvas Animation
function initCanvasAnimation() {
  // console.log("Initializing canvas animation...");

  // 第一個 canvas 動畫 - 流動曲線效果
  const canvas1 = document.getElementById("intro-canvas-1");
  if (!canvas1) {
    console.error("Canvas1 not found");
    return;
  }
  const ctx1 = canvas1.getContext("2d");
  let time1 = 0;

  // 第二個 canvas 動畫 - 數字矩陣效果
  const canvas2 = document.getElementById("intro-canvas-2");
  if (!canvas2) {
    console.error("Canvas2 not found");
    return;
  }
  const ctx2 = canvas2.getContext("2d");

  // 設置 canvas 尺寸
  function setCanvasSize() {
    // 第一個 canvas
    const container1 = canvas1.parentElement;
    canvas1.width = container1.offsetWidth * 1.5;
    canvas1.height = container1.offsetHeight * 1.5;

    // 第二個 canvas
    const container2 = canvas2.parentElement;
    canvas2.width = container2.offsetWidth;
    canvas2.height = container2.offsetHeight;
  }

  // 初始化尺寸
  setTimeout(setCanvasSize, 100); // 延遲執行以確保 DOM 完全載入
  window.addEventListener("resize", setCanvasSize);

  // 第一個動畫 - 流動曲線
  function drawFlowingCurves() {
    ctx1.fillStyle = "rgba(9, 10, 10, 0.75)";
    ctx1.fillRect(0, 0, canvas1.width, canvas1.height);

    const curves = 5;
    for (let j = 0; j < curves; j++) {
      ctx1.beginPath();
      ctx1.strokeStyle = `hsla(${200 + j * 20}, 70%, 50%, 0.3)`;
      ctx1.lineWidth = 3;

      for (let i = 0; i < canvas1.width; i += 2) {
        const x = i;
        // 計算邊緣淡出效果
        const edgeFade = Math.sin((i / canvas1.width) * Math.PI);
        const y =
          canvas1.height / 2 +
          Math.sin(i * 0.01 + time1 + j * 0.8) *
            150 *
            Math.sin(time1 * 0.2) *
            edgeFade +
          Math.cos(i * 0.005 - time1 + j * 0.8) * 120 * edgeFade;

        if (i === 0) {
          ctx1.moveTo(x, y);
        } else {
          ctx1.lineTo(x, y);
        }
      }
      ctx1.stroke();
    }
    time1 += 0.015;
  }

  // 第二個動畫 - 數字矩陣
  class MatrixRain {
    constructor() {
      this.characters = "ABCDEF0123456789";
      this.fontSize = 24;
      this.columns = Math.floor(canvas2.width / (this.fontSize * 1.5));
      this.drops = [];

      // 初始化雨滴
      for (let i = 0; i < this.columns; i++) {
        this.drops[i] = Math.random() * -100;
      }
    }

    draw() {
      ctx2.fillStyle = "rgba(9, 10, 10, 0.05)";
      ctx2.fillRect(0, 0, canvas2.width, canvas2.height);

      ctx2.fillStyle = "#468672";
      ctx2.font = this.fontSize + "px monospace";

      for (let i = 0; i < this.drops.length; i++) {
        const text =
          this.characters[Math.floor(Math.random() * this.characters.length)];
        const x = i * this.fontSize;
        const y = this.drops[i] * this.fontSize;

        ctx2.fillStyle = `rgba(0, 255, 170, ${Math.random() * 0.1 + 0.5})`;
        ctx2.fillText(text, x, y);

        if (y > canvas2.height && Math.random() > 0.99) {
          this.drops[i] = 0;
        }
        this.drops[i]++;
      }
    }

    resize() {
      this.columns = Math.floor(canvas2.width / this.fontSize);
      this.drops = new Array(this.columns).fill(0);
    }
  }

  const matrixRain = new MatrixRain();

  // 動畫循環
  function animate() {
    drawFlowingCurves();
    matrixRain.draw();
    requestAnimationFrame(animate);
  }

  // 初始化
  setCanvasSize();
  window.addEventListener("resize", () => {
    setCanvasSize();
    matrixRain.resize();
  });

  // 使用 ResizeObserver 監聽容器大小變化
  const observer = new ResizeObserver(() => {
    setCanvasSize();
    matrixRain.resize();
  });
  observer.observe(canvas1.parentElement);
  observer.observe(canvas2.parentElement);

  // 開始動畫
  animate();
}

// 當 DOM 載入完成後初始化動畫
document.addEventListener("DOMContentLoaded", initCanvasAnimation);
