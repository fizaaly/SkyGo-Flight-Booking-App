// ========== SKYGO LOGIN.JS ==========

// Toggle password visibility
const togglePass = document.getElementById("togglePass");
const passInput  = document.getElementById("password");

if (togglePass) {
    togglePass.addEventListener("click", () => {
        const isText = passInput.type === "text";
        passInput.type = isText ? "password" : "text";
        togglePass.className = isText
            ? "fa-solid fa-eye toggle-pass"
            : "fa-solid fa-eye-slash toggle-pass";
    });
}

// ── Login Form Submit ───────────────────────────────────────
const loginForm = document.getElementById("loginForm");
const loginBtn  = document.getElementById("loginBtn");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email    = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        // Basic validation
        if (!email || !password) {
            showToast("❌ Please enter email and password.", "error");
            return;
        }
        if (!email.includes("@")) {
            showToast("❌ Please enter a valid email.", "error");
            return;
        }

        // Loading
        loginBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';
        loginBtn.disabled  = true;

        setTimeout(() => {
            // ── Demo accounts (hardcoded) ───────────────────
            const demoUsers = [
                { email:"admin@skygo.com", password:"admin123", fname:"Admin", lname:"SkyGo", phone:"9000000000" },
                { email:"fiza@skygo.com",  password:"fiza123",  fname:"Fiza",  lname:"Khan",  phone:"9876543210" },
                { email:"demo@skygo.com",  password:"demo123",  fname:"Demo",  lname:"User",  phone:"9111111111" },
            ];

            // Merge demo + registered users
            const savedUsers = JSON.parse(localStorage.getItem("skygo_users") || "[]");
            const allUsers   = [...demoUsers, ...savedUsers];
            const found      = allUsers.find(u => u.email === email && u.password === password);

            if (found) {
                localStorage.setItem("skygo_user", JSON.stringify(found));
                showToast(`✅ Welcome back, ${found.fname}!`, "success");
                setTimeout(() => { window.location.href = "index.html"; }, 1000);
            } else if (allUsers.find(u => u.email === email)) {
                // Email exists but wrong password
                showToast("❌ Wrong password. Try again.", "error");
                loginBtn.innerHTML = '<span>Login</span><i class="fa-solid fa-arrow-right"></i>';
                loginBtn.disabled  = false;
            } else {
                // New user — auto create account and login
                const name = email.split("@")[0];
                const fname = name.charAt(0).toUpperCase() + name.slice(1);
                const newUser = { email, password, fname, lname: "", phone: "" };
                allUsers.push(newUser);
                localStorage.setItem("skygo_users", JSON.stringify(allUsers));
                localStorage.setItem("skygo_user", JSON.stringify(newUser));
                showToast(`✅ Logged in as ${fname}!`, "success");
                setTimeout(() => { window.location.href = "index.html"; }, 1000);
            }
        }, 1000);
    });
}

// Forgot password
document.querySelector(".forgot")?.addEventListener("click", (e) => {
    e.preventDefault();
    showToast("📧 Password reset link sent!", "info");
});

// Social buttons
document.querySelectorAll(".social-btn").forEach(btn => {
    btn.addEventListener("click", () => showToast("🔗 Social login coming soon!", "info"));
});

// Input focus glow
document.querySelectorAll(".input-wrap input").forEach(input => {
    input.addEventListener("focus", () => {
        const icon = input.parentElement.querySelector("i:first-child");
        if (icon) icon.style.color = "#ffd54f";
    });
    input.addEventListener("blur", () => {
        const icon = input.parentElement.querySelector("i:first-child");
        if (icon) icon.style.color = "rgba(255,255,255,.45)";
    });
});

// Toast
function showToast(msg, type = "info") {
    let t = document.getElementById("skygo-toast");
    if (t) t.remove();
    t = document.createElement("div");
    t.id = "skygo-toast";
    const colors = {
        success: "linear-gradient(135deg,#22c55e,#16a34a)",
        error:   "linear-gradient(135deg,#ef4444,#dc2626)",
        info:    "linear-gradient(135deg,#2563eb,#38bdf8)",
    };
    t.style.cssText = `position:fixed;top:24px;right:24px;z-index:99999;padding:16px 24px;
        border-radius:14px;background:${colors[type]};color:#fff;font-weight:600;font-size:14px;
        box-shadow:0 15px 35px rgba(0,0,0,.25);font-family:'Poppins',sans-serif;
        animation:toastIn .4s ease;`;
    const s = document.createElement("style");
    s.innerHTML = `@keyframes toastIn{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}`;
    document.head.appendChild(s);
    t.innerText = msg;
    document.body.appendChild(t);
    setTimeout(() => {
        t.style.opacity = "0";
        t.style.transition = ".4s";
        setTimeout(() => t.remove(), 400);
    }, 3000);
}
