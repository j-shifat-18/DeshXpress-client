import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import customerTop from '../../../assets/images/customer-top.png'

const testimonials = [
  {
    quote: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
    name: 'Awlad Hossin',
    title: 'Senior Product Designer',
    active: true,
  },
  {
    quote: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
    name: 'Rasel Ahamed',
    title: 'CTO',
    active: false,
  },
  {
    quote: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
    name: 'Nasir Uddin',
    title: 'CEO',
    active: false,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16  flex flex-col items-center">
      <div className="mb-12 flex flex-col items-center">
        <img src={customerTop} className='mb-6' alt="" />
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#03373D] mb-5">What our customers are saying</h2>
        <p className="text-gray-500 text-center max-w-xl">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
      </div>
      <div className="w-full max-w-3xl">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          className="pb-10"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full text-center">
                  <svg className="mx-auto mb-4" width="40" height="40" fill="none" viewBox="0 0 40 40"><text x="0" y="35" fontSize="40" fill="#20706A">“</text></svg>
                  <p className="text-lg text-gray-700 mb-6">{t.quote}</p>
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-[#03373D] text-lg">{t.name}</span>
                    <span className="text-gray-400 text-sm">{t.title}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection; 