// ========== SKYGO BOOKING.JS ==========

const BASE_FARE = 3499, TAXES = 620;
let addonTotal = 0, selectedSeat = "";

// Step navigation
function goToStep(n) {
    if (n === 2) {
        const fn = document.getElementById("fName")?.value.trim();
        const ln = document.getElementById("lName")?.value.trim();
        const em = document.getElementById("bEmail")?.value.trim();
        const ph = document.getElementById("bPhone")?.value.trim();
        if (!fn || !ln || !em || !ph) { showToast("Please fill all required fields.", "error"); return; }
    }
    if (n === 3 && !selectedSeat) { showToast("Please select a seat first.", "error"); return; }

    document.querySelectorAll(".form-section").forEach(s => s.classList.remove("active"));
    document.getElementById(`formStep${n}`)?.classList.add("active");

    document.querySelectorAll(".prog-step").forEach((s, i) => {
        s.classList.toggle("active", i + 1 === n);
        s.classList.toggle("done", i + 1 < n);
    });
    document.querySelectorAll(".prog-line").forEach((l, i) => {
        l.classList.toggle("done", i + 1 < n);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Add-ons
document.querySelectorAll(".addon-check").forEach(cb => {
    cb.addEventListener("change", () => {
        const price = parseInt(cb.dataset.price);
        addonTotal += cb.checked ? price : -price;
        const row = document.getElementById("addonRow");
        row.style.display = addonTotal > 0 ? "flex" : "none";
        document.getElementById("addonTotal").innerText = `₹${addonTotal}`;
        document.getElementById("grandTotal").innerText = `₹${(BASE_FARE + TAXES + addonTotal).toLocaleString()}`;
        cb.closest(".addon-card").classList.toggle("checked", cb.checked);
    });
});

// Seat Map generation
function buildSeatMap() {
    const map = document.getElementById("seatMap"); if (!map) return;
    const cols = ["A","B","C","D","E","F"];
    const booked = ["2B","3D","5A","5F","7C","8E","9B","10D"];
    for (let r = 1; r <= 12; r++) {
        const row = document.createElement("div"); row.className = "seat-row";
        const label = document.createElement("div"); label.className = "row-label"; label.innerText = r;
        row.appendChild(label);
        cols.forEach((c, i) => {
            if (i === 3) { const a = document.createElement("div"); a.className = "aisle"; row.appendChild(a); }
            const seat = document.createElement("div"); seat.className = "seat";
            const id = `${r}${c}`; seat.innerText = c;
            if (booked.includes(id)) { seat.classList.add("booked"); seat.title = "Booked"; }
            else {
                seat.addEventListener("click", () => {
                    document.querySelectorAll(".seat.selected").forEach(s => s.classList.remove("selected"));
                    seat.classList.add("selected");
                    selectedSeat = id;
                    document.getElementById("seatInfo").innerText = `✅ Seat ${id} selected`;
                });
            }
            row.appendChild(seat);
        });
        map.appendChild(row);
    }
}
buildSeatMap();

// Payment
function proceedPayment(method) {
    const methods = { card:"Credit/Debit Card", upi:"UPI", netbanking:"Net Banking", wallet:"Wallet" };
    showToast(`🔒 Redirecting to ${methods[method]} payment...`, "info");
    setTimeout(() => { window.location.href = "payment.html"; }, 1200);
}

// Navbar scroll
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll",()=>{navbar.style.background=window.scrollY>50?"rgba(5,15,45,.98)":"rgba(8,25,70,.95)";});

function showToast(msg, type="info") {
    let t = document.getElementById("sg-toast"); if(t) t.remove();
    t = document.createElement("div"); t.id="sg-toast";
    const c={success:"linear-gradient(135deg,#22c55e,#16a34a)",error:"linear-gradient(135deg,#ef4444,#dc2626)",info:"linear-gradient(135deg,#2563eb,#38bdf8)"};
    t.style.cssText=`position:fixed;top:24px;right:24px;z-index:99999;padding:15px 22px;border-radius:12px;background:${c[type]};color:#fff;font-weight:600;font-size:14px;box-shadow:0 12px 30px rgba(0,0,0,.2);font-family:'Poppins',sans-serif;`;
    t.innerText=msg; document.body.appendChild(t);
    setTimeout(()=>{t.style.opacity="0";t.style.transition=".35s";setTimeout(()=>t.remove(),350);},2800);
}
console.log("✅ SkyGo Booking Page Loaded");
