document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Submission Timestamp Logic ---
  const timestampInput = document.getElementById('timestamp');
  if (timestampInput) {
    timestampInput.value = new Date().toISOString();
  }

  // --- 2. Modal Dialog Handling ---
  const openButtons = document.querySelectorAll('.details-link');
  openButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.showModal();
      }
    });
  });

  const closeButtons = document.querySelectorAll('.modal-close');
  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-close');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.close();
      }
    });
  });

  const modals = document.querySelectorAll('.tier-modal');
  modals.forEach((modal) => {
    modal.addEventListener('click', (event) => {
      const rect = modal.getBoundingClientRect();
      const isClickInside = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isClickInside) {
        modal.close();
      }
    });
  });

  // --- 3. Thank You Page Parameter Retrieval ---
  const params = new URLSearchParams(window.location.search);

  const fname = params.get('fname') || '';
  const lname = params.get('lname') || '';
  const email = params.get('email') || '';
  const phone = params.get('phone') || '';
  const orgname = params.get('orgname') || '';
  const timestamp = params.get('timestamp') || '';

  const setText = (id, value, fallback = 'Not provided') => {
    const el = document.getElementById(id);
    if (el) el.textContent = value || fallback;
  };

  setText('greetingName', fname, 'friend');
  setText('out-fname', fname);
  setText('out-lname', lname);
  setText('out-email', email);
  setText('out-phone', phone);
  setText('out-orgname', orgname);
  setText('out-timestamp', timestamp);
});

document.addEventListener("DOMContentLoaded", () => {
  const lastModifiedElement = document.getElementById("lastModified");

  if (lastModifiedElement) {
    // Reads the document's built-in last modified timestamp
    const lastModifiedDate = new Date(document.lastModified);

    // Formats date and time into a clean, readable string
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    };

    // Displays the formatted date inside the HTML span
    lastModifiedElement.textContent = lastModifiedDate.toLocaleString("en-US", options);
  }
});