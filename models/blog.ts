export type Post = {
    id?:string
    title: string;
    content: string;
    category: string;
    updateAt : string ;
    isDeleted? : boolean;
};
export enum KeyDb{
    POST = 'posts',
    CATEGORY = 'categories'
}