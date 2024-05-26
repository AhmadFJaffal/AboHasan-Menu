import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import { db } from "./firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import bgHero from "./img/bg-hero.jpg";
import "./App.css";
import StickyFooter from "./components/footer";

function MainPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ترويقة"); // Set default active category to "ترويقة"

  useEffect(() => {
    const fetchData = async () => {
      const menuCollection = collection(db, "menuItems");
      // Order items by the 'createdAt' field
      const q = query(menuCollection, orderBy("createdAt"));
  
      const menuSnapshot = await getDocs(q);
      const itemsArray = menuSnapshot.docs.map(doc => ({
        docId: doc.id,
        ...doc.data(),
      }));
  
      const uniqueCategories = [...new Set(itemsArray.map(item => item.category))];
      // Set the initial display of items filtered by the category "ترويقة"
      setMenuItems(itemsArray.filter(item => item.category === "ترويقة"));
      setAllItems(itemsArray);  // Store all items for potential other filtering
      setCategories(uniqueCategories);  // Set categories from fetched items
    };
  
    fetchData();
  }, []);
  

  const filterItems = (category) => {
    const filteredItems = allItems.filter(item => item.category === category);
    setMenuItems(filteredItems);
    setActiveCategory(category); // Update the active category
  };

  return (
    <>
      <main>
        <div className="header">
          <img className="full-img" src={bgHero} alt="logo" />
        </div>
        <section className="menu section">
          <div className="title">
            <h2>قائمة الطعام</h2>
            <div className="underline" />
          </div>
          <Categories categories={categories} filterItems={filterItems} activeCategory={activeCategory} />
          <Menu items={menuItems} />
        </section>
        <StickyFooter />
      </main>
    </>
  );
}

export default MainPage;
