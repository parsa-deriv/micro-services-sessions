interface PostComment {
    id: string;
    content: string;
}

interface PostModel {
    id: string;
    title: string;
    comments: PostComment[];
}

interface CommentCreateArguments {
    postId: string;
}

interface CommentsListArguments {
    comments: PostComment[];
}

export type { PostModel, PostComment, CommentCreateArguments, CommentsListArguments };