import type { DashboardPage } from "./Dashboard";

type LeftProps = {
  activePage: DashboardPage;
  setActivePage: React.Dispatch<
    React.SetStateAction<DashboardPage>
  >;
};

const Left = ({
  activePage,
  setActivePage,
}: LeftProps) => {
  return (
    <div className="w-64 bg-purple-900 h-screen text-white flex-2">
      <div className="p-4">
        <p className="font-bold text-xl">E-COMMERCE</p>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <button
          onClick={() => setActivePage("products")}
          className={`p-3 rounded ${
            activePage === "products"
              ? "bg-purple-700"
              : "hover:bg-purple-800"
          }`}
        >
          Products
        </button>

        <button
          onClick={() => setActivePage("users")}
          className={`p-3 rounded ${
            activePage === "users"
              ? "bg-purple-700"
              : "hover:bg-purple-800"
          }`}
        >
          Users
        </button>

        <button
          onClick={() => setActivePage("orders")}
          className={`p-3 rounded ${
            activePage === "orders"
              ? "bg-purple-700"
              : "hover:bg-purple-800"
          }`}
        >
          Orders
        </button>
      </div>
    </div>
  );
};

export default Left;