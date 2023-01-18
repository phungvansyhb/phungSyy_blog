
export type Post = {
    id?: string
    title: string;
    content: string;
    description: string;
    category: string;
    updateAt: Date;
    isDeleted?: boolean;
    isPublic: boolean
};
export type ReturnPost = Omit<Post, "updateAt"> & { updateAt: { seconds: number, nanoseconds: number } }
export enum KeyDb {
    POST = 'posts',
    CATEGORY = 'categories',
    APPTHEME = 'blog-theme',
    LIGHTHEME = 'light',
    DARKTHEME = 'dark',
}