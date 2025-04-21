
import { Outlet, NavLink } from 'react-router-dom';
import { useState } from 'react';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const baseLinkClass = "block px-4 py-2 rounded-lg font-medium";
    const activeClass = "text-blue-600 bg-blue-50";
    const inactiveClass = "text-gray-600 hover:text-blue-600 hover:bg-blue-50";

    return (
        <div className="flex h-screen bg-gray-50">

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}


            <div className={`fixed z-30 inset-y-0 left-0 transform 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                transition-transform duration-200 ease-in-out bg-white w-64 shadow-md md:relative md:translate-x-0`}>
                <div className="p-4 border-b flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">Calendar Sync</h1>
                    <button
                        className="md:hidden text-gray-500 text-xl"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        ✕
                    </button>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <NavLink
                                to="/home"
                                className={({ isActive }) =>
                                    `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/accounts"
                                className={({ isActive }) =>
                                    `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
                                }
                            >
                                Account Management
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>


            <div className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                <div className="p-4 md:hidden">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-gray-600 focus:outline-none"
                    >
                        ☰ Menu
                    </button>
                </div>
                <div className="p-8">
                    <Outlet />
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;
