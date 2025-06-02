"use client";

import StatCard from "@/components/stat-card";
import { Combobox } from "@/components/year-dropdown";
import { Calendar, Handshake, IndianRupee, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const month = useSearchParams().get("month");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (!month) return;
        const response = await fetch(
          `https://ngo-backend-amww.onrender.com/api/dashboard?month=${month}`
        );
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        toast.error("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [month]);

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto space-y-2">
      <h2 className="text-xl font-semibold">Admin Dashboard</h2>
      <div className="lg:flex items-center justify-between space-y-1.5">
        <p className="text-sm text-muted-foreground">
          Select a month to view data
        </p>
        <Combobox />
      </div>
      {data !== null ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
          <StatCard
            title={"Total NGOs"}
            value={data.totalNGOs}
            icon={<Users className="h-5 w-5" />}
            description={"Number of NGOs participating in the program"}
            // trend=""
            prefix=""
            suffix=""
            isLoading={isLoading}
          />
          <StatCard
            title={"People Helped"}
            value={data.totalPeopleHelped}
            icon={<Handshake className="h-5 w-5" />}
            description={"Total number of people helped by NGOs"}
            trend="positive"
            prefix=""
            suffix=""
            isLoading={isLoading}
          />
          <StatCard
            title={"Events Conducted"}
            value={data.totalEventsConducted}
            icon={<Calendar className="h-5 w-5" />}
            description={"Programs and activities held"}
            trend="positive"
            prefix=""
            suffix=""
            isLoading={isLoading}
          />
          <StatCard
            title={"Funds Utilized"}
            value={data.totalFundsUtilized}
            icon={<IndianRupee className="h-5 w-5" />}
            description={"Total funds spent (in local currency)"}
            // trend="positive"
            prefix=""
            suffix=""
            isLoading={isLoading}
          />
        </div>
      ) : (
        <div className="bg-white w-full h-[200px] flex items-center justify-center rounded-lg">
          <p>No data available</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
