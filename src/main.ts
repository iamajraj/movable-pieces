import './style.css';

const board = document.querySelector('.board') as HTMLDivElement;
const allBox = document.querySelectorAll('.box') as NodeListOf<HTMLDivElement>;
const allCircles = document.querySelectorAll(
  '.circle'
) as NodeListOf<HTMLDivElement>;

class BoxInfo {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

let selectedCircle: HTMLDivElement | null = null;

allCircles.forEach((circle) => {
  circle.addEventListener('click', () => {
    allCircles.forEach((circle) => circle.classList.remove('selected'));
    circle.classList.add('selected');
    selectedCircle = circle;
  });
});

allBox.forEach((box) => {
  box.addEventListener('click', () => {
    if (!selectedCircle) return;
    setCirclePosition(
      new BoxInfo(
        box.offsetLeft,
        box.offsetTop,
        box.clientWidth,
        box.clientHeight
      ),
      selectedCircle
    );
  });
});

document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  let endLen = allBox.length - 1;
  for (let i = 0; i < allCircles.length; i++) {
    let circle = allCircles[i];
    let box = allBox[endLen - i];
    setCirclePosition(
      new BoxInfo(
        box.offsetLeft,
        box.offsetTop,
        box.clientWidth,
        box.clientHeight
      ),
      circle
    );
  }
}

function setCirclePosition(
  { x, y, width, height }: BoxInfo,
  circle: HTMLDivElement
) {
  circle.style.left = x + width / 2 - circle.clientWidth / 2 + 'px';
  circle.style.top = y + height / 2 - circle.clientHeight / 2 + 'px';
}

function getBoxFromXY(x: number, y: number): HTMLDivElement {
  let foundBox: HTMLDivElement | null = null;
  for (let i = 0; i < allBox.length; i++) {
    const box = allBox[i];
    if (x > box.offsetLeft && x < box.offsetLeft + box.clientWidth) {
      if (y > box.offsetTop && y < box.offsetTop + box.clientHeight) {
        foundBox = box;
        break;
      }
    }
  }
  return foundBox!;
}
