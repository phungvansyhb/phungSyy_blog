export type Post = {
    id?:string
    title: string;
    content: string;
    description:string;
    category: string;
    updateAt : string ;
    isDeleted? : boolean;
};
export enum KeyDb{
    POST = 'posts',
    CATEGORY = 'categories',
    APPTHEME='blog-theme',
    LIGHTHEME = 'light',
    DARKTHEME = 'dark'
}