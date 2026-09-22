export const fluid = (min: number, max: number, maxWidth: number = 1920) => {
  return `clamp(${min}px, ${(max * 100) / maxWidth}vw, ${max}px)`;
};
