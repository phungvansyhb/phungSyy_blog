import { db } from '../config/firebase.config'
import { collection, addDoc, updateDoc, getDocs, doc, getDoc, DocumentData, startAt, limit , deleteDoc } from "firebase/firestore";

async function createDoc(key: string, data: { [x: string]: any }, segment?: string[]) {
    try {
        return segment ? await addDoc(collection(db, key, ...segment!), data) : await addDoc(collection(db, key), data);
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error("create error");
    }
}
async function updateDocument(key: string, data: { [x: string]: any }, segment?: string[]) {
    try {
        const reference = segment ? doc(db, key, ...segment) : doc(db, key)
        return await updateDoc(reference, data);
    } catch (e) {
        console.error("Error update document: ", e);
        throw new Error("update error");   
    }
}

async function getListDocs(key: string) {
    try {
        const result: DocumentData[] = []
        const querySnapshot = await getDocs(collection(db, key));
        querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() })
        });
        return result
    } catch (e) {
        throw new Error("get list doc error");
    }

}

async function getDetailDoc(key: string, segment?: string[]) {
    try {
        const docRef = segment ? doc(db, key, ...segment) : doc(db, key);
        const document = await getDoc(docRef)
        return document.data()
    } catch (e) {
        throw new Error('getDetailDoc fail')
    }
}
async function deleteDocument(key:string , segment?:string[]){
    try {
        const docRef = segment ? doc(db, key, ...segment) : doc(db, key);
        return await deleteDoc(docRef)
    } catch (e) {
        throw new Error('delete fail')
    }
}
export { createDoc, getDetailDoc, getListDocs, updateDocument , deleteDocument }