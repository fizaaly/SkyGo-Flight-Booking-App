// ========== SKYGO TICKET.JS ==========

// Load booking from localStorage
window.addEventListener("load", () => {
    const booking = JSON.parse(localStorage.getItem("skygo_booking") || "{}");
    const user = JSON.parse(localStorage.getItem("skygo_user") || "{}");

    if (booking.id) {
        document.getElementById("bookingId").innerText = `SKY-${booking.id}`;
        document.getElementById("barcodeText").innerText = `SKY-${booking.id} • ${booking.from || "DEL"} → ${booking.to || "DXB"} • ${booking.date || "10 AUG 2026"}`;
    }

    if (user.fname && user.lname) {
        document.getElementById("passengerName").innerText = `${user.fname} ${user.lname}`;
    }

    // Generate barcode lines
    generateBarcode();

    // Confetti burst
    confettiBurst();
});

// Generate barcode
function generateBarcode() {
    const barcodeEl = document.getElementById("barcode"); if (!barcodeEl) return;
    const widths = [3,2,4,1,3,2,5,1,2,3,4,2,1,3,2,4,3,1,5,2,3,1,4,2,3,5,2,1,3,4,2,3,1,2,4,3,5,1,2,3];
    widths.forEach(w => {
        const bar = document.createElement("div");
        bar.style.cssText = `background:#0f172a;width:${w * 1.5}px;height:100%;border-radius:1px;`;
        barcodeEl.appendChild(bar);
    });
}

// Confetti burst on load
function confettiBurst() {
    const colors = ["#ffd54f","#22c55e","#38bdf8","#ef4444","#a855f7","#fff"];
    for (let i = 0; i < 60; i++) {
        const piece = document.createElement("div");
        const size = 6 + Math.random() * 8;
        piece.style.cssText = `
            position:fixed;
            width:${size}px;height:${size}px;
            background:${colors[Math.floor(Math.random() * colors.length)]};
            border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
            left:${Math.random() * 100}%;
            top:-20px;
            z-index:9999;
            animation:confettiDrop ${2 + Math.random() * 3}s ease-in ${Math.random() * 1.5}s forwards;
        `;
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 5000);
    }
    const style = document.createElement("style");
    style.innerHTML = `@keyframes confettiDrop{0%{top:-20px;opacity:1;transform:rotate(0deg) translateX(0);}100%{top:100vh;opacity:0;transform:rotate(720deg) translateX(${(Math.random()-0.5)*200}px);}}`;
    document.head.appendChild(style);
}

// Download ticket (print)
function downloadTicket() {
    const btn = document.querySelectorAll(".action-btn.download")[0];
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing...';
    setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-download"></i> Download Ticket';
        window.print();
    }, 1000);
}

// Share
function shareTicket() {
    const bid = document.getElementById("bookingId")?.innerText || "SKY-XXXXXX";
    if (navigator.share) {
        navigator.share({ title: "SkyGo E-Ticket", text: `My flight ticket (${bid}) booked via SkyGo!`, url: window.location.href });
    } else {
        navigator.clipboard.writeText(window.location.href);
        showToast("🔗 Ticket link copied to clipboard!", "success");
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
console.log("✅ SkyGo Ticket Page Loaded");
