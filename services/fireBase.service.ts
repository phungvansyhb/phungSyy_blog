import { db } from '../config/firebase.config'
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";

async function createDoc(key: string, data: { [x: string]: any }) {
    try {
        const docRef = await addDoc(collection(db, key), data);
        return docRef.id
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}
async function getListDocs(key: string) {
    return await getDocs(collection(db, key));
}
async function getDetailDoc(key: string[]) {
    const docRef = doc(db, "", ...key);
    return await getDoc(docRef)
}
export { createDoc, getDetailDoc, getListDocs }