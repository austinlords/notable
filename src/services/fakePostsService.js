export const notes = [
  {
    _id: "fg0gr34hgioa98g4",
    title: "Portland Trail Blazers",
    content: {
      blocks: [
        {
          key: "rhc1",
          text: "Just some notes....",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "81bq5",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "20eqn",
          text: "Lineup",
          type: "header-three",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 6,
              style: "UNDERLINE"
            }
          ],
          entityRanges: [],
          data: {}
        },
        {
          key: "46tkh",
          text: "Damian Lillard",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "aboo4",
          text: "CJ McCollum",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "fupsb",
          text: "Jusif Nurkic",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "c3u3r",
          text: "Kent Bazemore",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "5cr5i",
          text: "Rodney Hood",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ],
      entityMap: {}
    },
    preview:
      "Just some notes....  Lineup Damian Lillard CJ McCollum Jusif Nurkic Kent Ba...",
    tags: ["Portland", "Sports", "Basketball"],
    collection: { name: "Other", color: "lightgrey" },
    updated: "2019-07-11T04:05:42.426Z"
  },
  {
    _id: "yh533g54yh5335y4gs4",
    title: "Sapiens",
    content: {
      blocks: [
        {
          key: "6ef7d",
          text: "Insert some book notes here. Nothing much...",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ],
      entityMap: {}
    },
    preview: "Insert some book notes here. Nothing much...",
    tags: ["Books", "History"],
    collection: { name: "Books", color: "lightblue" },
    updated: "2019-03-11T04:05:42.426Z"
  },
  {
    _id: "thtrjsbehrytu5667s5335y",
    title: "Sandy Ridge Trails",
    content: {
      blocks: [
        {
          key: "rhc1",
          text: "Some of the best mountain biking in Oregon",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ],
      entityMap: {}
    },
    preview: "Some of the best mountain biking in Oregon.",
    tags: ["Portland", "Mountain Biking"],
    collection: { name: "Sports", color: "lightgreen" },
    updated: "2019-08-11T04:05:42.426Z"
  }
];

export function getNote(id) {
  return notes.find(n => n._id === id);
}
