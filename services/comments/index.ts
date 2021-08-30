import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";

import Post from './models/comment_model';
import PostComment from "./models/comment_model";

type Dict = { [key: string]: PostComment[] };

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId: Dict = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const comment: PostComment = req.body;
  comment.id = commentId;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push(comment);

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Event Received", req.body.type);

  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
