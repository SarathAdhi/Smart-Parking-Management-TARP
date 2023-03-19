import {
  dbFireStore,
  entriesCollectionRef,
  parkingCollectionRef,
  storage,
} from "../db";
import {
  addDoc as addDocFB,
  query,
  getDocs,
  QueryConstraint,
  updateDoc as updateDocFB,
  doc,
  deleteDoc,
  getDoc as getDocFB,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

type DocProps = {
  collection: "parking-slot" | "entries";
  values: {};
};

export const addDoc = async (
  collection: DocProps["collection"] = "parking-slot",
  values: DocProps["values"]
) => {
  const getCollection =
    collection === "parking-slot" ? parkingCollectionRef : entriesCollectionRef;

  return await addDocFB(getCollection, values);
};

export const delFile = async (filePath: string) => {
  const storageRef = ref(storage, filePath);

  deleteObject(storageRef)
    .then(() => {
      console.log("File deleted");
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};

export const delDoc = async (
  collection: DocProps["collection"] = "parking-slot",
  id: string,
  filePath?: string
) => {
  if (filePath) delFile(filePath);
  return await deleteDoc(doc(dbFireStore, collection, id));
};

export const updateDoc = async (
  collection: DocProps["collection"] = "parking-slot",
  id: string,
  values: DocProps["values"]
) => {
  return await updateDocFB(doc(dbFireStore, collection, id), values);
};

type FilterDocProps = {
  collection: "parking-slot" | "document";
  where: QueryConstraint;
};

export const filterDoc = async (
  collection: FilterDocProps["collection"] = "parking-slot",
  where: FilterDocProps["where"]
) => {
  const getCollection =
    collection === "parking-slot" ? parkingCollectionRef : entriesCollectionRef;

  const res = query(getCollection, where);
  const querySnapshot = await getDocs(res);

  const data = [] as any;

  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

type FileUploadProps = {
  fileName: string;
  file: File | any;
};

export const fileUpload = async (
  fileName: FileUploadProps["fileName"],
  file: FileUploadProps["file"]
) => {
  const storageRef = ref(storage, fileName);

  return await uploadBytes(storageRef, file);
};

export const getFile = async (filePath: string) => {
  const fileref = ref(storage, filePath);
  return await getDownloadURL(fileref).then((url) => url);
};
