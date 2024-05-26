// Categories.js
import React, { useState } from "react";

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

// Categories component
const Categories = ({ categories, filterItems,activeCategory  }) => {
  const [currentCategory, setCurrentCategory] = useState(0);

  // Order categories according to predefined list
  const orderedCategories = categories.sort((a, b) => {
    // Find indexes of both categories in the ordering array
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);

    // Handle cases where categories may not be in the order list
    if (indexA === -1 && indexB === -1) return 0; // both categories are not in the list, keep their relative order
    if (indexA === -1) return 1; // category a is not in the list, sort it to end
    if (indexB === -1) return -1; // category b is not in the list, sort it to end

    return indexA - indexB;
  });

  const handleCategoryClick = (categoryIndex, category) => {
    filterItems(category);
    setCurrentCategory(categoryIndex);
  };

  return (
    <div className="btn-container">
      {orderedCategories.map((category, index) => {
        return (
          <button
            type="button"
            className={`filter-btn ${category === activeCategory ? "active" : ""}`}
            key={index}
            onClick={() => handleCategoryClick(index, category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
