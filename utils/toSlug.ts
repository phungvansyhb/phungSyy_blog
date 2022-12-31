function toSlug(pathName:string){
    return pathName.split(' ').join('-')
}
function parseSlug(pathName:string){
    return pathName.replaceAll('-','')
}
export {toSlug , parseSlug}