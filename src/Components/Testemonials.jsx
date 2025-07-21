import React from "react";
import TestimonialSlider from "./TestemonialSlider";

const testimonials = [
  {
    name: "John Doe",
    title: "CEO at Acme Corp",
    feedback: "This team delivered exceptional quality and professionalism. The project was completed on time, exceeding all our expectations completely. ",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Jane Smith",
    title: "Marketing Head",
    feedback: "I’m genuinely impressed by their creativity, dedication, and constant communication. They brought our vision to life perfectly!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Samuel Green",
    title: "Developer",
    feedback: "Absolutely thrilled with the outcome! They listened carefully and crafted something better than I imagined. Highly recommended for any web project.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Alice Johnson",
    title: "Designer",
    feedback: "Their support and attention to detail were amazing. The final result was beautiful, functional, and delivered on time.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },

  {
    name: "John Doe",
    title: "CEO at Acme Corp",
    feedback: "This team delivered exceptional quality and professionalism. The project was completed on time, exceeding all our expectations completely. ",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Jane Smith",
    title: "Marketing Head",
    feedback: "I’m genuinely impressed by their creativity, dedication, and constant communication. They brought our vision to life perfectly!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const TestimonialsPage = () => {
  return (
    <div >
      <h2 className="text-center text-3xl font-bold text-[#001430] mb-8">
        What Our Clients Say
      </h2>
      <TestimonialSlider testimonials={testimonials} />
    </div>
  );
};

export default TestimonialsPage;
