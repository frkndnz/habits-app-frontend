import React from "react";
import Header from "../components/dashboard/Header";
import HabitList from "../components/dashboard/HabitList";
import { JarSection } from "../components/dashboard/JarSection";
import { SummaryStats } from "../components/dashboard/StatsTab/SummaryStats";


import { HabitDetailStatsList } from "../components/dashboard/statsTab/HabitDetailStatsList";
import { CompletionPieChart } from "../components/dashboard/statsTab/CompletionPieChart";
import { Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,} from "@/components/ui/tabs"
import CategorySuccessChart from "../components/dashboard/statsTab/CategorySuccessChart";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 to-teal-600 p-4 md:p-4 rounded-lg ">
            <div className="max-w-7xl mx-auto ">
                <div className=" backdrop-blur-sm rounded-xl  ">

                    <Tabs defaultValue="habits" className="w-full  rounded-t-xl   ">
                        <TabsList className="w-1/2 mx-auto  flex justify-center gap-2 mb-4 mt-4  bg-gray-900">
                            
                            <TabsTrigger value="habits" 
                            className="w-fit px-4 py-2 text-sm font-medium rounded-md  text-white data-[state=active]:bg-teal-500 data-[state=active]:text-black transition">
                                Habits
                            </TabsTrigger>
                            <TabsTrigger value="stats" 
                            className="w-fit px-4 py-2 text-sm font-medium rounded-md  text-white data-[state=active]:bg-teal-500 data-[state=active]:text-black transition">
                                Stats
                            </TabsTrigger>

                           
                        </TabsList>
                        <TabsContent value="habits">
                            <Header />
                            <JarSection />
                            <HabitList />
                        </TabsContent>
                        <TabsContent value="stats">
                            <SummaryStats />
                            <div className="w-full px-10  mx-auto grid grid-cols-1 sm:grid-cols-2 items-stretch  gap-4 mt-6  ">
                            <CompletionPieChart/>
                            <CategorySuccessChart/>
                            </div>
                            <HabitDetailStatsList/>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>

    )
}

export default Dashboard;