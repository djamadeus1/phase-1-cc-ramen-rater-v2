 //index.js

//import { error } from "happy-dom/cjs/PropertySymbol.cjs";

//import DOMExceptionNameEnum from "happy-dom/lib/exception/DOMExceptionNameEnum.js";
//document.addEventListener(DOMContentLoaded", () => { 

// Callbacks
const handleClick = (ramen) => {
  const detailImage = document.querySelector(".detail-image");// Add code
  const detailName = document.querySelector(".name");
  const detailRestaurant = document.querySelector(".restaurant");
  const ratingDisplay = document.getElementById("rating-display");
  const commentDisplay = document.getElementById("comment-display");

  detailImage.src = ramen.image;
  detailName.textContent =  ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.getElementById("new-ramen")
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const NewRamen = {
      name: document.getElementById("new-name").value,
      restaurant: document.getElementById("new-restaurant").value,
      image: document.getElementById("new-image").value,
      rating: document.getElementById("new-rating").value,
      comment: document.getElementById("new-comment").value,// Add code
};

fetch("http://localhost:3000/ramens", {
  method: "Post",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(NewRamen),
})
.then(response => response.json())
.then(data => {
  displayNewRamen(data);
  form.reset();
})
.catch(error => console.error("Error adding new ramen", error));
  
    displayNewRamen(NewRamen);
  
    form.reset();
  });
};

const displayNewRamen = (ramen)=> {
  const ramenmenu = document.getElementById("ramen-menu");
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;
  ramenmenu.appendChild(img);
}

const displayRamens = () => {
  const ramenmenu = document.getElementById("ramen-menu");
  fetch("http://localhost:3000/ramens")
  .then(response => response.json())
  .then(ramens => {
    console.log(ramens);
      ramens.forEach(ramen => {
        //console.log(ramens);
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener("click", () => handleClick(ramen));
      document.getElementById("ramen-menu").appendChild(img);
    });
  })
  .catch(error => console.error("Error fetching ramens:", error));
};

const main = () => {
  displayRamens();// Invoke displayRamens here
  addSubmitListener();// Invoke addSubmitListener here

  
}

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
