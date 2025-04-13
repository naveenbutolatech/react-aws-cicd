declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// For global non-module CSS files
declare module '*.css' {
  const css: string;
  export default css;
}

