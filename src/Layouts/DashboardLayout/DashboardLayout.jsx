import { useState } from "react";

import DeshXpressLogo from "../../Components/DeshXpressLogo/DeshXpressLogo";
import { FiMenu } from "react-icons/fi";
import { Link, Outlet, useLocation, NavLink } from "react-router";

const navLinks = [
  {name: 'Home' , to: "/dashboard"},
  { name: "My Parcels", to: "/dashboard/myParcels" },
  {name : "Track Pracle" , to : "/dashboard/trackParcel"},
  {name : "Payment History" , to : "/dashboard/paymentHistory"}
  // Add more dashboard links here as needed
];

const DashboardLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  // Close drawer on route change (for mobile)
  // useEffect(() => { setDrawerOpen(false); }, [location]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar/Drawer */}
      <div
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-white shadow-lg flex flex-col transition-transform duration-200
        ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:shadow-none`}
      >
        <div className="flex items-center justify-center h-20 border-b">
          <DeshXpressLogo />
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <ul className="menu menu-vertical gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg text-lg font-medium transition ${
                      isActive
                        ? "bg-primary font-bold text-black"
                        : "hover:bg-primary/50"
                    }`
                  }
                  onClick={() => setDrawerOpen(false)}
                  end
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <Link to="/" className="btn btn-outline w-full">
            Back to Home
          </Link>
        </div>
      </div>

      {/* Overlay for mobile drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Main content */}
      <div className=" flex flex-col min-h-screen w-full lg:ml-10">
        {/* Top bar for mobile/tablet */}
        <div className="lg:hidden flex items-center h-16 px-4 bg-white shadow">
          <button
            className="text-2xl mr-4 focus:outline-none"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
          <span className="font-bold text-xl">Dashboard</span>
        </div>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
