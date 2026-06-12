import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [activeSlide, setActiveSlide] = useState(0);
  const projectModules = [
    {
      title: "Smart Priority Engine",
      description: "Automatically analyzes remaining project durations and flags backlogs into urgent queues based on target milestone dates.",
      badge: "Core Feature",
      icon: (
        <span className="text-emerald-600 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">● 92% Done</span>
      )
    },
    {
      title: "Real-Time Pipeline Sync",
      description: "Leverages a modular backend architecture to instantly stream workflow updates across active client terminals without refreshing.",
      badge: "MERN Stack Architecture",
      icon: (
        <span className="text-purple-600 font-bold text-[10px] bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">⚡ 12ms Sync</span>
      )
    },
    {
      title: "Role-Based Token Gateway",
      description: "Restricts operational scopes and protects system routes using stateful session tokens and encrypted credential handlers.",
      badge: "Security Protocol",
      icon: (
        <span className="text-amber-600 font-bold text-[10px] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">🛡️ Verified</span>
      )
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % projectModules.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await loginUser(formData);
      login(data);

      if (data.user.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-purple-400 via-purple-300 to-indigo-500 items-center justify-center p-4 font-sans overflow-hidden relative">
    
      <div className="absolute top-8 right-10 opacity-20 pointer-events-none hidden sm:grid grid-cols-4 gap-2">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-white rounded-sm"></div>
        ))}
      </div>

      <div className="absolute bottom-6 left-10 w-24 h-24 border border-white/20 rounded-lg transform -rotate-12 pointer-events-none hidden sm:block">
        <div className="absolute top-2 left-2 w-full h-full border border-white/10 rounded-lg"></div>
      </div>

      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-card-float { animation: floatCard 4s ease-in-out infinite; }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="animate-fade-in-up flex w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl min-h-[530px] max-h-[630px] relative z-10">
        <div className="absolute -bottom-10 -left-10 w-24 h-24 border-[12px] border-purple-600 rounded-full opacity-10 pointer-events-none hidden md:block"/>
        <div className="hidden md:flex md:w-1/2 bg-slate-50 p-6 flex-col justify-between items-center border-r border-gray-100 relative">
          
          {/* Top Logo and Badge Header */}
          <div className="w-full flex items-center justify-between px-1 select-none flex-shrink-0">
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 rounded-md bg-purple-600 flex items-center justify-center text-white text-[10px] font-black shadow-sm">S</div>
              <span className="font-bold text-gray-800 text-xs tracking-wider uppercase">SmartTask</span>
            </div>
            <span className="text-[9px] font-bold px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full shadow-sm transition-all duration-300">
              {projectModules[activeSlide].badge}
            </span>
          </div>

          <div className="w-full max-w-[290px] my-auto space-y-3 pt-3 select-none">
           
            <div className="bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 text-white p-4 rounded-xl shadow-md relative overflow-hidden animate-card-float">
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full pointer-events-none"></div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[9px] text-purple-200 uppercase tracking-wider font-semibold">Active Sprint Velocity</p>
                  <h3 className="text-xl font-bold tracking-tight mt-0.5">84% Completed</h3>
                </div>
                <span className="text-[8px] bg-white/20 px-1.5 py-0.5 rounded text-purple-100 uppercase font-bold tracking-wider">Sprint v2.4</span>
              </div>
              
              <div className="mt-4 pt-1">
                <div className="w-full bg-purple-950/40 rounded-full h-1.5 mb-1.5">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-1.5 rounded-full" style={{ width: "84%" }}></div>
                </div>
                <div className="flex justify-between text-[9px] text-purple-200">
                  <span>38 Tasks Resolved</span>
                  <span>6 Pending</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-xs border border-gray-100 flex items-center justify-between transition-all duration-300">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-xs text-purple-600 font-bold">
                  📋
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-800">Sprint Task Backlog</h4>
                  <p className="text-[9px] text-gray-400">Live thread status tracker</p>
                </div>
              </div>
              <div className="text-right transition-all duration-300">
                {projectModules[activeSlide].icon}
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-xs border border-gray-100 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Active Workspace Members</span>
                <span className="text-[9px] text-purple-600 font-semibold">Manage</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold shadow-inner">+8</div>
                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 text-[10px] flex items-center justify-center font-bold border border-white">PM</div>
                <div className="w-7 h-7 rounded-full bg-slate-100 text-gray-600 text-[10px] flex items-center justify-center font-bold border border-white">DEV</div>
                <div className="w-7 h-7 rounded-full bg-slate-100 text-gray-600 text-[10px] flex items-center justify-center font-bold border border-white">QA</div>
              </div>
            </div>

          </div>

          <div className="text-center w-full px-2 select-none mt-2">
            <div className="min-h-[54px] flex flex-col justify-center">
              <h3 className="text-xs font-bold text-gray-800 mb-0.5 transition-all">
                {projectModules[activeSlide].title}
              </h3>
              <p className="text-[10px] text-gray-500 leading-normal max-w-[260px] mx-auto transition-all">
                {projectModules[activeSlide].description}
              </p>
            </div>

            <div className="flex items-center justify-center space-x-1.5 mt-2">
              {projectModules.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeSlide === index ? "w-4 bg-purple-600" : "w-1 bg-gray-300 hover:bg-purple-300"
                  }`}
                  aria-label={`Go to engine feature slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="w-full border-t border-gray-100 pt-3 mt-3 space-y-1.5 select-none flex-shrink-0">
            <div className="grid grid-cols-2 gap-1.5 max-w-[290px] mx-auto">
              <div className="flex items-center space-x-1.5 bg-white p-1.5 rounded-lg border border-gray-100">
                <span className="text-xs">🔄</span>
                <span className="text-[9px] font-medium text-gray-600 truncate">Real-Time Aggregation</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white p-1.5 rounded-lg border border-gray-100">
                <span className="text-xs">🔍</span>
                <span className="text-[9px] font-medium text-gray-600 truncate">Advanced Status Filters</span>
              </div>
            </div>
          </div>

        </div>

        <div className="w-full md:w-1/2 bg-purple-600 text-white p-6 md:p-10 flex flex-col justify-center relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full pointer-events-none"></div>

          <div className="w-full max-w-xs mx-auto">
            <h1 className="text-2xl font-bold tracking-tight mb-1 text-white">
              Welcome Back
            </h1>
            <p className="text-purple-200 mb-5 text-[10.5px] tracking-wide">
              Please enter your authorized credentials to access your task metrics dashboard.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-purple-300 group-focus-within:text-purple-600 z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Your registered email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white text-gray-800 placeholder-gray-400 rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-4 focus:ring-amber-400/40 text-xs shadow-inner"
                />
              </div>

              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-purple-300 group-focus-within:text-purple-600 z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="Your account password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white text-gray-800 placeholder-gray-400 rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-4 focus:ring-amber-400/40 text-xs shadow-inner"
                />
              </div>

              <div className="flex flex-row items-center gap-2 pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-95 disabled:opacity-70 text-purple-950 py-2.5 rounded-full font-bold transition-all duration-150 shadow-md tracking-wider text-[11px] uppercase"
                >
                  {loading ? "Verifying..." : "Sign in"}
                </button>

                <Link
                  to="/register"
                  className="w-1/2 border border-white/50 hover:bg-white hover:text-purple-700 active:scale-95 text-white py-2.5 rounded-full font-semibold transition-all duration-150 text-center tracking-wide block text-[11px]"
                >
                  Create account
                </Link>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;