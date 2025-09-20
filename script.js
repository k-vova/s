// Імпорт потрібних SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, runTransaction } from "firebase/database";

// Конфіг твого проекту
const firebaseConfig = {
  apiKey: "AIzaSyD8oXJBbHk6gVPGAWlPdAR0xdPFl0jesNs",
  authDomain: "like-counter-site.firebaseapp.com",
  projectId: "like-counter-site",
  storageBucket: "like-counter-site.firebasestorage.app",
  messagingSenderId: "1083179302798",
  appId: "1:1083179302798:web:3ac298fda57f0f785a6edf",
  measurementId: "G-LWRV6GPKL3",
  databaseURL: "https://like-counter-site-default-rtdb.firebaseio.com" // 👈 додай, якщо ще не додав
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Посилання на лічильник
const likesRef = ref(database, "likes/count");

// DOM елементи
const likeCountElement = document.getElementById("like-count");
const likeButton = document.getElementById("like-button");

// Слухаємо зміни
onValue(likesRef, (snapshot) => {
  const count = snapshot.val();
  likeCountElement.textContent = count ?? 0;
});

// Перевіряємо, чи вже лайкав
function checkIfAlreadyLiked() {
  if (localStorage.getItem("hasLiked") === "true") {
    likeButton.disabled = true;
    likeButton.textContent = "Ви вже лайкнули ✅";
  }
}

// Клік по кнопці
likeButton.addEventListener("click", () => {
  if (localStorage.getItem("hasLiked") === "true") {
    alert("Ви можете лайкнути лише один раз!");
    return;
  }

  runTransaction(likesRef, (currentCount) => {
    return (currentCount || 0) + 1;
  });

  localStorage.setItem("hasLiked", "true");
  checkIfAlreadyLiked();
});

// При завантаженні
checkIfAlreadyLiked();
