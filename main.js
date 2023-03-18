let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("open");
};
const sectionMain = document.querySelector("#main-section");
// Hero Section Component

const heroSectionComponent = () => {
  const sectionHero = document.createElement("section");
  const img = document.createElement("img");
  const div = document.createElement("div");
  const section = document.createElement("section");
  sectionHero.className = "hero-container";
  sectionMain.insertBefore(sectionHero, sectionMain.children[0]);
  createImgComponent({
    imgTag: img,
    parentTag: sectionHero,
    source: "./assets/hero-img.jpg",
    name: "Hero section",
  });
  headLineComponent({
    tag: div,
    parentTag: sectionHero,
  });
  scultureComponent({
    tag: section,
    parentTag: sectionHero,
  });
};
const headLineComponent = (props) => {
  const { parentTag, tag } = props;

  const anchor = document.createElement("a");
  const h3 = document.createElement("h3");
  tag.className = "hero-container-text";
  parentTag.append(tag);
  anchor.textContent = "let's play";
  anchor.href = "#";
  tag.append(anchor);
  h3.textContent = "test your art knoledge";
  tag.append(h3);
};
const scultureComponent = (props) => {
  const { tag, parentTag } = props;
  const div = document.createElement("div");
  const img = document.createElement("img");
  tag.append(div);
  div.className = "hero-flex-container";
  createImgComponent({
    imgTag: img,
    parentTag: div,
    source: "./assets/item-sculture.png",
    name: "sculture",
  });
  parentTag.append(tag);
};

// Global Function
function createImgComponent(props) {
  const { imgTag, parentTag, source, name } = props;

  imgTag.src = source;
  imgTag.alt = name;
  parentTag.append(imgTag);
}
// JS code here with a change

window.addEventListener("DOMContentLoaded", (event) => {
  heroSectionComponent();
});
