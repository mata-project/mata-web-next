// AddedItemsList.tsx
import React from "react";

export interface Item {
  itemName: string;
  //   quantity: number;
  //   supermarket: string;
}

interface AddedItemsListProps {
  items: Item[];
}

const AddedItemsList: React.FC<AddedItemsListProps> = ({ items }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "16px auto",
      }}
    >
      {items.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {items.map((item, index) => (
            <li
              key={index}
              style={{ padding: "8px 0", borderBottom: "1px solid #ddd" }}
            >
              <strong>{item.itemName}</strong> {} {}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items have been added yet.</p>
      )}
    </div>
  );
};

export default AddedItemsList;
