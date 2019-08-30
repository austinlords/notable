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
    content: `{"blocks":[{"key":"ae4k1","text":"Sapiens","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5ot86","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1t7bp","text":"Some book notes here. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ddof3","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"82k66","text":"ADF;LJASDFLJKASDFKLA;LSDF","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    preview: "Some book notes here.   ADF;LJASDFLJKASDFKLA;LSDF ",
    tags: ["Books", "History"],
    updated: new Date(
      "Thu Aug 21 2019 20:35:42 GMT-0700 (Pacific Daylight Time)"
    )
  },
  {
    _id: "hq34g8vgbnbwoihs2adf",
    title: "Sandy Ridge Trails",
    content: `{"blocks":[{"key":"ae4k1","text":"Sandy Ride Trail","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5ot86","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1t7bp","text":"Best mountain biking in Portland. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2p4ml","text":"50 minutes from city center","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8bbuo","text":"purpose-built trails","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dalrm","text":"no hikers!","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    preview:
      " Best mountain biking in Portland.  50 minutes from city center purpose-bui...",
    tags: ["Portland", "Mountain Biking"],
    updated: new Date(
      "Thu Aug 29 2019 20:35:42 GMT-0700 (Pacific Daylight Time)"
    )
  }
];

export function getNotes() {
  return notes.filter(p => p);
}

export function getNote(id) {
  return notes.find(n => n._id === id);
}
