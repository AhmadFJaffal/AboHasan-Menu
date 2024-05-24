import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import bgHero from "./img/bg-hero.jpg";
import "./App.css";
import StickyFooter from "./components/footer";

function MainPage() {
  const [menuItems, setMenuItems] = useState([]);  // Will be used to display items
  const [allItems, setAllItems] = useState([]);    // Will store all items
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const menuCollection = collection(db, "menuItems");
      const menuSnapshot = await getDocs(menuCollection);
      const itemsArray = menuSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuItems(itemsArray);
      setAllItems(itemsArray);  // Set allItems to the full fetched list
      setCategories(["all", ...new Set(itemsArray.map(item => item.category))]);
    };

    fetchData();
  }, []);

  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(allItems);  // Reset to all items when 'all' is clicked
    } else {
      const filteredItems = allItems.filter(item => item.category === category);  // Always filter from allItems
      setMenuItems(filteredItems);
    }
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
          <Categories categories={categories} filterItems={filterItems} />
          <Menu items={menuItems} />
        </section>
        <StickyFooter/>
      </main>
    </>
  );
}

export default MainPage;
