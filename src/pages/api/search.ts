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
    res.json({ error: "Bad Request" });
    return;
  }

  if (!req.headers.authorization) {
    res.statusCode = 401;
    res.json({ error: "Unauthorized" });
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
    res.status(200).json(data);
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "Internal Server Error" });
  }
};

export default search;
