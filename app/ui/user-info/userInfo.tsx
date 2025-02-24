export default function UserInfo({ name }: { name: string }) {
  return (
    <div className="bg-gray-100 p-4 md:p-5 text-gray-800 text-center mb-4 shadow rounded">
      <h1 className="text-lg md:text-xl font-semibold">Hello {name}</h1>
      <p className="text-sm md:text-md text-gray-600">Happy Shopping!</p>
    </div>
  );
}
