"use client";
import { useEffect, useState } from "react";
import ShoppingItemAddingForm from "../shopping-item/shopping-item-adding-form";
import SupermarketsList from "../supermarkets-list/supermarketsListComponent";
import { Item } from "../item/item";
import Banner from "../banner/banner";
import UserInfo from "../user-info/userInfo";
import { getSessionValue } from "../../lib/actions";
import { Market } from "../market/market";

export default function HomeComponent() {
  const [items, setItems] = useState<Item[]>([]);

  // Add useEffect to fetch markets on component mount
  useEffect(() => {
    getItems();
  }, []);

  // TODO encapsulate data fetch ops
  const getItems = async () => {
    try {
      const response = await fetch("http://18.203.185.97:3000/graphql", {
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
          id: item.id,
          name: item.name,
          market: {
            id: item.market.id,
            name: item.market.name,
          },
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
    console.log(newItem);
    try {
      const response = await fetch("http://18.203.185.97:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation {
                addShoppingItem(userId: "1", 
                marketId: "${newItem.market.id}", 
                name: "${newItem.name}") {
                name
              }
            }
          `,
        }),
      });
      const data = await response.json();
      console.log(data);

      getItems();
      console.log("item added");
    } catch (error) {
      console.log("Error fetching markets:", error);
      throw error;
    }
  };

  const deleteItem = async (market: Market, item: Item) => {
    //console.log(newItem);
    try {
      const response = await fetch("http://18.203.185.97:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation {
            deleteShoppingItem(userId: 1, shoppingItemId: ${item.id}, marketId: ${item.market.id}) {
              __typename
              }
            }
          `,
        }),
      });
      const data = await response.json();
      console.log(data);

      getItems();
      console.log("item added");
    } catch (error) {
      console.log("Error fetching markets:", error);
      throw error;
    }
    // setItems((prev) =>
    //   prev.filter(
    //     (prevItem) =>
    //       !(prevItem.name === item.name && prevItem.market.name === market.name)
    //   )
    // );
  };

  //FIXME remove it after test
  async function testButtonClicked(event: any) {
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
