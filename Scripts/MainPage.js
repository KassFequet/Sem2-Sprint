// Stephen JS
// reviews
let Reviews = [
    "I asked for a latter and the barista handed me a mirror and said, 'You are the caffeine.' I've never felt so awake. - Jules",
    "Their espresso hit me so hard I briefly remembered being born. - Milo",
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
setInterval(cycleReviews, 3000);        // change every 3 seconds

// images
let step = 0;
let Images = new Array();   // initialize array

Images [0] =".../ImagesMain/Coffee";
Images [1] =".../ImagesMain/Barista";
Images [2] =".../ImagesMain/Inside";
Images [3] =".../ImagesMain/Outside";

window.onload = function () {
  gallery();                        // show first image immediately
  setInterval(gallery, 3000);       // then starts slideshow after load
};

function gallery() {
    document.getElementById("ImagesMain").src = Images[step]

    if (step < Images.length -1) {
        step ++     // if step is less than array length go to next image
    } else {
        step = 0    // if step is at the end of the array, loop
    }
}
