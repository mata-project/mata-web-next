"use client";

import { Item } from "../item/item";
import { Market } from "../market/market";

type SupermarketTile = {
  name: string;
  items: Item[];
};

type SupermarketsListProps = {
  items: Item[];
  deleteItem: (market: Market, item: Item) => void;
};

export default function SupermarketsList({
  items,
  deleteItem,
}: SupermarketsListProps) {
  const supermarketTiles = getSuperMarketTiles(items);
  console.log(supermarketTiles);

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
          fontSize: "24px", // Increased font size
        }}
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
              {supermarket.items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "12px",
                    margin: "8px 0",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "6px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h2
                    className="shopping-item-name"
                    style={{ color: "blue", fontWeight: "bold", margin: 0 }}
                  >
                    {item.name}
                  </h2>
                  <button
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#0066cc",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteItem(item.market, item)}
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

function getSuperMarketTiles(items: Item[]): SupermarketTile[] {
  // Group items by supermarket
  const groupedItems = items.reduce((acc, item) => {
    const supermarketName = item.market.name;
    if (!acc[supermarketName]) {
      acc[supermarketName] = [];
    }
    acc[supermarketName].push(item);
    return acc;
  }, {} as Record<string, Item[]>);

  // Convert grouped items to SupermarketTile array
  return Object.entries(groupedItems).map(([supermarketName, items]) => ({
    name: supermarketName,
    items: items,
  }));
}
