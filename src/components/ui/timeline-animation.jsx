import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function TimelineContent({
  as = 'div',
  animationNum = 0,
  customVariants,
  timelineRef,
  className = '',
  children,
  ...props
}) {
  const localRef = useRef(null);
  const targetRef = timelineRef || localRef;
  const isInView = useInView(targetRef, { once: true, margin: '-40px' });

  const Component = motion[as] || motion.div;

  const defaultVariants = {
    visible: (i = 0) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.12,
        duration: 0.55,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    }),
    hidden: {
      filter: 'blur(6px)',
      y: 24,
      opacity: 0,
    },
  };

  const variants = customVariants || defaultVariants;

  return (
    <Component
      ref={localRef}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={animationNum}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
