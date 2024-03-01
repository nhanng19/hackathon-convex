import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SliderComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input ref={ref} {...props} type="range" step={10} min={0} max={50} />
    );
  }
);

SliderComponent.displayName = "Slider";

export { SliderComponent };
