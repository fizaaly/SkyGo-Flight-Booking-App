// ========== SKYGO PAYMENT.JS ==========

// Method tabs
document.querySelectorAll(".method-tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".method-tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".pay-form").forEach(f => f.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(`tab-${tab.dataset.tab}`)?.classList.add("active");
    });
});

// Card number formatting
const cardNum = document.getElementById("cardNum");
if (cardNum) {
    cardNum.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g,"").substring(0,16);
        e.target.value = val.replace(/(.{4})/g,"$1 ").trim();
        const display = document.getElementById("cardNumDisplay");
        if (display) display.innerText = e.target.value || "•••• •••• •••• ••••";
        // detect card type
        const logo = document.querySelector(".card-logo i");
        if (logo) {
            if (val.startsWith("4")) logo.className = "fa-brands fa-cc-visa";
            else if (val.startsWith("5")) logo.className = "fa-brands fa-cc-mastercard";
            else if (val.startsWith("6")) logo.className = "fa-brands fa-cc-discover";
            else logo.className = "fa-brands fa-cc-visa";
        }
    });
}

// Card name
document.getElementById("cardName")?.addEventListener("input", e => {
    const d = document.getElementById("cardNameDisplay");
    if (d) d.innerText = e.target.value.toUpperCase() || "YOUR NAME";
});

// Card expiry
document.getElementById("cardExp")?.addEventListener("input", e => {
    let val = e.target.value.replace(/\D/g,"");
    if (val.length >= 2) val = val.substring(0,2) + "/" + val.substring(2,4);
    e.target.value = val;
    const d = document.getElementById("cardExpDisplay");
    if (d) d.innerText = val || "MM/YY";
});

// UPI selection
function selectUPI(el) {
    document.querySelectorAll(".upi-app").forEach(a => a.classList.remove("selected"));
    el.classList.add("selected");
}

// Bank selection
function selectBank(el) {
    document.querySelectorAll(".bank-card").forEach(b => b.classList.remove("selected"));
    el.classList.add("selected");
}

// Wallet selection
function selectWallet(el) {
    document.querySelectorAll(".wallet-card").forEach(w => w.classList.remove("selected"));
    el.classList.add("selected");
}

// Process payment
function processPayment() {
    const overlay = document.getElementById("processingOverlay");
    overlay.classList.add("show");
    setTimeout(() => {
        overlay.classList.remove("show");
        // Save booking to localStorage
        localStorage.setItem("skygo_booking", JSON.stringify({
            id: "SKY" + Date.now().toString().slice(-6),
            from: "DEL", to: "DXB",
            date: "10 Aug 2026", time: "06:30 AM",
            airline: "IndiGo", seat: "5B",
            amount: 4119, status: "Confirmed"
        }));
        window.location.href = "ticket.html";
    }, 3000);
}

// Promo code
function applyPromo() {
    const code = document.getElementById("promoInput")?.value.trim().toUpperCase();
    const valid = { "SKYDOM25": 875, "SKYLUX40": 1000, "SKYSUMMER30": 500 };
    if (valid[code]) {
        showToast(`🎉 Promo applied! ₹${valid[code]} off!`, "success");
    } else {
        showToast("❌ Invalid promo code.", "error");
    }
}

function showToast(msg, type="info") {
    let t = document.getElementById("sg-toast"); if(t) t.remove();
    t = document.createElement("div"); t.id="sg-toast";
    const c={success:"linear-gradient(135deg,#22c55e,#16a34a)",error:"linear-gradient(135deg,#ef4444,#dc2626)",info:"linear-gradient(135deg,#2563eb,#38bdf8)"};
    t.style.cssText=`position:fixed;top:24px;right:24px;z-index:99999;padding:15px 22px;border-radius:12px;background:${c[type]};color:#fff;font-weight:600;font-size:14px;box-shadow:0 12px 30px rgba(0,0,0,.2);font-family:'Poppins',sans-serif;`;
    t.innerText=msg; document.body.appendChild(t);
    setTimeout(()=>{t.style.opacity="0";t.style.transition=".35s";setTimeout(()=>t.remove(),350);},2800);
}
console.log("✅ SkyGo Payment Page Loaded");
