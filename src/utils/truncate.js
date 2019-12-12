export default function(word, length) {
  if (!word) return;
  if (word.length < length) return word;

  return word.substring(0, length - 2) + "...";
}
