const STORAGE_KEY = "wisdom-school-demo-state";
const DEMO_PASSWORD = "demo123";
const ADMIN_TRIGGER = "adminmomo";
const ADMIN_PASSWORD = "momemo";
const ADMIN_EMAIL = "admin@wisdom.school";

const defaultCourses = [
  "Mathematics",
  "Science",
  "General Science",
  "Tajweed",
  "Geography",
  "Biology",
  "Computer",
  "Islamiat",
  "English",
];

const seedState = {
  applicants: {
    students: [],
    teachers: [],
  },
  currentUserId: null,
  users: [
    {
      id: "principal-1",
      role: "principal",
      name: "Principal Amina Yusuf",
      email: "principal@wisdom.school",
      username: "principal.amina",
      phone: "+92 300 2222000",
      grade: "Leadership",
      address: "Wisdom School Main Campus",
      courses: ["School Operations", "Leadership"],
      subjects: ["Leadership", "School Management"],
      password: DEMO_PASSWORD,
    },
    {
      id: "admin-1",
      role: "admin",
      name: "Wisdom Admin",
      email: ADMIN_EMAIL,
      username: "adminmomo",
      phone: "+92 300 0001111",
      grade: "Administration",
      address: "Wisdom School HQ",
      courses: ["Administration", "Approvals", "Messaging"],
      subjects: ["Operations", "Approvals", "Reporting"],
      password: ADMIN_PASSWORD,
    },
    {
      id: "teacher-1",
      role: "teacher",
      name: "Sir Hamza Kareem",
      email: "teacher@wisdom.school",
      username: "sir.hamza",
      phone: "+92 300 1111000",
      grade: "Grade 7 - Grade 10",
      address: "Lahore",
      courses: ["Mathematics", "Computer", "Science"],
      subjects: ["Mathematics", "Computer", "Science"],
      degree: "BS Mathematics",
      password: DEMO_PASSWORD,
      assignedStudentIds: ["student-1", "student-2"],
    },
    {
      id: "student-1",
      role: "student",
      name: "Ayesha Rahman",
      email: "student@wisdom.school",
      username: "ayesha.rahman",
      phone: "+92 300 5555000",
      grade: "Grade 8",
      address: "Karachi",
      courses: ["Mathematics", "Computer", "Tajweed"],
      subjects: ["Mathematics, Computer, Tajweed"],
      password: DEMO_PASSWORD,
    },
    {
      id: "student-2",
      role: "student",
      name: "Bilal Noor",
      email: "bilal@wisdom.school",
      username: "bilal.noor",
      phone: "+92 300 6666000",
      grade: "Grade 8",
      address: "Karachi",
      courses: ["Science", "General Science", "Geography"],
      subjects: ["Science, General Science, Geography"],
      password: DEMO_PASSWORD,
    },
  ],
  tasks: {
    "student-1": [
      { id: "task-1", title: "Mathematics Worksheet 4", detail: "Linear equations practice set", status: "done" },
      { id: "task-2", title: "Computer Quiz Preparation", detail: "Revise hardware and software basics", status: "pending" },
      { id: "task-3", title: "Tajweed Reading Check", detail: "Read Surah Al-Mulk with rules", status: "in review" },
      { id: "task-4", title: "Islamiat Reflection Note", detail: "Write short notes on classroom ethics", status: "awaiting approval" },
    ],
    "student-2": [
      { id: "task-5", title: "Science Lab Notes", detail: "Complete plant cell observations", status: "pending" },
      { id: "task-6", title: "Geography Map Skill", detail: "Mark river systems and capitals", status: "done" },
      { id: "task-7", title: "General Science Revision Sheet", detail: "Review chapter questions for oral check", status: "awaiting approval" },
    ],
  },
  lessons: {
    "student-1": [
      { id: "lesson-1", title: "Algebra Foundations", detail: "Variables, expressions, and balancing equations" },
      { id: "lesson-2", title: "Intro To Computing", detail: "Operating systems, storage, and safe browsing" },
      { id: "lesson-3", title: "Tajweed Rule Focus", detail: "Noon sakinah and tanween practice" },
    ],
    "student-2": [
      { id: "lesson-4", title: "Forces And Motion", detail: "Speed, force, and daily-life examples" },
      { id: "lesson-5", title: "Continents And Regions", detail: "World map reading and climate zones" },
    ],
  },
  scores: {
    "student-1": [
      { id: "score-1", subject: "Mathematics", exam: "Unit Test 2", score: "91%", status: "Excellent" },
      { id: "score-2", subject: "Computer", exam: "Quiz 1", score: "88%", status: "Strong" },
      { id: "score-3", subject: "Tajweed", exam: "Recitation Review", score: "94%", status: "Excellent" },
    ],
    "student-2": [
      { id: "score-4", subject: "Science", exam: "Chapter Test", score: "84%", status: "Good" },
      { id: "score-5", subject: "Geography", exam: "Map Assessment", score: "89%", status: "Strong" },
    ],
  },
  chats: [
    {
      id: "room-principal",
      type: "group",
      name: "Principal Chat",
      memberIds: ["principal-1", "teacher-1", "student-1", "student-2"],
      messages: [
        {
          id: "message-1",
          authorId: "principal-1",
          text: "Welcome to Wisdom School. Use this room for school leadership questions and important notices.",
          sentAt: "2026-03-20T08:00:00Z",
        },
      ],
    },
    {
      id: "room-school-general",
      type: "group",
      name: "Whole School General Group",
      memberIds: ["principal-1", "teacher-1", "student-1", "student-2"],
      messages: [
        {
          id: "message-2",
          authorId: "teacher-1",
          text: "School assembly reminder: all students should review this week’s announcements.",
          sentAt: "2026-03-20T09:00:00Z",
        },
      ],
    },
    {
      id: "room-class-grade-8",
      type: "group",
      name: "Whole Class General Group - Grade 8",
      classKey: "Grade 8",
      memberIds: ["teacher-1", "student-1", "student-2"],
      messages: [
        {
          id: "message-3",
          authorId: "teacher-1",
          text: "Grade 8 students, please check your tasks panel for this week’s assignments.",
          sentAt: "2026-03-20T09:30:00Z",
        },
      ],
    },
    {
      id: "dm-teacher-student-1",
      type: "direct",
      name: "Sir Hamza Kareem",
      memberIds: ["teacher-1", "student-1"],
      messages: [
        {
          id: "message-4",
          authorId: "teacher-1",
          text: "I reviewed your last computer quiz. Your progress is good. Keep practicing shortcuts and file management.",
          sentAt: "2026-03-20T10:15:00Z",
        },
        {
          id: "message-5",
          authorId: "student-1",
          text: "Thank you sir, I will revise before the next lesson.",
          sentAt: "2026-03-20T10:18:00Z",
        },
      ],
    },
  ],
};

const state = loadLocalState();
const elements = {
  studentForm: document.getElementById("studentForm"),
  teacherForm: document.getElementById("teacherForm"),
  toastStack: document.getElementById("toastStack"),
  authTabs: [...document.querySelectorAll(".tab-button")],
  authPanels: [...document.querySelectorAll(".auth-body")],
  emailAuthForm: document.getElementById("emailAuthForm"),
  usernameAuthForm: document.getElementById("usernameAuthForm"),
  googleAuthButton: document.getElementById("googleAuthButton"),
  adminAccess: document.getElementById("adminAccess"),
  adminAuthForm: document.getElementById("adminAuthForm"),
  dashboardPanel: document.getElementById("dashboardPanel"),
  teacherPanel: document.getElementById("teacherPanel"),
  adminPanel: document.getElementById("adminPanel"),
  dashboardTitle: document.getElementById("dashboardTitle"),
  dashboardRole: document.getElementById("dashboardRole"),
  profileSummary: document.getElementById("profileSummary"),
  quickStats: document.getElementById("quickStats"),
  tasksList: document.getElementById("tasksList"),
  lessonsList: document.getElementById("lessonsList"),
  scoresTable: document.getElementById("scoresTable"),
  teacherStudentList: document.getElementById("teacherStudentList"),
  teacherTaskForm: document.getElementById("teacherTaskForm"),
  teacherLessonForm: document.getElementById("teacherLessonForm"),
  teacherScoreForm: document.getElementById("teacherScoreForm"),
  adminUserList: document.getElementById("adminUserList"),
  adminTaskList: document.getElementById("adminTaskList"),
  adminStudentAppList: document.getElementById("adminStudentAppList"),
  adminTeacherAppList: document.getElementById("adminTeacherAppList"),
  scoreForm: document.getElementById("scoreForm"),
  scoreStudent: document.getElementById("scoreStudent"),
  adminMessageForm: document.getElementById("adminMessageForm"),
  adminMessageTarget: document.getElementById("adminMessageTarget"),
  railButtons: [...document.querySelectorAll("[data-chat-filter]")],
  chatList: document.getElementById("chatList"),
  activeChatHeader: document.getElementById("activeChatHeader"),
  messageFeed: document.getElementById("messageFeed"),
  messageForm: document.getElementById("messageForm"),
  messageInput: document.getElementById("messageInput"),
  attachFileButton: document.getElementById("attachFileButton"),
  attachmentInput: document.getElementById("attachmentInput"),
  chatSearchForm: document.getElementById("chatSearchForm"),
  chatSearchInput: document.getElementById("chatSearchInput"),
  logoutButton: document.getElementById("logoutButton"),
};

let activeChatId = null;
let activeChatFilter = "all";
let firebaseAdapter = null;

bindNavigation();
bindForms();
bindAuth();
bindAdminTrigger();
bindMessengerControls();
bindTeacherForms();
bootstrap();

async function bootstrap() {
  await initFirebase();
  if (firebaseAdapter) {
    firebaseAdapter.startSessionObserver();
  } else {
    renderDashboard();
  }
}

function loadLocalState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || structuredClone(seedState);
  } catch {
    return structuredClone(seedState);
  }
}

function saveLocalState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function bindNavigation() {
  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById(button.dataset.jump)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function bindForms() {
  elements.studentForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const applicant = {
      id: crypto.randomUUID(),
      name: String(formData.get("name")).trim(),
      email: String(formData.get("email")).trim().toLowerCase(),
      phone: String(formData.get("phone")).trim(),
      address: String(formData.get("address")).trim(),
      grade: String(formData.get("grade")).trim(),
      subjects: String(formData.get("subjects")).trim(),
      courses: formData.getAll("courses"),
      createdAt: new Date().toISOString(),
    };

    state.applicants.students.unshift(applicant);
    saveLocalState();
    if (firebaseAdapter) {
      await firebaseAdapter.createApplication("studentApplications", applicant);
    }
    event.currentTarget.reset();
    showToast(
      "Student request submitted",
      "your request is sent successfully , we will review your request and inform you about further detailes on your email , it may take time from one day to a week due to bussiness of the server "
    );
  });

  elements.teacherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const applicant = {
      id: crypto.randomUUID(),
      name: String(formData.get("name")).trim(),
      phone: String(formData.get("phone")).trim(),
      email: String(formData.get("email")).trim().toLowerCase(),
      degree: String(formData.get("degree")).trim(),
      grades: String(formData.get("grades")).trim(),
      subjects: String(formData.get("subjects")).trim(),
      createdAt: new Date().toISOString(),
    };

    state.applicants.teachers.unshift(applicant);
    saveLocalState();
    if (firebaseAdapter) {
      await firebaseAdapter.createApplication("teacherApplications", applicant);
    }
    event.currentTarget.reset();
    showToast("Teacher application submitted", "Your teaching profile has been sent to Wisdom School for review.");
  });
}

function bindTeacherForms() {
  if (!elements.teacherTaskForm) {
    return;
  }

  elements.teacherTaskForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const studentId = String(formData.get("studentId"));
    const task = {
      id: crypto.randomUUID(),
      studentId,
      title: String(formData.get("title")).trim(),
      detail: String(formData.get("detail")).trim(),
      status: String(formData.get("status")),
      createdAt: new Date().toISOString(),
    };

    if (!state.tasks[studentId]) {
      state.tasks[studentId] = [];
    }
    state.tasks[studentId].unshift(task);
    saveLocalState();
    if (firebaseAdapter) {
      await firebaseAdapter.createTask(task);
    }
    renderAcademicPanels(getCurrentUser());
    event.currentTarget.reset();
    showToast("Task published", "Students will see the new task in their dashboard.");
  });

  elements.teacherLessonForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const studentId = String(formData.get("studentId"));
    const lesson = {
      id: crypto.randomUUID(),
      studentId,
      title: String(formData.get("title")).trim(),
      detail: String(formData.get("detail")).trim(),
      createdAt: new Date().toISOString(),
    };

    if (!state.lessons[studentId]) {
      state.lessons[studentId] = [];
    }
    state.lessons[studentId].unshift(lesson);
    saveLocalState();
    if (firebaseAdapter) {
      await firebaseAdapter.createLesson(lesson);
    }
    renderAcademicPanels(getCurrentUser());
    event.currentTarget.reset();
    showToast("Lesson added", "Students can now review this lesson summary.");
  });

  elements.teacherScoreForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const studentId = String(formData.get("studentId"));
    const score = {
      id: crypto.randomUUID(),
      studentId,
      subject: String(formData.get("subject")).trim(),
      exam: String(formData.get("exam")).trim(),
      score: String(formData.get("score")).trim(),
      status: String(formData.get("status")).trim(),
      createdAt: new Date().toISOString(),
    };

    if (!state.scores[studentId]) {
      state.scores[studentId] = [];
    }
    state.scores[studentId].unshift(score);
    saveLocalState();
    if (firebaseAdapter) {
      await firebaseAdapter.createScore(score);
    }
    renderAcademicPanels(getCurrentUser());
    event.currentTarget.reset();
    showToast("Score recorded", "Students will see the updated performance entry.");
  });
}

function bindAuth() {
  elements.authTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      elements.authTabs.forEach((button) => button.classList.remove("active"));
      elements.authPanels.forEach((panel) => panel.classList.remove("active"));
      tab.classList.add("active");
      document.querySelector(`[data-auth-panel="${tab.dataset.authTab}"]`)?.classList.add("active");
    });
  });

  elements.emailAuthForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitterMode = event.submitter?.dataset.mode || "login";
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email")).trim().toLowerCase();
    const password = String(formData.get("password")).trim();

    let user = null;
    if (submitterMode === "signup") {
      user = firebaseAdapter
        ? await firebaseAdapter.signUpStudent(email, password)
        : createLocalStudent(email, password);
      showToast("Account created", "Your portal account is ready. You have been redirected to the Wisdom dashboard.");
    } else {
      user = firebaseAdapter
        ? await firebaseAdapter.signInWithEmail(email, password)
        : state.users.find((entry) => entry.email.toLowerCase() === email && entry.password === password);
      if (!user) {
        showToast("Login failed", "No approved user was found with that email and password.");
        return;
      }
      showToast("Login successful", `Welcome back, ${user.name}.`);
    }

    state.currentUserId = user.id;
    saveLocalState();
    renderDashboard();
    event.currentTarget.reset();
  });

  elements.usernameAuthForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username")).trim().toLowerCase();
    const password = String(formData.get("password")).trim();
    const user = firebaseAdapter
      ? await firebaseAdapter.signInWithUsername(username, password)
      : state.users.find((entry) => entry.username.toLowerCase() === username && entry.password === password);

    if (!user) {
      showToast("Login failed", "Username or password is incorrect.");
      return;
    }

    state.currentUserId = user.id;
    saveLocalState();
    renderDashboard();
    event.currentTarget.reset();
    showToast("Login successful", `Welcome back, ${user.name}.`);
  });

  elements.googleAuthButton.addEventListener("click", async () => {
    const user = firebaseAdapter
      ? await firebaseAdapter.signInWithGoogle()
      : state.users.find((entry) => entry.email === "student@wisdom.school");
    if (!user) {
      showToast("Google auth not connected", "Firebase Google sign-in is not configured yet, so the app stayed in demo mode.");
      return;
    }

    state.currentUserId = user.id;
    saveLocalState();
    renderDashboard();
    showToast("Login successful", `Welcome back, ${user.name}.`);
  });

  elements.adminAuthForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("adminPassword")).trim();
    if (password !== ADMIN_PASSWORD) {
      showToast("Access denied", "The admin password is incorrect.");
      return;
    }

    const user = firebaseAdapter
      ? await firebaseAdapter.signInAdmin()
      : state.users.find((entry) => entry.role === "admin");

    if (!user) {
      showToast("Admin failed", "Admin account could not be opened.");
      return;
    }

    state.currentUserId = user.id;
    saveLocalState();
    renderDashboard();
    event.currentTarget.reset();
    showToast("Admin unlocked", "The hidden admin panel is now open.");
  });

  elements.messageForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const currentUser = getCurrentUser();
    const text = elements.messageInput.value.trim();
    if (!currentUser || !text || !activeChatId) {
      return;
    }

    const chat = state.chats.find((entry) => entry.id === activeChatId);
    if (!chat) {
      return;
    }

    const message = {
      id: crypto.randomUUID(),
      authorId: currentUser.id,
      text,
      sentAt: new Date().toISOString(),
    };

    chat.messages.push(message);
    elements.messageInput.value = "";
    saveLocalState();
    if (firebaseAdapter) {
      await firebaseAdapter.sendMessage(chat.id, message);
    }
    renderChats(currentUser);
  });

  elements.chatSearchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = elements.chatSearchInput.value.trim().toLowerCase();
    const currentUser = getCurrentUser();
    if (!currentUser || !query) {
      return;
    }

    const targetUser = state.users.find((user) => {
      return user.id !== currentUser.id && (user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query));
    });

    if (!targetUser) {
      showToast("Profile not found", "No teacher or student matched that profile name or email.");
      return;
    }

    let directChat = state.chats.find((chat) => {
      return chat.type === "direct" && chat.memberIds.includes(currentUser.id) && chat.memberIds.includes(targetUser.id);
    });

    if (!directChat) {
      directChat = {
        id: crypto.randomUUID(),
        type: "direct",
        name: targetUser.name,
        memberIds: [currentUser.id, targetUser.id],
        messages: [
          {
            id: crypto.randomUUID(),
            authorId: currentUser.id,
            text: `Assalamualaikum ${targetUser.name}, I am contacting you through Wisdom School.`,
            sentAt: new Date().toISOString(),
          },
        ],
      };
      state.chats.unshift(directChat);
      saveLocalState();
      if (firebaseAdapter) {
        await firebaseAdapter.upsertRoom(directChat);
        await firebaseAdapter.sendMessage(directChat.id, directChat.messages[0]);
      }
      showToast("Chat created", `A new conversation with ${targetUser.name} has been added.`);
    } else {
      showToast("Chat opened", `Direct chat with ${targetUser.name} is ready.`);
    }

    activeChatId = directChat.id;
    elements.chatSearchInput.value = "";
    renderChats(currentUser);
  });

  elements.logoutButton.addEventListener("click", async () => {
    if (firebaseAdapter) {
      await firebaseAdapter.signOut();
    }
    state.currentUserId = null;
    saveLocalState();
    renderDashboard();
    showToast("Logged out", "You have left the Wisdom School dashboard.");
  });

  elements.scoreForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const currentUser = getCurrentUser();
    if (currentUser?.role !== "admin") {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const studentId = String(formData.get("studentId"));
    const score = {
      id: crypto.randomUUID(),
      studentId,
      subject: String(formData.get("subject")).trim(),
      exam: String(formData.get("exam")).trim(),
      score: String(formData.get("score")).trim(),
      status: String(formData.get("status")).trim(),
      createdAt: new Date().toISOString(),
    };

    if (!state.scores[studentId]) {
      state.scores[studentId] = [];
    }
    state.scores[studentId].unshift(score);
    saveLocalState();
    if (firebaseAdapter) {
      await firebaseAdapter.saveScore(score);
    }
    renderAcademicPanels(currentUser);
    renderAdminPanel(currentUser);
    event.currentTarget.reset();
    showToast("Score saved", "The student score has been added.");
  });

  elements.adminMessageForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const currentUser = getCurrentUser();
    if (currentUser?.role !== "admin") {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const targetId = String(formData.get("targetId"));
    const text = String(formData.get("message")).trim();
    if (!targetId || !text) {
      return;
    }

    let directChat = state.chats.find((chat) => {
      return chat.type === "direct" && chat.memberIds.includes(currentUser.id) && chat.memberIds.includes(targetId);
    });

    if (!directChat) {
      const targetUser = state.users.find((user) => user.id === targetId);
      directChat = {
        id: crypto.randomUUID(),
        type: "direct",
        name: targetUser?.name || "User",
        memberIds: [currentUser.id, targetId],
        messages: [],
      };
      state.chats.unshift(directChat);
      if (firebaseAdapter) {
        await firebaseAdapter.upsertRoom(directChat);
      }
    }

    const message = {
      id: crypto.randomUUID(),
      authorId: currentUser.id,
      text,
      sentAt: new Date().toISOString(),
    };

    directChat.messages.push(message);
    activeChatId = directChat.id;
    saveLocalState();
    if (firebaseAdapter) {
      await firebaseAdapter.sendMessage(directChat.id, message);
    }
    renderChats(currentUser);
    renderAdminPanel(currentUser);
    event.currentTarget.reset();
    showToast("Message sent", "The admin message has been delivered to the selected user chat.");
  });
}

function bindMessengerControls() {
  elements.railButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeChatFilter = button.dataset.chatFilter;
      elements.railButtons.forEach((entry) => entry.classList.toggle("active", entry === button));
      const currentUser = getCurrentUser();
      if (currentUser) {
        renderChats(currentUser);
      }
    });
  });

  elements.attachFileButton.addEventListener("click", () => {
    elements.attachmentInput.click();
  });

  elements.attachmentInput.addEventListener("change", async (event) => {
    const currentUser = getCurrentUser();
    const file = event.currentTarget.files?.[0];
    if (!currentUser || !file || !activeChatId) {
      return;
    }

    const chat = state.chats.find((entry) => entry.id === activeChatId);
    if (!chat) {
      return;
    }

    const message = {
      id: crypto.randomUUID(),
      authorId: currentUser.id,
      text: "",
      sentAt: new Date().toISOString(),
      attachment: {
        name: file.name,
        size: file.size,
        mimeType: file.type || "file",
      },
    };

    chat.messages.push(message);
    saveLocalState();
    if (firebaseAdapter) {
      await firebaseAdapter.sendMessage(chat.id, message);
    }
    event.currentTarget.value = "";
    renderChats(currentUser);
    showToast("Attachment added", `${file.name} was sent to the conversation.`);
  });
}

function bindAdminTrigger() {
  let typed = "";
  document.addEventListener("keydown", (event) => {
    if (event.key.length !== 1) {
      return;
    }
    typed = `${typed}${event.key.toLowerCase()}`.slice(-ADMIN_TRIGGER.length);
    if (typed === ADMIN_TRIGGER) {
      elements.adminAccess.classList.remove("hidden");
      elements.adminAccess.scrollIntoView({ behavior: "smooth", block: "center" });
      showToast("Hidden access found", "Admin verification has been opened.");
      typed = "";
    }
  });
}

async function initFirebase() {
  try {
    const configModule = await import("./firebase-config.js");
    if (!configModule.firebaseConfig) {
      return;
    }

    const [{ initializeApp }, authModule, analyticsModule, firestoreModule] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js"),
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"),
    ]);

    const app = initializeApp(configModule.firebaseConfig);
    analyticsModule.getAnalytics(app);
    const auth = authModule.getAuth(app);
    const db = firestoreModule.getFirestore(app);
    const googleProvider = new authModule.GoogleAuthProvider();

    firebaseAdapter = createFirebaseAdapter(auth, db, authModule, firestoreModule, googleProvider);
  } catch {
    firebaseAdapter = null;
  }
}

function createFirebaseAdapter(auth, db, authModule, firestoreModule, googleProvider) {
  const {
    collection,
    doc,
    getDoc,
    query,
    setDoc,
    updateDoc,
    deleteDoc,
    orderBy,
    arrayUnion,
    onSnapshot,
  } = firestoreModule;
  const roomMessageUnsubs = new Map();
  let collectionUnsubs = [];

  function syncRender() {
    saveLocalState();
    renderDashboard();
  }

  function stopRealtimeSync() {
    collectionUnsubs.forEach((unsubscribe) => unsubscribe());
    collectionUnsubs = [];
    roomMessageUnsubs.forEach((unsubscribe) => unsubscribe());
    roomMessageUnsubs.clear();
  }

  function startRealtimeSync() {
    if (!auth.currentUser) {
      return;
    }

    stopRealtimeSync();

    collectionUnsubs = [
      onSnapshot(collection(db, "users"), (snapshot) => {
        state.users = snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
        state.currentUserId = auth.currentUser?.uid || null;
        syncRender();
      }),
      onSnapshot(collection(db, "studentApplications"), (snapshot) => {
        state.applicants.students = snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
        syncRender();
      }),
      onSnapshot(collection(db, "teacherApplications"), (snapshot) => {
        state.applicants.teachers = snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
        syncRender();
      }),
      onSnapshot(collection(db, "tasks"), (snapshot) => {
        state.tasks = groupByStudent(snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })));
        syncRender();
      }),
      onSnapshot(collection(db, "lessons"), (snapshot) => {
        state.lessons = groupByStudent(snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })));
        syncRender();
      }),
      onSnapshot(collection(db, "scores"), (snapshot) => {
        state.scores = groupByStudent(snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })));
        syncRender();
      }),
      onSnapshot(collection(db, "rooms"), (snapshot) => {
        const nextRooms = snapshot.docs.map((entry) => {
          const existing = state.chats.find((chat) => chat.id === entry.id);
          return { id: entry.id, ...entry.data(), messages: existing?.messages || [] };
        });
        state.chats = nextRooms;

        const liveRoomIds = new Set(nextRooms.map((room) => room.id));
        roomMessageUnsubs.forEach((unsubscribe, roomId) => {
          if (!liveRoomIds.has(roomId)) {
            unsubscribe();
            roomMessageUnsubs.delete(roomId);
          }
        });

        nextRooms.forEach((room) => {
          if (roomMessageUnsubs.has(room.id)) {
            return;
          }

          const unsubscribe = onSnapshot(
            query(collection(db, "rooms", room.id, "messages"), orderBy("sentAt")),
            (messageSnapshot) => {
              const targetRoom = state.chats.find((entry) => entry.id === room.id);
              if (!targetRoom) {
                return;
              }
              targetRoom.messages = messageSnapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
              syncRender();
            }
          );

          roomMessageUnsubs.set(room.id, unsubscribe);
        });

        syncRender();
      }),
    ];
  }

  function startSessionObserver() {
    authModule.onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        stopRealtimeSync();
        state.currentUserId = null;
        saveLocalState();
        renderDashboard();
        return;
      }

      const userRef = doc(db, "users", firebaseUser.uid);
      const existing = await getDoc(userRef);
      if (!existing.exists()) {
        await syncFirebaseUser(firebaseUser);
        return;
      }

      const localUser = { id: firebaseUser.uid, ...existing.data() };
      state.users = upsertStateUser(localUser);
      state.currentUserId = firebaseUser.uid;
      saveLocalState();
      renderDashboard();
      startRealtimeSync();
    });
  }

  async function upsertUserProfile(user) {
    await setDoc(doc(db, "users", user.id), user, { merge: true });
    if (user.username) {
      await setDoc(doc(db, "usernames", user.username.toLowerCase()), {
        uid: user.id,
        email: user.email,
        username: user.username.toLowerCase(),
      });
    }
  }

  async function syncFirebaseUser(firebaseUser, preferredRole = "student") {
    const userRef = doc(db, "users", firebaseUser.uid);
    const existing = await getDoc(userRef);
    const localPart = (firebaseUser.email || "wisdom.user").split("@")[0].toLowerCase();
    const userData = existing.exists()
      ? { id: firebaseUser.uid, ...existing.data() }
      : {
          id: firebaseUser.uid,
          role: preferredRole,
          name: firebaseUser.displayName || localPart.replace(/[._-]/g, " "),
          email: firebaseUser.email || `${localPart}@wisdom.school`,
          username: localPart,
          phone: "Pending",
          grade: preferredRole === "admin" ? "Administration" : "Pending Placement",
          address: preferredRole === "admin" ? "Wisdom School HQ" : "Pending Admission Review",
          courses: preferredRole === "admin" ? ["Administration", "Approvals", "Messaging"] : defaultCourses.slice(0, 3),
          subjects: preferredRole === "admin" ? ["Operations", "Approvals", "Reporting"] : defaultCourses.slice(0, 3).join(", "),
        };

    await upsertUserProfile(userData);
    await ensureDefaultRooms(userData);
    state.users = upsertStateUser(userData);
    state.currentUserId = firebaseUser.uid;
    saveLocalState();
    renderDashboard();
    startRealtimeSync();
    return state.users.find((entry) => entry.id === firebaseUser.uid) || userData;
  }

  async function ensureDefaultRooms(user) {
    const roomDefs = [
      { id: "room-principal", type: "group", name: "Principal Chat" },
      { id: "room-school-general", type: "group", name: "Whole School General Group" },
    ];

    if (user.grade && user.grade !== "Pending Placement" && user.grade !== "Administration" && user.grade !== "Leadership") {
      roomDefs.push({
        id: `room-class-${slugify(user.grade)}`,
        type: "group",
        name: `Whole Class General Group - ${user.grade}`,
        classKey: user.grade,
      });
    }

    for (const room of roomDefs) {
      await setDoc(doc(db, "rooms", room.id), {
        ...room,
        memberIds: arrayUnion(user.id),
      }, { merge: true });
    }
  }

  async function createTask(task) {
    await setDoc(doc(db, "tasks", task.id), task, { merge: true });
  }

  async function createLesson(lesson) {
    await setDoc(doc(db, "lessons", lesson.id), lesson, { merge: true });
  }

  async function createScore(score) {
    await setDoc(doc(db, "scores", score.id), score, { merge: true });
  }

  async function createUserProfile(user) {
    await upsertUserProfile(user);
  }

  async function deleteDocument(collectionName, docId) {
    await deleteDoc(doc(db, collectionName, docId));
  }

  async function signInWithEmail(email, password) {
    const result = await authModule.signInWithEmailAndPassword(auth, email, password);
    return syncFirebaseUser(result.user);
  }

  async function signUpStudent(email, password) {
    const result = await authModule.createUserWithEmailAndPassword(auth, email, password);
    const localPart = email.split("@")[0].toLowerCase();
    await authModule.updateProfile(result.user, { displayName: localPart.replace(/[._-]/g, " ") });
    return syncFirebaseUser(auth.currentUser, "student");
  }

  async function signInWithGoogle() {
    const result = await authModule.signInWithPopup(auth, googleProvider);
    return syncFirebaseUser(result.user, "student");
  }

  async function signInWithUsername(username, password) {
    const usernameDoc = await getDoc(doc(db, "usernames", username.toLowerCase()));
    if (!usernameDoc.exists()) {
      return null;
    }
    const mappedEmail = usernameDoc.data().email;
    const result = await authModule.signInWithEmailAndPassword(auth, mappedEmail, password);
    return syncFirebaseUser(result.user);
  }

  async function signInAdmin() {
    try {
      const result = await authModule.signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
      return syncFirebaseUser(result.user, "admin");
    } catch {
      const result = await authModule.createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
      return syncFirebaseUser(result.user, "admin");
    }
  }

  async function createApplication(collectionName, payload) {
    await setDoc(doc(db, collectionName, payload.id), payload, { merge: true });
  }

  async function upsertRoom(room) {
    const { messages, ...roomData } = room;
    await setDoc(doc(db, "rooms", room.id), roomData, { merge: true });
  }

  async function sendMessage(roomId, message) {
    await setDoc(doc(db, "rooms", roomId, "messages", message.id), message, { merge: true });
  }

  async function saveScore(score) {
    await setDoc(doc(db, "scores", score.id), score, { merge: true });
  }

  async function approveTask(task) {
    await updateDoc(doc(db, "tasks", task.id), { status: "approved" });
  }

  async function saveTeacherAssignment(teacher) {
    const { id, ...data } = teacher;
    await setDoc(doc(db, "users", id), data, { merge: true });
  }

  async function signOut() {
    await authModule.signOut(auth);
  }

  return {
    startSessionObserver,
    hydrateState: startRealtimeSync,
    signInWithEmail,
    signUpStudent,
    signInWithGoogle,
    signInWithUsername,
    signInAdmin,
    signOut,
    createApplication,
    upsertRoom,
    sendMessage,
    saveScore,
    createTask,
    createLesson,
    createScore,
    createUserProfile,
    deleteDocument,
    approveTask,
    saveTeacherAssignment,
  };
}

function createLocalStudent(email, password) {
  const localPart = email.split("@")[0] || "wisdom.user";
  const newUser = {
    id: crypto.randomUUID(),
    role: "student",
    name: localPart.replace(/[._-]/g, " "),
    email,
    username: localPart,
    phone: "Not provided",
    grade: "Pending Placement",
    address: "Pending Admission Review",
    courses: defaultCourses.slice(0, 3),
    subjects: defaultCourses.slice(0, 3).join(", "),
    password,
  };
  state.users.push(newUser);
  saveLocalState();
  return newUser;
}

function getCurrentUser() {
  return state.users.find((user) => user.id === state.currentUserId) || null;
}

function renderDashboard() {
  const currentUser = getCurrentUser();
  elements.dashboardPanel.classList.toggle("hidden", !currentUser);
  if (!currentUser) {
    return;
  }

  elements.dashboardTitle.textContent = `Welcome, ${currentUser.name}`;
  elements.dashboardRole.textContent = capitalize(currentUser.role);
  renderProfile(currentUser);
  renderAcademicPanels(currentUser);
  renderTeacherPanel(currentUser);
  renderAdminPanel(currentUser);
  renderChats(currentUser);
  elements.dashboardPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderProfile(currentUser) {
  const profileItems = [
    ["Name", currentUser.name],
    ["Email", currentUser.email],
    ["Phone", currentUser.phone],
    ["Grade", currentUser.grade],
    ["Courses", formatArray(currentUser.courses)],
    ["Subjects", formatArray(currentUser.subjects)],
  ];

  elements.profileSummary.innerHTML = profileItems
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${value || "-"}</dd></div>`)
    .join("");

  const taskCount = (state.tasks[currentUser.id] || []).length;
  const lessonCount = (state.lessons[currentUser.id] || []).length;
  const chatCount = state.chats.filter((chat) => chat.memberIds.includes(currentUser.id)).length;
  const statItems = [`${taskCount} active tasks`, `${lessonCount} lesson blocks`, `${chatCount} chat spaces`];

  if (currentUser.role === "teacher") {
    statItems.push(`${(currentUser.assignedStudentIds || []).length} selected students`);
  }
  if (currentUser.role === "admin") {
    statItems.push(`${getAwaitingTasks().length} tasks awaiting approval`);
  }

  elements.quickStats.innerHTML = statItems.map((label) => `<div class="metric-item">${label}</div>`).join("");
}

function renderAcademicPanels(currentUser) {
  const studentSource = currentUser.role === "student"
    ? currentUser.id
    : currentUser.role === "teacher"
      ? currentUser.assignedStudentIds?.[0]
      : state.users.find((user) => user.role === "student")?.id;

  const tasks = state.tasks[studentSource] || [];
  const lessons = state.lessons[studentSource] || [];
  const scores = state.scores[studentSource] || [];

  elements.tasksList.innerHTML = tasks.length
    ? tasks.map((task) => `<article class="list-card"><strong>${task.title}</strong><p>${task.detail}</p><span class="status-chip ${formatStatusClass(task.status)}">${task.status}</span></article>`).join("")
    : `<article class="list-card"><strong>No tasks yet</strong><p>Tasks will appear here when teachers publish them.</p></article>`;

  elements.lessonsList.innerHTML = lessons.length
    ? lessons.map((lesson) => `<article class="list-card"><strong>${lesson.title}</strong><p>${lesson.detail}</p></article>`).join("")
    : `<article class="list-card"><strong>No lessons yet</strong><p>Lesson summaries will appear here.</p></article>`;

  elements.scoresTable.innerHTML = scores.length
    ? scores.map((score) => `<tr><td>${score.subject}</td><td>${score.exam}</td><td>${score.score}</td><td>${score.status}</td></tr>`).join("")
    : `<tr><td colspan="4">Scores will appear after assessments are recorded.</td></tr>`;
}

function renderTeacherPanel(currentUser) {
  const visible = currentUser.role === "teacher" || currentUser.role === "principal";
  elements.teacherPanel.classList.toggle("hidden", !visible);
  if (!visible) {
    return;
  }

  const students = state.users.filter((user) => user.role === "student");
  elements.teacherStudentList.innerHTML = students.map((student) => {
    const selected = currentUser.assignedStudentIds?.includes(student.id);
    return `<article class="directory-card"><strong>${student.name}</strong><span>${student.email}</span><p><strong>Grade:</strong> ${student.grade}</p><p><strong>Courses:</strong> ${formatArray(student.courses)}</p><button class="button ${selected ? "button-muted" : ""}" data-select-student="${student.id}">${selected ? "Selected For Teaching" : "Select For Teaching"}</button></article>`;
  }).join("");

  document.querySelectorAll("[data-select-student]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!currentUser.assignedStudentIds) {
        currentUser.assignedStudentIds = [];
      }
      const studentId = button.dataset.selectStudent;
      if (currentUser.assignedStudentIds.includes(studentId)) {
        return;
      }
      currentUser.assignedStudentIds.push(studentId);
      saveLocalState();
      if (firebaseAdapter) {
        await firebaseAdapter.saveTeacherAssignment(currentUser);
        await firebaseAdapter.hydrateState();
      }
      renderProfile(getCurrentUser());
      renderAcademicPanels(getCurrentUser());
      renderTeacherPanel(getCurrentUser());
      showToast("Student selected", "This student has been added to your teaching list.");
    });
  });

  populateTeacherStudentSelects();
}

function populateTeacherStudentSelects() {
  const studentOptions = state.users
    .filter((user) => user.role === "student")
    .map((student) => `<option value="${student.id}">${student.name} (${student.grade})</option>`)
    .join("");

  if (elements.teacherTaskForm) {
    const select = elements.teacherTaskForm.querySelector("select[name=studentId]");
    if (select) {
      select.innerHTML = studentOptions;
    }
  }

  if (elements.teacherLessonForm) {
    const select = elements.teacherLessonForm.querySelector("select[name=studentId]");
    if (select) {
      select.innerHTML = studentOptions;
    }
  }

  if (elements.teacherScoreForm) {
    const select = elements.teacherScoreForm.querySelector("select[name=studentId]");
    if (select) {
      select.innerHTML = studentOptions;
    }
  }
}

function renderAdminPanel(currentUser) {
  const visible = currentUser.role === "admin";
  elements.adminPanel.classList.toggle("hidden", !visible);
  if (!visible) {
    return;
  }

  const users = state.users.filter((user) => user.role !== "admin");
  elements.adminUserList.innerHTML = users.map((user) => {
    return `<article class="list-card"><strong>${user.name}</strong><p>${user.role.toUpperCase()} | ${user.email}</p><p>Grade: ${user.grade}</p><p>Courses: ${formatArray(user.courses)}</p><p>Phone: ${user.phone}</p></article>`;
  }).join("");

  const awaitingTasks = getAwaitingTasks();
  elements.adminTaskList.innerHTML = awaitingTasks.length
    ? awaitingTasks.map(({ student, task }) => `<article class="list-card"><strong>${task.title}</strong><p>${task.detail}</p><p>Student: ${student.name} | ${student.grade}</p><div class="inline-actions"><button class="button" data-approve-task="${task.id}">Approve Task</button></div></article>`).join("")
    : `<article class="list-card"><strong>No pending approvals</strong><p>All student tasks are already reviewed.</p></article>`;

  elements.scoreStudent.innerHTML = state.users
    .filter((user) => user.role === "student")
    .map((student) => `<option value="${student.id}">${student.name}</option>`)
    .join("");

  elements.adminMessageTarget.innerHTML = users
    .map((user) => `<option value="${user.id}">${user.name} (${user.role})</option>`)
    .join("");

  document.querySelectorAll("[data-approve-task]").forEach((button) => {
    button.addEventListener("click", async () => {
      const taskId = button.dataset.approveTask;
      const target = findTaskById(taskId);
      if (!target) {
        return;
      }
      target.task.status = "approved";
      saveLocalState();
      if (firebaseAdapter) {
        await firebaseAdapter.approveTask(target.task);
      }
      renderAdminPanel(currentUser);
      renderAcademicPanels(currentUser);
      showToast("Task approved", "The task status has been marked as approved.");
    });
  });

  renderAdminApplications();
}

function renderAdminApplications() {
  if (!elements.adminStudentAppList || !elements.adminTeacherAppList) {
    return;
  }

  elements.adminStudentAppList.innerHTML = state.applicants.students.length
    ? state.applicants.students
        .map(
          (application) => `
            <article class="list-card">
              <strong>${application.name}</strong>
              <p>${application.email}</p>
              <p>Grade: ${application.grade || "Pending Grade"}</p>
              <div class="inline-actions">
                <button class="button" data-approve-student="${application.id}">Approve</button>
                <button class="button button-muted" data-deny-student="${application.id}">Decline</button>
              </div>
            </article>
          `
        )
        .join("")
    : `<article class="list-card"><strong>No student requests</strong><p>The application queue is empty.</p></article>`;

  elements.adminTeacherAppList.innerHTML = state.applicants.teachers.length
    ? state.applicants.teachers
        .map(
          (application) => `
            <article class="list-card">
              <strong>${application.name}</strong>
              <p>${application.email}</p>
              <p>Grades: ${application.grades || "All"}</p>
              <p>Subjects: ${application.subjects || "Various"}</p>
              <div class="inline-actions">
                <button class="button" data-approve-teacher="${application.id}">Approve</button>
                <button class="button button-muted" data-deny-teacher="${application.id}">Decline</button>
              </div>
            </article>
          `
        )
        .join("")
    : `<article class="list-card"><strong>No teacher requests</strong><p>Waiting for new applications.</p></article>`;

  document.querySelectorAll("[data-approve-student]").forEach((button) => {
    button.addEventListener("click", async () => {
      await handleStudentApproval(button.dataset.approveStudent);
    });
  });

  document.querySelectorAll("[data-deny-student]").forEach((button) => {
    button.addEventListener("click", async () => {
      await handleApplicationRejection("studentApplications", button.dataset.denyStudent);
    });
  });

  document.querySelectorAll("[data-approve-teacher]").forEach((button) => {
    button.addEventListener("click", async () => {
      await handleTeacherApproval(button.dataset.approveTeacher);
    });
  });

  document.querySelectorAll("[data-deny-teacher]").forEach((button) => {
    button.addEventListener("click", async () => {
      await handleApplicationRejection("teacherApplications", button.dataset.denyTeacher);
    });
  });
}

async function handleStudentApproval(applicationId) {
  const application = state.applicants.students.find((app) => app.id === applicationId);
  if (!application) {
    return;
  }

  const newUser = buildUserFromApplication(application, "student");
  state.users = upsertStateUser(newUser);
  state.applicants.students = state.applicants.students.filter((app) => app.id !== applicationId);
  saveLocalState();
  if (firebaseAdapter) {
    await firebaseAdapter.createUserProfile(newUser);
    await firebaseAdapter.deleteDocument("studentApplications", applicationId);
  }
  renderAdminPanel(getCurrentUser());
  showToast("Student approved", `${application.name} now has dashboard access.`);
}

async function handleTeacherApproval(applicationId) {
  const application = state.applicants.teachers.find((app) => app.id === applicationId);
  if (!application) {
    return;
  }

  const newUser = buildUserFromApplication(application, "teacher");
  state.users = upsertStateUser(newUser);
  state.applicants.teachers = state.applicants.teachers.filter((app) => app.id !== applicationId);
  saveLocalState();
  if (firebaseAdapter) {
    await firebaseAdapter.createUserProfile(newUser);
    await firebaseAdapter.deleteDocument("teacherApplications", applicationId);
  }
  renderAdminPanel(getCurrentUser());
  showToast("Teacher approved", `${application.name} has teacher access now.`);
}

async function handleApplicationRejection(collection, applicationId) {
  state.applicants.students = state.applicants.students.filter((app) => app.id !== applicationId);
  state.applicants.teachers = state.applicants.teachers.filter((app) => app.id !== applicationId);
  saveLocalState();
  if (firebaseAdapter) {
    await firebaseAdapter.deleteDocument(collection, applicationId);
  }
  renderAdminPanel(getCurrentUser());
  showToast("Application removed", "The application was declined.");
}

function renderChats(currentUser) {
  const chats = getVisibleChats(currentUser);
  if (!activeChatId || !chats.some((chat) => chat.id === activeChatId)) {
    activeChatId = chats[0]?.id || null;
  }

  elements.chatList.innerHTML = chats.map((chat) => {
    const lastMessage = chat.messages.at(-1);
    const metaUser = getOtherChatUser(chat, currentUser);
    const preview = lastMessage
      ? lastMessage.attachment
        ? `Attachment: ${lastMessage.attachment.name}`
        : lastMessage.text.slice(0, 80)
      : "No messages yet";
    const roleLabel = chat.type === "group" ? "Group" : capitalize(metaUser?.role || "contact");
    return `
      <button class="chat-item ${chat.id === activeChatId ? "active" : ""}" data-chat-id="${chat.id}">
        <div class="chat-item-top">
          <span class="chat-avatar">${getAvatarLabel(resolveChatName(chat, currentUser))}</span>
          <div class="chat-item-copy">
            <strong>${resolveChatName(chat, currentUser)}</strong>
            <small>${roleLabel}</small>
          </div>
          <time>${lastMessage ? formatChatTime(lastMessage.sentAt) : ""}</time>
        </div>
        <span>${preview}</span>
      </button>
    `;
  }).join("");

  document.querySelectorAll("[data-chat-id]").forEach((button) => {
    button.addEventListener("click", () => {
      activeChatId = button.dataset.chatId;
      renderChats(currentUser);
    });
  });

  const activeChat = chats.find((chat) => chat.id === activeChatId);
  if (!activeChat) {
    elements.activeChatHeader.innerHTML = "<strong>No chat selected</strong>";
    elements.messageFeed.innerHTML = "";
    return;
  }

  const activeMetaUser = getOtherChatUser(activeChat, currentUser);
  const subtitle = activeChat.type === "group"
    ? `${activeChat.memberIds.length} members in this room`
    : `${capitalize(activeMetaUser?.role || "contact")} | Active in the school messenger`;
  elements.activeChatHeader.innerHTML = `<strong>${resolveChatName(activeChat, currentUser)}</strong><span>${subtitle}</span>`;
  elements.messageFeed.innerHTML = activeChat.messages.map((message) => {
    const author = state.users.find((user) => user.id === message.authorId);
    const selfClass = message.authorId === currentUser.id ? "self" : "";
    const attachmentHtml = message.attachment
      ? `<div class="attachment-card"><span class="attachment-badge">FILE</span><div><strong>${message.attachment.name}</strong><small>${formatFileSize(message.attachment.size)}</small></div></div>`
      : "";
    const textHtml = message.text ? `<p>${message.text}</p>` : "";
    return `<article class="message-bubble ${selfClass}"><strong>${author?.name || "Unknown user"}</strong>${attachmentHtml}${textHtml}<small>${formatTime(message.sentAt)}</small></article>`;
  }).join("");
  elements.messageFeed.scrollTop = elements.messageFeed.scrollHeight;
}

function resolveChatName(chat, currentUser) {
  if (chat.type === "group") {
    return chat.name;
  }
  const otherId = chat.memberIds.find((memberId) => memberId !== currentUser.id);
  return state.users.find((user) => user.id === otherId)?.name || chat.name;
}

function getVisibleChats(currentUser) {
  const chats = state.chats
    .filter((chat) => chat.memberIds.includes(currentUser.id))
    .sort((left, right) => new Date(getLastChatTimestamp(right)) - new Date(getLastChatTimestamp(left)));

  if (activeChatFilter === "groups") {
    return chats.filter((chat) => chat.type === "group");
  }

  if (activeChatFilter === "teachers") {
    return chats.filter((chat) => {
      const otherUser = getOtherChatUser(chat, currentUser);
      return otherUser && ["teacher", "principal", "admin"].includes(otherUser.role);
    });
  }

  if (activeChatFilter === "students") {
    return chats.filter((chat) => {
      const otherUser = getOtherChatUser(chat, currentUser);
      return otherUser?.role === "student";
    });
  }

  return chats;
}

function getOtherChatUser(chat, currentUser) {
  if (chat.type === "group") {
    return null;
  }
  const otherId = chat.memberIds.find((memberId) => memberId !== currentUser.id);
  return state.users.find((user) => user.id === otherId) || null;
}

function getLastChatTimestamp(chat) {
  return chat.messages.at(-1)?.sentAt || "1970-01-01T00:00:00Z";
}

function groupByStudent(items) {
  return items.reduce((accumulator, item) => {
    const studentId = item.studentId;
    if (!accumulator[studentId]) {
      accumulator[studentId] = [];
    }
    accumulator[studentId].push(item);
    return accumulator;
  }, {});
}

function upsertStateUser(user) {
  const others = state.users.filter((entry) => entry.id !== user.id);
  return [user, ...others];
}

function findTaskById(taskId) {
  for (const [studentId, tasks] of Object.entries(state.tasks)) {
    const task = tasks.find((entry) => entry.id === taskId);
    if (task) {
      return { student: state.users.find((user) => user.id === studentId), task };
    }
  }
  return null;
}

function getAwaitingTasks() {
  return state.users
    .filter((user) => user.role === "student")
    .flatMap((student) => (state.tasks[student.id] || []).map((task) => ({ student, task })))
    .filter(({ task }) => task.status === "awaiting approval");
}

function showToast(title, message) {
  const toast = document.createElement("article");
  toast.className = "toast";
  toast.innerHTML = `<strong>${title}</strong><span>${message}</span>`;
  elements.toastStack.appendChild(toast);
  window.setTimeout(() => toast.remove(), 5200);
}

function formatArray(value) {
  return Array.isArray(value) ? value.join(", ") : value;
}

function getAvatarLabel(name) {
  return String(name || "?").trim().charAt(0).toUpperCase();
}

function buildUserFromApplication(application, role) {
  const base = slugify(application.name) || "user";
  let username = base;
  let suffix = 1;
  while (state.users.some((user) => user.username === username)) {
    username = `${base}${suffix++}`;
  }

  return {
    id: crypto.randomUUID(),
    role,
    name: application.name,
    email: application.email,
    username,
    phone: application.phone || "Pending",
    grade: application.grade || "Pending Placement",
    address: application.address || "Pending Review",
    courses: application.courses || [],
    subjects: application.subjects || "",
    degree: application.degree || "",
    createdAt: new Date().toISOString(),
    password: null,
  };
}

function formatStatusClass(status) {
  if (status === "done" || status === "approved") {
    return "done";
  }
  if (status === "pending" || status === "awaiting approval") {
    return "pending";
  }
  return "";
}

function formatTime(dateValue) {
  const date = typeof dateValue?.toDate === "function" ? dateValue.toDate() : new Date(dateValue);
  return date.toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

function formatChatTime(dateValue) {
  const date = typeof dateValue?.toDate === "function" ? dateValue.toDate() : new Date(dateValue);
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function formatFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function slugify(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
