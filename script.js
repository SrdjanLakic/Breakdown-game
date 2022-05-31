const grid = document.querySelector(".grid");
const blockWidth = 100;
const blockHeight = 20;

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

function addBlock() {
  const block = document.createElement("div");
  block.classList.add("block");
  block.style.marginLeft = "100px";
  block.style.marginBottom = "100px";
  grid.appendChild(block);
}

addBlock();
