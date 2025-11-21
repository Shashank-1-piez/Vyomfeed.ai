/* ===========================================
   VyomFeed — app.js (FULL UPDATED VERSION)
   =========================================== */

/* ============================
   ICONS
============================ */
if (window.lucide) lucide.createIcons();

/* ============================
   GLOBAL TOAST SYSTEM
============================ */
const toastContainer = document.createElement("div");
toastContainer.id = "toastContainer";
toastContainer.style.position = "fixed";
toastContainer.style.right = "20px";
toastContainer.style.bottom = "20px";
toastContainer.style.zIndex = "99999";
toastContainer.style.display = "flex";
toastContainer.style.flexDirection = "column";
toastContainer.style.gap = "10px";
document.body.appendChild(toastContainer);

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.style.padding = "12px 14px";
  toast.style.borderRadius = "10px";
  toast.style.boxShadow = "0 8px 30px rgba(2, 6, 23, 0.12)";
  toast.style.fontSize = "14px";
  toast.style.transition = "opacity 0.3s";
  toast.style.background = "#fff";
  toast.style.borderLeft = "4px solid";

  if (type === "success") toast.style.borderLeftColor = "#10b981";
  else if (type === "error") toast.style.borderLeftColor = "#ef4444";
  else if (type === "warning") toast.style.borderLeftColor = "#f59e0b";
  else toast.style.borderLeftColor = "#2563eb";

  toast.innerText = message;
  toastContainer.appendChild(toast);

  setTimeout(() => (toast.style.opacity = "0"), 2500);
  setTimeout(() => toast.remove(), 3000);
}

/* ============================
   LOGIN HANDLER (index.html)
============================ */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    // Doctor login
    if (email === "doctor@gmail.com" && password === "123456780") {
      showToast("Login successful! Redirecting to Doctor Panel...", "success");
      setTimeout(() => {
        window.location.href = "Doctor.html";
      }, 1000);
      return;
    }

    // User login
    if (email === "user@gmail.com" && password === "123456789") {
      showToast("Login successful! Opening Dashboard...", "success");
      setTimeout(() => {
        window.location.href = "User.html";
      }, 1000);
      return;
    }

    showToast("Invalid email or password", "error");
  });
}

/* ============================
   DASHBOARD (User.html)
============================ */
const navButtons = document.querySelectorAll("nav button[data-page]");
const sections = document.querySelectorAll(".page-section");

if (navButtons.length > 0) {
  navButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      navButtons.forEach((b) => b.classList.remove("active"));
      sections.forEach((sec) => sec.classList.add("hidden"));

      btn.classList.add("active");
      const target = btn.getAttribute("data-page");
      document.getElementById(target).classList.remove("hidden");
    })
  );
}

/* ============================
   PROFILE DROPDOWN
============================ */
const profileBtn = document.getElementById("profileMenuBtn");
const dropdown = document.getElementById("profileDropdown");

if (profileBtn && dropdown) {
  profileBtn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });
}

/* ============================
   THEME TOGGLE
============================ */
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  const savedTheme = localStorage.getItem("vyomfeedTheme");
  if (savedTheme === "dark") document.documentElement.classList.add("dark");

  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    const current = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    localStorage.setItem("vyomfeedTheme", current);
  });
}

/* ============================
   ADD METRIC MODAL
============================ */
const metricModal = document.getElementById("metricModal");
const openMetricBtn = document.getElementById("addMetricBtn");
const closeMetricBtn = document.getElementById("closeMetricModal");

if (openMetricBtn && metricModal) {
  openMetricBtn.addEventListener("click", () => {
    metricModal.classList.remove("hidden");
  });
}

if (closeMetricBtn && metricModal) {
  closeMetricBtn.addEventListener("click", () => {
    metricModal.classList.add("hidden");
  });
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && metricModal && !metricModal.classList.contains("hidden")) {
    metricModal.classList.add("hidden");
  }
});

/* ============================
   METRIC FORM
============================ */
const metricForm = document.getElementById("metricForm");

if (metricForm) {
  metricForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const type = document.getElementById("metricType").value;
    const value = document.getElementById("metricValue").value;
    const date = document.getElementById("metricDate").value;

    if (!value || !date) {
      showToast("Please fill all metric fields", "warning");
      return;
    }

    showToast(`${type} added successfully!`, "success");
    metricForm.reset();
    metricModal.classList.add("hidden");
  });
}

/* ============================
   LOGOUT FOR USER
============================ */
const logoutUser = document.getElementById("logoutBtn");
if (logoutUser && window.location.pathname.includes("User.html")) {
  logoutUser.addEventListener("click", () => {
    showToast("Logging out...", "info");
    setTimeout(() => (window.location.href = "index.html"), 1000);
  });
}

/* ============================
   DOCTOR PANEL LOGOUT
============================ */
const doctorLogout = document.getElementById("logoutBtn");
if (doctorLogout && window.location.pathname.includes("Doctor.html")) {
  doctorLogout.addEventListener("click", () => {
    showToast("Logging out...", "info");
    setTimeout(() => (window.location.href = "index.html"), 1000);
  });
}

/* ============================
   DOCTOR PANEL LOOKUP
============================ */
const manualLookup = document.getElementById("manualLookup");
const manualEmail = document.getElementById("manualEmail");
const scanResult = document.getElementById("scanResult");

if (manualLookup && manualEmail && scanResult) {
  manualLookup.addEventListener("click", () => {
    const email = manualEmail.value.trim();

    if (email === "user@gmail.com") {
      scanResult.innerHTML = `
        <div class="p-3 bg-green-100 text-green-800 rounded-lg">
          Patient Found: <strong>user@gmail.com</strong>
        </div>
      `;

      document.getElementById("doctorUploadZone").classList.remove("hidden");
    } else {
      scanResult.innerHTML = `
        <div class="p-3 bg-red-100 text-red-700 rounded-lg">
          No patient found with this email.
        </div>
      `;
    }
  });
}

/* ============================
   CHART INITIALIZATION
============================ */
function initCharts() {
  const charts = [
    { id: "bloodSugarChart", label: "Blood Sugar", data: [95, 105, 102, 98, 110] },
    { id: "bloodPressureChart", label: "Blood Pressure", data: [120, 118, 122, 117, 119] },
    { id: "weightChart", label: "Weight", data: [70, 70.5, 71, 70, 69.5] },
  ];

  charts.forEach((c) => {
    const el = document.getElementById(c.id);
    if (!el) return;

    new Chart(el, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
          {
            label: c.label,
            data: c.data,
            borderWidth: 2,
            borderColor: "#0d9488",
            fill: false,
            tension: 0.4,
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: false } },
      },
    });
  });
}

window.addEventListener("load", initCharts);
