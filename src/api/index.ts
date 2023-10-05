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
import {IInvoice, INewInvoice} from "../models/iInvoices";
import {IFileData, IUpdateApprovedData, IUpdatePaidData} from "../store/actionsCreators/invoices";
import {getDateInMilliseconds} from "../utils/services";


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
        const name = `${getDateInMilliseconds()}-${fileData.file.name}`;
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
}

const api = new Api();

export default api;