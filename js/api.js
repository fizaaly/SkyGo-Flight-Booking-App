// ═══════════════════════════════════════════════
//  SKYGO API SERVICE — connects frontend to backend
// ═══════════════════════════════════════════════

const API_BASE = "http://localhost:5000/api";

// ── Token helpers ──────────────────────────────
const getToken  = ()        => localStorage.getItem("skygo_token");
const setToken  = (token)   => localStorage.setItem("skygo_token", token);
const clearAuth = ()        => { localStorage.removeItem("skygo_token"); localStorage.removeItem("skygo_user"); };

// ── Core fetch wrapper ─────────────────────────
async function apiRequest(endpoint, method = "GET", body = null, auth = false) {
    const headers = { "Content-Type": "application/json" };
    if (auth) headers["Authorization"] = `Bearer ${getToken()}`;

    const config = { method, headers };
    if (body) config.body = JSON.stringify(body);

    try {
        const res  = await fetch(`${API_BASE}${endpoint}`, config);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Something went wrong");
        return data;
    } catch (err) {
        throw err;
    }
}

// ═══════════════════════════════════════════════
//  AUTH
// ═══════════════════════════════════════════════
const Auth = {
    register: (data)     => apiRequest("/auth/register", "POST", data),
    login:    (data)     => apiRequest("/auth/login",    "POST", data),
    logout:   ()         => apiRequest("/auth/logout",   "POST", null, true),
    me:       ()         => apiRequest("/auth/me",       "GET",  null, true),
    update:   (data)     => apiRequest("/auth/update",   "PUT",  data, true),
    changePwd:(data)     => apiRequest("/auth/change-password", "PUT", data, true),
};

// ═══════════════════════════════════════════════
//  FLIGHTS
// ═══════════════════════════════════════════════
const Flights = {
    search:  (params) => apiRequest(`/flights?${new URLSearchParams(params)}`),
    popular: ()       => apiRequest("/flights/popular"),
    getById: (id)     => apiRequest(`/flights/${id}`),
};

// ═══════════════════════════════════════════════
//  HOTELS
// ═══════════════════════════════════════════════
const Hotels = {
    search:   (params) => apiRequest(`/hotels?${new URLSearchParams(params)}`),
    featured: ()       => apiRequest("/hotels/featured"),
    getById:  (id)     => apiRequest(`/hotels/${id}`),
};

// ═══════════════════════════════════════════════
//  CABS
// ═══════════════════════════════════════════════
const Cabs = {
    list:     (params) => apiRequest(`/cabs?${new URLSearchParams(params || {})}`),
    estimate: (data)   => apiRequest("/cabs/estimate", "POST", data),
    getById:  (id)     => apiRequest(`/cabs/${id}`),
};

// ═══════════════════════════════════════════════
//  BOOKINGS
// ═══════════════════════════════════════════════
const Bookings = {
    create:   (data)   => apiRequest("/bookings",          "POST", data, true),
    myTrips:  (params) => apiRequest(`/bookings/my?${new URLSearchParams(params || {})}`,"GET",null,true),
    getById:  (id)     => apiRequest(`/bookings/${id}`,    "GET",  null, true),
    cancel:   (id, reason) => apiRequest(`/bookings/${id}/cancel`, "PUT", { reason }, true),
};

// ═══════════════════════════════════════════════
//  OFFERS
// ═══════════════════════════════════════════════
const Offers = {
    list:     (params) => apiRequest(`/offers?${new URLSearchParams(params || {})}`),
    validate: (data)   => apiRequest("/offers/validate", "POST", data),
    getById:  (id)     => apiRequest(`/offers/${id}`),
};

// ═══════════════════════════════════════════════
//  Auth State Helper — call on every page load
// ═══════════════════════════════════════════════
async function initAuthState() {
    const token = getToken();
    if (!token) return null;
    try {
        const res = await Auth.me();
        if (res.success) {
            localStorage.setItem("skygo_user", JSON.stringify(res.user));
            return res.user;
        }
    } catch {
        clearAuth();
    }
    return null;
}

// Export globally
window.SkyGoAPI = { Auth, Flights, Hotels, Cabs, Bookings, Offers, getToken, setToken, clearAuth, initAuthState };
