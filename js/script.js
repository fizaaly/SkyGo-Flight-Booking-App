// ===============================================
// SKYGO PREMIUM SCRIPT
// PART 1 (REPLACED)
// ===============================================

// ================= USER AUTH STATE =================
(function() {
    const user = JSON.parse(localStorage.getItem("skygo_user") || "{}");
    const navBtn = document.querySelector(".nav-btn");
    const greeting = document.getElementById("user-greeting");
    if (user.email || user.fname) {
        if (navBtn) navBtn.style.display = "none";
        if (greeting) {
            greeting.style.display = "flex";
            greeting.style.alignItems = "center";
            greeting.style.gap = "12px";
            const name = user.fname ? `Hi, ${user.fname}!` : `Hi there!`;
            greeting.innerHTML = `<span>${name}</span>
                <button onclick="location.href='mytrips.html'" style="padding:10px 18px;border:none;border-radius:30px;background:#ffd54f;color:#111;font-weight:700;cursor:pointer;font-family:Poppins,sans-serif;font-size:13px;">My Trips</button>
                <button onclick="logout()" style="padding:10px 18px;border:none;border-radius:30px;background:rgba(255,255,255,.15);color:#fff;font-weight:600;cursor:pointer;font-family:Poppins,sans-serif;font-size:13px;">Logout</button>`;
        }
    }
})();

function logout() {
    localStorage.removeItem("skygo_user");
    location.href = "login.html";
}

// ================= NAVBAR =================

const navbar = document.querySelector(".navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            navbar.style.background = "rgba(5,15,45,.92)";
            navbar.style.backdropFilter = "blur(18px)";
            navbar.style.padding = "14px 8%";
            navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.18)";

        } else {

            navbar.style.background = "rgba(8,25,70,.35)";
            navbar.style.padding = "18px 8%";
            navbar.style.boxShadow = "none";

        }

    });

}

// ================= HERO SLIDER =================

const heroImages = document.querySelectorAll(".hero-bg");

let heroIndex = 0;

function heroSlider() {

    heroImages.forEach((img) => {

        img.classList.remove("active");

    });

    heroIndex++;

    if (heroIndex >= heroImages.length) {

        heroIndex = 0;

    }

    heroImages[heroIndex].classList.add("active");

}

if (heroImages.length > 0) {

    setInterval(heroSlider, 4000);

}

// ================= AUTO DATE =================

document.querySelectorAll('input[type="date"]').forEach((input) => {

    const today = new Date();

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    input.value = `${yyyy}-${mm}-${dd}`;
    input.min = `${yyyy}-${mm}-${dd}`;

});

// ================= SEARCH =================

const searchBtn = document.querySelector(".search-btn");

if (searchBtn) {

    searchBtn.addEventListener("click", () => {

        const inputs = document.querySelectorAll(".input-box input");

        const from = inputs[0].value.trim();
        const to = inputs[1].value.trim();

        if (from === "" || to === "") {

            alert("Please enter departure and destination.");
            return;

        }

        searchBtn.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Searching...';

        searchBtn.disabled = true;

        setTimeout(() => {

            searchBtn.innerHTML =
                '<i class="fa-solid fa-magnifying-glass"></i> Search Flights';

            searchBtn.disabled = false;

            window.location.href = `flights.html`;

        }, 2000);

    });

}

// ================= FLOATING SEARCH =================

const searchBox = document.querySelector(".search-box");

if (searchBox) {

    let floatPos = 0;
    let direction = 1;

    setInterval(() => {

        floatPos += direction;

        searchBox.style.transform = `translateY(${floatPos}px)`;

        if (floatPos >= 8 || floatPos <= -8) {

            direction *= -1;

        }

    }, 80);

}

// ================= HERO TITLE =================

const heroTitle = document.querySelector(".hero-content h1");

if (heroTitle) {

    heroTitle.animate(

        [
            {
                opacity: 0,
                transform: "translateY(50px)"
            },
            {
                opacity: 1,
                transform: "translateY(0)"
            }
        ],

        {
            duration: 1400,
            iterations: 1,
            easing: "ease-out"
        }

    );

}

// ===============================================
// SKYGO PREMIUM SCRIPT
// PART 2 (REPLACED)
// ===============================================

// ================= HERO STATS COUNTER =================

const counters = document.querySelectorAll(".counter");

const runCounter = (counter) => {

    const target = parseInt(counter.getAttribute("data-target"));

    if (isNaN(target)) return;

    let count = 0;
    const speed = Math.ceil(target / 80);

    function updateCounter() {

        count += speed;

        if (count < target) {

            counter.innerText = count + "+";
            requestAnimationFrame(updateCounter);

        } else {

            counter.innerText = target + "+";

        }

    }

    counter.innerText = "0";
    updateCounter();

};

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            runCounter(entry.target);
            counterObserver.unobserve(entry.target);

        }

    });

}, { threshold: 0.5 });

counters.forEach(counter => {

    counterObserver.observe(counter);

});

// ================= PARALLAX CLOUDS =================

const cloud1 = document.querySelector(".cloud1");
const cloud2 = document.querySelector(".cloud2");

if (cloud1 && cloud2) {

    document.addEventListener("mousemove", (e) => {

        const x = e.clientX / 80;
        const y = e.clientY / 80;

        cloud1.style.transform =
            `translate(${x}px, ${y}px)`;

        cloud2.style.transform =
            `translate(${-x}px, ${-y}px)`;

    });

}

// ================= PLANE EFFECT =================

const plane = document.querySelector(".plane");

if (plane) {

    document.addEventListener("mousemove", (e) => {

        plane.style.transform =
            `translateY(${e.clientY / 60}px)`;

    });

}

// ================= DESTINATION CARDS =================

const destinationCards =
document.querySelectorAll(".destination-card");

destinationCards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY =
            (x - rect.width / 2) / 20;

        const rotateX =
            -(y - rect.height / 2) / 20;

        card.style.transform =
        `perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-10px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
        `perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0px)`;

    });

});

// ================= BOOK NOW BUTTON =================

document
.querySelectorAll(".card-content button")
.forEach((btn) => {

    btn.addEventListener("click", () => {

        const city =
        btn.parentElement.querySelector("h3").innerText;

        btn.disabled = true;
        btn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Booking...';

        setTimeout(() => {

            btn.disabled = false;
            btn.innerHTML = "Book Now";

            window.location.href = "booking.html";

        }, 1500);

    });

});
// ===============================================
// SKYGO PREMIUM SCRIPT
// PART 3 (REPLACED)
// ===============================================

// ================= OFFER BUTTONS =================

const offerButtons = document.querySelectorAll(".offer-info button");

offerButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

        const offerTitle =
            btn.parentElement.querySelector("h3").innerText;

        const originalText = btn.innerHTML;

        btn.disabled = true;
        btn.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';

        setTimeout(() => {

            btn.disabled = false;
            btn.innerHTML = originalText;

            alert(`🎉 ${offerTitle} selected successfully!`);

        }, 1500);

    });

});

// ================= HOTEL BUTTONS =================

const hotelButtons = document.querySelectorAll(".hotel-content button");

hotelButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

        const hotel =
            btn.parentElement.querySelector("h3").innerText;

        const originalText = btn.innerHTML;

        btn.disabled = true;
        btn.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Booking...';

        setTimeout(() => {

            btn.disabled = false;
            btn.innerHTML = originalText;

            alert(`🏨 Booking started for ${hotel}`);

        }, 1500);

    });

});

// ================= AIRLINE CARDS =================

const airlineCards = document.querySelectorAll(".airline-card");

airlineCards.forEach((card) => {

    card.addEventListener("click", () => {

        const airline = card.querySelector("h3").innerText;

        card.style.transform = "scale(.96)";

        setTimeout(() => {

            card.style.transform = "";

            alert(`✈ ${airline} flights are available.`);

        }, 250);

    });

});

// ================= SERVICE CARDS =================

const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";
        card.style.boxShadow =
            "0 20px 45px rgba(37,99,235,.25)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";
        card.style.boxShadow =
            "0 12px 30px rgba(0,0,0,.08)";

    });

});

// ================= SCROLL REVEAL =================

const revealItems = document.querySelectorAll(
`
.destination-card,
.offer-card,
.hotel-card,
.airline-card,
.service-card,
.section-title,
.hero-stats
`
);

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

            revealObserver.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.15

});

revealItems.forEach((item) => {

    item.style.opacity = "0";
    item.style.transform = "translateY(60px)";
    item.style.transition =
        "all .8s ease";

    revealObserver.observe(item);

});

// ===============================================
// SKYGO PREMIUM SCRIPT
// PART 4 (REPLACED)
// ===============================================

// ================= RIPPLE EFFECT =================

document.querySelectorAll("button").forEach((button) => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        const size = Math.max(this.clientWidth, this.clientHeight);

        ripple.style.width = size + "px";
        ripple.style.height = size + "px";

        ripple.style.left = (e.offsetX - size / 2) + "px";
        ripple.style.top = (e.offsetY - size / 2) + "px";

        ripple.className = "ripple";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

// Ripple CSS

const rippleStyle = document.createElement("style");

rippleStyle.innerHTML = `

button{
position:relative;
overflow:hidden;
}

.ripple{

position:absolute;
border-radius:50%;
background:rgba(255,255,255,.55);

transform:scale(0);

animation:ripple .6s linear;

pointer-events:none;

}

@keyframes ripple{

0%{
transform:scale(0);
opacity:1;
}

100%{
transform:scale(4);
opacity:0;
}

}
`;

document.head.appendChild(rippleStyle);

// ================= NEWSLETTER =================

const newsletterBtn =
document.querySelector(".newsletter-form button");

const newsletterInput =
document.querySelector(".newsletter-form input");

if (newsletterBtn && newsletterInput) {

    newsletterBtn.addEventListener("click", () => {

        const email = newsletterInput.value.trim();

        const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!pattern.test(email)) {

            showToast("❌ Please enter a valid email.");
            newsletterInput.focus();

            return;

        }

        showToast("✅ Thanks for subscribing!");

        newsletterInput.value = "";

    });

}

// ================= PREMIUM TOAST =================

const toast = document.createElement("div");

toast.id = "toast";

document.body.appendChild(toast);

toast.style.cssText = `

position:fixed;
top:25px;
right:25px;

padding:15px 24px;

background:linear-gradient(135deg,#2563eb,#38bdf8);

color:#fff;

font-weight:600;

border-radius:12px;

box-shadow:0 15px 35px rgba(0,0,0,.18);

opacity:0;

transform:translateY(-25px);

transition:.35s;

pointer-events:none;

z-index:99999;

`;

function showToast(message){

toast.innerHTML=message;

toast.style.opacity="1";
toast.style.transform="translateY(0)";

setTimeout(()=>{

toast.style.opacity="0";
toast.style.transform="translateY(-25px)";

},2500);

}

// ================= BACK TO TOP =================

const topBtn = document.createElement("button");

topBtn.innerHTML =
'<i class="fa-solid fa-arrow-up"></i>';

document.body.appendChild(topBtn);

topBtn.style.cssText = `

position:fixed;

bottom:30px;
right:30px;

width:55px;
height:55px;

border:none;

border-radius:50%;

background:linear-gradient(135deg,#2563eb,#38bdf8);

color:#fff;

font-size:20px;

cursor:pointer;

display:none;

box-shadow:0 12px 25px rgba(0,0,0,.2);

transition:.3s;

z-index:9999;

`;

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.addEventListener("mouseenter",()=>{

topBtn.style.transform="translateY(-5px) scale(1.08)";

});

topBtn.addEventListener("mouseleave",()=>{

topBtn.style.transform="translateY(0) scale(1)";

});

topBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});
// ===============================================
// SKYGO PREMIUM SCRIPT
// PART 5 (FINAL REPLACED)
// ===============================================

// ================= SCROLL PROGRESS BAR =================

const progressBar = document.createElement("div");

progressBar.style.cssText = `
position:fixed;
top:0;
left:0;
width:0%;
height:4px;
background:linear-gradient(90deg,#ffd54f,#ff9800);
z-index:99999;
transition:.2s;
`;

document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {

    const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress =
        (window.pageYOffset / totalHeight) * 100;

    progressBar.style.width = progress + "%";

});

// ================= ACTIVE NAVBAR =================

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.forEach((item) => {

            item.classList.remove("active");

        });

        link.classList.add("active");

    });

});

// ================= HERO TEXT ANIMATION =================

const heroHeading = document.querySelector(".hero-content h1");
const heroParagraph = document.querySelector(".hero-content p");
const heroTag = document.querySelector(".hero-tag");

window.addEventListener("load", () => {

    if (heroTag) {

        heroTag.animate(

            [
                {
                    opacity: 0,
                    transform: "translateY(25px)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0)"
                }
            ],

            {
                duration: 700,
                fill: "forwards"
            }

        );

    }

    if (heroHeading) {

        heroHeading.animate(

            [
                {
                    opacity: 0,
                    transform: "translateY(40px)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0)"
                }
            ],

            {
                duration: 1200,
                delay: 300,
                easing: "ease-out",
                fill: "forwards"
            }

        );

    }

    if (heroParagraph) {

        heroParagraph.animate(

            [
                {
                    opacity: 0,
                    transform: "translateY(30px)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0)"
                }
            ],

            {
                duration: 1200,
                delay: 700,
                easing: "ease-out",
                fill: "forwards"
            }

        );

    }

});

// ================= PAGE FADE LOADER =================

window.addEventListener("load", () => {

    document.body.style.opacity = "0";

    requestAnimationFrame(() => {

        document.body.style.transition = "opacity .8s ease";
        document.body.style.opacity = "1";

    });

});

// ================= BUTTON HOVER =================

document.querySelectorAll("button").forEach((btn) => {

    btn.addEventListener("mouseenter", () => {

        btn.style.transform = "translateY(-3px) scale(1.03)";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform = "translateY(0) scale(1)";

    });

});

// ================= IMAGE LAZY EFFECT =================

const images = document.querySelectorAll("img:not(.hero-bg):not(.plane)");

const imageObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "scale(1)";

        }

    });

}, {

    threshold: 0.15

});

images.forEach((img) => {

    img.style.opacity = ".95";
    img.style.transform = "scale(.96)";
    img.style.transition = ".6s ease";

    imageObserver.observe(img);

});

// ================= CONSOLE MESSAGE =================

console.log(`
✈══════════════════════════════════════✈

        SKYGO PREMIUM

   Modern Flight Booking Website

 Developed by Fiza ❤️

══════════════════════════════════════✈
`);

console.log("✅ SkyGo Premium Loaded Successfully");