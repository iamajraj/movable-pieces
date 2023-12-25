import './style.css';

const board = document.querySelector('.board') as HTMLDivElement;
const allBox = document.querySelectorAll('.box') as NodeListOf<HTMLDivElement>;
const allCircles = document.querySelectorAll(
  '.circle'
) as NodeListOf<HTMLDivElement>;

const movesContainer = document.querySelector('.moves-container');

const team1 = document.querySelectorAll('.team1') as NodeListOf<HTMLDivElement>;
const team2 = document.querySelectorAll('.team2') as NodeListOf<HTMLDivElement>;

const GRID = 5;

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

document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  let endLen = allBox.length - 1;
  for (let i = 0; i < team1.length; i++) {
    let circle = team1[i];
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

  for (let i = 0; i < team2.length; i++) {
    let circle = team2[i];
    let box = allBox[i];
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

// ADD CLICK LISTENER
allCircles.forEach((circle) => {
  circle.addEventListener('click', () => {
    allCircles.forEach((circle) => circle.classList.remove('selected'));
    circle.classList.add('selected');
    selectedCircle = circle;
  });
});

// ADD CLICK LISTENER
allBox.forEach((box) => {
  box.addEventListener('click', () => {
    if (!selectedCircle) return;
    let prevBoxInfo = getBoxFromXY(
      selectedCircle.offsetLeft,
      selectedCircle.offsetTop
    );
    let nextBoxInfo = getBoxFromXY(box.offsetLeft, box.offsetTop);

    if (prevBoxInfo.move === nextBoxInfo.move) return;

    let newMove = document.createElement('div');
    newMove.classList.add('move');
    newMove.innerHTML = `<strong>${prevBoxInfo.move}</strong> -> <strong>${nextBoxInfo.move}</strong>`;
    movesContainer?.appendChild(newMove);
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

function setCirclePosition(
  { x, y, width, height }: BoxInfo,
  circle: HTMLDivElement
) {
  circle.style.left = x + width / 2 - circle.clientWidth / 2 + 'px';
  circle.style.top = y + height / 2 - circle.clientHeight / 2 + 'px';
}

function getBoxFromXY(x: number, y: number) {
  let foundBox: HTMLDivElement | null = null;
  let boxNumber = 0;
  for (let i = 0; i < allBox.length; i++) {
    const box = allBox[i];
    if (
      (x > box.offsetLeft || x === box.offsetLeft) &&
      (x < box.offsetLeft + box.clientWidth ||
        x === box.offsetLeft + box.clientWidth)
    ) {
      if (
        (y > box.offsetTop || y === box.offsetTop) &&
        (y < box.offsetTop + box.clientHeight ||
          y === box.offsetTop + box.clientHeight)
      ) {
        boxNumber = i;
        foundBox = box;
        break;
      }
    }
  }
  boxNumber = boxNumber + 1;
  let number = Math.ceil(boxNumber / GRID) - 1;
  let alphabetIdx = (boxNumber % GRID) - 1;
  alphabetIdx = alphabetIdx === -1 ? GRID - 1 : alphabetIdx;

  const GRID_ALPHABET = ['a', 'b', 'c', 'd', 'e'];

  let alphabet = GRID_ALPHABET[alphabetIdx];

  let move = `${alphabet}${number}`.toUpperCase();
  return { foundBox, move };
}
