import type { DashboardPage } from "./Dashboard";
import Product from "./Product";
import User from "./User";
import Order from "./Order";

type RightProps = {
  activePage: DashboardPage;
};

const Right = ({ activePage }: RightProps) => {
  return (
    <div className="flex-7 p-6 bg-purple-200">
      {activePage === "products" && <Product />}

      {activePage === "users" && <User />}

      {activePage === "orders" && <Order />}
    </div>
  );
};

export default Right;