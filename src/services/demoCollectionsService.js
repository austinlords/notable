export const DEMOCOLLECTIONS = [
  {
    _id: "adsfasdfadsf",
    name: "books",
    color: "cyan"
  },
  {
    _id: "rht5wsbsgnw",
    name: "sports",
    color: "greenyellow"
  },
  {
    _id: "nvcxcbvtsasdg",
    name: "other",
    color: "lightgray"
  }
];

export function getCollection(id) {
  return DEMOCOLLECTIONS.find(c => c._id === id);
}
