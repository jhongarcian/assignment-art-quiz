
const sectionMain = document.querySelector("#main-section");
const app = document.querySelector("#app")

let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let trackingImagesState = [];
let correctAnswer = 0;
let correctPoints = 0;
let incorrectPoints = 0;
const singleContainerImgStage = []
const threeContainerImgStage = []

const setOf500images = []

// menu.onclick = () => {
//   menu.classList.toggle("bx-x");
//   navbar.classList.toggle("open");
// };
// Fetch Data

const fetchtData = async (limit) => {
  const pageNumber = Math.floor(Math.random() * 100);
  const url = `https://api.artic.edu/api/v1/artworks?page=${pageNumber}&limit=${limit}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const data_artWork = data.data;
    return data_artWork;
  } catch (error) {
    console.error(error);
  }
};

// SET 500 ARTWORKS IN STAGE

const feth500 = async () => {
  for(let i = 0 ; i < 5; i++){
    const data = await fetchtData(100)
    setOf500images.push(...data)
  }
   quizSectionComponent()
}
feth500()

// HEADER SECTION COMPONENT 

const createHeader = () => {
  const header = document.createElement("header")
  app.append(header)

  createLogo(header)

  createNav(header)

  createBurgerIcon(header)
  
}

const createLogo = (parentTag) => {
  const anchor = document.createElement("a")
  anchor.className = "logo"
  parentTag.append(anchor)

  const img = document.createElement("img")
  img.src = "./assets/Art Quiz Logo.png"
  img.className = "logo"
  anchor.append(img)
}

const createNav = (parentTag) => {
  const ul = document.createElement("ul")
  ul.className = "navbar"
  parentTag.append(ul)

  const anchor1 = document.createElement("a")
  anchor1.textContent = "Quiz App"
  anchor1.href = "#image-quiz-container"
  ul.append(anchor1)

  const anchor2 = document.createElement("a")
  anchor2.textContent = "Galleria"
  anchor2.href = "#galleria"
  ul.append(anchor2)
}

const createBurgerIcon = (parentTag) => {
  const burgerIcon = document.createElement("div")
  burgerIcon.className = "main"
  parentTag.append(burgerIcon)

  const div = document.createElement("div")
  div.className = "bx bx-menu"
  div.id = "menu-icon"
  burgerIcon.append(div)
}

// MAIN SECTION COMPONENT

const createMainSection = () => {
  const main = document.createElement("main")
  main.className = "flex-container"
  main.id = "main-section"
  app.append(main)
}

// HERO SECTION COMPONENT

const createHeroSection = () => {
  const sectionMain = document.querySelector("#main-section");
  const sectionHero = document.createElement("section");
  sectionHero.className = "hero-container";
  sectionMain.insertBefore(sectionHero, sectionMain.children[0]);

  const img = document.createElement("img");
  img.src = "./assets/hero-img.jpg"
  img.alt = "Hero Section"
  sectionHero.append(img)

  const div = document.createElement("div");
  sectionHero.append(div)

  const section = document.createElement("section");
  sectionHero.append(section)

  headLineComponent(sectionHero, div)
  scultureComponent(sectionHero, section)
};
const headLineComponent = (sectionHero, divTag) => {

  const anchor = document.createElement("a");
  anchor.textContent = "let's play";
  anchor.href = "#";
  divTag.append(anchor);

  const h3 = document.createElement("h3");
  divTag.className = "hero-container-text";
  sectionHero.append(divTag);
  h3.textContent = "test your art knoledge";
  divTag.append(h3);
};
const scultureComponent = (sectionHero, divTag) => {

  const div = document.createElement("div");
  divTag.append(div);
  div.className = "hero-flex-container";

  const img = document.createElement("img");
  img.src = "./assets/item-sculture.png"
  img.alt = "sculture"
  div.append(img)

  sectionHero.append(divTag);
};

// RANDOM SECTION COMPONENT

const randomSectionComponent = () => {
  const sectionMain = document.querySelector("#main-section");
  const sectionRandomImg = document.createElement("section");
  sectionRandomImg.classList = "random-container section__container";
  sectionMain.insertBefore(sectionRandomImg, sectionMain.children[1]);

  divArtistContainerSectionRandom(sectionRandomImg);
  divInfoContainerSectionRandom(sectionRandomImg);
};

const divArtistContainerSectionRandom = (sectionRandomImg) => {
  const divArtist = document.createElement("div")
  divArtist.className = "artist-container"
  sectionRandomImg.append(divArtist)

  const h2 = document.createElement("h2")
  h2.id = "randomContainerTitle"
  h2.className = "sub-title"
  divArtist.append(h2)

  const divArtistContainerMain = document.createElement("div")
  divArtistContainerMain.className = "artist-container__main"
  divArtist.append(divArtistContainerMain)

  const span = document.createElement("span")
  span.id = "randomContainerArtist"
  divArtistContainerMain.append(span)

  const img = document.createElement("img")
  img.id = "single-image"
  divArtistContainerMain.append(img)

};

const divInfoContainerSectionRandom = (sectionRandomImg) => {

  const divInfoContainer = document.createElement("div")
  divInfoContainer.className = "info-container"
  sectionRandomImg.append(divInfoContainer)

  const divContainer = document.createElement("div")
  divInfoContainer.append(divContainer)

  const span = document.createElement("span")
  span.className = "span-text"
  span.textContent = "Date: "
  divContainer.append(span)

  const spanRandomContainerDate = document.createElement("span")
  spanRandomContainerDate.className = "span-text"
  spanRandomContainerDate.id = "randomContainerDate"
  divContainer.append(spanRandomContainerDate)


  const divContainer2 = document.createElement("div")
  divInfoContainer.append(divContainer2)

  const spanDetails = document.createElement("span")
  spanDetails.className = "span-text"
  spanDetails.textContent = "Details: "
  divContainer2.append(spanDetails)

  const spanDetailsContainer = document.createElement("span")
  spanDetailsContainer.className = "span-text"
  spanDetailsContainer.id = "randomContainerDetails"
  spanDetailsContainer.textContent = "Details: "
  divContainer2.append(spanDetailsContainer)

};

const printRandomContainer = (data) => {
  const imgTag = document.querySelector("#single-image");
  const title = document.querySelector("#randomContainerTitle");
  const artist = document.querySelector("#randomContainerArtist");
  const date = document.querySelector("#randomContainerDate");
  const details = document.querySelector("#randomContainerDetails");
  
  data.map((x) => {
    imgTag.src = `https://www.artic.edu/iiif/2/${x.image_id}/full/843,/0/default.jpg`;
    title.textContent = x.title;
    artist.textContent = x.artist_title;
    date.textContent = x.date_display;
    details.textContent = x.artist_display;
  });
};

const getImageForSingleContainer = async () => {
  const data = await fetchtData(20);
  const dataShuffled = shuffleArray(data);
  const cleanData = dataShuffled.filter(item => item.image_id)
  if(singleContainerImgStage.length === 1){
   printRandomContainer(singleContainerImgStage)
   return
  }
  for(let i = 0; i < cleanData.length; i++){
    if(cleanData[i].image_id && cleanData[i].artist_title){
      singleContainerImgStage.push(cleanData.pop());
      printRandomContainer(singleContainerImgStage)
      break
    }
  }
};

// THREE IMAGES TO AWAKEN YOUR SENSES COMPONENT

const threeImagesSectionComponent = () => {
  const sectionMain = document.querySelector("#main-section");
  const section = document.createElement("section")
  section.id = "galleria"
  section.className = "three-images-container section__container"
  sectionMain.insertBefore(section, sectionMain.children[2]);

  const h2 = document.createElement("h2")
  h2.classList = "sub-title section-2"
  h2.textContent = "Three Images to Awaken Your Senses"
  section.append(h2)

  threeImagesDivContainer(section)
}

const threeImagesDivContainer = (parentTag) => {
  const imagesContainerDiv = document.createElement("div")
  imagesContainerDiv.className = "images-container"
  parentTag.append(imagesContainerDiv)

  for(let i = 0; i < 3; i++){
    const div = document.createElement("div")
    div.className = "image-container"
    div.setAttribute("container-three-images", "")
    imagesContainerDiv.append(div)

    const img = document.createElement("img")
    img.src = ""
    img.all = ""
    div.append(img)

    const span = document.createElement("span")
    span.className = "span-text"
    span.textContent = ""
    div.append(span)
  }
}

const getImagesForThreeImgContainer = async () => {
  for(let i = 0; i < 3 ; i++){
    const data = await fetchtData(30);
    const dataShuffled = shuffleArray(data)
    const dataWithImages = dataShuffled.filter(item => item.image_id)
    setThreeImgsContainerData(dataWithImages)
  }
  printThreeImagesContainer()
}

const setThreeImgsContainerData = (dataShuffled) => {

  if(threeContainerImgStage.length === 3)return
  for(let i = 0; i < dataShuffled.length; i++){
    if(dataShuffled[i].image_id && dataShuffled[i].artist_title){
      threeContainerImgStage.push(dataShuffled.pop());
      break
    }
  }
}

const printThreeImagesContainer = () => {
  const container = document.querySelectorAll("[container-three-images]")
  for(let i = 0; i < container.length; i++){
    container[i].childNodes[0].src = `https://www.artic.edu/iiif/2/${threeContainerImgStage[i].image_id}/full/843,/0/default.jpg`

    container[i].childNodes[1].textContent = `${threeContainerImgStage[i].title}`
  }
}

// QUIZ SECTION COMPONENT 

const createQuizSectionComponent = () => {
  const sectionMain = document.querySelector("#main-section");
  const section = document.createElement("section")
  section.className = "quiz-container section__container"
  sectionMain.append(section)

  const h2 = document.createElement("h2")
  h2.className = "sub-title"
  h2.textContent = "Timeless Paintings Challenge"
  section.append(h2)

 const div = document.createElement("div")
 section.append(div)

 createQuizContainer(div)

}

const createQuizContainer = (parentTag) => {
  const div = document.createElement("div")
  div.className = "quiz-container_images"
  parentTag.append(div)

  createStateTrackingDiv(div)
  createQuestion(div)
  createQuizImageContainer(div)
  createButtonReset(div)
  
}

const createStateTrackingDiv = (parentTag) => {
  createStateTracking(parentTag)

}

const createStateTracking = (parentTag) =>{
  const stateTrackingDiv = document.createElement("div")
  stateTrackingDiv.className = "state-tracking"
  parentTag.append(stateTrackingDiv)

  const div = document.createElement("div")
  div.className = "question-count"
  stateTrackingDiv.append(div)

  const spanParent = document.createElement("span")
  spanParent.className = "span-text question-span"
  spanParent.textContent = "Question: "
  div.append(spanParent)

  const spanChildren = document.createElement("span")
  spanChildren.id = "current-question"
  spanChildren.textContent = "1"
  div.append(spanChildren)

  const spanChildren10 = document.createElement("span")
  spanChildren10.textContent =" / 10"
  div.append(spanChildren10)

  createScoreText(stateTrackingDiv)
  createScoreTracker(stateTrackingDiv)
}

const createScoreText = (parentTag) => {
  const div = document.createElement("div")
  div.className = "score-text"
  div.textContent = "Performance Score: "
  parentTag.append(div)

  const span = document.createElement("span")
  span.id = "current-performance-score"
  span.textContent = "0%"
  div.append(span)


}

const createScoreTracker = (parentTag) => {
  const div = document.createElement("div")
  div.className = "score-tracker"
  parentTag.append(div)

  const divScore = document.createElement("div")
  divScore.id = "score-bar"
  divScore.className = "score-bar"
  divScore.style = "widht: 0%;"
  div.append(divScore)
}

const createQuestion = (parentTag) => {
  const span = document.createElement("span")
  span.className = "span-text"
  span.textContent = "Select the work created by "
  parentTag.append(span)

  const spanQuestion = document.createElement("span")
  spanQuestion.className = "span-text"
  spanQuestion.id = "question-name"

  span.append(spanQuestion)

}

const createQuizImageContainer = (parentTag) => {
  const div = document.createElement("div")
  div.id = "image-quiz-container"
  div.className = "image-grid"
  parentTag.append(div)
}

const createButtonReset = (parentTag) => {
  const button = document.createElement("button")
  button.className = "btn"
  button.textContent = "Reset"
  button.id = "re-start-btn"
  parentTag.append(button)
}

//  QUIZ SECTION

const printImagesToQuizContainer = async (number) => {
  const isImageContainerInDom = document.querySelectorAll("[data-id]");
  const containerImgDisplay = document.querySelector("#image-quiz-container");
  const spinner = document.querySelector("#spinner");

  if (isImageContainerInDom.length > 0) {
    const data = await getSingleData(number, setOf500images);
    isImageContainerInDom.forEach((item) => item.remove());
    setQuestion(data);
    trackingImagesState = data;
    for (let i = 0; i < number; i++) {
      const img = document.createElement("img")
      img.src = `https://www.artic.edu/iiif/2/${data[i].image_id}/full/843,/0/default.jpg`
      img.className = "quiz-art-work"
      img.dataset.id = data[i].id
      containerImgDisplay.append(img)
    }
  }
  if (isImageContainerInDom.length === 0) {
    const data = await getSingleData(number, setOf500images);
    setQuestion(data);
    trackingImagesState = data;
    for (let i = 0; i < number; i++) {
      const img = document.createElement("img")
      img.src = `https://www.artic.edu/iiif/2/${data[i].image_id}/full/843,/0/default.jpg`
      img.className = "quiz-art-work"
      img.dataset.id = data[i].id
      containerImgDisplay.append(img)
    }
  }
  if (spinner) {
    spinner.remove();
    containerImgDisplay.removeAttribute("style");
  }
};

const getRandomElemFormArray = (array) => {
  const randomedElement = array[Math.floor(Math.random() * array.length)];
  return randomedElement;
};

const setQuestion = (data) => {
  const questionName = document.querySelector("#question-name");
  const imagesWithName = data.filter((item) => item.artist_title);
  const questionElement = getRandomElemFormArray(imagesWithName);
  correctAnswer = questionElement.id;
  questionName.textContent = questionElement.artist_title;
};

const quizSectionComponent = () => {
  printImagesToQuizContainer(4);
};

const spinerComponent = () => {
  const container = document.querySelector("#image-quiz-container");
  container.style = " pointer-events: none; ";

  const spinner = document.createElement("div")
  spinner.className = "spinner"
  spinner.id = "spinner"
  container.append(spinner)

  return spinner;
};

const reachedTen = () => {
  const currentQuestion = document.querySelector("#current-question");
  const currentPerformanceScore = document.querySelector(
    "#current-performance-score"
  );
  const currentScoreBar = document.querySelector("#score-bar");

  let currentQuestionNumber = currentQuestion.textContent * 1;
  let dataPoints = 0
  let performanceScore = ""

  if (currentQuestionNumber === 10) {
    dataPoints = correctPoints
    performanceScore = currentPerformanceScore.textContent
    correctPoints = 0;
    currentQuestion.innerText = 1;
    currentPerformanceScore.textContent = `${correctPoints * 10}%`;
    currentScoreBar.style = `width: ${correctPoints * 10}%;`;
  }
};

// FOOTER COMPONENT

const createFooter = () => {
  const footer = document.createElement("footer")
  app.append(footer)

  const span = document.createElement("span")
  span.textContent = "Created by Michael Jones and John Garcia"
  footer.append(span)

}

// GLOBAL FUNCTIONS

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

async function getSingleData(number, data) {
  let fourArtWorks = []
  const cleanData = data.filter(item => item.image_id && item.artist_title && item.artist_title !== "Unknown")
  for(let i = 0; i < number;i++){
    const dataShuffled = shuffleArray(cleanData)
    fourArtWorks.push(dataShuffled.pop())
  }
  return fourArtWorks
}

// RENDER

async function render() {
  createHeader()
  createMainSection()
  createHeroSection()
  randomSectionComponent()
  getImageForSingleContainer()
  threeImagesSectionComponent()
  getImagesForThreeImgContainer()
  createQuizSectionComponent()
  createFooter()
}

render()

document.addEventListener("click", (event) => {
  const currentQuestion = document.querySelector("#current-question");
  const currentPerformanceScore = document.querySelector(
    "#current-performance-score"
  );
  const currentScoreBar = document.querySelector("#score-bar");

  const targetId = event.target.dataset.id * 1;

  let currentQuestionNumber = currentQuestion.textContent * 1;
  if (currentQuestionNumber === 10) {
    console.log("reached");
    return;
  }
  if (event.target.matches("[data-id") && targetId === correctAnswer) {
    correctPoints += 1;
    currentQuestion.innerText = 1 + currentQuestionNumber;
    currentPerformanceScore.textContent = `${correctPoints * 10}%`;
    currentScoreBar.style = `width: ${correctPoints * 10}%;`;
    spinerComponent();
    printImagesToQuizContainer(4);
    reachedTen();

    return;
  }
  if (event.target.matches("[data-id]") && targetId !== correctAnswer) {
    currentQuestion.innerText = 1 + currentQuestionNumber;
    spinerComponent();
    printImagesToQuizContainer(4);
    reachedTen();

    return;
  }
});
