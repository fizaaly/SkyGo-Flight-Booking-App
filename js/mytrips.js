// ========== SKYGO MYTRIPS.JS ==========

// Sample trips data + any booking from localStorage
const sampleTrips = [
    { id:"SKY-220801", from:"DEL", fromCity:"New Delhi", to:"DXB", toCity:"Dubai", date:"10 Aug 2026", time:"06:30 AM", airline:"IndiGo", seat:"5B", amount:"₹4,119", status:"upcoming", duration:"2h 10m" },
    { id:"SKY-190723", from:"BOM", fromCity:"Mumbai", to:"GOI", toCity:"Goa", date:"18 Jul 2026", time:"09:45 AM", airline:"Air India", seat:"12A", amount:"₹3,299", status:"completed", duration:"1h 20m" },
    { id:"SKY-041206", from:"BLR", fromCity:"Bengaluru", to:"CMB", toCity:"Colombo", date:"04 Dec 2025", time:"03:15 PM", airline:"Akasa Air", seat:"8C", amount:"₹8,550", status:"completed", duration:"1h 45m" },
    { id:"SKY-150606", from:"DEL", fromCity:"New Delhi", to:"CDG", toCity:"Paris", date:"15 Jun 2025", time:"11:00 PM", airline:"Air France", seat:"24F", amount:"₹42,999", status:"cancelled", duration:"9h 15m" },
];

let allTrips = [...sampleTrips];

// Check localStorage for recent booking
const stored = JSON.parse(localStorage.getItem("skygo_booking") || "{}");
if (stored.id) {
    allTrips.unshift({
        id: `SKY-${stored.id}`,
        from: stored.from || "DEL", fromCity: "New Delhi",
        to: stored.to || "DXB", toCity: "Dubai",
        date: stored.date || "10 Aug 2026", time: stored.time || "06:30 AM",
        airline: stored.airline || "IndiGo", seat: stored.seat || "5B",
        amount: `₹${stored.amount?.toLocaleString() || "4,119"}`,
        status: "upcoming", duration: "2h 10m"
    });
}

// Render trips
function renderTrips(trips) {
    const container = document.getElementById("tripsContainer");
    const emptyState = document.getElementById("emptyState");
    container.innerHTML = "";

    if (!trips.length) { emptyState.style.display = "block"; return; }
    emptyState.style.display = "none";

    trips.forEach((trip, i) => {
        const card = document.createElement("div");
        card.className = "trip-card";
        card.dataset.status = trip.status;
        card.style.animationDelay = `${i * 0.1}s`;
        card.innerHTML = `
            <div class="trip-card-inner">
                <div class="trip-status-bar ${trip.status}"></div>
                <div class="trip-content">
                    <div class="trip-header">
                        <span class="trip-id"><i class="fa-solid fa-hashtag"></i> ${trip.id}</span>
                        <span class="trip-badge ${trip.status}">${trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}</span>
                    </div>
                    <div class="trip-route">
                        <div class="trip-city"><h3>${trip.from}</h3><p>${trip.fromCity}</p></div>
                        <div class="trip-route-mid">
                            <div class="rline"></div>
                            <i class="fa-solid fa-plane"></i>
                            <span>${trip.duration}</span>
                        </div>
                        <div class="trip-city"><h3>${trip.to}</h3><p>${trip.toCity}</p></div>
                    </div>
                    <div class="trip-meta">
                        <span><i class="fa-solid fa-calendar"></i>${trip.date}</span>
                        <span><i class="fa-solid fa-clock"></i>${trip.time}</span>
                        <span><i class="fa-solid fa-plane-up"></i>${trip.airline}</span>
                        <span><i class="fa-solid fa-chair"></i>Seat ${trip.seat}</span>
                        <span><i class="fa-solid fa-indian-rupee-sign"></i>${trip.amount}</span>
                    </div>
                </div>
                <div class="trip-actions">
                    <button class="trip-action-btn view" onclick="viewTicket('${trip.id}')"><i class="fa-solid fa-ticket"></i> View Ticket</button>
                    ${trip.status === "upcoming" ? `<button class="trip-action-btn cancel" onclick="cancelTrip('${trip.id}', this)"><i class="fa-solid fa-xmark"></i> Cancel</button>` : ""}
                    ${trip.status === "completed" ? `<button class="trip-action-btn download" onclick="window.print()"><i class="fa-solid fa-download"></i> Download</button>` : ""}
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    // Update stats
    document.getElementById("totalTrips").innerText = allTrips.length;
    document.getElementById("upcomingTrips").innerText = allTrips.filter(t => t.status === "upcoming").length;
    document.getElementById("completedTrips").innerText = allTrips.filter(t => t.status === "completed").length;
}

// Filter tabs
document.querySelectorAll(".f-tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".f-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const status = tab.dataset.status;
        const filtered = status === "all" ? allTrips : allTrips.filter(t => t.status === status);
        renderTrips(filtered);
    });
});

// Search
document.getElementById("tripSearch")?.addEventListener("input", function () {
    const q = this.value.toLowerCase();
    const filtered = allTrips.filter(t =>
        t.id.toLowerCase().includes(q) ||
        t.fromCity.toLowerCase().includes(q) ||
        t.toCity.toLowerCase().includes(q) ||
        t.from.toLowerCase().includes(q) ||
        t.to.toLowerCase().includes(q)
    );
    renderTrips(filtered);
});

// View ticket
function viewTicket(id) {
    showToast(`📄 Loading ticket ${id}...`, "info");
    setTimeout(() => { window.location.href = "ticket.html"; }, 800);
}

// Cancel trip
function cancelTrip(id, btn) {
    if (confirm(`Cancel trip ${id}? This cannot be undone.`)) {
        const trip = allTrips.find(t => t.id === id);
        if (trip) trip.status = "cancelled";
        renderTrips(allTrips);
        showToast(`❌ Trip ${id} cancelled. Refund in 5-7 business days.`, "error");
    }
}

// Navbar scroll
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    navbar.style.padding = window.scrollY > 60 ? "14px 8%" : "18px 8%";
    navbar.style.background = window.scrollY > 60 ? "rgba(5,15,45,.96)" : "rgba(8,25,70,.92)";
});

// Scroll reveal
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){e.target.style.opacity="1";e.target.style.transform="translateY(0)";}});
}, { threshold: 0.1 });
document.querySelectorAll(".qa-card").forEach(el => {
    el.style.opacity="0"; el.style.transform="translateY(40px)"; el.style.transition="all .6s ease"; obs.observe(el);
});

function showToast(msg, type="info") {
    let t = document.getElementById("sg-toast"); if(t) t.remove();
    t = document.createElement("div"); t.id="sg-toast";
    const c={success:"linear-gradient(135deg,#22c55e,#16a34a)",error:"linear-gradient(135deg,#ef4444,#dc2626)",info:"linear-gradient(135deg,#2563eb,#38bdf8)"};
    t.style.cssText=`position:fixed;top:24px;right:24px;z-index:99999;padding:15px 22px;border-radius:12px;background:${c[type]};color:#fff;font-weight:600;font-size:14px;box-shadow:0 12px 30px rgba(0,0,0,.2);font-family:'Poppins',sans-serif;`;
    t.innerText=msg; document.body.appendChild(t);
    setTimeout(()=>{t.style.opacity="0";t.style.transition=".35s";setTimeout(()=>t.remove(),350);},2800);
}

// Init
renderTrips(allTrips);
console.log("✅ SkyGo My Trips Page Loaded");
