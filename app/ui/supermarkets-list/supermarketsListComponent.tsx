"use client";

import { Item } from "../item/item";

type SupermarketTile = {
  name: string;
  shoppingItems: ShoppingItem[];
};

export type ShoppingItem = {
  name: string;
  quantity: number;
  supermarket?: string;
};
type SupermarketsListProps = {
  items: Item[];
};

export default function SupermarketsList({ items }: SupermarketsListProps) {
  const supermarketTiles = getSuperMarketTiles(items);
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
        style={{ color: "darkblue", fontWeight: "bold", marginBottom: "10px" }}
      >
        Supermarkets
      </h2>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {supermarketTiles.map((supermarket, index) => (
          <li
            key={index}
            style={{ padding: "8px 0", borderBottom: "1px solid #ddd" }}
          >
            <h2
              className="supermarket-name"
              style={{ color: "navy", fontWeight: "bold" }}
            >
              {supermarket.name}
            </h2>
            {/* shoppingItems */}
            <div>
              {supermarket.shoppingItems.map((item, index) => (
                <div key={index}>
                  <h2
                    className="shopping-item-name"
                    style={{ color: "blue", fontWeight: "bold" }}
                  >
                    {item.name}
                  </h2>
                  <p
                    className="shopping-item-price"
                    style={{ color: "green", fontWeight: "bold" }}
                  >
                    {item.quantity}
                  </p>
                  <button
                    className="delete-button"
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontSize: "smaller",
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

//FIXME include database
function getSuperMarketTiles(items: Item[]): SupermarketTile[] {
  const supermarketMap = new Map<string, ShoppingItem[]>();

  ["Lidl"].forEach((supermarketName) => {
    const shoppingItems: ShoppingItem[] = items.map((item) => ({
      name: item.itemName,
      quantity: 1,
    }));

    // Add or merge items for this supermarket
    if (supermarketMap.has(supermarketName)) {
      supermarketMap.get(supermarketName)?.push(...shoppingItems);
    } else {
      supermarketMap.set(supermarketName, shoppingItems);
    }
  });

  // Convert map to array of SupermarketTile
  return Array.from(supermarketMap.entries()).map(([name, shoppingItems]) => ({
    name,
    shoppingItems,
  }));
}
