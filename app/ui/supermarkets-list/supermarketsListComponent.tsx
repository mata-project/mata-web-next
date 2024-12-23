"use client";

import { getItems } from "../../lib/shopping-items";

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
  things: string[];
};

export default function SupermarketsList({ things }: SupermarketsListProps) {
  const supermarketTiles = getSuperMarketTiles(things);
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
function getSuperMarketTiles(things: string[]): SupermarketTile[] {
  let order = 0;
  things.forEach((thing) => {
    console.log(thing + " " + order);
    order++;
  });

  const shoppingItems = getItems();
  shoppingItems.forEach((item) => console.log(item.name));
  const tiles: SupermarketTile[] = [];
  ["Lidl", "Aldi", "AH", "Turko", "Carrefour", "Action"].forEach((name) => {
    const tile: SupermarketTile = {
      name,
      shoppingItems: [{ name: "test-item", quantity: 1 }],
    };
    tiles.push(tile);
  });
  return tiles;
}
