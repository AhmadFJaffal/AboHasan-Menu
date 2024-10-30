import React, { useState } from "react";
import {
  FaCoffee,
  FaLeaf,
  FaUtensils,
  FaFire,
  FaDrumstickBite,
  FaHamburger,
  FaFish,
  FaIceCream,
} from "react-icons/fa";
import "./css/navbar.css";
import { GiHotMeal } from "react-icons/gi";
import { GiBarbecue } from "react-icons/gi";
import { GiMeat } from "react-icons/gi";
import { GiBottleCap } from "react-icons/gi";
import { GiSandwich } from "react-icons/gi";

const categoryOrder = [
  "ترويقة",
  "سلطات",
  "مقبلات",
  "وجبات ساخنة",
  "مشاوي",
  "سندويش",
  "لحمة نية",
  "مرطبات",
];

// Icon mapping for each category
const categoryIcons = {
  ترويقة: <FaCoffee />,
  سلطات: <FaLeaf />,
  مقبلات: <FaUtensils />,
  "وجبات ساخنة": <GiHotMeal />,
  مشاوي: <GiBarbecue />,
  سندويش: <GiSandwich />,
  "لحمة نية": <GiMeat />,
  مرطبات: <GiBottleCap />,
};

// Categories component
const Categories = ({ categories, filterItems, activeCategory }) => {
  const [currentCategory, setCurrentCategory] = useState(0);

  const normalizedCategories = categories.map((category) =>
    category.trim().normalize()
  );

  // Order categories according to predefined list
  const orderedCategories = normalizedCategories.sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const handleCategoryClick = (categoryIndex, category) => {
    filterItems(category);
    setCurrentCategory(categoryIndex);
  };

  return (
    <div className="afj-btn-container">
      {orderedCategories.map((category, index) => {
        return (
          <button
            type="button"
            className={`afj-filter-btn ${
              category === activeCategory ? "afj-active" : ""
            }`}
            key={index}
            onClick={() => handleCategoryClick(index, category)}
          >
            {categoryIcons[category]} {/* Display corresponding icon */}
            <span>{category}</span> {/* Display category name */}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
