import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Newspaper,
  Users,
  Truck,
  FileText,
  Bell,
  UserCircle,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Publications', href: '/publications', icon: Newspaper },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Delivery Team', href: '/delivery', icon: Truck },
  { name: 'Billing & Reports', href: '/billing', icon: FileText },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Profile', href: '/profile', icon: UserCircle },
];

const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <div
      className="flex h-screen w-64 flex-col border-r shadow-lg
      bg-gradient-to-b from-blue-100/70 via-blue-50/50 to-white/60
      backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex h-16 items-center border-b border-white/40 px-6 bg-blue-500/20 backdrop-blur-md shadow-sm">
        <Newspaper className="h-8 w-8 text-blue-700 drop-shadow-md" />
        <span className="ml-2 text-lg font-bold text-gray-800 drop-shadow-sm">
          Manager Portal
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-300/40'
                  : 'text-gray-700 hover:bg-blue-100/60 hover:text-blue-700'
              )}
            >
              <item.icon
                className={cn(
                  'h-5 w-5 transition-all duration-300',
                  isActive
                    ? 'text-white drop-shadow-[0_0_8px_rgba(59,130,246,0.7)]'
                    : 'text-blue-600 group-hover:text-blue-700 group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.5)]'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="border-t border-white/40 bg-white/60 backdrop-blur-lg p-4">
        <div className="mb-3 rounded-xl bg-white/80 p-3 shadow-sm border border-gray-200">
          <p className="text-xs font-medium text-gray-500">Branch</p>
          <p className="text-sm font-semibold text-gray-800">{user?.branchName}</p>
          <p className="mt-1 text-xs text-gray-500">ID: {user?.managerId}</p>
        </div>

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium 
          text-gray-700 transition-all hover:bg-red-100 hover:text-red-600 hover:shadow-sm"
        >
          <LogOut className="h-5 w-5 hover:drop-shadow-[0_0_6px_rgba(239,68,68,0.6)] transition-all" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
