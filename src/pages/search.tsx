/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import { Input } from "@chakra-ui/react";
import { useState } from "react";

import Card from "../lib/components/Card";

const VAULT = "To Go Brain";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [obsidianURIs, setObsidianURIs] = useState([]);

  const search = async () => {
    const res = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer bram",
      },
      body: JSON.stringify({
        query,
        vault: VAULT,
      }),
    });
    const data = await res.json();
    setResults(data.result);
    setObsidianURIs(data.obsidianURIS);
  };

  return (
    <div>
      <h1>Search</h1>
      <Input
        placeholder="Basic usage"
        onChange={(evt) => setQuery(evt.target.value)}
      />
      <button onClick={search}>Search</button>
      <ul>
        {results.map((result, idx) => (
          <Card
            key={idx}
            filename={result.filename}
            obsidianURI={obsidianURIs[idx]}
          />
          // <Link href={obsidianURIs[idx]}>{result.filename}</Link>
        ))}
      </ul>
    </div>
  );
}
