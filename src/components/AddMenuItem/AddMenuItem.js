import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  addMenuItem,
  getMenuItemList,
  getUniqueCategories,
  getHighestId,
} from "./AddItem_utils";
import "../../css/AddItem.css";
import { addCreatedAtField,addKiloPriceToGrillItems } from "../UploadMenuData";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

function AddMenuItemForm() {
  const [item, setItem] = useState({
    title: "",
    category: "",
    price: "",
    desc: "",
  });
  const [menuItems, setMenuItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      let items = await getMenuItemList();
      items = items.sort((a, b) => a.id - b.id);
      setMenuItems(
        items.map((item) => ({
          value: item.id,
          label: item.title,
          price: item.price.replace(/,/g, ""),
          category: item.category,
          desc: item.desc,
        }))
      );
    };

    const fetchCategories = async () => {
      const uniqueCategories = await getUniqueCategories();
      setCategories(uniqueCategories);
    };

    fetchMenuItems();
    fetchCategories();
  }, []);

  const handleChangeSelect = (selectedOption) => {
    setSelectedOption(selectedOption); // Sets the whole object as the selected option
    setItem({
      title: selectedOption.label,
      category: selectedOption.category,
      price: selectedOption.price,
      desc: selectedOption.desc,
    });
  };

  const handlePriceChange = async () => {
    if (!selectedOption) {
      alert("Please select a menu item first.");
      return;
    }

    try {
      const menuItemRef = doc(db, "menuItems", selectedOption.value.toString());

      // Ensure price is stored as a string with commas
      const formattedPrice = parseInt(
        item.price.replace(/,/g, ""),
        10
      ).toLocaleString("en-US");

      await updateDoc(menuItemRef, {
        price: formattedPrice,
      });
      alert("Price updated successfully!");
    } catch (error) {
      console.error("Error updating price: ", error);
      alert("Failed to update price.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const highestId = await getHighestId();
      const newId = highestId + 1;

      // Ensure price is stored as a string with commas
      const menuItemWithId = { ...item, id: newId, price: item.price };
      await setDoc(doc(db, "menuItems", newId.toString()), menuItemWithId);
      console.log("Document written with ID: ", newId);
      alert("Item added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setItem({ title: "", category: "", price: "", desc: "" });
  };

  return (
    <>
      <div className="search-container">
        <h3>Search and Select Menu Item</h3>
        <Select
          value={selectedOption}
          onChange={handleChangeSelect}
          options={menuItems}
          className="select-dropdown"
          placeholder="Search and select menu item"
        />
        <input
          className="price-input"
          type="text"
          value={item.price}
          onChange={(e) =>
            setItem({ ...item, price: e.target.value.replace(/,/g, "") })
          }
          name="price"
          placeholder="Update Price"
        />
        <p>Current Price: {item.price}</p>
        <button
          className="update-price-btn"
          type="button"
          onClick={handlePriceChange}
        >
          Update Price
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Add item to Menu</h3>
        <input
          className="textArea"
          type="text"
          name="title"
          value={item.title}
          onChange={(e) => setItem({ ...item, title: e.target.value })}
          placeholder="Title"
        />
        <select
          className="textArea"
          name="category"
          value={item.category}
          onChange={(e) => setItem({ ...item, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          className="textArea"
          type="text"
          name="price"
          value={item.price}
          onChange={(e) =>
            setItem({ ...item, price: e.target.value.replace(/,/g, "") })
          }
          placeholder="Price"
        />
        <button type="submit">Add Menu Item</button>
      </form>
      {/* <button type="button" onClick={addKiloPriceToGrillItems}>
        Add dates
      </button> */}
    </>
  );
}

export default AddMenuItemForm;
