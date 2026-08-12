import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import AdminNavbar from "../components/layout/AdminNavbar";
import Sidebar from "../components/layout/Sidebar";

function MainLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(
        window.innerWidth >= 992
    );

    const [isMobile, setIsMobile] = useState(
        window.innerWidth < 992
    );

    useEffect(() => {

        const handleResize = () => {

            const mobile = window.innerWidth < 992;

            setIsMobile(mobile);

            if (mobile) {

                setSidebarOpen(false);

            } else {

                setSidebarOpen(true);

            }

        };

        window.addEventListener("resize", handleResize);

        return () =>
            window.removeEventListener("resize", handleResize);

    }, []);

    const toggleSidebar = () => {

        setSidebarOpen(prev => !prev);

    };

    const closeSidebar = () => {

        if (isMobile) {

            setSidebarOpen(false);

        }

    };

    return (

        <div className="admin-layout">

            <AdminNavbar

                sidebarOpen={sidebarOpen}

                toggleSidebar={toggleSidebar}

            />

            <Sidebar

                sidebarOpen={sidebarOpen}

                closeSidebar={closeSidebar}

                isMobile={isMobile}

            />

            {isMobile && sidebarOpen && (

                <div

                    className="sidebar-overlay"

                    onClick={closeSidebar}

                />

            )}

            <main

                className={`admin-content ${
                    sidebarOpen && !isMobile
                        ? "sidebar-open"
                        : "sidebar-close"
                }`}

            >

                <Outlet />

            </main>

        </div>

    );

}

export default MainLayout;