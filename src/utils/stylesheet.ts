export const linkCss = (filename: string) => {
  const style = document.createElement('link');
  style.href = filename;
  style.type = 'text/css';
  style.rel = 'stylesheet';
  document.body?.append(style);
};
