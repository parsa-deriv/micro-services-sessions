import React, { useState, useEffect } from "react";
import axios from "axios";
import { CommentsListArguments, PostComment } from "./models/models";

const CommentList = ({ postId }: CommentsListArguments) => {
  const [comments, setComments] = useState<PostComment[]>([]);

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );

    setComments(res.data);
  };

  useEffect(() => {
    fetchData();

    return () => console.log('clening....')
  }, []);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
