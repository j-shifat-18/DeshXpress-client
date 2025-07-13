import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../OurServices/OurServices';
import ClientsLogoMarque from '../ClientsLogoMarque/ClientsLogoMarque';
import Benefits from '../Benefits/Benefits';
import BeMarchent from '../BeMarchent/BeMarchent';
import TestimonialsSection from '../TestimonialsSection/TestimonialsSection';
import FAQSection from '../FAQSection/FAQSection';



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurServices></OurServices>
            <ClientsLogoMarque></ClientsLogoMarque>
            <Benefits></Benefits>
            <BeMarchent></BeMarchent>
            <TestimonialsSection />
            <FAQSection />
            
        </div>
    );
};

export default Home;