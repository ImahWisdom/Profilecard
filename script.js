
document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle button (appears on small screens)
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navLinks.classList.toggle("show");
    });
  }

  // Highlight current nav link
  const navAnchors = document.querySelectorAll(".nav-links .nav-link");
  const path = window.location.pathname.split("/").pop() || "index.html";
  navAnchors.forEach(a => {
    const href = a.getAttribute("href");
    if (href && href.includes(path)) {
      a.classList.add("active");
    }
  });

  /* ===== TIME: formatted clock and test-time (ms) ===== */
  const formattedEl = document.getElementById("current-time-formatted");
  const msEl = document.getElementById("current-time-ms");
  function updateTime() {
    const now = new Date();
    if (formattedEl) formattedEl.textContent = now.toLocaleTimeString();
    if (msEl) msEl.textContent = Date.now();
  }
  updateTime();
  setInterval(updateTime, 1000);

  /* ===== CONTACT FORM VALIDATION ===== */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // fields
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const subject = document.getElementById("subject");
      const message = document.getElementById("message");

      // errors and success
      const errors = {
        name: document.getElementById("error-name"),
        email: document.getElementById("error-email"),
        subject: document.getElementById("error-subject"),
        message: document.getElementById("error-message")
      };
      const successEl = document.getElementById("success");

      // reset
      Object.values(errors).forEach(x => { if (x) x.textContent = ""; });
      if (successEl) successEl.textContent = "";

      let valid = true;

      if (!name || !name.value.trim()) {
        if (errors.name) errors.name.textContent = "Full name is required.";
        valid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !email.value.trim()) {
        if (errors.email) errors.email.textContent = "Email is required.";
        valid = false;
      } else if (!emailPattern.test(email.value.trim())) {
        if (errors.email) errors.email.textContent = "Enter a valid email address.";
        valid = false;
      }

      if (!subject || !subject.value.trim()) {
        if (errors.subject) errors.subject.textContent = "Subject is required.";
        valid = false;
      }

      if (!message || !message.value.trim()) {
        if (errors.message) errors.message.textContent = "Message is required.";
        valid = false;
      } else if (message.value.trim().length < 10) {
        if (errors.message) errors.message.textContent = "Message must be at least 10 characters.";
        valid = false;
      }

      if (valid) {
        // show success and reset
        if (successEl) successEl.textContent = "✅ Message sent successfully!";
        contactForm.reset();
      }
    });
  }
});


