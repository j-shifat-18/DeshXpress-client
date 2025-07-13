import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: 'How does this posture corrector work?',
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
  },
  {
    question: 'Is it suitable for all ages and body types?',
    answer: 'Yes, posture correctors are generally designed to be adjustable and suitable for a wide range of ages and body types.',
  },
  {
    question: 'Does it really help with back pain and posture improvement?',
    answer: 'Many users report significant improvement in posture and reduction in back pain with regular use, but results may vary.',
  },
  {
    question: 'Does it have smart features like vibration alerts?',
    answer: 'Some advanced models include smart features like vibration alerts to remind you to correct your posture.',
  },
  {
    question: 'How will I be notified when the product is back in stock?',
    answer: 'You will receive an email notification once the product is available for purchase again.',
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 flex flex-col items-center">
      <div className="mb-8 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#03373D] mb-2">Frequently Asked Question (FAQ)</h2>
        <p className="text-gray-500 text-center max-w-xl">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
      </div>
      <div className="w-full max-w-2xl">
        {faqs.map((faq, idx) => (
          <Accordion key={idx} sx={{ mb: 2, borderRadius: 2, boxShadow: 'none', border: '1px solid #e0e0e0', background: idx === 0 ? '#e8f6f3' : '#fff' }} defaultExpanded={idx === 0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600, color: '#03373D' }}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: '#555' }}>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        <div className="flex justify-center mt-6">
          <button className="bg-lime-300 hover:bg-lime-400 text-[#03373D] font-semibold px-8 py-3 rounded-full flex items-center gap-2 transition-all">
            See More FAQ's
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M7 5l5 5-5 5" stroke="#03373D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 