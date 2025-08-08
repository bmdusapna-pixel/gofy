import { useRef } from "react";

const useScrollToSection = () => {
  const ref = useRef(null);

  const scrollTo = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return [ref, scrollTo];
};

export default useScrollToSection;
