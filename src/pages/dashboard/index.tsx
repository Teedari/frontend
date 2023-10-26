import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="grid grid-cols-12">
      <aside className="col-span-2 bg-primary h-[100svh] sticky top-0">
        <h3 className="text-2xl text-center text-white py-8">
          Bank<span className=" text-pink-300">ing</span>
        </h3>
        <nav>
          <ul className="nav">
            <li>
              <Link to={"customer/list"}>Customer</Link>
            </li>
            <li>
              <Link to={"transaction/create"}>Create Transaction</Link>
            </li>
            <li>
              <Link to={"transaction"}>List Transactions</Link>
            </li>
            <li>
              <Link to={"transaction/report"}>Report</Link>
            </li>
            <li>
              <Link to={"loan/list"}>List Loans</Link>
            </li>
            <li>
              <Link to={"loan"}>Loan</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="col-span-10 px-4">
        <header className="py-4"></header>
        <div className="max-w-screen-2xl mx-auto">
          <Outlet />
        </div>
        <br />
      </main>
    </section>
  );
};

export default Dashboard;
