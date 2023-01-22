
export type Post = {
    id?: string
    title: string;
    path: string;
    description: string;
    category: string;
    updateAt: Date;
    isDeleted?: boolean;
    isPublic: boolean
};
export type ReturnPost = Omit<Post, "updateAt"> & { updateAt: { seconds: number, nanoseconds: number } }
export type PostDetail = Post & {
    content: string
}
export enum KeyDb {
    POST = 'posts',
    POSTDETAIL = 'detail-post',
    CATEGORY = 'categories',
    APPTHEME = 'blog-theme',
    LIGHTHEME = 'light',
    DARKTHEME = 'dark',
}