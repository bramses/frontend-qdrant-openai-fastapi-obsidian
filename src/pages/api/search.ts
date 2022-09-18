/*
curl -X 'GET' \
  'http://localhost:8000/api/search?q=device%20that%20takes%20photographs&vault=To%20Go%20Brain' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer bram'
*/

import type { NextApiRequest, NextApiResponse } from "next";

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, vault } = req.body;

  const urlencodedQuery = encodeURIComponent(query as string);

  if (!query || !vault) {
    res.statusCode = 400;
    res.json({
      error: "Bad Request",
      message: "Missing query or vault",
      result: [],
      obsidianURIS: [],
    });
    return;
  }

  if (!req.headers.authorization) {
    res.statusCode = 401;
    res.json({
      error: "Unauthorized",
      result: [],
      obsidianURIS: [],
      message: "Missing Authorization header",
    });
    return;
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const yup = await fetch(
      `http://0.0.0.0:8000/api/search?q=${urlencodedQuery}&vault=${vault}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await yup.json();
    // console.log(data);

    if (data.detail === "Invalid authentication credentials") {
      // console.log("in 401");
      res.statusCode = 401;
      res.json({
        error: "Unauthorized",
        result: [],
        obsidianURIS: [],
        message: "Incorrect Token",
      });
      return;
    }

    if (!data.result) {
      res.statusCode = 404;
      res.json({
        error: "Not Found",
        result: [],
        obsidianURIS: [],
        message: "No results found",
      });
      return;
    }

    if (data.result.length === 0) {
      res.statusCode = 200;
      res.json({
        error: "No Results",
        result: [],
        obsidianURIS: [],
        message: "No Results",
      });
      return;
    }

    res.status(200).json({ error: null, message: null, ...data });
  } catch (err) {
    res.statusCode = 500;
    res.json({
      error: "Internal Server Error",
      result: [],
      obsidianURIS: [],
      message: "Something went wrong. Try again later.",
    });
  }
};

export default search;
