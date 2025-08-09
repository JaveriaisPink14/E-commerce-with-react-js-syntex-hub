import React, { useState } from 'react';

const faqs = [
  { q: "How do I track my order?", a: "Go to 'My Orders' > 'Track'." },
  { q: "How to return a product?", a: "Use the 'Return Request' form from your account." },
  { q: "What payment methods are accepted?", a: "Visa, Mastercard, JazzCash, Easypaisa." },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq-section">
      <h2>📌 Frequently Asked Questions</h2>
      {faqs.map((item, index) => (
        <div key={index} className="faq-item">
          <div
            className="faq-question"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {item.q}
          </div>
          {openIndex === index && <div className="faq-answer">{item.a}</div>}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
