function createElement(tag, className, text, attributes) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text) {
    element.textContent = text;
  }

  if (attributes) {
    Object.keys(attributes).forEach((atr) => {
      element.setAttribute(atr, attributes[atr]);
    });
  }

  return element;
}

export default createElement;
