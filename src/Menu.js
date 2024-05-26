import React from "react";

// Menu.js
const Menu = ({ items }) => {
  // Helper function to format prices
  const formatPrice = (item) => {
    let priceDisplay = []; // To hold formatted price strings

    // Determine if the 'Per Meal' suffix should be used
    const perMealSuffix = item.kiloPrice && item.kiloPrice !== "NaN" ? " (Per Meal)" : "";

    // Check and format the meal price (regular price)
    if (!item.price || item.price === "NaN") {
      priceDisplay.push(<h4 className="price" key="meal-price">X LBP</h4>); // Default display for invalid or missing prices
    } else {
      priceDisplay.push(<h4 className="price" key="meal-price">{item.price} LBP{perMealSuffix}</h4>);
    }

    // Check and format the kilo price if it exists and is not "NaN"
    if (item.kiloPrice && item.kiloPrice !== "NaN") {
      priceDisplay.push(<h4 className="price" key="kilo-price">{item.kiloPrice} LBP (Per Kilo)</h4>);
    }

    return priceDisplay; // Return the array of JSX elements
  };

  return (
    <div className="section-center">
      {items.map((menuItem) => (
        <article key={menuItem.id} className="menu-item">
          <div className="item-info">
            <header>
              <h4>{menuItem.title}</h4>
              {/* Display formatted prices */}
              {formatPrice(menuItem)}
            </header>
            <p className="item-text">{menuItem.desc}</p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Menu;
