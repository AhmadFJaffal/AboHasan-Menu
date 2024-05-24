import { db } from "../firebase"; 
import { collection, doc, setDoc } from "firebase/firestore";

async function uploadMenuData(menu) {
  const menuCollection = collection(db, "menuItems");

  for (const item of menu) {
    const menuItemDoc = doc(menuCollection, item.id.toString());
    await setDoc(menuItemDoc, item);
  }
}

export default uploadMenuData;
