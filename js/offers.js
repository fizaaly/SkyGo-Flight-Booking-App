// ========== SKYGO OFFERS.JS ==========

// Navbar scroll
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll",()=>{navbar.style.padding=window.scrollY>60?"14px 8%":"18px 8%";navbar.style.background=window.scrollY>60?"rgba(5,15,45,.96)":"rgba(8,25,70,.9)";});

// Countdown timer — 8 hours from now
function startCountdown() {
    const end = new Date(); end.setHours(end.getHours() + 8);
    function update() {
        const diff = end - new Date();
        if (diff <= 0) { document.getElementById("hours").innerText="00"; document.getElementById("minutes").innerText="00"; document.getElementById("seconds").innerText="00"; return; }
        const h = Math.floor(diff/3600000), m = Math.floor((diff%3600000)/60000), s = Math.floor((diff%60000)/1000);
        document.getElementById("hours").innerText = String(h).padStart(2,"0");
        document.getElementById("minutes").innerText = String(m).padStart(2,"0");
        document.getElementById("seconds").innerText = String(s).padStart(2,"0");
        setTimeout(update, 1000);
    }
    update();
}
startCountdown();

// Confetti
function makeConfetti() {
    const wrap = document.getElementById("confetti"); if (!wrap) return;
    const colors = ["#ffd54f","#ef4444","#22c55e","#38bdf8","#fff","#f97316"];
    for (let i = 0; i < 40; i++) {
        const p = document.createElement("div"); p.className = "confetti-piece";
        p.style.cssText = `left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;animation-duration:${3+Math.random()*5}s;animation-delay:${Math.random()*4}s;border-radius:${Math.random()>0.5?"50%":"2px"};`;
        wrap.appendChild(p);
    }
}
makeConfetti();

// Filter
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.dataset.cat;
        document.querySelectorAll(".offer-card").forEach(card => {
            const show = cat === "all" || card.dataset.cat === cat;
            card.style.display = show ? "block" : "none";
            if (show) { card.style.animation="none"; card.offsetHeight; card.style.animation="fadeUp .5s ease"; }
        });
    });
});

// Copy coupon
document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const code = btn.dataset.code;
        navigator.clipboard.writeText(code).then(() => {
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            btn.style.background = "linear-gradient(135deg,#22c55e,#16a34a)";
            showToast(`✅ Coupon "${code}" copied!`, "success");
            setTimeout(() => { btn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy'; btn.style.background = ""; }, 2000);
        });
    });
});

// Grab buttons pulse
document.querySelectorAll(".grab-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
        this.disabled = true;
        setTimeout(() => { this.innerHTML = 'Grab Deal <i class="fa-solid fa-arrow-right"></i>'; this.disabled = false; }, 600);
    });
});

// Newsletter
document.querySelector(".nl-form button")?.addEventListener("click", () => {
    const email = document.querySelector(".nl-form input").value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast("Enter a valid email.", "error"); return; }
    showToast("🔔 Subscribed! Deals incoming to your inbox.", "success");
    document.querySelector(".nl-form input").value = "";
});

// Scroll reveal
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){e.target.style.opacity="1";e.target.style.transform="translateY(0)";}});
}, { threshold: 0.1 });
document.querySelectorAll(".offer-card,.time-box").forEach(el => {
    el.style.opacity="0"; el.style.transform="translateY(50px)"; el.style.transition="all .7s ease"; obs.observe(el);
});

function showToast(msg, type="info") {
    let t = document.getElementById("sg-toast"); if(t) t.remove();
    t = document.createElement("div"); t.id="sg-toast";
    const c={success:"linear-gradient(135deg,#22c55e,#16a34a)",error:"linear-gradient(135deg,#ef4444,#dc2626)",info:"linear-gradient(135deg,#2563eb,#38bdf8)"};
    t.style.cssText=`position:fixed;top:24px;right:24px;z-index:99999;padding:15px 22px;border-radius:12px;background:${c[type]};color:#fff;font-weight:600;font-size:14px;box-shadow:0 12px 30px rgba(0,0,0,.2);font-family:'Poppins',sans-serif;`;
    t.innerText=msg; document.body.appendChild(t);
    setTimeout(()=>{t.style.opacity="0";t.style.transition=".35s";setTimeout(()=>t.remove(),350);},2800);
}
console.log("✅ SkyGo Offers Page Loaded");
