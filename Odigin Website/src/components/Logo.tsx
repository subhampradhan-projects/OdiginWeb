import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

export default function Logo({ className = "", size = 200, animate = true }: LogoProps) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.1, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay: i * 0.1, duration: 0.01 }
      }
    })
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial="hidden"
      animate="visible"
      className={className}
    >
      {/* Outer Circles */}
      <motion.circle
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        variants={draw}
        custom={0}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="44"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        variants={draw}
        custom={1}
      />

      {/* Internal Geometry */}
      {/* Vertical Left */}
      <motion.line
        x1="32" y1="18.5" x2="32" y2="81.5"
        stroke="currentColor"
        strokeWidth="1.2"
        variants={draw}
        custom={2}
      />
      {/* Vertical Right */}
      <motion.line
        x1="68" y1="18.5" x2="68" y2="81.5"
        stroke="currentColor"
        strokeWidth="1.2"
        variants={draw}
        custom={3}
      />
      {/* Diagonal */}
      <motion.line
        x1="32" y1="18.5" x2="68" y2="81.5"
        stroke="currentColor"
        strokeWidth="1.2"
        variants={draw}
        custom={4}
      />
      {/* Central Full Vertical */}
      <motion.line
        x1="50" y1="2" x2="50" y2="98"
        stroke="currentColor"
        strokeWidth="1.2"
        variants={draw}
        custom={5}
      />
      {/* Central Crossbar */}
      <motion.line
        x1="42" y1="50" x2="58" y2="50"
        stroke="currentColor"
        strokeWidth="1.2"
        variants={draw}
        custom={6}
      />
    </motion.svg>
  );
}
