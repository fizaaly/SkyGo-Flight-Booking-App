// =======================================
// SKYGO FLIGHTS.JS
// =======================================

// =======================================
// HERO BACKGROUND SLIDER
// =======================================

const heroBgs = document.querySelectorAll(".flight-hero .hero-bg");
const dotsContainer = document.getElementById("slideDots");
let currentSlide = 0;

// Build dots
if (dotsContainer && heroBgs.length) {
    heroBgs.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.className = "slide-dot" + (i === 0 ? " active" : "");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });
}

function goToSlide(n) {
    heroBgs[currentSlide].classList.remove("active");
    document.querySelectorAll(".slide-dot")[currentSlide]?.classList.remove("active");
    currentSlide = (n + heroBgs.length) % heroBgs.length;
    heroBgs[currentSlide].classList.add("active");
    document.querySelectorAll(".slide-dot")[currentSlide]?.classList.add("active");
}

if (heroBgs.length > 0) {
    setInterval(() => goToSlide(currentSlide + 1), 4000);
}


// Navbar
const navbar = document.querySelector(".navbar");

// Search Button
const searchBtn = document.querySelector(".search-btn");

// Search Inputs
const fromInput = document.querySelectorAll(".input-box input")[0];
const toInput = document.querySelectorAll(".input-box input")[1];

// Date Inputs
const dateInputs = document.querySelectorAll('input[type="date"]');

// =======================================
// AUTO DATE
// =======================================

const today = new Date();

const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");

dateInputs.forEach((date) => {

    date.min = `${yyyy}-${mm}-${dd}`;

});

if (dateInputs.length > 0) {

    dateInputs[0].value = `${yyyy}-${mm}-${dd}`;

}



// =======================================
// SEARCH BUTTON
// =======================================

searchBtn.addEventListener("click", () => {

    const from = fromInput.value.trim();

    const to = toInput.value.trim();

    if (from === "" || to === "") {

        alert("Please enter departure and destination.");

        return;

    }

    searchBtn.innerHTML = "Searching... ✈";

    searchBtn.disabled = true;

    setTimeout(() => {

        searchBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> Search Flights';

        searchBtn.disabled = false;

        alert(`Flights found from ${from} to ${to}`);

    }, 1800);

});



// =======================================
// NAVBAR SCROLL
// =======================================

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(8,18,50,.95)";

        navbar.style.backdropFilter = "blur(15px)";

    }

    else {

        navbar.style.background = "rgba(8,18,50,.90)";

    }

});



// =======================================
// HERO ANIMATION
// =======================================

const heroTitle = document.querySelector(".hero-content h1");

heroTitle.animate(

[
{
opacity:0,
transform:"translateY(50px)"
},

{
opacity:1,
transform:"translateY(0px)"
}

],

{
duration:1200,
iterations:1
}

);



// =======================================
// PAGE LOADED
// =======================================

window.addEventListener("load",()=>{

console.log("Flights Page Loaded Successfully ✈");

});
// =======================================
// FLIGHT BOOK BUTTONS
// =======================================

const flightBtns = document.querySelectorAll(".flight-card button");

flightBtns.forEach((btn) => {

    btn.addEventListener("click", () => {

        const flight =
            btn.parentElement.parentElement.querySelector("h3").innerText;

        alert(`Booking started for ${flight} ✈`);

    });

});



// =======================================
// AIRLINE CARDS
// =======================================

const airlineCards = document.querySelectorAll(".airline-card");

airlineCards.forEach((card) => {

    card.addEventListener("click", () => {

        const airline = card.querySelector("h3").innerText;

        alert(`${airline} flights are available.`);

    });

});



// =======================================
// DESTINATION BUTTONS
// =======================================

const destinationBtns =
document.querySelectorAll(".destination-card button");

destinationBtns.forEach((btn) => {

    btn.addEventListener("click", () => {

        const city =
        btn.parentElement.querySelector("h3").innerText;

        alert(`Explore amazing flights to ${city} 🌍`);

    });

});



// =======================================
// DEAL BUTTONS
// =======================================

const dealBtns =
document.querySelectorAll(".deal-card button");

dealBtns.forEach((btn) => {

    btn.addEventListener("click", () => {

        const deal =
        btn.parentElement.querySelector("h3").innerText;

        alert(`Opening deal for ${deal} 🎉`);

    });

});



// =======================================
// TRIP TYPE BUTTONS
// =======================================

const tripButtons =
document.querySelectorAll(".trip-type button");

tripButtons.forEach((button) => {

    button.addEventListener("click", () => {

        tripButtons.forEach((btn) => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

    });

});



// =======================================
// SEARCH CARD FLOAT EFFECT
// =======================================

const searchCard =
document.querySelector(".search-card");

let move = 0;
let direction = 1;

setInterval(() => {

    move += direction;

    searchCard.style.transform =
    `translateY(${move}px)`;

    if (move >= 8 || move <= -8) {

        direction *= -1;

    }

}, 80);



// =======================================
// HOVER EFFECT FOR FLIGHT CARDS
// =======================================

const flightCards =
document.querySelectorAll(".flight-card");

flightCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
        "translateY(-8px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
        "translateY(0px) scale(1)";

    });

});
// =======================================
// NEWSLETTER SUBSCRIBE
// =======================================

const subscribeBtn = document.querySelector(".newsletter button");

if (subscribeBtn) {

    subscribeBtn.addEventListener("click", () => {

        const email = document.querySelector(".newsletter input").value.trim();

        if (email === "") {

            alert("Please enter your email address.");

            return;

        }

        alert("🎉 Thank you for subscribing to SkyGo!");

        document.querySelector(".newsletter input").value = "";

    });

}



// =======================================
// WHY CHOOSE US CARDS
// =======================================

const whyCards = document.querySelectorAll(".why-card");

whyCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px) scale(1.03)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px) scale(1)";

    });

});



// =======================================
// REVIEW CARDS
// =======================================

const reviewCards = document.querySelectorAll(".review-card");

reviewCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});



// =======================================
// SCROLL REVEAL ANIMATION
// =======================================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }

    });

}, {

    threshold: 0.15

});

sections.forEach((section) => {

    section.style.opacity = "0";
    section.style.transform = "translateY(60px)";
    section.style.transition = "all .8s ease";

    observer.observe(section);

});



// =======================================
// SMOOTH SCROLL FOR NAVIGATION
// =======================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});



// =======================================
// BUTTON RIPPLE EFFECT
// =======================================

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(.95)";

        setTimeout(() => {

            button.style.transform = "scale(1)";

        }, 150);

    });

});



// =======================================
// PAGE LOADER ANIMATION
// =======================================

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

    console.log("✅ SkyGo Flights Page Loaded Successfully");

});



// =======================================
// END OF FILE
// =======================================