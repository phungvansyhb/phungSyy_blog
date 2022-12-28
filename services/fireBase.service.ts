import { db } from '../config/firebase.config'
import { collection, addDoc,updateDoc, getDocs, doc, getDoc, writeBatch, DocumentData } from "firebase/firestore";

async function createDoc(key: string, data: { [x: string]: any }, segment?: string[]) {
    try {
        const docRef = segment ? await addDoc(collection(db, key, ...segment!), data) : await addDoc(collection(db, key), data);
        return docRef.id
    } catch (e) {
        console.error("Error adding document: ", e);
        return 'Error create document'
    }
}
async function updateDocument(key: string, data: { [x: string]: any }, segment?: string[]) {
    try {
        segment ? await updateDoc(doc(db, key, ...segment!), data) : await updateDoc(doc(db, key), data);
        return "success"
    } catch (e) {
        console.error("Error update document: ", e);
        return 'Error update document'
    }
}

async function getListDocs(key: string) {
    try{
        const result: DocumentData[] = []
        const querySnapshot = await getDocs(collection(db, key));
        querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() })
        });
        return result
    }catch(e){
        return 'getListDocs fail'
    }
   
}
async function getDetailDoc(key: string, segment?: string[]) {
    try{
        const docRef = segment ? doc(db, key, ...segment) : doc(db, key);
        const document = await getDoc(docRef)
        return document.data()
    }catch(e){
        return 'getDetailDoc fail'
    }
  
}
export { createDoc, getDetailDoc, getListDocs , updateDocument }