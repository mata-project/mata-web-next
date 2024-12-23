"use client";
import React, { useState } from "react";
import { ShoppingItem } from "../supermarkets-list/supermarketsListComponent";
import router from "next/router";
import { Item } from "../item/item";

export default function ShoppingItemAddingForm({
  addItem,
}: {
  addItem: (item: Item) => void;
}) {
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [supermarket, setSupermarket] = useState<string>("");

  const handleAddItem = () => {
    if (name) {
      const item: Item = {
        itemName: name,
      };
      addItem(item);
      setName("");
      setQuantity(1);
      setSupermarket("");
    } else {
      alert("Please fill all fields before adding an item.");
    }
  };

  return (
    <div
      style={{
        border: "0.1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <h2>Add Shopping Item</h2>
      <div style={{ marginBottom: "8px" }}>
        <label>
          Item Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginLeft: "8px", padding: "4px", width: "100%" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "8px" }}>
        <label>
          Quantity:
          <input
            type="number"
            // value={quantity}
            // onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            style={{ marginLeft: "8px", padding: "4px", width: "100%" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label>
          Supermarket:
          <select
            // value={supermarket}
            // onChange={(e) => setSupermarket(e.target.value)}
            style={{ marginLeft: "8px", padding: "4px", width: "100%" }}
          >
            <option value="">Select a supermarket</option>
            <option value="Lidl">Lidl</option>
            <option value="Aldi">Aldi</option>
            {/* <option value="AH">AH</option>
            <option value="Turko">Turko</option>
            <option value="Carrefour">Carrefour</option>
            <option value="Action">Action</option> */}
          </select>
        </label>
      </div>
      <button
        onClick={handleAddItem}
        style={{
          padding: "8px 16px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add Item
      </button>
    </div>
  );
}
