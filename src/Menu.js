import React from "react";

// Menu.js
const Menu = ({ items }) => {
  return (
    <div className="section-center">
      {items.map((menuItem) => (
        <article key={menuItem.id} className="menu-item">
          <div className="item-info">
            {menuItem.title !== "" && (
              <header>
                <h4>{menuItem.title}</h4>
                <h4 className="price">{menuItem.price} LBP</h4>
              </header>
            )}
            <p className="item-text">{menuItem.desc}</p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Menu;
