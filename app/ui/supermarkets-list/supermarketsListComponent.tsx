"use client";
import React, { useState } from "react";
import AddedItemsList from "../added-items/addedItemsList";

interface Item {
  itemName: string;
  //   quantity: number;
  //   supermarket: string;
}

const SupermarketsListComponent: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { itemName: "ekmek" },
    { itemName: "yoghurt" },
  ]);

  const supermarkets = ["Lidl", "Aldi", "AH", "Turko", "Carrefour", "Action"];

  const addItem = (itemName: string, supermarket: string) => {
    const newItem: Item = { itemName };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "0 auto",
        marginTop: "16px",
      }}
    >
      <h2>Supermarkets</h2>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {supermarkets.map((supermarket, index) => (
          <li
            key={index}
            style={{ padding: "8px 0", borderBottom: "1px solid #ddd" }}
          >
            {supermarket}
            {supermarket === "Aldi" ? <AddedItemsList items={items} /> : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupermarketsListComponent;
