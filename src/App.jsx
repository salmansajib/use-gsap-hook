import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function App() {
  const firstContainer = useRef(null);
  const circle = useRef(null);
  const animateButton = useRef(null);
  const secondContainer = useRef(null);
  const dotRef = useRef(null);
  const titleContainerRef = useRef(null);

  const [isAnimating, setIsAnimating] = useState(false);

  // register the scroll trigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // most common approach in react on click animation with auto clean-up
  const { contextSafe } = useGSAP();

  const onClickAnimation = contextSafe(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    // rotate the box with selector
    gsap.to(".box", {
      rotate: "+=360",
      duration: 1,
      onComplete: () => setIsAnimating(false),
    });
    // rotate the circle with ref
    gsap.to(circle.current, {
      rotate: "-=360",
      duration: 2,
      onComplete: () => setIsAnimating(false),
    });
  });

  // element that animates on mount
  useGSAP(() => {
    // animate the button
    gsap.from(animateButton.current, {
      opacity: 0,
      y: -110,
      scale: 0.3,
      duration: 1.5,
      delay: 0.2,
      ease: "power3",
    });

    // animate the box
    gsap.from(".box", {
      opacity: 0,
      x: -200,
      duration: 1,
      delay: 0.4,
    });

    // animate the circle
    gsap.from(".circle", {
      opacity: 0,
      x: 200,
      duration: 1,
      delay: 0.8,
    });

    // animate the circles
    gsap.from(secondContainer.current.children, {
      opacity: 0,
      y: 100,
      scale: 0,
      stagger: 0.2,
      duration: 1,
      delay: 1.2,
      ease: "power3",
    });
  });

  // button animation on mouse move
  const handleButtonMouseMove = (e) => {
    const rect = animateButton.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(animateButton.current, {
      x: x * 0.2, // Adjust intensity of movement
      y: y * 0.2, // Adjust intensity of movement
      duration: 0.3,
    });
  };

  // return the button to it's current position on mouse leave
  const handleButtonMouseLeave = () => {
    gsap.to(animateButton.current, {
      x: 0,
      y: 0,
      duration: 0.3,
    });
  };

  // handle animation on dot that follows the cursor
  const handleDotMouseMove = (e) => {
    gsap.to(dotRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.5,
      delay: 0.05,
      ease: "power3",
    });
  };

  // animate the dot with clean-up
  useEffect(() => {
    window.addEventListener("mousemove", handleDotMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleDotMouseMove);
    };
  }, []);

  // scroll trigger animation for title container
  useGSAP(() => {
    gsap.from(titleContainerRef.current.children, {
      opacity: 0,
      y: 100,
      stagger: 0.3,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleContainerRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        markers: true,
      },
    });
  });

  return (
    <div className="bg-zinc-950 text-gray-100 relative">
      {/* Dot Element */}
      <div
        ref={dotRef}
        className="hidden md:block z-10 fixed -top-3 w-[13px] h-[13px] bg-gray-100 rounded-full pointer-events-none shadow-lg shadow-slate-50"
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>

      <div className="relative min-h-screen grid place-content-center">
        <div
          ref={animateButton}
          onMouseMove={handleButtonMouseMove}
          onMouseLeave={handleButtonMouseLeave}
          className=" absolute top-[100px] left-1/2 -translate-x-1/2"
        >
          <button
            onClick={onClickAnimation}
            className="border-2 outline-none border-gray-100 font-semibold text-gray-100 px-9 py-3 rounded-full hover:bg-gray-100 hover:text-zinc-900 transition-all duration-200 overflow-hidden"
          >
            Click To Animate
          </button>
        </div>
        <div className="flex flex-col items-center gap-[100px]">
          <div ref={firstContainer} className="flex gap-10">
            <div className="box w-[100px] h-[100px] bg-gradient-to-br from-blue-200 to-blue-400 rounded-lg text-zinc-900 text-[16px] font-medium flex items-center justify-center">
              Selector
            </div>
            <div
              ref={circle}
              className="circle w-[100px] h-[100px] bg-gradient-to-br from-green-200 to-green-500 rounded-full text-zinc-900 text-[16px] font-medium flex items-center justify-center"
            >
              Ref
            </div>
          </div>

          <div ref={secondContainer} className="flex items-center gap-2">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="w-[70px] h-[70px] rounded-full bg-gradient-to-tr from-lime-200 to-lime-500 flex items-center justify-center text-zinc-900 font-semibold text-lg"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        <div></div>
      </div>

      <div
        ref={titleContainerRef}
        className=" min-h-screen grid place-content-center"
      >
        <h1 className=" text-5xl md:text-8xl font-bold text-transparent bg-gradient-to-r from-green-300 to-lime-300 bg-clip-text max-w-max h-[50px] md:h-[110px]">
          Animating
        </h1>
        <h1 className=" text-5xl md:text-8xl font-bold text-transparent bg-gradient-to-r from-green-300 to-lime-300 bg-clip-text max-w-max">
          On Scroll
        </h1>
      </div>
    </div>
  );
}

export default App;
