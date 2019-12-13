export const DEMONOTES = [
  {
    _id: "fg0gr34hgioa98g4",
    title: "Portland Trail Blazers",
    content: {
      blocks: [
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
    tags: ["portland", "sports", "basketball"],
    collection: {
      _id: "rht5wsbsgnw",
      name: "sports",
      color: "greenyellow"
    },
    updated: "2019-07-11T04:05:42.426Z"
  },
  {
    _id: "yh533g54yh5335y4gs4",
    title: "Sapiens",
    content: {
      blocks: [
        {
          key: "6ef7d",
          text: "Book notes!",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ],
      entityMap: {}
    },
    tags: ["books", "history"],
    collection: {
      _id: "adsfasdfadsf",
      name: "books",
      color: "cyan"
    },
    updated: "2019-03-11T04:05:42.426Z",
    user: "lords.austin@gmail.com"
  },
  {
    _id: "thtrjsbehrytu5667s5335y",
    title: "Sandy Ridge Trails",
    content: {
      blocks: [
        {
          key: "rhc1",
          text: "Some of the best mountain biking in Oregon...",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "300d5",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "ao9ar",
          text: "Top Trails",
          type: "header-three",
          depth: 0,
          inlineStyleRanges: [{ offset: 0, length: 10, style: "ITALIC" }],
          entityRanges: [],
          data: {}
        },
        {
          key: "dm3nl",
          text: "Hide and Seek",
          type: "ordered-list-item",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "flb07",
          text: "Rock Drop",
          type: "ordered-list-item",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "70n88",
          text: "Quid Pro Flow",
          type: "ordered-list-item",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "erm74",
          text: "Flow Motion",
          type: "ordered-list-item",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "3insv",
          text: "Communication Breakdown",
          type: "ordered-list-item",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "6bku3",
          text: "About",
          type: "header-three",
          depth: 0,
          inlineStyleRanges: [{ offset: 0, length: 5, style: "UNDERLINE" }],
          entityRanges: [],
          data: {}
        },
        {
          key: "606ro",
          text: "Open Year-Round",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "dhs7n",
          text: "No Fees",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "3k3j9",
          text: "40 miles east of Portland off US Highway 26\n",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ],
      entityMap: {}
    },
    tags: ["portland", "mountain biking"],
    collection: {
      _id: "rht5wsbsgnw",
      name: "sports",
      color: "greenyellow"
    },
    updated: "2019-08-11T04:05:42.426Z"
  }
];

export function getNote(id) {
  return DEMONOTES.find(n => n._id === id);
}
