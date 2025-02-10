"use client";
import { useEffect, useState } from "react";
import ShoppingItemAddingForm from "../shopping-item/shopping-item-adding-form";
import SupermarketsList from "../supermarkets-list/supermarketsListComponent";
import { Item } from "../item/item";
import Banner from "../banner/banner";
import UserInfo from "../user-info/userInfo";
import { getSessionValue } from "../../lib/actions";
import { fetchShoppingItems } from "../../lib/data";

export default function HomeComponent() {
  const [items, setItems] = useState<Item[]>([]);
  const [usersId, setUsersId] = useState<Number>(0);

  // Add useEffect to fetch markets on component mount
  useEffect(() => {
    getItems();
  }, []);

  // TODO encapsulate data fetch ops
  const getItems = async () => {
    try {
      const items = await fetchShoppingItems();
      setItems(items);
      console.log("items are fetched");
    } catch (error) {
      console.log("Error fetching items:", error);
      setItems([]);
    }
  };

  const addItem = async (newItem: Item) => {
    const userId = await getSessionValue();
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation {
                addShoppingItem(userId: 1, 
                marketId: "${newItem.market.id}", 
                name: "${newItem.name}") {
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

      const text = await response.text();
      console.log("Raw response:", text);
      const data = JSON.parse(text);

      getItems();
      console.log("item added");
    } catch (error) {
      console.log("Error adding item:", error);
    }
  };

  const deleteItem = async (item: Item) => {
    const userId = await getSessionValue();
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL || "", {
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

      // Add response validation
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      console.log("Raw response:", text);
      const data = JSON.parse(text);

      getItems();
      console.log("item deleted");
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  return (
    <div>
      <UserInfo />
      <Banner />
      <ShoppingItemAddingForm addItem={addItem} />
      <SupermarketsList items={items} deleteItem={deleteItem} />
    </div>
  );
}
