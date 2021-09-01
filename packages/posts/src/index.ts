import * as express from 'express';
import { randomBytes } from "crypto";
import * as cors from "cors";
import axios from "axios";

import Post from './models/post_model';

const app = express();
app.use(express.json());
app.use(cors());

const posts: Post[] = [];

app.get("/posts", (_, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res ) => {
  const id = randomBytes(4).toString("hex");
  const post = req.body;
  post.id = id;

  posts.push(post);

  console.log(`Post created. ID: ${post.id}, title: ${post.title}`);

  await axios.post("http://localhost:4005/event", {
    type: "PostCreated",
    data: post,
  }).catch((err) => console.log(err));

  res.status(201).send(post);
});

app.post("/event", (req, res) => {
  console.log("Received Event", req.body.type);

  res.send({});
});

app.listen(4000, () => console.log("Posts service is running on port 4000..."));
