// Stephen JS

// images
let step = 0;
let Images = new Array();   // initialize array

Images[0] = "../Images/Main/Coffee.jpg";
Images[1] = "../Images/Main/Barista.jpg";
Images[2] = "../Images/Main/Inside.jpg";
Images[3] = "../Images/Main/Outside.jpg";

window.onload = function () {
  gallery();                        // Show first image immediately
  setInterval(gallery, 4000);       // then starts slideshow after load
};

function gallery() {
    document.getElementById("imageSlideshow").src = Images[step]

    if (step < Images.length -1) {
        step ++     // if step is less than array length go to next image
    } else {
        step = 0    // if step is at the end of the array, loop
    }
}

// reviews
let Reviews = [
    "I asked for a latte and the barista handed me a mirror and said, 'You are the caffeine.' I've never felt so awake. - Jules",
    "The scones summoned my ancestors. I didn't expect séance energy from a pastry, but here we are. - Ethel",
    "They put glitter in my chai latter. I didn't ask for it, but honestly? I get it now. - Becca",
    "I came here for coffee and left with existential dread and a cinnamon bun. 10/10. - Trent",
];

let reviewIndex = 0;
const reviewDisplay = document.getElementById("reviewDisplay");

function cycleReviews() {
  reviewDisplay.textContent = Reviews[reviewIndex];
  reviewIndex = (reviewIndex + 1) % Reviews.length;     // increases the reviewIndex by 1, then if the reviewIndex divided by length = 0, loops back to index 0
}

cycleReviews();                         // show first review immediately
setInterval(cycleReviews, 6000);        // change every 3 seconds
