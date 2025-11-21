/* ===========================================
   VyomFeed — app.js (FULL UPDATED VERSION with AI)
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
   NAV + PAGE LOGIC (works for user dashboard)
============================ */
const navButtons = document.querySelectorAll("nav button[data-page]");
const sections = document.querySelectorAll(".page-section, .page");

if (navButtons.length > 0) {
  navButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      navButtons.forEach((b) => b.classList.remove("active"));
      sections.forEach((sec) => sec.classList.add("hidden"));

      btn.classList.add("active");
      const target = btn.getAttribute("data-page");
      const el = document.getElementById(target);
      if (el) el.classList.remove("hidden");
      // re-render lucide icons
      if (window.lucide) lucide.createIcons();
      // if AI page opened, refresh insights
      if (target === "ai") {
        setTimeout(() => {
          generateAIInsights();
          loadChatHistory();
        }, 150);
      }
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
   SIMPLE MODALS & METRICS HANDLERS
   (kept minimal — existing behavior)
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
   LOGOUT (works both User and Doctor pages)
============================ */
const logoutElements = document.querySelectorAll("#logoutBtn");
logoutElements.forEach((el) => {
  el.addEventListener("click", () => {
    showToast("Logging out...", "info");
    setTimeout(() => (window.location.href = "index.html"), 1000);
  });
});

/* ============================
   DOCTOR LOOKUP (keeps previous behavior)
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

      const zone = document.getElementById("doctorUploadZone");
      if (zone) zone.classList.remove("hidden");
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
   We'll keep a global 'AIData' object with arrays used by AI
============================ */
const AIData = {
  weight: [70, 70.5, 71, 70.2, 70.8],           // latest to oldest (sample)
  sugar: [95, 110, 102, 97, 105],
  bp: [120, 118, 122, 119, 121],
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"]
};

function initCharts() {
  const charts = [
    { id: "bloodSugarChart", label: "Blood Sugar", data: AIData.sugar },
    { id: "bloodPressureChart", label: "Blood Pressure", data: AIData.bp },
    { id: "weightChart", label: "Weight", data: AIData.weight },
  ];

  charts.forEach((c) => {
    const el = document.getElementById(c.id);
    if (!el) return;

    // create responsive canvas by clearing previous
    el.getContext && el.getContext("2d") && el.remove();

    new Chart(el, {
      type: "line",
      data: {
        labels: AIData.labels,
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

/* ============================
   AI AGENT — MOCK LOGIC
   - generateAIInsights: builds insight cards from AIData
   - generateAIResponse: scripted response generator
   - chat UI handlers + localStorage history
============================ */

function trend(arr) {
  if (!arr || arr.length < 2) return 0;
  const diff = arr[arr.length - 1] - arr[0];
  return diff;
}

function avg(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function nice(num, digits = 1) {
  return Number(num.toFixed(digits));
}

function generateAIInsights() {
  const container = document.getElementById("insightsArea");
  const summaryEl = document.getElementById("aiSummary");
  if (!container || !summaryEl) return;

  container.innerHTML = ""; // clear

  // Weight insight
  const wAvg = avg(AIData.weight);
  const wTrend = trend(AIData.weight); // last - first
  const wCard = document.createElement("div");
  wCard.className = "p-4 rounded-lg border";
  wCard.innerHTML = `
    <h4 class="font-semibold">Weight</h4>
    <p class="text-sm">Average: <strong>${nice(wAvg)} kg</strong></p>
    <p class="text-sm">Recent change: <strong>${wTrend >= 0 ? '+'+nice(wTrend) : nice(wTrend)} kg</strong></p>
  `;
  container.appendChild(wCard);

  // Sugar insight
  const sAvg = avg(AIData.sugar);
  const sTrend = trend(AIData.sugar);
  const sCard = document.createElement("div");
  sCard.className = "p-4 rounded-lg border";
  sCard.innerHTML = `
    <h4 class="font-semibold">Blood Sugar</h4>
    <p class="text-sm">Average: <strong>${nice(sAvg)} mg/dL</strong></p>
    <p class="text-sm">Recent change: <strong>${sTrend >= 0 ? '+'+nice(sTrend) : nice(sTrend)} mg/dL</strong></p>
  `;
  container.appendChild(sCard);

  // BP insight
  const bAvg = avg(AIData.bp);
  const bTrend = trend(AIData.bp);
  const bCard = document.createElement("div");
  bCard.className = "p-4 rounded-lg border";
  bCard.innerHTML = `
    <h4 class="font-semibold">Blood Pressure</h4>
    <p class="text-sm">Average: <strong>${nice(bAvg)} mmHg</strong></p>
    <p class="text-sm">Recent change: <strong>${bTrend >= 0 ? '+'+nice(bTrend) : nice(bTrend)} mmHg</strong></p>
  `;
  container.appendChild(bCard);

  // Build summary using rules
  const messages = [];
  // weight rule
  if (wAvg > 85) messages.push("Weight is on the higher side — consider more cardio and review calorie intake.");
  else if (wAvg < 55) messages.push("Weight is low — consider increasing protein and nutrient intake.");
  else messages.push("Weight is within a healthy range.");

  // sugar rule
  if (sAvg >= 126) messages.push("Average blood sugar is high (possible diabetes risk). Consult your doctor.");
  else if (sAvg >= 100) messages.push("Blood sugar is slightly elevated — monitor diet and carbs.");
  else messages.push("Blood sugar looks good.");

  // bp rule
  if (bAvg >= 140) messages.push("Average blood pressure is high — seek medical guidance.");
  else if (bAvg >= 130) messages.push("Blood pressure slightly elevated.");
  else messages.push("Blood pressure is in normal range.");

  summaryEl.innerHTML = messages.map(m => `<p class="mb-1">${m}</p>`).join("");
}

/* AI response generator — fairly simple rule-based script to feel 'smart' */
function generateAIResponse(input) {
  if (!input) return "Sorry, I didn't catch that. Can you try again?";
  const text = input.toLowerCase();

  // Greeting
  if (/hi|hello|hey|good (morning|evening|afternoon)/i.test(text)) {
    return "Hey! I'm VyomBot — your health assistant. Ask me about your weight, sugar, blood pressure, or say 'summary'.";
  }

  // Summary / overview
  if (text.includes("summary") || text.includes("how am i") || text.includes("overall")) {
    const summaryEl = document.getElementById("aiSummary");
    if (summaryEl) return summaryEl.innerText || "I can give you a quick overview: weight stable, sugar normal, blood pressure stable.";
    return "Quick overview: weight stable, sugar normal, blood pressure stable.";
  }

  // Weight queries
  if (text.includes("weight")) {
    const wAvg = nice(avg(AIData.weight));
    const wTrend = nice(trend(AIData.weight));
    let res = `Your recent weight average is ${wAvg} kg. `;
    if (wTrend > 0) res += `You've gained ${wTrend} kg over the recent period. Try adding cardio and tracking calories.`;
    else if (wTrend < 0) res += `You've lost ${Math.abs(wTrend)} kg — good progress! Keep consistent.`;
    else res += `No significant change recently.`;
    return res;
  }

  // Sugar queries
  if (text.includes("sugar") || text.includes("glucose")) {
    const sAvg = nice(avg(AIData.sugar));
    const sTrend = nice(trend(AIData.sugar));
    let res = `Your average blood sugar is ${sAvg} mg/dL. `;
    if (sAvg >= 126) res += "This is in the high range — consult your doctor about diabetes screening.";
    else if (sAvg >= 100) res += "Slightly elevated — watch carb intake and timing.";
    else res += "Within normal range. Keep up the good work!";
    return res;
  }

  // BP queries
  if (text.includes("pressure") || text.includes("bp") || text.includes("blood pressure")) {
    const bAvg = nice(avg(AIData.bp));
    const bTrend = nice(trend(AIData.bp));
    let res = `Average blood pressure is ${bAvg} mmHg. `;
    if (bAvg >= 140) res += "That's high — please consult a healthcare professional.";
    else if (bAvg >= 130) res += "Slightly elevated, consider sodium reduction and exercise.";
    else res += "Looks normal.";
    return res;
  }

  // Diet suggestion
  if (text.includes("diet") || text.includes("food") || text.includes("calorie")) {
    return "Try a balanced diet: lean protein, whole grains, vegetables, and limited processed sugar. If you're reducing weight, aim for a 300-500 kcal/day deficit.";
  }

  // Alerts
  if (text.includes("alerts") || text.includes("risk") || text.includes("danger")) {
    const alerts = [];
    if (avg(AIData.sugar) >= 126) alerts.push("High blood sugar");
    if (avg(AIData.bp) >= 140) alerts.push("High blood pressure");
    if (avg(AIData.weight) > 95) alerts.push("High weight");
    if (alerts.length === 0) return "No major alerts detected. Continue monitoring.";
    return `Alerts: ${alerts.join(", ")}. Consider contacting your doctor.`;
  }

  // fallback - try pattern-based helpful answer
  if (text.length < 50) {
    return "I can help with weight, blood sugar, blood pressure, diet suggestions, or give a summary. Try: 'How is my weight?'";
  }

  // default fallback
  return "Sorry, I can't answer that exactly — but I can summarize your metrics or suggest diet/exercise.";
}

/* Chat UI Helpers */
const chatWindow = document.getElementById("chatWindow");
const chatInput = document.getElementById("chatInput");
const sendChat = document.getElementById("sendChat");
const quickPrompts = document.querySelectorAll(".quickPrompt");
const CHAT_KEY = "vyomfeed_chat_history_v1";

function appendMessage(content, sender = "bot") {
  if (!chatWindow) return;
  const el = document.createElement("div");
  el.className = sender === "user" ? "text-right" : "text-left";
  el.innerHTML = sender === "user"
    ? `<div class="inline-block bg-blue-600 text-white px-3 py-2 rounded-lg">${content}</div>`
    : `<div class="inline-block bg-gray-100 dark:bg-slate-700 px-3 py-2 rounded-lg">${content}</div>`;
  chatWindow.appendChild(el);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function addBotTyping() {
  const el = document.createElement("div");
  el.id = "typingIndicator";
  el.className = "text-left";
  el.innerHTML = `<div class="inline-block bg-gray-100 dark:bg-slate-700 px-3 py-2 rounded-lg">VyomBot is typing<span id="dots">.</span></div>`;
  chatWindow.appendChild(el);
  let dots = 0;
  const interval = setInterval(() => {
    dots = (dots + 1) % 4;
    const d = document.getElementById("dots");
    if (d) d.innerText = ".".repeat(dots);
  }, 400);
  return () => {
    clearInterval(interval);
    const t = document.getElementById("typingIndicator");
    if (t) t.remove();
  };
}

function saveChatHistory(history) {
  localStorage.setItem(CHAT_KEY, JSON.stringify(history || []));
}

function loadChatHistory() {
  const raw = localStorage.getItem(CHAT_KEY);
  const hist = raw ? JSON.parse(raw) : [];
  if (!chatWindow) return;
  chatWindow.innerHTML = "";
  hist.forEach(m => {
    appendMessage(m.text, m.sender);
  });
}

function pushChat(message, sender) {
  const raw = localStorage.getItem(CHAT_KEY);
  const hist = raw ? JSON.parse(raw) : [];
  hist.push({ text: message, sender, ts: Date.now() });
  saveChatHistory(hist);
}

/* Send flow */
if (sendChat && chatInput) {
  sendChat.addEventListener("click", () => {
    const text = chatInput.value.trim();
    if (!text) return;
    appendMessage(text, "user");
    pushChat(text, "user");
    chatInput.value = "";

    // Show typing
    const stop = addBotTyping();
    setTimeout(() => {
      stop();
      const reply = generateAIResponse(text);
      appendMessage(reply, "bot");
      pushChat(reply, "bot");
    }, 800 + Math.random() * 900);
  });

  // Enter key sends
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendChat.click();
    }
  });
}

/* Quick prompts */
quickPrompts.forEach(btn => {
  btn.addEventListener("click", () => {
    const text = btn.innerText;
    chatInput.value = text;
    sendChat.click();
  });
});

/* Load saved chat on AI page open */
window.addEventListener("load", () => {
  // If AI page is visible, load history
  if (document.getElementById("ai") && !document.getElementById("ai").classList.contains("hidden")) {
    loadChatHistory();
  }
});

/* Refresh insights button */
const refreshBtn = document.getElementById("refreshInsights");
if (refreshBtn) {
  refreshBtn.addEventListener("click", () => {
    generateAIInsights();
    showToast("Insights refreshed", "success");
  });
}

/* Expose a simple function to update AIData from other parts (if you add saving metrics) */
function updateAIData(newData) {
  // newData = { weight: [...], sugar: [...], bp: [...], labels: [...] }
  Object.assign(AIData, newData);
  // re-render charts & insights if loaded
  initCharts();
  generateAIInsights();
}

/* Ensure insights are generated initially if AI page is present */
setTimeout(() => {
  generateAIInsights();
}, 500);

