import ShoppingItemAddingForm from "./ui/shopping-item/shopping-item-adding-form";
import SupermarketsList from "./ui/supermarkets-list/supermarketsListComponent";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <ShoppingItemAddingForm />
      <SupermarketsList />
    </main>
  );
}
