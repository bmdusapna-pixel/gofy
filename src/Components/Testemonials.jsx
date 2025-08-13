import React from "react";
import TestimonialSlider from "./TestemonialSlider";

const testimonials = [
  {
    name: "Amit Sharma",
    title: "Founder at TechSphere",
    feedback:
      "The team exceeded all expectations with their dedication and skill. Our project was delivered on time with outstanding quality.",
    image:
      "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Priya Verma",
    title: "Marketing Head at BrightIdeas",
    feedback:
      "Their creativity and professionalism were remarkable. The entire process was smooth, and the result was exactly what we envisioned.",
    image:
      "https://img.freepik.com/free-photo/indian-woman-posing-cute-stylish-outfit-camera-smiling_482257-122351.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    name: "Rohan Mehta",
    title: "Software Engineer",
    feedback:
      "I am extremely happy with the final product. They understood my requirements and delivered something even better.",
    image: "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    name: "Neha Kapoor",
    title: "UI/UX Designer",
    feedback:
      "Every detail was carefully thought out. The end result was beautiful, functional, and delivered within the deadline.",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    name: "Vikram Singh",
    title: "CEO at NextGen Solutions",
    feedback:
      "A top-notch team that works with precision and creativity. We were kept informed throughout the process and got excellent results.",
    image: "https://randomuser.me/api/portraits/men/66.jpg",
  },
  {
    name: "Ananya Iyer",
    title: "Creative Director at AdSphere",
    feedback:
      "They went above and beyond to deliver a design that perfectly captured our vision. I’m truly impressed.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRifh1iteHWoaBe1jcl9-b5FTKwEvZsbH7FMQ&s",
  },
];

const TestimonialsPage = () => {
  return (
    <div>
      <h2 className="text-center text-3xl font-bold text-[#001430] mb-8">
        What Our Clients Say
      </h2>
      <TestimonialSlider testimonials={testimonials} />
    </div>
  );
};

export default TestimonialsPage;
