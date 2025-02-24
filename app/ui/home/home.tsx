"use client";
import { useEffect, useState } from "react";
import ShoppingItemAddingForm from "../shopping-item/shopping-item-adding-form";
import SupermarketsList from "../supermarkets-list/supermarketsListComponent";
import { Item } from "../item/item";
import Banner from "../banner/banner";
import UserInfo from "../user-info/userInfo";
import {
  addShoppingItem,
  deleteShoppingItem,
  fetchShoppingItems,
  getUserName,
} from "../../lib/data";

export default function HomeComponent() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState<string>("");

  // Add useEffect to fetch markets on component mount
  useEffect(() => {
    getItems();
    getName();
  }, []);

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
    try {
      await addShoppingItem(newItem);
      getItems();
      console.log("item added");
    } catch (error) {
      console.log("Error adding item:", error);
    }
  };

  const deleteItem = async (item: Item) => {
    try {
      await deleteShoppingItem(item);
      getItems();
      console.log("item deleted");
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  const getName = async () => {
    try {
      const name = await getUserName();
      setName(name);
      console.log("username is fetched");
    } catch (error) {
      console.log("Error fetching username:", error);
      setName("");
    }
  };

  return (
    <div>
      <UserInfo name={name} />
      <Banner />
      <ShoppingItemAddingForm addItem={addItem} />
      <SupermarketsList items={items} deleteItem={deleteItem} />
      <footer className="mt-8 p-4 bg-gray-100 text-center">
        <p className="text-gray-600">
          contact for feedback: caglarcercinli@outlook.com
        </p>
      </footer>
    </div>
  );
}
