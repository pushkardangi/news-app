const form = document.querySelector("form");

form.addEventListener("submit", async function (event) {
  try {
    event.preventDefault();

    const formData = new FormData(form);

    const data = {
      firstName: formData.get("firstname").trim(),
      lastName: formData.get("lastname").trim(),
      mobile: formData.get("mobile").trim(),
      email: formData.get("email").trim(),
      password: formData.get("password").trim(),
    };

    if (data.mobile.length !== 10 || !"6789".includes(data.mobile[0])) {
      alert("Invalid mobile number!");
      return;
    }

    if (data.password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    const errors = [];

    if (!/[A-Z]/.test(data.password)) {
      errors.push("at least one uppercase letter (A-Z)");
    }
    if (!/[a-z]/.test(data.password)) {
      errors.push("at least one lowercase letter (a-z)");
    }
    if (!/[0-9]/.test(data.password)) {
      errors.push("at least one number (0-9)");
    }
  
    if (errors.length > 0) {
      alert("Password must contain " + errors.join(", ") + "!");
      return;
    }

    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    alert(`Message: ${result.message}`);

    if (result.success) window.location.href = "login.html";

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
