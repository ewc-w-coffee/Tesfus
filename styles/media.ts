const customMediaQuery = (maxWidth: number) =>
  `@media screen and (max-width: ${maxWidth}px)`;

const media = {
  xl: customMediaQuery(1920),
  lg: customMediaQuery(1200),
  md: customMediaQuery(922),
  sm: customMediaQuery(768),
  xs: customMediaQuery(576),
};

export default media;
