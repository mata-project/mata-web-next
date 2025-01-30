"use client";
import { useEffect, useState } from "react";
import ShoppingItemAddingForm from "../shopping-item/shopping-item-adding-form";
import SupermarketsList from "../supermarkets-list/supermarketsListComponent";
import { Item } from "../item/item";
import Banner from "../banner/banner";
import UserInfo from "../user-info/userInfo";
import { getSessionValue } from "../../lib/actions";

export default function HomeComponent() {
  const [items, setItems] = useState<Item[]>([]);
  const [capital, setCapital] = useState<any[]>([]); // State to hold fetched countries

  // Add useEffect to fetch markets on component mount
  useEffect(() => {
    getItems();
  }, []);

  // TODO encapsulate data fetch ops
  const getItems = async () => {
    try {
      const response = await fetch("http://3.253.198.9:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query {
            shoppingItems(userId: 1) {
            id
            name
            market{
            id 
            name
            }
          }
        }
          `,
        }),
      });
      const data = await response.json();
      setItems(
        data.data.shoppingItems.map((item: any) => ({
          itemName: item.name,
          supermarketName: item.market.name,
          supermarketId: item.market.id,
          id: item.id,
        }))
      );
      console.log(data.data.shoppingItems);
      console.log("items are fetched");
    } catch (error) {
      console.log("Error fetching markets:", error);
      throw error;
    }
  };
  const addItem = async (newItem: Item) => {
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

  //FIXME remove it after test
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

  //FIXME remove it after test
  async function testButtonClicked(event: any) {
    fetchCapital();
    const session = await getSessionValue();
    console.log(session);
    console.log("test button clicked");
  }

  return (
    <div>
      <UserInfo />
      {/* FIXME remove it after test */}
      {/* <button
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
      <p>Capital: {capital}</p> */}
      <Banner />
      <ShoppingItemAddingForm addItem={addItem} />
      <SupermarketsList items={items} deleteItem={deleteItem} />
    </div>
  );
}
