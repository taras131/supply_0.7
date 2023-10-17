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
import {INewSupplier, ISupplier} from "../models/iSuppliers";
import {IInvoice, INewInvoice} from "../models/iInvoices";
import {IFileData, IUpdateApprovedData, IUpdateCancelData, IUpdatePaidData} from "../store/actionsCreators/invoices";
import {getDateInMilliseconds, transliterate} from "../utils/services";
import {IAuthData, IRegisterData} from "../models/iAuth";


class Api {
    auth = getAuth();
    getSuppliers = async (dispatchSetSuppliers: (suppliesArr: ISupplier[]) => void) => {


    }
    addSupplier = async (supplier: INewSupplier) => {
        let res = await addDoc(collection(db, "suppliers"),
            supplier
        );
        return res
    }
    addInvoice = async (invoice: INewInvoice) => {
        let res = await addDoc(collection(db, "invoices"),
            invoice
        );
        return res
    }
    updateInvoice = async (updatePaidData: IUpdatePaidData) => {
        let res = await updateDoc(doc(db, "invoices", updatePaidData.invoiceId), {
            paid: {
                isPaid: updatePaidData.newPaid.isPaid,
                userId: updatePaidData.newPaid.userId,
                date: updatePaidData.newPaid.date,
                paymentOrderFileLink: updatePaidData.newPaid.paymentOrderFileLink
            }
        });
        return res
    }
    updateCancelInvoice = async (updateCancelData: IUpdateCancelData) => {
        let res = await updateDoc(doc(db, "invoices", updateCancelData.invoiceId), {
            cancel: {
                isCancel: updateCancelData.newCancel.isCancel,
                date: updateCancelData.newCancel.date,
                userId: updateCancelData.newCancel.userId
            }
        });
        return res
    }
    updateInvoiceApproved = async (updateApprovedData: IUpdateApprovedData) => {
        let res = await updateDoc(doc(db, "invoices", updateApprovedData.invoiceId), {
            approved: {
                isApproved: updateApprovedData.newApproved.isApproved,
                userId: updateApprovedData.newApproved.userId,
                date: updateApprovedData.newApproved.date,
            }
        });
        return res
    }
    uploadFile = async (fileData: IFileData) => {
        const name = `${getDateInMilliseconds()}-${transliterate(fileData.file.name.replace(" ", "_"))}`;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, fileData.file);
        uploadTask.on("state_changed",
            (snapshot) => {
                switch (snapshot.state) {
                    case "paused":
                        break;
                    case "running":
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                alert("Ошибка загрузки");
                switch (error.code) {
                    case "storage/unauthorized":
                        break;
                    case "storage/canceled":
                        break;
                    case "storage/unknown":
                        break;
                    default:
                        break;
                }
            },
            async () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    fileData.updateFile(name, downloadURL)
                    fileData.setIsUpdateFileLoading(false)
                });
            }
        );
    };
    removeFile = async (fileName: string) => {
        const desertRef = ref(storage, fileName);
        deleteObject(desertRef).then(() => {
            // File deleted successfully
        }).catch((e) => {
            alert(e);
        });
    };
    login = async (authData: IAuthData) => {
        const res = await signInWithEmailAndPassword(this.auth, authData.email, authData.password)
        return res.user.uid
    }
    register = async (registerData: IRegisterData) => {
        const res = await createUserWithEmailAndPassword(this.auth, registerData.email, registerData.password)
        const user = await addDoc(collection(db, "users"), {
                uid: res.user.uid,
                email: res.user.email,
                role: registerData.role,
                firstName: registerData.firstName,
                middleName: registerData.middleName
            }
        );
        return user
    }
    out = async () => {
        const res = await signOut(this.auth)
        return res
    }
}

const api = new Api();

export default api;