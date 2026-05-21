import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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
const provider = new GoogleAuthProvider();
const adminEmails = ["mhmd1212@gmail.com", "mhmdhaffi42@gmail.com"];

const registerForm = document.querySelector("#registerForm");
const loginForm = document.querySelector("#loginForm");
const authStatus = document.querySelector("#authStatus");
const slidesTrack = document.querySelector("#slidesTrack");
const prevSlide = document.querySelector("#prevSlide");
const nextSlide = document.querySelector("#nextSlide");
const slideIndex = document.querySelector("#slideIndex");
let authActionInProgress = false;

setupSlider();

onAuthStateChanged(auth, async (user) => {
  if (!user || authActionInProgress) return;
  const snap = await getDoc(doc(db, "users", user.uid));
  if (snap.exists()) window.location.href = "./dashboard.html";
});

registerForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const fd = new FormData(registerForm);
  try {
    authActionInProgress = true;
    const cred = await createUserWithEmailAndPassword(auth, fd.get("email"), fd.get("password"));
    await ensureProfile(cred.user, fd);
    window.location.href = "./dashboard.html";
  } catch (err) {
    authStatus.textContent = err.message;
  } finally {
    authActionInProgress = false;
  }
});

document.querySelector("#registerGoogle")?.addEventListener("click", async () => {
  try {
    authActionInProgress = true;
    const cred = await signInWithPopup(auth, provider);
    await ensureProfile(cred.user, new FormData(registerForm));
    window.location.href = "./dashboard.html";
  } catch (err) {
    authStatus.textContent = err.message;
  } finally {
    authActionInProgress = false;
  }
});

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const fd = new FormData(loginForm);
  try {
    authActionInProgress = true;
    await signInWithEmailAndPassword(auth, fd.get("email"), fd.get("password"));
    window.location.href = "./dashboard.html";
  } catch (err) {
    authStatus.textContent = err.message;
  } finally {
    authActionInProgress = false;
  }
});

document.querySelector("#loginGoogle")?.addEventListener("click", async () => {
  try {
    authActionInProgress = true;
    await signInWithPopup(auth, provider);
    window.location.href = "./dashboard.html";
  } catch (err) {
    authStatus.textContent = err.message;
  } finally {
    authActionInProgress = false;
  }
});

async function ensureProfile(user, fd) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  const existing = snap.exists() ? snap.data() : {};
  const normalizedEmail = String(user.email || fd.get("email") || "").trim().toLowerCase();
  const selectedRole = fd.get("role") || existing.role || "customer";
  const role = adminEmails.includes(normalizedEmail) ? "admin" : selectedRole;

  await setDoc(ref, {
    uid: user.uid,
    email: user.email || fd.get("email") || existing.email || "",
    name: fd.get("name") || user.displayName || existing.name || "",
    phone: fd.get("phone") || existing.phone || "",
    address: fd.get("address") || existing.address || "",
    heardFrom: fd.get("heardFrom") || existing.heardFrom || "",
    role,
    photoUrl: fd.get("photoUrl") || user.photoURL || existing.photoUrl || "",
    bio: existing.bio || "",
    skills: existing.skills || "",
    createdAt: existing.createdAt || serverTimestamp(),
    updatedAt: serverTimestamp()
  }, { merge: true });
}

function setupSlider() {
  if (!slidesTrack || !prevSlide || !nextSlide || !slideIndex) return;
  let idx = 0;
  const slides = Array.from(slidesTrack.querySelectorAll(".slide"));
  if (!slides.length) return;
  slides.forEach((slide, index) => renderSlideMedia(slide, index));
  const render = () => {
    slidesTrack.style.transform = `translateX(${idx * -100}%)`;
    slideIndex.textContent = `${idx + 1} / ${slides.length}`;
  };
  nextSlide.addEventListener("click", () => { idx = (idx + 1) % slides.length; render(); });
  prevSlide.addEventListener("click", () => { idx = (idx - 1 + slides.length) % slides.length; render(); });
  setInterval(() => { idx = (idx + 1) % slides.length; render(); }, 5200);
  render();
}

function renderSlideMedia(slide, index) {
  if (slide.querySelector("img, video, iframe")) return;
  const url = String(slide.dataset.mediaUrl || "").trim();
  if (!url) return;
  const media = document.createElement("img");
  media.src = url;
  media.alt = `Web development gallery image ${index + 1}`;
  media.loading = "lazy";
  slide.insertBefore(media, slide.querySelector(".slide-caption") || null);
}
