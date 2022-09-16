// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  // fetch post localhost 8000/token

  const details = { ...req.body };
  const formBody = Object.keys(details)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`
    )
    .join("&");

  try {
    const yup = await fetch("http://0.0.0.0:8000/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });

    const data = await yup.json();
    res.status(200).json(data);
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "Internal Server Error" });
  }
};

export default login;
