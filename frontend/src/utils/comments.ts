import { Comment } from "../components/types";


export async function fetchComments(postId: string): Promise<Comment[]> {
    const response = await fetch(`http://localhost:8000/comments/${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const data: Comment[] = await response.json();
        return data;
    } else {
        return [];
    }
}