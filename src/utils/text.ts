export const normalizeWhitespace = (text: string) => {
  return text.trim().replaceAll(/\s+/g, ' ');
};

/**
 * replace all whitespace with a simple " " and make all text lowercase
 */
export const normalizeString = (text: string) => {
  return normalizeWhitespace(text).toLowerCase();
};
