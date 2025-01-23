"use client";
import { useState } from "react";
import ShoppingItemAddingForm from "../shopping-item/shopping-item-adding-form";
import SupermarketsList from "../supermarkets-list/supermarketsListComponent";
import { Item } from "../item/item";
import Banner from "../banner/banner";
import UserInfo from "../user-info/userInfo";
import { getSessionValue } from "../../lib/actions";
import { logOut } from "../../lib/actions";

export default function HomeComponent() {
  const [items, setItems] = useState<Item[]>([]);
  const [capital, setCapital] = useState<any[]>([]); // State to hold fetched countries

  const addItem = (newItem: Item) => {
    setItems((prev) => [...prev, newItem]);
  };

  const deleteItem = (supermarketName: string, itemName: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(item.itemName === itemName && item.supermarket === supermarketName)
      )
    );
  };

  // New function to fetch countries data
  const fetchCapital = async () => {
    const response = await fetch("https://countries.trevorblades.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          {
            country(code: "BE") {
              capital
            }
          }
        `,
      }),
    });
    const data = await response.json();
    setCapital(data?.data?.country?.capital); // Update state with fetched countries
    console.log(data);
  };

  async function testButtonClicked(event: any) {
    fetchCapital();
    const session = await getSessionValue();
    console.log(session);
    console.log("test button clicked");
  }

  return (
    <div>
      <UserInfo />
      <button
        onClick={testButtonClicked}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          display: "block",
          margin: "auto",
        }}
      >
        Test Button
      </button>
      <p>Capital: {capital}</p>
      <Banner />
      <ShoppingItemAddingForm addItem={addItem} />
      <SupermarketsList items={items} deleteItem={deleteItem} />
    </div>
  );
}
