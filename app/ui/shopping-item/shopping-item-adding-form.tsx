"use client";
import React, { useEffect, useState } from "react";
import { Item } from "../item/item";

export default function ShoppingItemAddingForm({
  addItem,
}: {
  addItem: (item: Item) => void;
}) {
  const [name, setName] = useState<string>("");
  //const [quantity, setQuantity] = useState<number | string>();
  const [supermarket, setSupermarket] = useState<string>("");
  const [markets, setMarkets] = useState<any[]>([]);

  // Add useEffect to fetch markets on component mount
  useEffect(() => {
    getMarkets();
  }, []);

  const getMarkets = async () => {
    try {
      const response = await fetch("http://3.253.198.9:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query{
            markets{
              id 
              name
            }
        }
          `,
        }),
      });
      const data = await response.json();
      setMarkets(data.data.markets);
      console.log("markets are fetched");
    } catch (error) {
      console.log("Error fetching markets:", error);
      throw error;
    }
  };

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
          {markets.map((market) => (
            <option
              key={market.id}
              value={market.name}
              style={{ padding: "16px 8px", fontSize: "16px" }}
            >
              {market.name}
            </option>
          ))}
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
