
export type User = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    _id: string;
    type: "student" | "mentor" | "";
    points: number;
}

export type Content = {
    _id: string;
    title: string;
    body: string;
    author: string
    category: string;
    isEvent: boolean;
    date: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    format: string;
    location: string;
}

export type Comment = {
    _id: string;
    username: string;
    postId: string;
    body: string;
}