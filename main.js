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

// Random Section Component 

const randomSectionComponent = () => {
    
}

// Global Function
function createImgComponent(props) {
  const { imgTag, parentTag, source, name } = props;

  imgTag.src = source;
  imgTag.alt = name;
  parentTag.append(imgTag);
}
// JS code here with a change

const fetchtData = async () => {
  const url = "https://api.artic.edu/api/v1/artworks?page=2&limit=100";
  const response = await fetch(url);
  const data = await response.json();
  const data_artWork = data.data;
  const link = data_artWork.map((item) => {
    return {
      apiLink: item.api_link,
      title: item.title,
      image_id: item.image_id,
      date: item.date_display,
      artistName: item.artist_titles,
      details: item.medium_display
    };
  });
  return link;
};

const getData = async (number) => {
  let data = [];
  const api_Link = await fetchtData();
  const arrayShuffled = shuffleArray(api_Link);
  for (let i = 0; i < number; i++) {
    data.push(arrayShuffled.pop());
  }
  return data;
};

// THIS SECTIONS IS FOR THE SINGLE CONTAINER 
const getInfoForSectionOne = async (number) => {
    const getSingleData = async () => {
        const info = await getData(number)
        const result = info.map(item => {
            return item
        })
        return result
    }
    
    const printRandomContainer = async () => {
        const imgTag = document.querySelector("#single-image");
        const title = document.querySelector("#randomContainerTitle");
        const artist = document.querySelector("#randomContainerArtist");
        const date = document.querySelector("#randomContainerDate");
        const details = document.querySelector("#randomContainerDetails");
        
        const data = await getSingleData();
        data.map(x => {
            imgTag.src = `https://www.artic.edu/iiif/2/${x.image_id}/full/843,/0/default.jpg`;
            title.textContent = x.title
            artist.textContent = x.artistName
            date.textContent = x.date
            details.textContent = x.details
        })
    }
    printRandomContainer()

}

// THIS SECTION IS FOR THE 3 IMAGES CONTAINER
const getInfoForSectionTwo = async (number) => {
  const sourceUrl = async () => {
    let threeImgs = []
    const info = await getData(number);
    info.map((item) => {
        threeImgs.push(
          `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
        );
    });
    console.log(threeImgs)
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

getInfoForSectionOne(1)





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
});
