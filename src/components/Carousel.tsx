import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [position, setPosition] = useState(0);

  const maxPosition = images.length - frameSize;

  const handleNext = () => {
    const newPosition = position + step;

    if (newPosition > maxPosition) {
      if (infinite) {
        setPosition(0);
      }
    } else {
      setPosition(newPosition);
    }
  };

  const handlePrev = () => {
    const newPosition = position - step;

    if (newPosition < 0) {
      if (infinite) {
        setPosition(maxPosition);
      }
    } else {
      setPosition(newPosition);
    }
  };

  return (
    <div
      className="carousel"
      style={{ width: `${frameSize * itemWidth}px`, overflow: 'hidden' }}
    >
      <ul
        className="carousel__list"
        style={{
          transform: `translateX(-${position * itemWidth}px)`,
          transition: `transform ${animationDuration}ms ease`,
        }}
      >
        {images.map((image, index) => (
          <li key={index} style={{ width: `${itemWidth}px`, flexShrink: 0 }}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              width={itemWidth}
              style={{ width: `${itemWidth}px`, height: 'auto' }}
            />
          </li>
        ))}
      </ul>

      <div className="carousel__controls">
        <button type="button" onClick={handlePrev} className="carousel__btn">
          Prev
        </button>

        <button
          type="button"
          onClick={handleNext}
          data-cy="next"
          className="carousel__btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
