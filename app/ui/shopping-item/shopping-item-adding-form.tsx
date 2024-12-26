"use client";
import React, { useState } from "react";
import { Item } from "../item/item";

export default function ShoppingItemAddingForm({
  addItem,
}: {
  addItem: (item: Item) => void;
}) {
  const [name, setName] = useState<string>("");
  //const [quantity, setQuantity] = useState<number | string>();
  const [supermarket, setSupermarket] = useState<string>("");

  const handleAddItem = () => {
    if (name) {
      const item: Item = {
        itemName: name,
        supermarket,
      };
      addItem(item);
      setName("");
      //setQuantity("");
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
      <h2
        style={{
          color: "darkblue",
          fontWeight: "bold",
          marginBottom: "10px",
          textAlign: "center",
          fontSize: "24px",
        }}
      >
        Add Shopping Item
      </h2>
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "8px" }}>
          Item Name:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          style={{
            width: "100%",
            padding: "12px 8px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            appearance: "none",
          }}
        />
      </div>
      <div style={{ marginBottom: "8px" }}>
        {/* <label>
          Quantity:
          <input
            type="number"
            // value={quantity}
            // onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            placeholder="Enter quantity"
            style={{ marginLeft: "8px", padding: "4px", width: "100%" }}
          />
        </label> */}
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "8px" }}>
          Supermarket:
        </label>
        <select
          value={supermarket}
          onChange={(e) => setSupermarket(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 8px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            appearance: "none",
          }}
        >
          <option value="" style={{ padding: "16px 8px", fontSize: "16px" }}>
            Select a supermarket
          </option>
          <option
            value="Lidl"
            style={{ padding: "16px 8px", fontSize: "16px" }}
          >
            Lidl
          </option>
          <option
            value="Aldi"
            style={{ padding: "16px 8px", fontSize: "16px" }}
          >
            Aldi
          </option>
          <option value="AH" style={{ padding: "16px 8px", fontSize: "16px" }}>
            AH
          </option>
          <option
            value="Delhaize"
            style={{ padding: "16px 8px", fontSize: "16px" }}
          >
            Delhaize
          </option>
          <option
            value="Turk Market"
            style={{ padding: "16px 8px", fontSize: "16px" }}
          >
            Turk Market
          </option>
          <option
            value="Action"
            style={{ padding: "16px 8px", fontSize: "16px" }}
          >
            Action
          </option>
        </select>
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
