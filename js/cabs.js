// ========== SKYGO CABS.JS ==========
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    navbar.style.padding = window.scrollY > 60 ? "14px 8%" : "18px 8%";
    navbar.style.background = window.scrollY > 60 ? "rgba(5,15,45,.96)" : "rgba(8,25,70,.9)";
});

// Auto set datetime
const cabDate = document.getElementById("cabDate");
if (cabDate) {
    const now = new Date(); now.setMinutes(now.getMinutes() + 30);
    cabDate.value = now.toISOString().slice(0,16);
    cabDate.min = now.toISOString().slice(0,16);
}

// Tab switch
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    });
});

// Search cabs
document.getElementById("searchCabBtn")?.addEventListener("click", () => {
    const pickup = document.getElementById("pickup")?.value.trim();
    const drop = document.getElementById("drop")?.value.trim();
    if (!pickup || !drop) { showToast("Please enter pickup and drop locations.", "error"); return; }
    const btn = document.getElementById("searchCabBtn");
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Searching...';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-car"></i> Search Cabs';
        btn.disabled = false;
        showToast(`🚗 Cabs available from ${pickup} to ${drop}!`, "success");
        document.querySelector(".cab-types")?.scrollIntoView({ behavior:"smooth" });
    }, 1800);
});

// Ride buttons
document.querySelectorAll(".ride-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const type = btn.closest(".cab-card").querySelector("h3").innerText;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        btn.disabled = true;
        setTimeout(() => { btn.innerHTML = "Book Ride"; btn.disabled = false; window.location.href = "booking.html"; }, 700);
    });
});

// Scroll reveal
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity="1"; e.target.style.transform="translateY(0)"; }});
}, { threshold: 0.12 });

document.querySelectorAll(".cab-card,.route-card,.why-card,.step").forEach(el => {
    el.style.opacity="0"; el.style.transform="translateY(50px)"; el.style.transition="all .7s ease";
    obs.observe(el);
});

function showToast(msg, type="info") {
    let t = document.getElementById("sg-toast"); if(t) t.remove();
    t = document.createElement("div"); t.id="sg-toast";
    const c={success:"linear-gradient(135deg,#22c55e,#16a34a)",error:"linear-gradient(135deg,#ef4444,#dc2626)",info:"linear-gradient(135deg,#2563eb,#38bdf8)"};
    t.style.cssText=`position:fixed;top:24px;right:24px;z-index:99999;padding:15px 22px;border-radius:12px;background:${c[type]};color:#fff;font-weight:600;font-size:14px;box-shadow:0 12px 30px rgba(0,0,0,.2);font-family:'Poppins',sans-serif;`;
    t.innerText=msg; document.body.appendChild(t);
    setTimeout(()=>{t.style.opacity="0";t.style.transition=".35s";setTimeout(()=>t.remove(),350);},2800);
}
console.log("✅ SkyGo Cabs Page Loaded");
