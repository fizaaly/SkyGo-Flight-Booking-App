// ========== SKYGO SIGNUP.JS ==========

// Toggle passwords
["togglePass1","togglePass2"].forEach((id, i) => {
    const toggle = document.getElementById(id);
    const input  = document.getElementById(i === 0 ? "password" : "confirmPassword");
    if (toggle && input) {
        toggle.addEventListener("click", () => {
            const isText = input.type === "text";
            input.type = isText ? "password" : "text";
            toggle.className = isText
                ? "fa-solid fa-eye toggle-pass"
                : "fa-solid fa-eye-slash toggle-pass";
        });
    }
});

// Password strength meter
const passInput    = document.getElementById("password");
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

if (passInput) {
    passInput.addEventListener("input", () => {
        const val = passInput.value;
        let s = 0;
        if (val.length >= 8)           s++;
        if (/[A-Z]/.test(val))         s++;
        if (/[0-9]/.test(val))         s++;
        if (/[^A-Za-z0-9]/.test(val))  s++;
        const levels = [
            { width:"0%",   color:"transparent", text:"" },
            { width:"25%",  color:"#ef4444",      text:"Weak" },
            { width:"50%",  color:"#f97316",      text:"Fair" },
            { width:"75%",  color:"#eab308",      text:"Good" },
            { width:"100%", color:"#22c55e",      text:"Strong 💪" },
        ];
        if (strengthFill) {
            strengthFill.style.width      = levels[s].width;
            strengthFill.style.background = levels[s].color;
        }
        if (strengthText) {
            strengthText.innerText   = levels[s].text;
            strengthText.style.color = levels[s].color;
        }
    });
}

// ── Signup Form Submit ──────────────────────────────────────
const signupForm = document.getElementById("signupForm");
const signupBtn  = document.getElementById("signupBtn");

if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const fname    = document.getElementById("fname").value.trim();
        const lname    = document.getElementById("lname").value.trim();
        const email    = document.getElementById("email").value.trim();
        const phone    = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirm  = document.getElementById("confirmPassword").value;
        const terms    = document.getElementById("termsCheck").checked;

        if (!fname || !lname || !email || !phone || !password) {
            showToast("❌ Please fill in all fields.", "error"); return;
        }
        if (!email.includes("@")) {
            showToast("❌ Enter a valid email address.", "error"); return;
        }
        if (password.length < 6) {
            showToast("❌ Password must be at least 6 characters.", "error"); return;
        }
        if (password !== confirm) {
            showToast("❌ Passwords do not match.", "error"); return;
        }
        if (!terms) {
            showToast("❌ Please accept Terms & Conditions.", "error"); return;
        }

        signupBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';
        signupBtn.disabled  = true;

        setTimeout(() => {
            // Check if email already registered
            const allUsers = JSON.parse(localStorage.getItem("skygo_users") || "[]");
            if (allUsers.find(u => u.email === email)) {
                showToast("❌ Email already registered. Please login.", "error");
                signupBtn.innerHTML = '<span>Create Account</span><i class="fa-solid fa-rocket"></i>';
                signupBtn.disabled  = false;
                return;
            }

            // Save new user
            const newUser = { fname, lname, email, phone, password };
            allUsers.push(newUser);
            localStorage.setItem("skygo_users", JSON.stringify(allUsers));
            localStorage.setItem("skygo_user",  JSON.stringify(newUser));

            showToast(`🎉 Welcome, ${fname}! Account created!`, "success");
            setTimeout(() => { window.location.href = "index.html"; }, 1200);
        }, 1500);
    });
}

// Social buttons
document.querySelectorAll(".social-btn").forEach(btn => {
    btn.addEventListener("click", () => showToast("🔗 Social signup coming soon!", "info"));
});

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
        box-shadow:0 15px 35px rgba(0,0,0,.25);font-family:'Poppins',sans-serif;`;
    t.innerText = msg;
    document.body.appendChild(t);
    setTimeout(() => {
        t.style.opacity = "0"; t.style.transition = ".4s";
        setTimeout(() => t.remove(), 400);
    }, 3000);
}
