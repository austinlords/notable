export const Collections = [
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
    color: "gray"
  }
];

export function getCollection(id) {
  return Collections.find(c => c._id === id);
}
