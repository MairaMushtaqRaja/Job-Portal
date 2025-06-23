import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import companies from "../Data/companies.json";
import faq from "../Data/faq.json";
import Autoplay from "embla-carousel-autoplay";
const Landing = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter py-4 gradient-title">
          Find Your Dream Job{" "}
          <span className="flex items-center gap-2 sm:gap-4">
            and get{""}{" "}
            <img
              src="/logo.png"
              alt="hirred logo"
              className="h-14 sm:h-24 lg:h-32"
            ></img>
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      {/* buttons */}
      <div className="flex gap-6 justify-center">
        <Link to="/jobs">
          <Button variant="blue" size="xl">
            Find a Job
          </Button>
        </Link>
        <Link to="/postJobs">
          <Button variant="destructive" size="xl">
            Post a Job
          </Button>
        </Link>
      </div>
      {/* carousel */}
      <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10">
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => {
            return (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <img
                  src={path}
                  alt={name}
                  className="h-19 sm:h-14 object-contain"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      {/* banner */}
      <img src="/banner.jpeg" alt="banner" className="w-full" />
      {/* card section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for Jobs,track applicantions and more!
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs,manage applicantions and find best candidate
          </CardContent>
        </Card>
      </section>
      {/* accordion */}
      <Accordion type="single" collapsible>
      {faq.map((faq,index)=>{
        return(
          <AccordionItem key={index} value={`item-${index+1}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>
           {faq.answer}
          </AccordionContent>
        </AccordionItem>   
        )
      })}
      </Accordion>
    </main>
  );
};

export default Landing;
