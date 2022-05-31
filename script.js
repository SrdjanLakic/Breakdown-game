const grid = document.querySelector(".grid");
const blockWidth = 100;
const blockHeight = 20;

function addBlock() {
  const block = document.createElement("div");
  block.classList.add("block");
  block.style.marginLeft = "100px";
  block.style.marginBottom = "100px";
  grid.appendChild(block);
}

addBlock();
