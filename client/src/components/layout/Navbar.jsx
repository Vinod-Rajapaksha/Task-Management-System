import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Alert from "../../utils/alert";
import { 
  LayoutDashboard, 
  CheckSquare, 
  User, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Plus, 
  Search,
  Terminal
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Task Management", path: "/tasks", icon: CheckSquare },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Notifications", path: "/notifications", icon: Bell },
  ];

  const handleLogout = async () => {
    const result = await Alert.confirm(
      "Logout",
      "Are you sure you want to logout?"
    );

    if (result.isConfirmed) {
      logout();

      await Alert.toastSuccess("Logged out successfully");

      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-100">
        
        <div className="p-5 flex items-center gap-3">
          <div className="h-9 w-9 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-purple-100">
            <Terminal size={18} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-base leading-tight tracking-tight">TaskTerminal</h1>
            <p className="text-xs text-slate-400 font-medium">Professional Workspace</p>
          </div>
        </div>

        <div className="p-4">
          <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-purple-100 transition-all duration-200 flex items-center justify-center gap-2 text-sm active:scale-[0.98]">
            <Plus size={16} strokeWidth={2.5} /> New Task
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-150 ${
                  isActive
                    ? "bg-purple-50 text-purple-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-purple-600" : "text-slate-400"} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-purple-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-xs font-bold text-purple-700">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : "AR"}
            </div>
            <div className="truncate max-w-[110px]">
              <p className="text-xs font-bold text-slate-800 truncate">{user?.name || "Alex Rivera"}</p>
              <p className="text-[10px] text-purple-600 font-semibold truncate capitalize">{user?.role || "Premium Plan"}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
            title="Log Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4 flex-1">
            <button 
              className="md:hidden text-slate-600 p-1 hover:bg-slate-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={22} />
            </button>
            
            <div className="relative w-full max-w-xs hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search tasks or analytics..." 
                className="w-full bg-slate-50 border border-slate-200/60 pl-9 pr-4 py-1.5 rounded-xl text-xs font-medium focus:outline-none focus:border-purple-500 focus:bg-white transition-all text-slate-700"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 relative hover:bg-slate-50 rounded-xl transition-colors">
              <Bell size={18} />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-purple-600 rounded-full"></span>
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
              <Settings size={18} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50/50">
          <Outlet />
        </main>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-64 max-w-xs bg-white h-full flex flex-col p-5 shadow-xl animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-lg flex items-center justify-center text-white">
                  <Terminal size={14} />
                </div>
                <span className="font-bold text-slate-900 text-sm tracking-tight">TaskTerminal</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 p-1 hover:bg-slate-50 rounded-lg">
                <X size={18} />
              </button>
            </div>
            
            <nav className="flex-1 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm ${
                      isActive ? "bg-purple-50 text-purple-700" : "text-slate-500"
                    }`}
                  >
                    <Icon size={18} className={isActive ? "text-purple-600" : "text-slate-400"} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <button 
              onClick={handleLogout}
              className="mt-auto w-full border border-slate-200 text-slate-600 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold hover:bg-rose-50 hover:text-rose-600 transition-colors"
            >
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;