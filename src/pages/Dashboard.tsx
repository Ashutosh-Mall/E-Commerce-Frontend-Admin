import {useState} from "react";
import Left from "./Left";
import Right from "./RightDashboard";

export type DashboardPage = "products" | "users" | "orders";

const Dashboard = () => {
  const [activePage, setActivePage] = useState<DashboardPage>("products");

  return (
    <div className="flex">
      <Left activePage={activePage} setActivePage={setActivePage} />
      <Right activePage={activePage} />
    </div>
  );
};

export default Dashboard;
