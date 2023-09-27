import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";

const images = [
  "/deck/1.png",
  "/deck/2.png",
  "/deck/3.png",
  "/deck/4.png",
  "/deck/5.png",
  "/deck/6.png",
  "/deck/7.png",
  "/deck/8.png",
  "/deck/9.png",
  "/deck/10.png",
  "/deck/11.png",
  "/deck/12.png",
  "/deck/13.png",
  "/deck/14.png",
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const SlideDeck = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="w-screen items-center justify-center flex">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "keyframes", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
      <div
        className="lg:ml-64 text-5xl border-white border-2 rounded-full px-2 absolute z-10 left-12"
        onClick={() => paginate(1)}
      >
        {"‣"}
      </div>
      <div
        className="text-5xl border-white border-2 rounded-full px-2 absolute z-10 right-12"
        onClick={() => paginate(-1)}
      >
        {"‣"}
      </div>
    </div>
  );
};
