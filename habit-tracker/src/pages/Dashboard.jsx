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
import { Outlet ,useLocation} from "react-router-dom";

const Dashboard = () => {

    const location=useLocation();

    const isHabitDetailPage=location.pathname.includes('/dashboard/habits/');
    

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-teal-800 p-4 md:p-4 rounded-lg ">
            <div className="max-w-7xl mx-auto ">
                <div className=" backdrop-blur-sm rounded-xl  ">
                    {!isHabitDetailPage &&(

                   
                    <Tabs defaultValue="habits" className="w-full  rounded-t-xl   ">
                        <TabsList className="w-1/2 sm:w-1/3 h-8 sm:h-12 mx-auto   gap-2 mb-4 mt-4  bg-gray-900 shadow-white shadow-sm">
                            
                            <TabsTrigger value="habits" 
                            className="w-fit  text-sm sm:text-lg font-bold rounded-md font-montserrat text-white data-[state=active]:bg-gray-300 data-[state=active]:text-black transition">
                                Habits
                            </TabsTrigger>
                            <TabsTrigger value="stats" 
                            className="w-fit  text-sm sm:text-lg font-bold rounded-md font-montserrat  text-white data-[state=active]:bg-gray-300 data-[state=active]:text-black transition">
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
                     )}
                    <Outlet/>
                </div>
            </div>
        </div>

    )
}

export default Dashboard;