export interface ToolModel{
    id : string , 
    title : string ,
    url : string ,
    description : string ,
    updateAt: Date;
    createAt: Date;
    isDeleted: boolean;
    isPublic: boolean;
    avatar : string;
}