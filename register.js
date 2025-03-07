const form = document.querySelector("form");

form.addEventListener("submit", async function (event) {
  try {
    event.preventDefault();

    const firstName = document.getElementById("firstname").value.trim();
    const lastName = document.getElementById("lastname").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!mobile.length === 10 || !"6789".includes(mobile.toString()[0])) {
      alert("Invalid mobile number!");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    const errors = [];

    if (!/[A-Z]/.test(password)) {
      errors.push("at least one uppercase letter (A-Z)");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("at least one lowercase letter (a-z)");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("at least one number (0-9)");
    }
  
    if (errors.length > 0) {
      alert("Password must contain " + errors.join(", ") + "!");
      return;
    }

    const data = {
      firstName,
      lastName,
      mobile,
      email,
      password,
    };

    fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        alert(`Message: ${result.message}`)
        if (result.success) window.location.href = "http://127.0.0.1:5500/login.html";
      })
      .catch((error) => alert(`Error: ${error}`));
  } catch (error) {
    alert(error);
  }
});

// generate random password using Crypto
document.getElementById("generate-password-btn").onclick = function () {

  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  const passwordLength = 16;
  const randomValues = crypto.getRandomValues(new Uint8Array(passwordLength));

  const password = [...randomValues]
    .map((b) => charset[b % charset.length])
    .join("");

  document.getElementById("password").value = password;
};
