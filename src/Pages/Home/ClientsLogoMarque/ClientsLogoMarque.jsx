import Marquee from "react-fast-marquee";
import casio from "../../../assets/brands/casio.png";
import amazon from "../../../assets/brands/amazon.png";
import moonstar from "../../../assets/brands/moonstar.png";
import starplus from "../../../assets/brands/start.png";
import startpeople from "../../../assets/brands/start-people 1.png";
import randstad from "../../../assets/brands/randstad.png";

const partners = [casio, amazon, moonstar, starplus, startpeople, randstad];

const ClientsLogoMarque = () => {
  return (
    <section className="mt-16 mb-10 px-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-black">
          We've helped thousands of sales teams
        </h2>
        <Marquee speed={60} pauseOnClick={true} className="my-4">
          {partners.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="partner logo"
              className="mx-8 h-7 object-contain"
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default ClientsLogoMarque;
