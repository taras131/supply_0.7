import {db, storage} from "../firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import {ref, deleteObject, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {INewSupplier, ISuppliers} from "../models/iSuppliers";


class Api {
    auth = getAuth();
    getSuppliers = async (dispatchSetSuppliers: (suppliesArr: ISuppliers[]) => void) => {


    }
    addSupplier = async (supplier: INewSupplier) => {
        let res = await addDoc(collection(db, "suppliers"),
            supplier
        );
        return res
    }
}

const api = new Api();

export default api;