document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    submitBtn.textContent = "Whoosh! Done";

    const formData = {
      service_id: "service_y25o3tu",
      template_id: "TCP-Tech_Response",
      user_id: "kE8yPfFnAkGs6aRJk",
      template_params: {
        person_name: form.name.value,
        mobile_no: form.phone.value,
        email_id: form.email.value,
        message: form.message.value,
      },
    };

    fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log("Email sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  });
});
