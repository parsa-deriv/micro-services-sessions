import express from 'express';
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";

import Post from './models/post_model';

const app = express();
app.use(express.json());
app.use(cors());

const posts: Post[] = [];

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const post: Post = req.body;
  post.id = id;

  posts.push(post);

  res.status(201).send(post);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
