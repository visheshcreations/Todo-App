const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
  alert("You must log in or sign up first!");
  window.location.href = "./index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const nameEl = document.getElementsByClassName("name")[0];

  if (!nameEl) {
    console.error("Element with class 'name' not found.");
    return;
  }

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    if (loggedInUser.username) {
      nameEl.innerHTML = `Welcome, ${loggedInUser.username}!`;
    } else {
      nameEl.innerHTML = "Welcome, user!";
    }

    if (loggedInUser.profile) {
      const img = document.createElement("img");
      img.src = loggedInUser.profile;
      img.alt = "User Profile Picture";

      img.style.width = "40px";
      img.style.height = "40px";
      img.style.borderRadius = "50%";
      img.style.marginLeft = "10px";

      nameEl.appendChild(img);
    } else {
      console.warn("No profile image found for the logged-in user.");
    }
  } else {
    nameEl.innerHTML = "Welcome, error!";
    console.error("No loggedInUser found in localStorage.");
  }
});

const dateTimeEL = document.querySelector(".dateTime");

const datetime = () => {
  const now = new Date();
  const options = { weekday: "long", day: "numeric", month: "long" };
  const formate = now.toLocaleDateString("en-us", options);
  dateTimeEL.innerHTML = formate;
  console.log(formate);
};
datetime();

const dropdownEl = document.querySelector(".dropdown");
const newTaskBtnEL = document.querySelector(".newTaskBtn");

const toggleDropdown = () => {
  if (dropdownEl.style.display === "none" || !dropdownEl.style.display) {
    dropdownEl.style.display = "block";
    newTaskBtnEL.value = "- Close";
  } else {
    dropdownEl.style.display = "none";
    newTaskBtnEL.value = "+ New Task";
  }
};

newTaskBtnEL.addEventListener("click", toggleDropdown);

// Load tasks from localStorage and display them,..................

document.querySelector(".dropdownForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const task = document.querySelector(".todoTask").value;
  const title = document.querySelector(".todoTitle").value;
  const date = document.querySelector(".todoDateTimeInput").value;

  if (!task || !title) {
    alert("Please enter both task and title.");
    return;
  }

  const newTask = { task, title, date };

  let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

  tasks.push(newTask);

  localStorage.setItem("todoTasks", JSON.stringify(tasks));

  e.target.reset();

  loadTasks();
});

function createCard(taskData) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
   
     <div class="tasks">
                <div class="task">
                  <span class="taskes">${taskData.task}</span>
                  <span class="taskTitle">${taskData.title}</span>
                </div>
              <div style = "display: flex; gap: 15px;">
              
                <input type="checkbox" name="checkbox" id="checkbox" class = "checkbox" />
                <i class="fa-solid fa-trash deleteCheckbox "></i></div>
              </div>
              <hr />
              <span>Today</span>
              <span class="taskTime">${taskData.date || "No Date"}</span>
  `;
  return card;
}

function loadTasks() {
  const cardContainer = document.querySelector(".cardContainer");
  cardContainer.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

  tasks.forEach((task) => {
    const card = createCard(task);
    cardContainer.appendChild(card);
  });

  const totalTasks = document.querySelector(".totalTask");

  console.log("Total number of cards: " + tasks.length);
  totalTasks.textContent = tasks.length;

  const deleteCheckboxes = document.querySelectorAll(".deleteCheckbox");
  deleteCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", handleDelete);
  });
}

function handleDelete(e) {
  const deletecard = e.target.dataset.index;
  const tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

  tasks.splice(deletecard, 1);

  localStorage.setItem("todoTasks", JSON.stringify(tasks));

  loadTasks();
}

document.addEventListener("DOMContentLoaded", loadTasks);

function clearAllTasks() {
  const confirmClear = confirm("Are you sure you want to clear all tasks?");
  if (!confirmClear) return;

  localStorage.removeItem("todoTasks");

  loadTasks();

  console.log("All tasks have been cleared.");
}

document.querySelector(".clearAllBtn").addEventListener("click", clearAllTasks);

document.querySelector(".searchBtn").addEventListener("click", () => {
  const SearchItemTask = JSON.parse(localStorage.getItem("todoTasks")) || [];
  const searchTerm = document.querySelector(".searchIcon").value.toLowerCase();

  SearchItemTask.forEach((task) => {
    if (task.title.toLowerCase() === searchTerm) {
      console.log(`Matched search for task: ${task.title}`);
      const bgChange = task.title;
      console.log(bgChange);
    }
  });
});
