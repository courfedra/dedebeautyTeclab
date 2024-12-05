// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUjYVy43lGNnuiYvK0UkD2psLgyHrRwtY",
  authDomain: "dedebeauty-73385.firebaseapp.com",
  projectId: "dedebeauty-73385",
  storageBucket: "dedebeauty-73385.appspot.com",
  messagingSenderId: "381785076112",
  appId: "1:381785076112:web:239dfacf23d14f5164c315"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app)

export async function agregarProductoFirebase (data){
  const {marca,nombre,descripcion,foto,precio,totalDescuento,hayDescuento,stock,status,categorie,vendedor} = data
  try {
    const docRef = await addDoc(collection(db, "productos"), {
      marca:marca,
      nombre:nombre,
      descripcion:descripcion,
      foto:foto,
      precio:precio,
      hayDescuento:hayDescuento,
      totalDescuento:totalDescuento,
      stock:stock,
      status:status,
      categorie:categorie,
      vendedor:vendedor,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function modificarProductosFirebase (datosNuevos){
  const docRef = doc(db, "productos", datosNuevos.id);
  await updateDoc(docRef,datosNuevos)
}

export async function borrarProductosFirebase (idProd){
  await deleteDoc(doc(db, "productos", idProd));
}
