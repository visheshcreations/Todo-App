document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementsByClassName("username")[0].value;
  const password = document.getElementsByClassName("password")[0].value;
  const email = document.getElementsByClassName("email")[0].value;
  const profileInput = document.getElementById("profile");
  const profileFile = profileInput.files[0];

  if (!username || !password || !email || !profileFile) {
    alert("Please fill in all fields and select a profile picture.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const fileData = event.target.result;

    const user = {
      username: username,
      password: password,
      email: email,
      profile: fileData,
    };

    try {
      localStorage.setItem(email, JSON.stringify(user));
      alert("Successfully saved to localStorage!");
      window.location.href = "./login.html";
    } catch (error) {
      alert("Error saving to localStorage: " + error.message);
    }
  };

  reader.readAsDataURL(profileFile);
});
