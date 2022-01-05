//Right Arrow & Left Arrow
let rightArrow = document.querySelector(".right-arrow");
let leftArrow = document.querySelector(".left-arrow");
//List of all of the screens in carousel
let screenStore = document.querySelectorAll("#carousel-1 .carousel-screen");
let numOfScreens = screenStore.length;
//List of all the circle stores
let circleStore = document.querySelectorAll("#carousel-1 .circle-container .circle");
//number to target main screen
let currentScreen = 0;
//currently in animation or not
let inAnim = false;
//Animation Time
let animTime = 500;

//Sort out starting position
sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
//Sort out circle styling
highlightCircle(circleStore[0]);

//User clicks on rightArrow
rightArrow.addEventListener("click", () => {
    startAnim("right");
});

//User clicks on the leftArrow
leftArrow.addEventListener("click", () => {
    startAnim("left");
});

//Start animation. Either towards left or right
function startAnim(direction) {
    if(!inAnim) {
        inAnim = true;
        if(direction === "right") {
            moveRight();
            highlightCircle(circleStore[currentScreen + 1], "right");
        }else if(direction === "left"){
            moveLeft();
            highlightCircle(circleStore[currentScreen - 1], "left");
        }else{
            isAnim = false;
            return
        }
    }
}

//Move to the right
function moveRight() {
    //Move towards Next screen as usual
    if(currentScreen < numOfScreens - 1){
    toLeft(screenStore[currentScreen]);
    comeRight(screenStore[currentScreen + 1]);
    setTimeout(() => {
        inAnim = false;
        currentScreen++;
        sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
    }, animTime)
    }else{
        //Or the screen coming in is the first screen again
        toLeft(screenStore[currentScreen]);
        comeRight(screenStore[0]);
        setTimeout(() => {
            inAnim = false;
            currentScreen = 0;
            sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
        }, animTime)
    }
}

//Move to the left
function moveLeft() {
    //Move back to screen previously on, as usual
    if(currentScreen > 0){
        toRight(screenStore[currentScreen]);
        comeLeft(screenStore[currentScreen - 1]);
        setTimeout(() => {
        inAnim = false;
        currentScreen--;
        sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
        }, animTime)
    }else{
        //Move back to the last screen container
        toRight(screenStore[currentScreen]);
        comeLeft(screenStore[numOfScreens - 1]);
        setTimeout(() => {
            inAnim = false;
            currentScreen = numOfScreens - 1;
            sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
            }, animTime)
    }
}

//User clicks on one of the circles
circleStore.forEach(circle => {
    circle.addEventListener("click", event => {
        if(!inAnim){
        //Convert NodeList to Array, to use 'indexOf' method.
        let circleStoreArray = Array.prototype.slice.call(circleStore);
        let circleIndex = circleStoreArray.indexOf(event.target);
        //Configure circle styling
        highlightCircle(event.target);
        //Work out whether we need to move right or left, or nowhere.
        if(circleIndex > currentScreen){
            changeScreenCircleClick(circleIndex, "right");
        }else if (circleIndex < currentScreen){
            changeScreenCircleClick(circleIndex, "left");
        }
    }
})
})

function changeScreenCircleClick(circleIndex, direction) {
    inAnim = true;
    if(direction === "right"){
        sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[circleIndex]);
        toLeft(screenStore[currentScreen]);
        comeRight(screenStore[circleIndex]);
    }else if (direction === "left"){
        sortPositioning(screenStore[currentScreen], screenStore[circleIndex], screenStore[currentScreen + 1]);
        toRight(screenStore[currentScreen]);
        comeLeft(screenStore[circleIndex]);
    }else{
        inAnim = false;
        return
    }
    setTimeout(() => {
    inAnim = false;
    currentScreen = circleIndex;
    sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
    }, animTime)
}

function highlightCircle(circleSelect, direction) {
    if(circleSelect === undefined && direction === "right"){
        circleSelect = circleStore[0];
    }else if (circleSelect === undefined && direction === "left"){
        circleSelect = circleStore[numOfScreens - 1];
    }
    circleStore.forEach(circle => {
        if(circle === circleSelect){
            circle.classList.add("circle-fill");
        }else{
            circle.classList.remove("circle-fill");
        }
    })
}


//Animation methods
function toLeft(screen) {
    screen.style.animation = "toLeft 0.5s ease-in-out forwards";
    setTimeout(() => {
        screen.style.animation = "";
    }, animTime);
}

function toRight(screen) {
    screen.style.animation = "toRight 0.5s ease-in-out forwards";
    setTimeout(() => {
        screen.style.animation = "";
    }, animTime);
}

function comeRight(screen) {
    screen.style.animation = "comeRight 0.5s ease-in-out forwards";
    setTimeout(() => {
        screen.style.animation = "";
    }, animTime);
}

function comeLeft(screen) {
    screen.style.animation = "comeLeft 0.5s ease-in-out forwards";
    setTimeout(() => {
        screen.style.animation = "";
    }, animTime);
}



//Sort positioning. Don't want images to overlap
function sortPositioning(mainScreen, leftScreen, rightScreen) {
    //If right screen is undefined. We need to repeat first screen again
    if(rightScreen === undefined){
        rightScreen = screenStore[0];
    }
    //If left screen is undefined. We use the last screen
    if(leftScreen === undefined){
        leftScreen = screenStore[numOfScreens - 1];
    }
    screenStore.forEach(screen => {
        if(screen === mainScreen){
            screen.style.display = "block";
            screen.style.left = "0px";
        }else if (screen === leftScreen){
            screen.style.display = "block";
            screen.style.left = "-100%";
        }else if (screen === rightScreen){
            screen.style.display = "block";
            screen.style.left = "100%";
        }else{
            screen.style.display = "none";
        }
    })
}

//Auto Scroll feature
let carousel = document.getElementById("carousel-1");
let scrollTime = Number(carousel.getAttribute("auto-scroll"));
//Only implement the feature if the user has included the attribute 'auto-scroll'.
if(scrollTime) {
    //Auto Scroll will be set up the very first time
    let autoWipe = setInterval(() => {
        startAnim("right");
    }, scrollTime);
    //Clear the timer when they hover on carousel
    carousel.addEventListener("mouseenter", () => {
        clearInterval(autoWipe);
    });
    //Re-initialise the timer when they hover out of the carousel
    carousel.addEventListener("mouseleave", () => {
         autoWipe = setInterval(() => {
            startAnim("right");
        }, scrollTime);
    })

}