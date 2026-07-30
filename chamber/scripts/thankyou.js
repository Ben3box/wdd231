// Read the values the form submitted via GET (they arrive as a query string)
// and display the required fields back to the applicant.
document.addEventListener('DOMContentLoaded', () => {
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
