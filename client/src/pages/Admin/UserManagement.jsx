import React, { useEffect, useState } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { fetchUsers, removeUser } from "../../store/thunks/userThunk";
import UserTable from "../../components/admin/UserTable";
import Alert from "../../utils/alert";
import { 
  Users, 
  Search, 
  SlidersHorizontal, 
  Loader2, 
  Inbox,
  UserX
} from "lucide-react";

const UserManagement = () => {
  const dispatch = useAppDispatch();

  const { users, loadingUsers } = useAppSelector((state) => state.users);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = (users || []).filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    const result = await Alert.confirm(
      "Are you sure?",
      "This user account will be permanently removed from the system."
    );
    if (result.isConfirmed) {
      dispatch(removeUser(id));
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 min-h-screen bg-slate-50/50 rounded-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/50">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Users size={22} />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800">User Management</h1>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">
              Manage platform directories, view registration profiles, and configure system access.
            </p>
          </div>
        </div>
        <div className="text-xs font-bold px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg self-start sm:self-center">
          Total Directory: {users?.length || 0}
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-100/50 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <SlidersHorizontal size={14} className="text-purple-500" />
          <h3 className="text-xs font-bold text-slate-700">Filter Platform Directories</h3>
        </div>

        <div className="relative w-full sm:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-semibold text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-400/20 focus:border-purple-600 transition-all h-[42px]"
          />
        </div>
      </div>

      {loadingUsers ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-2 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <Loader2 size={24} className="animate-spin text-purple-600" />
          <p className="text-xs font-bold text-slate-400">Loading user accounts...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl shadow-sm shadow-slate-100/50 flex flex-col items-center justify-center space-y-2">
          {search ? <UserX size={28} className="text-slate-300" /> : <Inbox size={28} className="text-slate-300" />}
          <h4 className="text-xs font-bold text-slate-700">
            {search ? "No Users Found" : "Directory Empty"}
          </h4>
          <p className="text-[11px] font-semibold text-slate-400 max-w-xs px-4">
            {search 
              ? "We couldn't find any profiles matching your current layout query filter definitions."
              : "No active accounts are registered within your current enterprise partition space."}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm shadow-slate-100/50 overflow-hidden p-2">
          <UserTable
            users={filteredUsers}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default UserManagement;