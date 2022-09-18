/* eslint-disable react/prop-types */
// write a simple card component in chakra ui that has a filename and a clickable link to the obsidian uri

// Language: typescript

export default function Card({ filename = "", obsidianURI = "" }) {
  return (
    <div>
      <h1>{filename}</h1>
      <a href={obsidianURI}>Link</a>
    </div>
  );
}
