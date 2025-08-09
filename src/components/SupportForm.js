import React, { useState } from 'react';
import Swal from 'sweetalert2';

const SupportForm = () => {
  const [email, setEmail] = useState('');
  const [issue, setIssue] = useState('');

  const handleSubmit = () => {
    if (!email || !issue) {
      Swal.fire('Please fill in all fields');
      return;
    }
    const ticketId = "TCKT-" + Math.floor(Math.random() * 100000);
    Swal.fire({
      icon: 'success',
      title: 'Ticket Submitted!',
      text: `Your support ticket ID is ${ticketId}`,
    });
    setEmail('');
    setIssue('');
  };

  return (
    <div className="support-form">
      <h2>📩 Submit a Support Ticket</h2>
      <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <textarea placeholder="Describe your issue" value={issue} onChange={(e) => setIssue(e.target.value)} />
      <button onClick={handleSubmit}>Submit Ticket</button>
    </div>
  );
};

export default SupportForm;
