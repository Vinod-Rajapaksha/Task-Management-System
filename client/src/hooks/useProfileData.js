import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { getTasks } from "../services/task.service";
import { getDashboardData } from "../services/dashboard.service"; 
import Alert from "../utils/alert";
import { 
  getProfile, 
  updateProfile, 
  changePassword 
} from "../services/profile.service"; 

export const useProfileData = () => {
  const { user: authUser } = useAuth();

  const [personalInfo, setPersonalInfo] = useState({ firstName: "", lastName: "", email: "" });
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [accountInfo, setAccountInfo] = useState({ id: "", role: "", createdAt: "", lastLogin: "" });
  const [userMetrics, setUserMetrics] = useState({ totalTasks: 0, highPriority: 0, pendingTasks: 0 });

  const [savedProfileBackup, setSavedProfileBackup] = useState(null);

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [updatingInfo, setUpdatingInfo] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProfileAndMetrics = async () => {
      try {
        setLoadingProfile(true);
        const [profileRes, tasksRes, dashboardRes] = await Promise.all([
          getProfile(),
          getTasks(),
          getDashboardData()
        ]);
        
        if (!isMounted) return;

        const data = profileRes?.data || profileRes?.user || profileRes;
        if (data) {
          setSavedProfileBackup(data);
          const nameParts = (data.name || "").split(" ");
          setPersonalInfo({
            firstName: data.firstName || nameParts[0] || "",
            lastName: data.lastName || nameParts.slice(1).join(" ") || "",
            email: data.email || "",
          });

          setAccountInfo({
            id: data._id || "",
            role: data.role || authUser?.role || "User",
            createdAt: data.createdAt || "",
            lastLogin: data.lastLogin || "",
          });
        } else if (authUser) {
          const nameParts = (authUser.name || "").split(" ");
          setPersonalInfo({
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" ") || "",
            email: authUser.email || "",
          });
        }

        const dashData = dashboardRes?.dashboard || dashboardRes;
        const tasksData = tasksRes?.data || tasksRes?.tasks || tasksRes;

        if (Array.isArray(tasksData)) {
          const totalCount = tasksData.length;
          const highCount = tasksData.filter(t => String(t.priority || "").trim().toLowerCase() === "high").length;
          const pendingCount = tasksData.filter(t => String(t.status || "").trim().toLowerCase() === "pending").length;

          setUserMetrics({ totalTasks: totalCount, highPriority: highCount, pendingTasks: pendingCount });
        } else if (dashData && dashData.totalTasks !== undefined) {
          setUserMetrics({
            totalTasks: Number(dashData.totalTasks || 0),
            highPriority: Number(dashData.highPriorityTasks || 0),
            pendingTasks: Number(dashData.pendingTasksCount || 0),
          });
        }
      } catch (error) {
        Alert.error("Profile Load Failed", error.response?.data?.message || "Failed to load profile.");
      } finally {
        if (isMounted) setLoadingProfile(false);
      }
    };

    fetchProfileAndMetrics();
    return () => { isMounted = false; };
  }, [authUser]);

  const handleInfoChange = (e) => {
    setPersonalInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleDiscardInfo = () => {
    if (savedProfileBackup) {
      const nameParts = (savedProfileBackup.name || "").split(" ");
      setPersonalInfo({
        firstName: savedProfileBackup.firstName || nameParts[0] || "",
        lastName: savedProfileBackup.lastName || nameParts.slice(1).join(" ") || "",
        email: savedProfileBackup.email || "",
      });
    } else if (authUser) {
      const nameParts = (authUser.name || "").split(" ");
      setPersonalInfo({
        firstName: authUser.firstName || nameParts[0] || "",
        lastName: authUser.lastName || nameParts.slice(1).join(" ") || "",
        email: authUser.email || "",
      });
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setUpdatingInfo(true);
    try {
      const payload = {
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        name: `${personalInfo.firstName} ${personalInfo.lastName}`.trim(),
        email: personalInfo.email,
      };
      const res = await updateProfile(payload);

      const updatedData = res?.data || res?.user || res || payload;
      setSavedProfileBackup(updatedData);

      await Alert.success("Profile Updated", "Your profile has been updated successfully.");
    } catch (error) {
      await Alert.error("Update Failed", error.response?.data?.message || "Something went wrong.");
    } finally {
      setUpdatingInfo(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      return Alert.error("Password Mismatch", "New passwords do not match.");
    }

    setUpdatingPassword(true);
    try {
      await changePassword({
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setPasswordData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
      await Alert.success("Password Updated", "Your password has been updated successfully.");
    } catch (error) {
      await Alert.error("Update Failed", error.response?.data?.message || "Verify your current password.");
    } finally {
      setUpdatingPassword(false);
    }
  };

  return {
    authUser,
    personalInfo,
    passwordData,
    showPasswords,
    accountInfo,
    userMetrics,
    loadingProfile,
    updatingInfo,
    updatingPassword,
    handleInfoChange,
    handlePasswordChange,
    togglePasswordVisibility,
    handleDiscardInfo,
    handleSaveProfile,
    handleUpdatePassword
  };
};