/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import {
  Input,
  Button,
  Heading,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Card from "../lib/components/Card";
import useSessionStorage from "../lib/hooks/useSessionStorage";

const VAULT = "To Go Brain";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [obsidianURIs, setObsidianURIs] = useState([]);
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    show: false,
    error: "",
  });
  const token = useSessionStorage("token");

  useEffect(() => {
    window.sessionStorage.setItem("token", "bram");
    // console.log("token", token);
  }, [token]);

  const search = async () => {
    const res = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        vault: VAULT,
      }),
    });
    const data = await res.json();
    setResults(data.result);
    setObsidianURIs(data.obsidianURIS);
    setErrorMessage({
      message: data.message,
      show: !!data.error,
      error: data.error,
    });
  };

  return (
    <div>
      <Heading as="h1" my="2">
        Search Obsidian Vault
      </Heading>
      <Input
        placeholder="absolute bangers only"
        onChange={(evt) => setQuery(evt.target.value)}
      />
      <Button onClick={search} my="2">
        Search
      </Button>
      <ul>
        {errorMessage.show && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>{errorMessage.error}</AlertTitle>
            <AlertDescription>{errorMessage.message}</AlertDescription>
          </Alert>
        )}
        {results.map((result, idx) => (
          <Card
            key={idx}
            filename={result.filename}
            obsidianURI={obsidianURIs[idx]}
          />
        ))}
      </ul>
    </div>
  );
}
