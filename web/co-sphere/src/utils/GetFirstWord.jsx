export const getFirstLetter = (str) => {
  if (!str || typeof str !== "string") return "";
  var first_word = str.trim().split("")[0].toUpperCase();
  return first_word;
};
