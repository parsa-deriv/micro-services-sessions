import express from 'express';
import cors from "cors";
import axios from "axios";

import { Dict, EventModel } from './models/event_model';
import {PostModel} from './models/post_model';

const app = express();
app.use(express.json());
app.use(cors());

const posts: PostModel[] = [];

function eventHandler(event: EventModel): void {
    if(event.type == "PostCreated") {
        const postId: string = event.data.id;
        const postTitle: string = event.data.title;
        posts.push({id: postId, title: postTitle, comments: []});
    } else if(event.type == "CommentCreated") {
        const postId: string = event.data.postId;
        const commentId: string = event.data.id;
        const commentContent: string = event.data.content;

        const post: PostModel | undefined = posts.find((post) => post.id == postId);

        if(post) {
            post.comments.push({id: commentId, content: commentContent});
        }
    }
}

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post("/event", (req, res) => {
    const event: EventModel = req.body;
    console.log("Received Event", event.type);
    eventHandler(event);

    res.send({});
});

app.listen(4002, () => console.log("Query service is running on port 4002..."));
