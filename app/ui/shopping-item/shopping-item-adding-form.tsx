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
  const [supermarket, setSupermarket] = useState<any>({});
  const [markets, setMarkets] = useState<any[]>([]);

  // Add useEffect to fetch markets on component mount
  useEffect(() => {
    getMarkets();
  }, []);

  const getMarkets = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL || "", {
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

      // Add response validation
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Try to parse the response as text first for debugging
      const text = await response.text();
      console.log("Raw response:", text);

      // Then parse as JSON
      const data = JSON.parse(text);

      if (!data?.data?.markets) {
        throw new Error("Invalid response structure");
      }

      setMarkets(data.data.markets);
      console.log("markets are fetched");
    } catch (error) {
      console.log("Error fetching markets:", error);
      // You might want to set some error state here
      setMarkets([]); // Set empty array as fallback
    }
  };

  const handleAddItem = () => {
    if (name) {
      const item: Item = {
        name: name,
        market: {
          id: supermarket.id,
          name: supermarket.name,
        },
      };
      addItem(item);
      setName("");
      //setQuantity("");
      setSupermarket({});
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
          value={supermarket.name || ""}
          onChange={(e) =>
            setSupermarket({
              name: e.target.value,
              id: markets.find((m) => m.name === e.target.value)?.id || "",
            })
          }
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
