"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./Carousel.module.css";

interface CarouselProps {
  children: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex < children.length - itemsToShow) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const isLeftDisabled = currentIndex === 0;
  const isRightDisabled = currentIndex >= children.length - itemsToShow;

  if (!children || children.length === 0) return null;

  return (
    <div className={styles.carouselContainer}>
      <button 
        className={`${styles.arrow} ${styles.leftArrow}`} 
        onClick={prevSlide} 
        disabled={isLeftDisabled}
        aria-label="Previous Slide"
      >
        ❮
      </button>

      <div className={styles.trackContainer} ref={trackRef}>
        <div 
            className={styles.track}
            style={{
                transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`
            }}
        >
          {React.Children.map(children, (child, index) => (
            <div 
              className={styles.slide} 
              key={index}
              style={{ flex: `0 0 ${100 / itemsToShow}%` }} 
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      <button 
        className={`${styles.arrow} ${styles.rightArrow}`} 
        onClick={nextSlide} 
        disabled={isRightDisabled}
        aria-label="Next Slide"
      >
        ❯
      </button>
    </div>
  );
};

export default Carousel;
