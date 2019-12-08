export const DEMOCOLLECTIONS = [
  {
    _id: "adsfasdfadsf",
    name: "Books",
    color: "cyan"
  },
  {
    _id: "rht5wsbsgnw",
    name: "Sports",
    color: "greenyellow"
  },
  {
    _id: "nvcxcbvtsasdg",
    name: "Other",
    color: "lightgray"
  }
];

export function getCollection(id) {
  return DEMOCOLLECTIONS.find(c => c._id === id);
}
