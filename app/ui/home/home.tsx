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
  const [usersId, setUsersId] = useState<Number>(0);

  // Add useEffect to fetch markets on component mount
  useEffect(() => {
    getItems();
  }, []);

  // TODO encapsulate data fetch ops
  const getItems = async () => {
    let userId = await getSessionValue();

    // Add retry mechanism for undefined userId
    if (!userId) {
      // Wait for session to be available
      await new Promise((resolve) => setTimeout(resolve, 1000));
      userId = await getSessionValue();
    }
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query {
            shoppingItems(userId: "${userId}") {
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
      console.log("items are fetched");
    } catch (error) {
      console.log("Error fetching markets:", error);
      throw error;
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
                addShoppingItem(userId: ${userId}, 
                marketId: "${newItem.market.id}", 
                name: "${newItem.name}") {
                name
              }
            }
          `,
        }),
      });
      const data = await response.json();

      getItems();
      console.log("item added");
    } catch (error) {
      console.log("Error fetching markets:", error);
      throw error;
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
            deleteShoppingItem(userId: ${userId}, shoppingItemId: ${item.id}, marketId: ${item.market.id}) {
              __typename
              }
            }
          `,
        }),
      });
      const data = await response.json();

      getItems();
      console.log("item deleted");
    } catch (error) {
      console.log("Error fetching markets:", error);
      throw error;
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
