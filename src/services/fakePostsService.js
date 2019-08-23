export const posts = [
  {
    _id: "fg0gr34hgioa98g4",
    title: "Portland Trail Blazers",
    content:
      "Velit elit qui occaecat eiusmod est amet dolore velit enim deserunt ea voluptate cillum. Labore dolor eu sunt sit sit ea non proident adipisicing ea. Eiusmod adipisicing amet excepteur ea et reprehenderit nostrud sint aliqua veniam laboris. Sit consequat ipsum in eu anim excepteur in sint ipsum. Nulla anim pariatur cupidatat culpa laborum laboris veniam aute id. Nostrud proident ad magna esse veniam magna esse minim ipsum voluptate sint proident deserunt. Magna cillum sunt laboris est elit minim ut sint in adipisicing irure nostrud.",
    tags: ["Portland", "Sports", "Basketball"],
    updated: new Date()
  },
  {
    _id: "yh533g54yh5335y4gs4",
    title: "Sapiens",
    content:
      "Duis ad ea consectetur dolore nisi laborum commodo adipisicing. Dolore mollit nulla ex est culpa exercitation voluptate officia fugiat occaecat eu. Velit officia cillum dolor aliquip labore veniam adipisicing cupidatat quis. Dolore excepteur tempor est excepteur aute cupidatat reprehenderit. Commodo fugiat quis ea irure veniam. Minim do mollit eiusmod quis anim.",
    tags: ["Books", "History"],
    updated: new Date()
  },
  {
    _id: "hq34g8vgbnbwoihs2adf",
    title: "Sandy Ridge Trails",
    content:
      "Anim in in commodo dolor labore et in id deserunt do exercitation non officia. Ea aliqua incididunt magna adipisicing adipisicing incididunt aliqua irure id laboris occaecat adipisicing. Nostrud occaecat do laborum in ex commodo commodo aliqua incididunt officia ipsum aliqua aute. In magna Lorem labore exercitation culpa sit ex eiusmod laborum do et aliqua. Excepteur sunt anim est in tempor ut aute aliqua fugiat.",
    tags: ["Portland", "Mountain Biking"],
    updated: new Date()
  }
];

export function getPosts() {
  return posts.filter(p => p);
}
