export default function randomColor() {
  return (
    "#" +
    Math.random()
      .toString(16)
      .substr(-6)
  );
}
