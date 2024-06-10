import React from "react";
import { Sidebar } from "@/components/Sidebar";
function AdminDashboardLayout ({children}) {
    return(
        <>
            <div className="flex w-full h-screen max-h-screen relative bg-zinc-600 dark:bg-zinc-800 ">
                <Sidebar/>
                <div className="home_content transition-all ease-out duration-500 px-2 md:px-2 py-4">
                    <div className="shadow-xl text-white bg-gray-100 h-full rounded-lg dark:bg-green-panda overflow-y-auto">
                        {
                            children
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboardLayout;