import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function App() {
  const container = useRef();
  const circle = useRef();
  const animateButton = useRef();

  // different approach
  useGSAP((context, contextSafe) => {
    const onClickAnimation = contextSafe(() => {
      // rotate the box with selector
      gsap.to(".box", { rotate: "+=360", duration: 1 });

      // rotate the circle with ref
      gsap.to(circle.current, { rotate: "-=360", duration: 1 });
      console.log("context", context.data.length);
    });

    animateButton.current.addEventListener("click", onClickAnimation);

    console.log("context", context.data);

    return () => {
      animateButton.current.removeEventListener("click", onClickAnimation);
    };
  });

  return (
    <div className="bg-zinc-950 text-gray-100 min-h-dvh grid place-content-center">
      <div>
        <button
          ref={animateButton}
          className="border-2 outline-none border-gray-100 font-semibold text-gray-100 px-9 py-3 rounded-full absolute top-[100px] left-1/2 -translate-x-1/2 hover:bg-gray-100 hover:text-zinc-900 transition-all duration-200"
        >
          Click To Animate
        </button>
      </div>
      <div ref={container} className="flex gap-10">
        <div className="box w-[100px] h-[100px] bg-gradient-to-br from-blue-200 to-blue-400 rounded-lg text-zinc-900 text-lg font-medium flex items-center justify-center">
          Selector
        </div>
        <div
          ref={circle}
          className="circle w-[100px] h-[100px] bg-gradient-to-br from-green-200 to-green-500 rounded-full text-zinc-900 text-lg font-medium flex items-center justify-center"
        >
          Ref
        </div>
      </div>
    </div>
  );
}

export default App;
