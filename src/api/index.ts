import { db, storage } from "../firebase";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, deleteObject, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { INewSupplier } from "models/iSuppliers";
import {
  IAddInvoiceData,
  IFileData,
  IUpdateApprovedData,
  IUpdateCancelData,
  IUpdatePaidData,
} from "store/actionsCreators/invoices";
import { getDateInMilliseconds, transliterate } from "utils/services";
import { IAuthData, IRegisterData } from "models/iAuth";
import { INewComment } from "models/iComents";
import { IMachinery, INewMachinery } from "models/iMachinery";
import {ordersAPI} from "features/orders/api";

class Api {
  auth = getAuth();
  addSupplier = async (supplier: INewSupplier) => {
    const res = await addDoc(collection(db, "suppliers"), supplier);
    return res;
  };
  addComment = async (comment: INewComment) => {
    const res = await addDoc(collection(db, "comments"), comment);
    return res;
  };

  addMachinery = async (machinery: INewMachinery) => {
    const res = await addDoc(collection(db, "machinery"), machinery);
    return res;
  };
  updateMachinery = async (machinery: IMachinery) => {
    const res = await updateDoc(doc(db, "machinery", machinery.id), {
      ...machinery,
    });
    return res;
  };
  addInvoice = async (addInvoiceData: IAddInvoiceData) => {
    const { invoice, orders, selectedPosition } = addInvoiceData;
    const res = await addDoc(collection(db, "invoices"), invoice);
    for (const key in selectedPosition) {
      let order = orders.find((order) => order.id === key);
      if (order) {
        order = {
          ...order,
          orderItems: [
            ...order.orderItems.map((orderItem) => {
              if (selectedPosition[key].includes(orderItem.id)) {
                return { ...orderItem, invoiceId: res.id };
              } else {
                return orderItem;
              }
            }),
          ],
        };
        await ordersAPI.updateOrder(order);
      }
    }
    return res;
  };
  updateInvoice = async (updatePaidData: IUpdatePaidData) => {
    const res = await updateDoc(doc(db, "invoices", updatePaidData.invoiceId), {
      paid: {
        isPaid: updatePaidData.newPaid.isPaid,
        userId: updatePaidData.newPaid.userId,
        date: updatePaidData.newPaid.date,
        paymentOrderFileLink: updatePaidData.newPaid.paymentOrderFileLink,
      },
    });
    return res;
  };

  updateCancelInvoice = async (updateCancelData: IUpdateCancelData) => {
    const res = await updateDoc(doc(db, "invoices", updateCancelData.invoiceId), {
      cancel: {
        isCancel: updateCancelData.newCancel.isCancel,
        date: updateCancelData.newCancel.date,
        userId: updateCancelData.newCancel.userId,
      },
    });
    return res;
  };
  updateInvoiceApproved = async (updateApprovedData: IUpdateApprovedData) => {
    const res = await updateDoc(doc(db, "invoices", updateApprovedData.invoiceId), {
      approved: {
        isApproved: updateApprovedData.newApproved.isApproved,
        userId: updateApprovedData.newApproved.userId,
        date: updateApprovedData.newApproved.date,
      },
    });
    return res;
  };

  uploadFile = async (fileData: IFileData) => {
    const name = `${getDateInMilliseconds()}-${transliterate(fileData.file.name.replace(" ", "_"))}`;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, fileData.file);
    uploadTask.on(
      "state_changed",
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
          fileData.updateFile(name, downloadURL);
          fileData.setIsUpdateFileLoading(false);
        });
      },
    );
  };
  removeFile = async (fileName: string) => {
    const desertRef = ref(storage, fileName);
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((e) => {
        alert(e);
      });
  };
  login = async (authData: IAuthData) => {
    const res = await signInWithEmailAndPassword(this.auth, authData.email, authData.password);
    return res.user.uid;
  };
  register = async (registerData: IRegisterData) => {
    const res = await createUserWithEmailAndPassword(this.auth, registerData.email, registerData.password);
    const user = await addDoc(collection(db, "users"), {
      uid: res.user.uid,
      email: res.user.email,
      role: registerData.role,
      firstName: registerData.firstName,
      middleName: registerData.middleName,
    });
    return user;
  };
  out = async () => {
    const res = await signOut(this.auth);
    return res;
  };
}

const api = new Api();

export default api;
