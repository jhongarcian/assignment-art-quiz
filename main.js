let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("open");
};
const sectionMain = document.querySelector("#main-section");
// HERO SECTION COMPONENT

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

// RANDOM SECTION COMPONENT

const randomSectionComponent = () => {
  const sectionRandomImg = document.createElement("section");
  sectionRandomImg.classList = "random-container section__container";
  sectionMain.insertBefore(sectionRandomImg, sectionMain.children[1]);

  divArtistContainerSectionRandom(sectionRandomImg);
  divInfoContainerSectionRandom(sectionRandomImg);

  getInfoForSectionOne(1);
};

const divArtistContainerSectionRandom = (sectionRandomImg) => {
  const divArtist = createHtmlElement({
    tag_Name: "div",
    class_Name: "artist-container",
    parent_Tag: sectionRandomImg,
  });

  createHtmlElement({
    tag_Name: "h2",
    id_Name: "randomContainerTitle",
    class_Name: "sub-title",
    parent_Tag: divArtist,
  });

  const divArtistContainerMain = createHtmlElement({
    tag_Name: "div",
    class_Name: "artist-container__main",
    parent_Tag: divArtist,
  });

  createHtmlElement({
    tag_Name: "span",
    id_Name: "randomContainerArtist",
    parent_Tag: divArtistContainerMain,
  });

  createHtmlElement({
    tag_Name: "img",
    id_Name: "single-image",
    parent_Tag: divArtistContainerMain,
  });
};
const divInfoContainerSectionRandom = (sectionRandomImg) => {
  const divInfoContainer = createHtmlElement({
    tag_Name: "div",
    class_Name: "info-container",
    parent_Tag: sectionRandomImg,
  });

  const divContainer = createHtmlElement({
    tag_Name: "div",
    parent_Tag: divInfoContainer,
  });

  createHtmlElement({
    tag_Name: "span",
    parent_Tag: divContainer,
    class_Name: "span-text",
    text_Content: "Date: ",
  });

  createHtmlElement({
    tag_Name: "span",
    parent_Tag: divContainer,
    class_Name: "span-text",
    id_Name: "randomContainerDate",
  });

  const divContainer2 = createHtmlElement({
    tag_Name: "div",
    parent_Tag: divInfoContainer,
  });

  createHtmlElement({
    tag_Name: "span",
    parent_Tag: divContainer2,
    class_Name: "span-text",
    id_Name: "",
    text_Content: "Details: ",
  });

  createHtmlElement({
    tag_Name: "span",
    parent_Tag: divContainer2,
    class_Name: "span-text",
    id_Name: "randomContainerDetails",
    text_Content: "Details: ",
  });
};

// Global Function
function createImgComponent(props) {
  const { imgTag, parentTag, source, name } = props;

  imgTag.src = source;
  imgTag.alt = name;
  parentTag.append(imgTag);
}
function createHtmlElement(props) {
  const { tag_Name, parent_Tag, class_Name, id_Name, text_Content } = props;
  const htmlTag = document.createElement(`${tag_Name}`);
  htmlTag.textContent = text_Content;
  htmlTag.id = id_Name;
  htmlTag.className = class_Name;
  parent_Tag.append(htmlTag);
  return htmlTag;
}
// JS code here with a change

const fetchtData = async () => {
  const url = "https://api.artic.edu/api/v1/artworks?page=3&limit=44";
  const response = await fetch(url);
  const data = await response.json();
  const data_artWork = data.data;
  const link = data_artWork.map((item) => {
    if (item.image_id) {
      return {
        apiLink: item.api_link,
        title: item.title,
        image_id: item.image_id,
        date: item.date_display,
        artistName: item.artist_titles,
        details: item.medium_display,
      };
    }
  });
  return link;
};

const getData = async (number) => {
  let data = [];
  const api_Link = await fetchtData();
  const arrayShuffled = shuffleArray(api_Link);
  console.log(arrayShuffled);
  for (let i = 0; i < number; i++) {
    data.push(arrayShuffled.pop());
  }
  console.log(arrayShuffled.length)
  return data;
};

// THIS SECTIONS IS FOR THE SINGLE CONTAINER
const getInfoForSectionOne = async (number) => {
  const getSingleData = async () => {
    const info = await getData(number);
    const result = info.map((item) => {
      return item;
    });
    console.log(result.length)
    return result;
  };

  const printRandomContainer = async () => {
    const imgTag = document.querySelector("#single-image");
    const title = document.querySelector("#randomContainerTitle");
    const artist = document.querySelector("#randomContainerArtist");
    const date = document.querySelector("#randomContainerDate");
    const details = document.querySelector("#randomContainerDetails");

    const data = await getSingleData();
    data.map((x) => {
      imgTag.src = `https://www.artic.edu/iiif/2/${x.image_id}/full/843,/0/default.jpg`;
      title.textContent = x.title;
      artist.textContent = x.artistName;
      date.textContent = x.date;
      details.textContent = x.details;
    });
  };
  printRandomContainer();
};

// THIS SECTION IS FOR THE 3 IMAGES CONTAINER
const getInfoForSectionTwo = async (number) => {
  const sourceUrl = async () => {
    let threeImgs = [];
    const info = await getData(number);
    info.map((item) => {
      threeImgs.push(
        `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
      );
    });
    console.log(threeImgs);
    return threeImgs;
  };

  const printSrcToHtml = async () => {
    const imgTag = document.querySelector("#single-image");
    const imgTag2 = document.querySelector("#single-image");
    const imgTag3 = document.querySelector("#single-image");
    const src = await sourceUrl();
    imgTag.src = src;
  };
  printSrcToHtml();
};

function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
window.addEventListener("DOMContentLoaded", (event) => {
  heroSectionComponent();
  randomSectionComponent();
});
