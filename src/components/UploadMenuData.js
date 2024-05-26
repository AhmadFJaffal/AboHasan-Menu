import { db } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  writeBatch,
  query,
  orderBy,
  where 
} from "firebase/firestore";

export async function uploadMenuData(menu) {
  const menuCollection = collection(db, "menuItems");

  for (const item of menu) {
    const menuItemDoc = doc(menuCollection, item.id.toString());
    await setDoc(menuItemDoc, item);
  }
}

export const addCreatedAtField = async () => {
  const menuCollection = collection(db, "menuItems");
  const querySorted = query(menuCollection, orderBy("id")); // Query documents ordered by 'id'
  const snapshot = await getDocs(querySorted);

  if (snapshot.empty) {
    console.log("No documents found.");
    return;
  }

  let batch = writeBatch(db);
  let baseDate = new Date(2021, 0, 1); // Starting from January 1, 2021

  snapshot.docs.forEach((docSnapshot, index) => {
    const newDate = new Date(
      baseDate.getTime() + index * 2 * 24 * 60 * 60 * 1000
    ); // Increment by 2 days for each document
    batch.update(docSnapshot.ref, { createdAt: newDate });
  });

  await batch.commit();
  console.log(
    "All documents have been updated with a createdAt field in the order of their IDs."
  );
};

export const addKiloPriceToGrillItems = async () => {
  const menuCollection = collection(db, "menuItems");
  const grillQuery = query(menuCollection, where("category", "==", "مشاوي"));
  const snapshot = await getDocs(grillQuery);

  if (snapshot.empty) {
    console.log("No grill items found.");
    return;
  }

  const batch = writeBatch(db);

  snapshot.docs.forEach((docSnapshot) => {
    batch.update(docSnapshot.ref, { kiloPrice: "X" }); // Set kiloPrice as an empty string
  });

  await batch.commit();
  console.log("kiloPrice field added to all grill items.");
};
