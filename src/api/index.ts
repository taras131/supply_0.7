import { db, storage } from "../firebase";
import { addDoc, collection} from "firebase/firestore";
import { ref, deleteObject, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { INewSupplier } from "models/iSuppliers";
import { getDateInMilliseconds, transliterate } from "utils/services";
import { INewComment } from "models/iComents";
import {IFileData} from "features/invoices/model/actions";
import axios from "axios";

export const basePath ="http://127.0.0.1:8000/api/v1";

class Api {

  addSupplier = async (supplier: INewSupplier) => {
    const res = await addDoc(collection(db, "suppliers"), supplier);
    return res;
  };
  addComment = async (comment: INewComment) => {
    const res = await addDoc(collection(db, "comments"), comment);
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

}

const api = new Api();

export default api;



export  const appAPI = axios.create({
  baseURL: basePath,
});

appAPI.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

