import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, addDoc, getDocs, query, where, orderBy, onSnapshot, serverTimestamp, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAqU1WlN2uHuryajckt3mATBH7Iu1euSNg",
  authDomain: "majshanweb-e99cd.firebaseapp.com",
  projectId: "majshanweb-e99cd",
  messagingSenderId: "231414719508",
  appId: "1:231414719508:web:b6417a0f1430f03cb2f301",
  measurementId: "G-RQYEQZZJ8Q"
};

const app = initializeApp(firebaseConfig);
try { getAnalytics(app); } catch (e) { console.warn("Analytics unavailable", e); }
const auth = getAuth(app);
const db = getFirestore(app);
const adminEmails = ["mhmd1212@gmail.com", "mhmdhaffi42@gmail.com"];
const statuses = ["pending", "accepted", "done", "closed"];

let currentUser = null;
let currentProfile = null;
let activeMode = "mine";
let currentChatId = "";
let currentProjectId = "";
let projectsUnsub = null;
let chatUnsub = null;
let latestProjects = [];

const $ = (s) => document.querySelector(s);
const profileCard = $("#profileCard");
const sidebarToggle = $("#sidebarToggle");
const leftSidebar = $("#leftSidebar");
const openProjectFormBtn = $("#openProjectFormBtn");
const showMyProjectsBtn = $("#showMyProjectsBtn");
const showOpenProjectsBtn = $("#showOpenProjectsBtn");
const roleOverview = $("#roleOverview");
const pendingCount = $("#pendingCount");
const acceptedCount = $("#acceptedCount");
const finishedCount = $("#finishedCount");
const projectRequestForm = $("#projectRequestForm");
const projectList = $("#projectList");
const projectsTitle = $("#projectsTitle");
const refreshProjectsBtn = $("#refreshProjectsBtn");
const chatWrap = $("#chatWrap");
const chatMessages = $("#chatMessages");
const chatForm = $("#chatForm");
const chatMeta = $("#chatMeta");
const chatThreads = $("#chatThreads");
const closeChatBtn = $("#closeChatBtn");
const adminQuickOpen = $("#adminQuickOpen");
const adminPanel = $("#adminPanel");
const closeAdminBtn = $("#closeAdminBtn");
const adminUsers = $("#adminUsers");
const adminProjects = $("#adminProjects");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "./index.html";
    return;
  }
  currentUser = user;
  await ensureUserProfile(user);
  currentProfile = (await getDoc(doc(db, "users", user.uid))).data();
  renderProfile();
  setupRoleUI();
  subscribeProjects();
});

async function ensureUserProfile(user) {
  const refDoc = doc(db, "users", user.uid);
  const snap = await getDoc(refDoc);
  const normalizedEmail = String(user.email || "").trim().toLowerCase();
  const isAdmin = adminEmails.includes(normalizedEmail);
  if (!snap.exists()) {
    await setDoc(refDoc, {
      uid: user.uid,
      email: user.email || "",
      name: user.displayName || "",
      role: isAdmin ? "admin" : "customer",
      photoUrl: user.photoURL || "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return;
  }
  const existing = snap.data();
  if (isAdmin && existing.role !== "admin") await updateDoc(refDoc, { role: "admin", updatedAt: serverTimestamp() });
}

function isAdmin() { return currentProfile?.role === "admin"; }
function isDeveloper() { return currentProfile?.role === "developer" || isAdmin(); }
function isCustomer() { return currentProfile?.role === "customer" || isAdmin(); }

function renderProfile() {
  profileCard.innerHTML = `
    <img src="${escapeAttr(currentProfile.photoUrl || "https://placehold.co/160x160/0f172a/ffffff?text=MW")}" alt="Profile photo" />
    <div>
      <h3>${escapeHtml(currentProfile.name || "Unnamed User")}</h3>
      <p>${escapeHtml(currentProfile.email || "")}</p>
      <p>${escapeHtml(currentProfile.phone || "No phone saved")}</p>
      <span class="role-badge">${escapeHtml(currentProfile.role || "customer")}</span>
      <button id="logoutBtn" class="ghost small-btn">Logout</button>
    </div>`;
  $("#logoutBtn").onclick = () => signOut(auth);
}

function setupRoleUI() {
  const role = currentProfile.role || "customer";
  roleOverview.textContent = role === "admin"
    ? "Admin workspace: manage all users and projects, accept work as a developer, and update every project status."
    : role === "developer"
      ? "Developer workspace: review open website requests, accept a project, then chat and update project status."
      : "Customer workspace: request websites, track your own projects, and chat with the developer after acceptance.";
  openProjectFormBtn.classList.toggle("hidden", !isCustomer());
  showOpenProjectsBtn.classList.toggle("hidden", !isDeveloper());
  projectRequestForm.classList.toggle("hidden", !isCustomer());
  adminQuickOpen.classList.toggle("hidden", !isAdmin());
  activeMode = isDeveloper() && !isCustomer() ? "open" : "mine";
}

function subscribeProjects() {
  if (projectsUnsub) projectsUnsub();
  let q;
  if (activeMode === "open" && isDeveloper()) {
    q = query(collection(db, "projects"), where("status", "==", "pending"));
    projectsTitle.textContent = "Open Website Requests";
  } else if (isAdmin()) {
    q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    projectsTitle.textContent = "All Projects";
  } else if (isDeveloper()) {
    q = query(collection(db, "projects"), where("acceptedDeveloperId", "==", currentUser.uid));
    projectsTitle.textContent = "My Accepted Projects";
  } else {
    q = query(collection(db, "projects"), where("customerId", "==", currentUser.uid));
    projectsTitle.textContent = "My Website Requests";
  }
  projectsUnsub = onSnapshot(q, (snap) => {
    latestProjects = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    renderProjects(latestProjects);
    renderThreads(latestProjects.filter(canOpenChat));
    updateStats(latestProjects);
  }, (err) => {
    projectList.innerHTML = `<p class="note">Could not load projects: ${escapeHtml(err.message)}</p>`;
  });
}

function renderProjects(projects) {
  if (!projects.length) {
    projectList.innerHTML = `<p class="note">No projects found in this view.</p>`;
    return;
  }
  projectList.innerHTML = "";
  projects.forEach((project) => {
    const row = document.createElement("article");
    row.className = "project-card";
    const canAccept = isDeveloper() && project.status === "pending" && !project.acceptedDeveloperId;
    const canStatus = isAdmin() || (isDeveloper() && project.acceptedDeveloperId === currentUser.uid);
    row.innerHTML = `
      <div class="project-top">
        <div><strong>${escapeHtml(project.title || "Untitled website")}</strong><p>${escapeHtml(project.siteType || "Website")}</p></div>
        <span class="status-pill ${escapeAttr(project.status || "pending")}">${escapeHtml(project.status || "pending")}</span>
      </div>
      <p>${escapeHtml(project.description || "")}</p>
      <div class="project-meta">
        <span>Customer: ${escapeHtml(project.customerName || "Unknown")}</span>
        <span>Budget: ${escapeHtml(project.budget || "Not set")}</span>
        <span>Deadline: ${escapeHtml(project.deadline || "Flexible")}</span>
        ${project.acceptedDeveloperName ? `<span>Developer: ${escapeHtml(project.acceptedDeveloperName)}</span>` : ""}
      </div>
      ${project.referenceUrl ? `<a href="${escapeAttr(project.referenceUrl)}" target="_blank" rel="noopener">Open reference</a>` : ""}
      <div class="project-actions">
        ${canAccept ? `<button data-accept="${project.id}">Accept Project</button>` : ""}
        ${canOpenChat(project) ? `<button data-chat="${project.id}">Open Chat</button>` : ""}
        ${canStatus ? statusSelect(project) : ""}
      </div>`;
    projectList.appendChild(row);
  });
  projectList.querySelectorAll("[data-accept]").forEach((button) => button.onclick = () => acceptProject(button.dataset.accept));
  projectList.querySelectorAll("[data-chat]").forEach((button) => button.onclick = () => openProjectChat(button.dataset.chat));
  projectList.querySelectorAll("[data-status]").forEach((select) => select.onchange = () => updateProjectStatus(select.dataset.status, select.value));
}

function statusSelect(project) {
  return `<label class="inline-status">Status <select data-status="${project.id}">${statuses.map((s) => `<option value="${s}" ${project.status === s ? "selected" : ""}>${s}</option>`).join("")}</select></label>`;
}

function canOpenChat(project) {
  return !!project.acceptedDeveloperId && (isAdmin() || project.customerId === currentUser.uid || project.acceptedDeveloperId === currentUser.uid);
}

async function acceptProject(projectId) {
  const project = latestProjects.find((p) => p.id === projectId);
  if (!project || project.status !== "pending" || project.acceptedDeveloperId) return;
  const chatId = `project_${projectId}`;
  await updateDoc(doc(db, "projects", projectId), {
    status: "accepted",
    acceptedDeveloperId: currentUser.uid,
    acceptedDeveloperName: currentProfile.name || currentProfile.email || "Developer",
    acceptedAt: serverTimestamp(),
    chatId,
    updatedAt: serverTimestamp()
  });
  await setDoc(doc(db, "chats", chatId), {
    projectId,
    customerId: project.customerId,
    developerId: currentUser.uid,
    participants: [project.customerId, currentUser.uid],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }, { merge: true });
  activeMode = "mine";
  subscribeProjects();
}

async function updateProjectStatus(projectId, status) {
  if (!statuses.includes(status)) return;
  await updateDoc(doc(db, "projects", projectId), { status, updatedAt: serverTimestamp(), updatedBy: currentUser.uid });
}

projectRequestForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const fd = new FormData(projectRequestForm);
  await addDoc(collection(db, "projects"), {
    customerId: currentUser.uid,
    customerName: currentProfile.name || currentProfile.email || "Customer",
    customerEmail: currentProfile.email || "",
    title: fd.get("title"),
    siteType: fd.get("siteType"),
    budget: fd.get("budget"),
    deadline: fd.get("deadline") || "",
    referenceUrl: fd.get("referenceUrl") || "",
    description: fd.get("description"),
    status: "pending",
    acceptedDeveloperId: "",
    acceptedDeveloperName: "",
    chatId: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  projectRequestForm.reset();
  activeMode = "mine";
  subscribeProjects();
});

function openProjectChat(projectId) {
  const project = latestProjects.find((p) => p.id === projectId);
  if (!project || !canOpenChat(project)) return;
  currentProjectId = projectId;
  currentChatId = project.chatId || `project_${projectId}`;
  chatWrap.classList.remove("hidden");
  chatMeta.textContent = `${project.title || "Project"} | ${project.customerName || "Customer"} and ${project.acceptedDeveloperName || "Developer"}`;
  subscribeToChat(currentChatId);
  chatWrap.scrollIntoView({ behavior: "smooth", block: "start" });
}

function subscribeToChat(chatId) {
  if (chatUnsub) chatUnsub();
  const q = query(collection(db, "chats", chatId, "messages"), orderBy("createdAt", "asc"));
  chatUnsub = onSnapshot(q, (snap) => {
    chatMessages.innerHTML = "";
    snap.forEach((d) => chatMessages.appendChild(renderMessage(d.data())));
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
}

chatForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentChatId) return;
  const fd = new FormData(chatForm);
  const text = String(fd.get("message") || "").trim();
  const file = fd.get("attachment");
  if (!text && (!file || !file.name)) return;
  const payload = { fromUid: currentUser.uid, fromName: currentProfile.name || currentProfile.email || "User", message: text, createdAt: serverTimestamp() };
  try {
    if (file && file.name) payload.attachment = await fileToFirestoreAttachment(file);
    await addDoc(collection(db, "chats", currentChatId, "messages"), payload);
  } catch (err) {
    alert(err.message || "Could not send message.");
    return;
  }
  await updateDoc(doc(db, "chats", currentChatId), { updatedAt: serverTimestamp(), lastMessage: text || file.name });
  chatForm.reset();
});

async function fileToFirestoreAttachment(file) {
  const maxBytes = 700 * 1024;
  if (file.size > maxBytes) {
    throw new Error("File is too large for Firestore-only chat. Please share a link or use a file under 700 KB.");
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({
      dataUrl: String(reader.result || ""),
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size
    });
    reader.onerror = () => reject(reader.error || new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}

function renderMessage(message) {
  const div = document.createElement("div");
  div.className = `msg ${message.fromUid === currentUser.uid ? "me" : "other"}`;
  const attachment = message.attachment ? renderAttachment(message.attachment) : "";
  div.innerHTML = `<strong>${escapeHtml(message.fromName || "User")}</strong>${message.message ? `<p>${escapeHtml(message.message)}</p>` : ""}${attachment}`;
  return div;
}

function renderAttachment(file) {
  const url = escapeAttr(file.dataUrl || "");
  const name = escapeHtml(file.name || "attachment");
  const type = String(file.type || "");
  if (!url) return `<span class="file-link">${name}</span>`;
  if (type.startsWith("image/")) return `<a href="${url}" download="${name}"><img class="chat-media" src="${url}" alt="${name}" /></a>`;
  if (type.startsWith("video/")) return `<video class="chat-media" src="${url}" controls></video>`;
  if (type.startsWith("audio/")) return `<audio class="chat-audio" src="${url}" controls></audio>`;
  return `<a class="file-link" href="${url}" download="${name}">Download ${name}</a>`;
}

function renderThreads(projects) {
  if (!projects.length) {
    chatThreads.innerHTML = `<p class="note">No active chats yet.</p>`;
    return;
  }
  chatThreads.innerHTML = "";
  projects.forEach((project) => {
    const button = document.createElement("button");
    button.className = "thread-item";
    button.innerHTML = `<strong>${escapeHtml(project.title || "Project")}</strong><span>${escapeHtml(project.status || "accepted")}</span>`;
    button.onclick = () => openProjectChat(project.id);
    chatThreads.appendChild(button);
  });
}

function updateStats(projects) {
  pendingCount.textContent = String(projects.filter((p) => p.status === "pending").length);
  acceptedCount.textContent = String(projects.filter((p) => p.status === "accepted").length);
  finishedCount.textContent = String(projects.filter((p) => p.status === "done" || p.status === "closed").length);
}

async function loadAdminPanel() {
  if (!isAdmin()) return;
  const [usersSnap, projectsSnap] = await Promise.all([getDocs(collection(db, "users")), getDocs(query(collection(db, "projects"), orderBy("createdAt", "desc")))]);
  adminUsers.innerHTML = "";
  usersSnap.forEach((d) => {
    const u = d.data();
    const row = document.createElement("div");
    row.className = "user-list-item";
    row.innerHTML = `<strong>${escapeHtml(u.name || "Unnamed")}</strong><p>${escapeHtml(u.email || "")}</p><p>Phone: ${escapeHtml(u.phone || "-")}</p><p>Role: ${escapeHtml(u.role || "customer")}</p><p>ID: ${escapeHtml(u.uid || d.id)}</p>`;
    adminUsers.appendChild(row);
  });
  adminProjects.innerHTML = "";
  projectsSnap.forEach((d) => {
    const p = { id: d.id, ...d.data() };
    const row = document.createElement("div");
    row.className = "user-list-item";
    row.innerHTML = `<strong>${escapeHtml(p.title || "Untitled")}</strong><p>${escapeHtml(p.customerEmail || "")}</p><p>Developer: ${escapeHtml(p.acceptedDeveloperName || "Not accepted")}</p>${statusSelect(p)}`;
    adminProjects.appendChild(row);
  });
  adminProjects.querySelectorAll("[data-status]").forEach((select) => select.onchange = () => updateProjectStatus(select.dataset.status, select.value));
}

openProjectFormBtn?.addEventListener("click", () => { projectRequestForm.classList.remove("hidden"); projectRequestForm.scrollIntoView({ behavior: "smooth", block: "start" }); });
showMyProjectsBtn?.addEventListener("click", () => { activeMode = "mine"; subscribeProjects(); });
showOpenProjectsBtn?.addEventListener("click", () => { activeMode = "open"; subscribeProjects(); });
refreshProjectsBtn?.addEventListener("click", subscribeProjects);
sidebarToggle?.addEventListener("click", () => leftSidebar.classList.toggle("open"));
closeChatBtn?.addEventListener("click", () => chatWrap.classList.add("hidden"));
adminQuickOpen?.addEventListener("click", async () => { adminPanel.classList.remove("hidden"); await loadAdminPanel(); });
closeAdminBtn?.addEventListener("click", () => adminPanel.classList.add("hidden"));

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[ch]));
}
function escapeAttr(value) { return escapeHtml(value).replace(/`/g, "&#96;"); }
