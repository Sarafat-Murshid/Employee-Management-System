import { useState } from "react";
import {
  Menu,
  X,
  Users,
  Grid,
  UserCircle,
  LogOut,
  Settings,
  Search,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useEmployees } from "../hooks/useEmployees";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { searchTerm, setSearchTerm } = useEmployees();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-4 flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  EMS Pro
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="relative flex items-center w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search employees by name or email..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative ml-4">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center p-2 rounded-full hover:bg-gray-100"
                >
                  <UserCircle className="h-8 w-8 text-gray-600" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0 z-50`}
      >
        <div className="w-64 bg-white h-full lg:h-screen shadow-lg lg:fixed lg:inset-y-0">
          <div className="flex items-center justify-between p-4 border-b lg:border-none">
            <h2 className="text-xl font-semibold text-gray-800">Navigation</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="p-4">
            <Link
              to="/card-view"
              className="flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 mb-2"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Users className="h-5 w-5 mr-3" />
              Employee Cards
            </Link>
            <Link
              to="/table-view"
              className="flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Grid className="h-5 w-5 mr-3" />
              Employee Table
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-8">
        <Outlet context={{ searchTerm, setSearchTerm }} />
      </div>
    </div>
  );
}
