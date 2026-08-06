// ========== SKYGO HOTELS.JS ==========

// Navbar scroll effect
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    navbar.style.padding = window.scrollY > 60 ? "14px 8%" : "18px 8%";
    navbar.style.background = window.scrollY > 60 ? "rgba(5,15,45,.96)" : "rgba(8,25,70,.9)";
});

// Auto-set dates
const today = new Date();
const fmt = d => d.toISOString().split("T")[0];
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
if (checkin && checkout) {
    checkin.value = fmt(today);
    checkin.min = fmt(today);
    const next = new Date(today); next.setDate(next.getDate() + 2);
    checkout.value = fmt(next);
    checkout.min = fmt(next);
    checkin.addEventListener("change", () => {
        const ci = new Date(checkin.value);
        ci.setDate(ci.getDate() + 1);
        checkout.min = fmt(ci);
        if (new Date(checkout.value) <= new Date(checkin.value)) checkout.value = fmt(ci);
    });
}

// Search button
document.getElementById("searchBtn")?.addEventListener("click", () => {
    const dest = document.getElementById("destInput")?.value.trim();
    if (!dest) { showToast("Please enter a destination.", "error"); return; }
    const btn = document.getElementById("searchBtn");
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Searching...';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> Search';
        btn.disabled = false;
        showToast(`🏨 Hotels found in ${dest}!`, "success");
        document.querySelector(".hotels-section")?.scrollIntoView({ behavior: "smooth" });
    }, 1800);
});

// Filter buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        document.querySelectorAll(".hotel-card").forEach(card => {
            const show = filter === "all" || card.dataset.category === filter;
            card.style.display = show ? "block" : "none";
            if (show) { card.style.animation = "none"; card.offsetHeight; card.style.animation = "fadeUp .5s ease"; }
        });
    });
});

// Sort
document.getElementById("sortSelect")?.addEventListener("change", function () {
    const cards = [...document.querySelectorAll(".hotel-card")];
    const grid = document.getElementById("hotelsGrid");
    if (this.value === "price-low") cards.sort((a, b) => +a.dataset.price - +b.dataset.price);
    else if (this.value === "price-high") cards.sort((a, b) => +b.dataset.price - +a.dataset.price);
    else if (this.value === "rating") cards.sort((a, b) => parseFloat(b.querySelector(".rating").innerText) - parseFloat(a.querySelector(".rating").innerText));
    cards.forEach(c => grid.appendChild(c));
});

// Wishlist toggle
document.querySelectorAll(".wishlist-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        btn.innerHTML = btn.classList.contains("active")
            ? '<i class="fa-solid fa-heart"></i>'
            : '<i class="fa-regular fa-heart"></i>';
        showToast(btn.classList.contains("active") ? "❤️ Added to wishlist!" : "Removed from wishlist", btn.classList.contains("active") ? "success" : "info");
    });
});

// Book buttons
document.querySelectorAll(".book-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const hotel = btn.closest(".hotel-card").querySelector("h3").innerText;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = "Book Now";
            btn.disabled = false;
            window.location.href = "booking.html";
        }, 800);
    });
});

// Newsletter
document.querySelector(".nl-form button")?.addEventListener("click", () => {
    const email = document.querySelector(".nl-form input").value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast("Enter a valid email address.", "error"); return; }
    showToast("✅ Subscribed successfully!", "success");
    document.querySelector(".nl-form input").value = "";
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.style.opacity = "1"; e.target.style.transform = "translateY(0)"; }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".hotel-card,.why-card,.s-box").forEach(el => {
    el.style.opacity = "0"; el.style.transform = "translateY(50px)"; el.style.transition = "all .7s ease";
    observer.observe(el);
});

// Toast
function showToast(msg, type = "info") {
    let t = document.getElementById("sg-toast"); if (t) t.remove();
    t = document.createElement("div"); t.id = "sg-toast";
    const c = { success: "linear-gradient(135deg,#22c55e,#16a34a)", error: "linear-gradient(135deg,#ef4444,#dc2626)", info: "linear-gradient(135deg,#2563eb,#38bdf8)" };
    t.style.cssText = `position:fixed;top:24px;right:24px;z-index:99999;padding:15px 22px;border-radius:12px;background:${c[type]};color:#fff;font-weight:600;font-size:14px;box-shadow:0 12px 30px rgba(0,0,0,.2);font-family:'Poppins',sans-serif;animation:tIn .35s ease;`;
    t.innerText = msg;
    const s = document.createElement("style"); s.innerHTML = `@keyframes tIn{from{opacity:0;transform:translateY(-18px)}to{opacity:1;transform:translateY(0)}}`;
    document.head.appendChild(s); document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = "0"; t.style.transition = ".35s"; setTimeout(() => t.remove(), 350); }, 2800);
}

console.log("✅ SkyGo Hotels Page Loaded");
