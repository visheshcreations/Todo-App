document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Correcting the method to querySelector
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;

  const user = JSON.parse(localStorage.getItem(email));
  console.log(user);

  if (user && user.password === password) {
    alert("Login successful!");
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "./todo.html";
  } else if (!user) {
    alert("User not found! Redirecting to signup...");
    window.location.href = "./index.html";
  } else {
    alert("Invalid email or password!");
  }
});
