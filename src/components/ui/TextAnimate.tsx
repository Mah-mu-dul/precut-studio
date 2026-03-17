import React from 'react';
import { motion } from 'framer-motion';

interface TextAnimateProps {
  text: string;
  className?: string;
  delay?: number;
  start?: boolean;
}

const TextAnimate: React.FC<TextAnimateProps> = ({ text, className, delay = 0, start = false }) => {
  const words = text.split(" ");

  const container: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08, 
        delayChildren: delay 
      },
    },
  };

  const child: any = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(4px)",
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate={start ? "visible" : "hidden"}
      className={`flex flex-wrap justify-center gap-x-[0.3em] ${className}`}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap overflow-hidden">
          {word.split("").map((letter, letterIndex) => (
            <motion.span
              variants={child}
              key={letterIndex}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

export default TextAnimate;
