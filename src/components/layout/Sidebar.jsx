import { NavLink } from "react-router-dom";

function Sidebar({ sidebarOpen, closeSidebar, isMobile }) {

    const menuClass = ({ isActive }) =>
        `sidebar-link ${isActive ? "active" : ""}`;

    const sections = [

        {
            title: "MAIN",
            items: [
                {
                    name: "Dashboard",
                    icon: "bi-speedometer2",
                    path: "/dashboard"
                }
            ]
        },

        {
            title: "MANAGEMENT",
            items: [
                {
                    name: "Customers",
                    icon: "bi-people",
                    path: "/customers"
                },
                {
                    name: "Categories",
                    icon: "bi-grid",
                    path: "/admin/categories"
                },
                {
                    name: "Services",
                    icon: "bi-tools",
                    path: "/admin/services"
                },
                {
                    name: "Technicians",
                    icon: "bi-person-workspace",
                    path: "/admin/technicians"
                }
            ]
        },

        {
            title: "OPERATIONS",
            items: [
                {
                    name: "Service Requests",
                    icon: "bi-clipboard-check",
                    path: "/service-requests"
                },
                {
                    name: "Job Assignments",
                    icon: "bi-diagram-3",
                    path: "/admin/job-assignments"
                },
                {
                    name: "Job Progress",
                    icon: "bi-clock-history",
                    path: "/admin/job-progress"
                }
            ]
        },

        {
            title: "REPORTS",
            items: [
                {
                    name: "Final Reports",
                    icon: "bi-file-earmark-text",
                    path: "/admin/final-reports"
                }
            ]
        },

        {
            title: "SYSTEM",
            items: [
                {
                    name: "Notifications",
                    icon: "bi-bell",
                    path: "/admin/notifications"
                }
            ]
        }

    ];

    return (

        <aside
            className={`admin-sidebar ${
                sidebarOpen ? "open" : "closed"
            } ${isMobile ? "mobile" : ""}`}
        >

            <div className="sidebar-scroll">

                {sections.map(section => (

                    <div
                        key={section.title}
                        className="mb-4"
                    >

                        {sidebarOpen && (

                            <div className="sidebar-title">

                                {section.title}

                            </div>

                        )}

                        {section.items.map(item => (

                            <NavLink

                                key={item.path}

                                to={item.path}

                                className={menuClass}

                                onClick={closeSidebar}

                            >

                                <i className={`bi ${item.icon}`}></i>

                                {sidebarOpen && (

                                    <span>

                                        {item.name}

                                    </span>

                                )}

                            </NavLink>

                        ))}

                    </div>

                ))}

            </div>

        </aside>

    );

}

export default Sidebar;