(function () {
  emailjs.init("kE8yPfFnAkGs6aRJk");
})();

document.addEventListener("contentsLoaded", () => {
  emailjs.init("kE8yPfFnAkGs6aRJk");

  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");

  if (form && submitBtn) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      submitBtn.textContent = "Whoosh! Done";

      // Collect form data
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

      // Send the email using EmailJS
      emailjs
        .send(
          formData.service_id,
          formData.template_id,
          formData.template_params
        )
        .then(function (response) {
          console.log("SUCCESS!", response.status, response.text);
          alert("Your message has been sent successfully!");
          submitBtn.textContent = "Submit";
          form.reset();
        })
        .catch(function (error) {
          console.log("FAILED...", error);
          alert("Failed to send the message. Please try again.");
          submitBtn.textContent = "Submit";
        });
    });
  } else {
    console.error("Form or submit button not found!");
  }
});
