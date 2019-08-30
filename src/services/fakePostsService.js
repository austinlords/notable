export const notes = [
  {
    _id: "fg0gr34hgioa98g4",
    title: "Portland Trail Blazers",
    content: `{"blocks":[{"key":"d44gr","text":"Portland Trail Blazers","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"rhc1","text":"Just some notes....","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"81bq5","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"20eqn","text":"Lineup","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"46tkh","text":"Damian Lillard","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"aboo4","text":"CJ McCollum","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fupsb","text":"Jusif Nurkic","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c3u3r","text":"Kent Bazemore","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5cr5i","text":"Rodney Hood","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    preview:
      "Just some notes....  Lineup Damian Lillard CJ McCollum Jusif Nurkic Kent Ba...",
    tags: ["Portland", "Sports", "Basketball"],
    updated: new Date(
      "Thu Aug 26 2019 20:35:42 GMT-0700 (Pacific Daylight Time)"
    )
  },
  {
    _id: "yh533g54yh5335y4gs4",
    title: "Sapiens",
    content:
      "Duis ad ea consectetur dolore nisi laborum commodo adipisicing. Dolore mollit nulla ex est culpa exercitation voluptate officia fugiat occaecat eu. Velit officia cillum dolor aliquip labore veniam adipisicing cupidatat quis. Dolore excepteur tempor est excepteur aute cupidatat reprehenderit. Commodo fugiat quis ea irure veniam. Minim do mollit eiusmod quis anim.",
    tags: ["Books", "History"],
    updated: new Date(
      "Thu Aug 21 2019 20:35:42 GMT-0700 (Pacific Daylight Time)"
    )
  },
  {
    _id: "hq34g8vgbnbwoihs2adf",
    title: "Sandy Ridge Trails",
    content:
      "Anim in in commodo dolor labore et in id deserunt do exercitation non officia. Ea aliqua incididunt magna adipisicing adipisicing incididunt aliqua irure id laboris occaecat adipisicing. Nostrud occaecat do laborum in ex commodo commodo aliqua incididunt officia ipsum aliqua aute. In magna Lorem labore exercitation culpa sit ex eiusmod laborum do et aliqua. Excepteur sunt anim est in tempor ut aute aliqua fugiat.",
    tags: ["Portland", "Mountain Biking"],
    updated: new Date(
      "Thu Aug 29 2019 20:35:42 GMT-0700 (Pacific Daylight Time)"
    )
  }
];

export function getNotes() {
  return notes.filter(p => p);
}

export function getTime() {}
