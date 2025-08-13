import { useRef } from "react";

const useScrollToSection = () => {
  const ref = useRef(null);

  const scrollTo = () => {
    if (ref.current) {
      const element = ref.current;
      const elementTop = element.getBoundingClientRect().top;
      const scrollY = window.scrollY || window.pageYOffset;

      const centerY =
        elementTop +
        scrollY -
        window.innerHeight / 2 +
        element.offsetHeight / 2;

      window.scrollTo({
        top: centerY - 200,
        behavior: "smooth",
      });
    }
  };

  return [ref, scrollTo];
};

export default useScrollToSection;
