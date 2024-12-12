import ShoppingItemComponent from "./ui/shopping-item/shoppingItemComponent";
import SupermarketsListComponent from "./ui/supermarkets-list/supermarketsListComponent";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <ShoppingItemComponent />
      <SupermarketsListComponent />
    </main>
  );
}
