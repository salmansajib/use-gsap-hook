import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function App() {
  const firstContainer = useRef();
  const circle = useRef();
  const animateButton = useRef();
  const secondContainer = useRef();

  const [isAnimating, setIsAnimating] = useState(false);

  // common approach
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

  useGSAP(() => {
    gsap.from(secondContainer.current.children, {
      opacity: 0,
      y: 100,
      stagger: 0.2,
      duration: 1,
      ease: "power3",
    });
  });

  return (
    <div className="bg-zinc-950 text-gray-100 min-h-dvh grid place-content-center">
      <div className=" absolute top-[100px] left-1/2 -translate-x-1/2">
        <button
          ref={animateButton}
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

        <div ref={secondContainer} className="flex items-center gap-5">
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
    </div>
  );
}

export default App;
