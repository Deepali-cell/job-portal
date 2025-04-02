import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import companies from "../data/companies.json";
import Autoplay from "embla-carousel-autoplay";

const CompaniesShowing = () => {
  return (
    <div className="py-6 w-full rounded-xl shadow-2xl">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="flex gap-8 sm:gap-16 items-center justify-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem
              key={id}
              className="basis-1/3 lg:basis-1/5 flex justify-center"
            >
              <img
                src={path}
                alt={`${name} logo`}
                className="h-100 sm:h-40 md:h-48 object-contain transition-transform transform hover:scale-110"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CompaniesShowing;
