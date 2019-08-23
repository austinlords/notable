import React from "react";
import { posts, getPosts } from "../services/fakePostsService";

function shortContent(content) {
  if (content.length < 75) return content;
  return content.slice(0, 75) + "...";
}

function shortTags(tags) {
  let totalLength = tags.reduce((a, c) => (a += c.length), 0);
  if (totalLength < 25) return tags;
  for (let i = 0; i < tags.length; i++) {}
}

const NotesPreview = props => {
  return (
    <div className="list-group">
      {posts.map(p => (
        <a
          key={p._id}
          href="#"
          className="list-group-item list-group-item-action"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{p.title}</h5>
            <small>{p.updated.toLocaleDateString()}</small>
          </div>
          <p className="mb-1">{shortContent(p.content)}</p>
          <small>Donec id elit non mi porta.</small>
        </a>
      ))}
    </div>
  );
};

export default NotesPreview;
