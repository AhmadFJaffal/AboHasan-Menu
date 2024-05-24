import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  setDoc
} from "firebase/firestore";
import { db } from "../../firebase";

const getHighestId = async () => {
  const q = query(collection(db, "menuItems"), orderBy("id", "desc"), limit(1));
  const querySnapshot = await getDocs(q);
  let highestId = 0;
  querySnapshot.forEach((doc) => {
    highestId = parseInt(doc.id);
  });
  return highestId;
};

// const addMenuItem = async (menuItem) => {
//   try {
//     const highestId = await getHighestId();
//     const newId = highestId + 1;

//     const menuItemWithId = { ...menuItem, id: newId };
//     const docRef = await setDoc(
//       doc(db, "menuItems", newId.toString()),
//       menuItemWithId
//     );
//     console.log("Document written with ID: ", newId);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };
const getMenuItemList = async () => {
  try {
    const menuCollection = collection(db, "menuItems");
    const menuSnapshot = await getDocs(menuCollection);
    const menuList = menuSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return menuList;
  } catch (error) {
    console.error("Error fetching menu items: ", error);
    return [];
  }
};
// Fetch unique categories
const getUniqueCategories = async () => {
    const menuCollection = collection(db, "menuItems");
    const menuSnapshot = await getDocs(menuCollection);
    const categories = menuSnapshot.docs.map((doc) => doc.data().category);
    const uniqueCategories = [...new Set(categories)].filter(category => category !== "");
    return uniqueCategories; // Return unique categories without empty strings
};

export {  getMenuItemList, getUniqueCategories, getHighestId };
