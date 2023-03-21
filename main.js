let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let trackingImagesState = [];
let correctAnswer = 0;
let correctPoints = 0
let incorrectPoints = 0

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

  printRandomContainer(1);
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
  const {
    tag_Name,
    parent_Tag,
    class_Name,
    id_Name,
    text_Content,
    source,
    dataAttribute,
  } = props;
  const htmlTag = document.createElement(`${tag_Name}`);
  htmlTag.textContent = text_Content;
  if (id_Name) {
    htmlTag.id = id_Name;
  }
  if (class_Name) {
    htmlTag.className = class_Name;
  }
  if (source) {
    htmlTag.src = source;
  }
  if (dataAttribute) {
    htmlTag.dataset.id = dataAttribute;
  }
  parent_Tag.append(htmlTag);
  return htmlTag;
}

const fetchtData = async () => {
  const pageNumber = Math.floor(Math.random() * 20);
  const url = `https://api.artic.edu/api/v1/artworks?page=${pageNumber}&limit=40`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const data_artWork = data.data;
    const link = data_artWork.map((item) => {
      if (item.image_id) {
        return {
          id: item.id,
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
  } catch(error){
    console.error(error)
  }
};

const getData = async (number) => {
  let data = [];
  try {
    const api_Link = await fetchtData();
    const cleanData = api_Link.filter(
      (item) => item !== undefined && item.artistName.length !== 0
    );
    // question about this line of code
    const uniqueArtworks = cleanData.filter((artwork, index, array) => {
      return !array.slice(0, index).some((prevArtwork) => {
        return prevArtwork.artistName[0] === artwork.artistName[0];
      });
    });
  
    const arrayShuffled = shuffleArray(uniqueArtworks);
    for (let i = 0; i < number; i++) {
      data.push(arrayShuffled.pop());
    }
    return data;
  } catch(error) {
    console.log(error)
  }
};

// THIS SECTIONS IS FOR THE SINGLE CONTAINER
const getSingleData = async (number) => {
  try {
    const info = await getData(number);
    const result = info.map((item) => {
      return item;
    });
    console.log(result)
    return result;
  } catch(error) {
    console.log(error)
  }
};

const printRandomContainer = async (number) => {
  const imgTag = document.querySelector("#single-image");
  const title = document.querySelector("#randomContainerTitle");
  const artist = document.querySelector("#randomContainerArtist");
  const date = document.querySelector("#randomContainerDate");
  const details = document.querySelector("#randomContainerDetails");

  const data = await getSingleData(number);
  data.map((x) => {
    imgTag.src = `https://www.artic.edu/iiif/2/${x.image_id}/full/843,/0/default.jpg`;
    title.textContent = x.title;
    artist.textContent = x.artistName;
    date.textContent = x.date;
    details.textContent = x.details;
  });
};

// THIS SECTION IS FOR THE 3 IMAGES CONTAINER
// const getInfoForSectionTwo = async (number) => {
//   const sourceUrl = async () => {
//     let threeImgs = [];
//     const info = await getData(number);
//     info.map((item) => {
//       threeImgs.push(
//         `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
//       );
//     });
//     console.log(threeImgs);
//     return threeImgs;
//   };

//   const printSrcToHtml = async () => {
//     const imgTag = document.querySelector("#single-image");
//     const imgTag2 = document.querySelector("#single-image");
//     const imgTag3 = document.querySelector("#single-image");
//     const src = await sourceUrl();
//     imgTag.src = src;
//   };
//   printSrcToHtml();
// };

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

//  QUIZ SECTION

const printImagesToQuizContainer = async (number) => {
  const isImageContainerInDom = document.querySelectorAll("[data-id]");
  const containerImgDisplay = document.querySelector("#image-quiz-container");
  const spinner = document.querySelector("#spinner")
  try {
    console.log(spinner)
    if (isImageContainerInDom.length > 0) {
      const data = await getSingleData(number);
      isImageContainerInDom.forEach((item) => item.remove());
      setQuestion(data);
      trackingImagesState = data;
      for (let i = 0; i < number; i++) {
        createHtmlElement({
          tag_Name: "img",
          parent_Tag: containerImgDisplay,
          source: `https://www.artic.edu/iiif/2/${data[i].image_id}/full/843,/0/default.jpg`,
          dataAttribute: data[i].id,
        });
      }
    }
    if (isImageContainerInDom.length === 0) {
      const data = await getSingleData(number);
      setQuestion(data);
      trackingImagesState = data;
      for (let i = 0; i < number; i++) {
        createHtmlElement({
          tag_Name: "img",
          parent_Tag: containerImgDisplay,
          source: `https://www.artic.edu/iiif/2/${data[i].image_id}/full/843,/0/default.jpg`,
          dataAttribute: data[i].id,
        });
      }
    }
    if(spinner) {
      spinner.remove();
      containerImgDisplay.removeAttribute("style")
    }
  } catch(error){
    console.error(error)
  }
};

const getRandomElemFormArray = (array) => {
  const randomedElement = array[Math.floor(Math.random() * array.length)];
  return randomedElement;
};

const setQuestion = (data) => {
  const questionName = document.querySelector("#question-name");
  // having an issue when the artist name is not there
  console.log(data)
  const imagesWithName = data.filter((item) => item.artistName.length >= 0);
  const questionElement = getRandomElemFormArray(imagesWithName);
  correctAnswer = questionElement.id 
  questionName.textContent = questionElement.artistName[0];
};

const quizSectionComponent = () => {
  printImagesToQuizContainer(4);
};

const spinerComponent = () => {
  const container = document.querySelector("#image-quiz-container");
  container.style = " pointer-events: none; ";
  const spinner = createHtmlElement({
    parent_Tag: container,
    tag_Name: "div",
    class_Name: "spinner",
    id_Name: "spinner",
  });
  return spinner
} 

document.addEventListener("click", (event) => {
  const currentQuestion = document.querySelector("#current-question");
  const currentPerformanceScore = document.querySelector(
    "#current-performance-score"
  );
  const currentScoreBar = document.querySelector("#score-bar");
  let currentQuestionNumber = currentQuestion.textContent * 1
  if(currentQuestion === 10) return
  if (event.target.matches("[data-id")) {
    const targeId = event.target.dataset.id * 1
    if(targeId === correctAnswer){
      correctPoints += 1
      currentQuestion.innerText = 1 + currentQuestionNumber
      currentPerformanceScore.textContent = `${correctPoints * 10}%`
      currentScoreBar.style = `width: ${correctPoints * 10}%;`;
      spinerComponent()
    } else {
      currentQuestion.innerText = 1 + currentQuestionNumber
      spinerComponent()
    }
    printImagesToQuizContainer(4);
  }
});
window.addEventListener("DOMContentLoaded", (event) => {
  heroSectionComponent();
  randomSectionComponent();
  quizSectionComponent();
});
