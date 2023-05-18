
export type Post = {
    id?: string
    title: string;
    avatar:string;
    path: string;
    description: string;
    category: string;
    updateAt: Date;
    createAt: Date;
    isDeleted?: boolean;
    isPublic: boolean
};
type TimeStamp = {
    seconds: number, nanoseconds: number
}
export type ReturnPost = Omit<Post, "updateAt"|"createAt"> & { updateAt: TimeStamp , createAt : TimeStamp }
export type PostDetail = Post & {
    content: string,
    updateAt: TimeStamp ,
    createAt : TimeStamp
}
export enum KeyDb {
    TOOL = 'tools',
    POST = 'posts',
    POSTDETAIL = 'detail-post',
    CATEGORY = 'categories',
    APPTHEME = 'blog-theme',
    LIGHTHEME = 'light',
    DARKTHEME = 'dark',
    FIRST_USER = 'viewed'
}