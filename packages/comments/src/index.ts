import * as express from "express";
import { randomBytes } from "crypto";
import * as cors from "cors";
import axios from "axios";

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

  console.log(`Comment created. ID: ${comment.id}, content: ${comment.content}`);

  await axios.post("http://localhost:4005/event", {
    type: "CommentCreated",
    data: {
      ...comment,
      postId: req.params.id,
    },
  }).catch((err) => console.log(err));

  res.status(201).send(comments);
});

app.post("/event", (req, res) => {
  console.log("Received Event", req.body.type);

  res.send({});
});

app.listen(4001, () => console.log("Comments service is running on port 4001..."));