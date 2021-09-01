import {CommentsListArguments} from './models/models';

const CommentList = ({ comments }: CommentsListArguments)  => {

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
