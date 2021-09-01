interface PostComment {
    id: string;
    content: string;
}

interface PostModel {
    id: string;
    title: string;
    comments: PostComment[];
}

export { PostModel };