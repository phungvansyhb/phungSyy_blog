import { db } from '../config/firebase.config'
import { collection, addDoc, setDoc, updateDoc, getDocs, doc, getDoc, DocumentData, startAt, limit, deleteDoc, orderBy, query, where, QueryConstraint, writeBatch } from "firebase/firestore";

async function createDoc(key: string, data: { [x: string]: any }, customId?: string) {
    try {
        return customId ? await setDoc(doc(db, key, customId), data) : await addDoc(collection(db, key), data);
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
export type WriteBatchParam = {
    type: 'set' | 'update' | 'delete',
    data?: { [property: string]: any },
    key: string,
    customId?: string
}
async function writeBatchDoc(params: WriteBatchParam[]) {
    const batch = writeBatch(db);
    params.forEach(param => {
        const docRef = param.customId ? doc(db, param.key, param.customId) : doc(db , param.key);
        if (param.type === 'set') {
            batch.set(docRef, param.data)
        } else if (param.type === 'update') {
            batch.update(docRef, param.data)
        } else {
            batch.update(docRef,{isDeleted : true})
        }
    })
    await batch.commit()
}
async function getListDocs({ key, count, orderKey, orderDirection = 'asc', whereClause }: { key: string, count?: number, orderKey?: string, orderDirection?: 'asc' | 'desc', whereClause?: [string, '==' | '!=', any][] }) {
    try {
        const result: DocumentData[] = []
        const queryConstraint: QueryConstraint[] = []
        if (whereClause) {
            for (let index = 0; index < whereClause.length; index++) {
                queryConstraint.push(where(...whereClause[index]))
            }
        }
        queryConstraint.push(where('isDeleted', '==', false))

        if (count) {
            queryConstraint.push(limit(count))
        }
        if (orderKey) {
            queryConstraint.push(orderBy(orderKey, orderDirection))
        }

        let queryObj = query(collection(db, key), ...queryConstraint)
        const querySnapshot = await getDocs(queryObj);
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            result.push({ id: doc.id, ...data })
        });
        return result
    } catch (e) {
        console.error(e);
        throw new Error("get list doc error");
    }
}
async function getDetailDoc(key: string, segment?: string[]) {
    try {
        const docRef = segment ? doc(db, key, ...segment) : doc(db, key);

        const document = await getDoc(docRef )
        return document.data()
    } catch (e) {
        throw new Error('getDetailDoc fail')
    }
}
async function deleteDocument(key: string, segment?: string[]) {
    try {
        const docRef = segment ? doc(db, key, ...segment) : doc(db, key);
        return await updateDoc(docRef, { isDeleted: true })
    } catch (e) {
        throw new Error('delete fail')
    }
}
export { createDoc, getDetailDoc, getListDocs, updateDocument, deleteDocument, writeBatchDoc }