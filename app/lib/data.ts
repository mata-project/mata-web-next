import { User } from "next-auth";
import { Item } from "../ui/item/item";
import { getSessionValue } from "./actions";

export async function fetchMarkets() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            markets {
              id
              name
            }
          }
        `,
      }),
    });

    const { data } = await response.json();
    return data.markets;
  } catch (error) {
    console.error("Error fetching markets:", error);
    throw error;
  }
}

export async function fetchShoppingItems() {
  const userId = await getSessionValue();
  console.log(`userid ${userId}`);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            shoppingItems(userId: ${userId}) {
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

    const { data } = await response.json();
    return data.shoppingItems;
  } catch (error) {
    console.error("Error fetching shopping items:", error);
    throw error;
  }
}

export async function addShoppingItem(item: Item) {
  const userId = await getSessionValue();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation {
            addShoppingItem(userId: ${userId}, name: "${item.name}", marketId: ${item.market.id}) {
              id
              name
              market {
                id
                name
              }
            }
          }
        `,
      }),
    });

    const { data } = await response.json();
    return data.addShoppingItem;
  } catch (error) {
    console.error("Error adding shopping item:", error);
    throw error;
  }
}

export async function deleteShoppingItem(item: Item) {
  const userId = await getSessionValue();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
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

    const { data } = await response.json();
    return data.deleteShoppingItem;
  } catch (error) {
    console.error("Error deleting shopping item:", error);
    throw error;
  }
}

export async function getUser(
  email: string,
  password: string
): Promise<User | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
          user(email: "${email}", password: "${password}") {
            isUser
            id
            name
            email
          }
        }
        `,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.data.user && data.data.user.isUser) {
      return {
        id: data.data.user.id,
        name: data.data.user.name,
        email: data.data.user.email,
      };
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return undefined;
  }
}
