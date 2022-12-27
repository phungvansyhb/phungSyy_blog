import { db } from '../config/firebase.config'
import { collection, addDoc, getDocs, doc, getDoc, writeBatch, DocumentData } from "firebase/firestore";

async function createDoc(key: string, data: { [x: string]: any }, segment?: string[]) {
    try {
        const docRef = segment ? await addDoc(collection(db, key, ...segment!), data) : await addDoc(collection(db, key), data);
        return docRef.id
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
async function batchCreate(key: string, data: { [x: string]: any }[]) {
    try {
        const batch = writeBatch(db);
        batch.set(doc(db, key), data)
        console.error(" adding document success: ");

    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function getListDocs(key: string) {
    const result: DocumentData[] = []
    const querySnapshot = await getDocs(collection(db, key));
    querySnapshot.forEach((doc) => {
        result.push(doc.data())
    });
    return result
}
async function getDetailDoc(key: string , segment? : string[]) {
    const docRef = segment ? doc(db, key, ...segment) : doc(db, key);
    return await getDoc(docRef)
}
export { createDoc, getDetailDoc, getListDocs, batchCreate }