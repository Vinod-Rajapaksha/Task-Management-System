import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth.service";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [activeSlide, setActiveSlide] = useState(0);
  const onboardingSteps = [
    {
      title: "Consolidated Sprint Workspaces",
      description: "Set up distinct project workspaces to group individual tasks, map target milestones, and review developer velocities.",
      badge: "Workspace Hub",
      icon: (
        <span className="text-purple-600 font-bold text-[10px] bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">📂 Active Hub</span>
      )
    },
    {
      title: "Real-Time Pipeline Tracking",
      description: "Keeps development pipelines dynamically updated across logged-in accounts using modular synchronization protocols.",
      badge: "Live Engine",
      icon: (
        <span className="text-emerald-600 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">⚡ Connected</span>
      )
    },
    {
      title: "Granular Security Controls",
      description: "Protects team records and system actions through continuous token checks and explicit frontend middleware guards.",
      badge: "Access Guard",
      icon: (
        <span className="text-amber-600 font-bold text-[10px] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">🛡️ Protected</span>
      )
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % onboardingSteps.length);
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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
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
        
        <div className="absolute -bottom-10 -left-10 w-24 h-24 border-[12px] border-purple-600 rounded-full opacity-10 pointer-events-none hidden md:block"></div>

        <div className="hidden md:flex md:w-1/2 bg-slate-50 p-6 flex-col justify-between items-center border-r border-gray-100 relative">
          
          <div className="w-full flex items-center justify-between px-1 select-none flex-shrink-0">
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 rounded-md bg-purple-600 flex items-center justify-center text-white text-[10px] font-black shadow-sm">T</div>
              <span className="font-bold text-gray-800 text-xs tracking-wider uppercase">TaskTerminal</span>
            </div>
            <span className="text-[9px] font-bold px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full shadow-sm transition-all duration-300">
              {onboardingSteps[activeSlide].badge}
            </span>
          </div>

          <div className="w-full max-w-[290px] my-auto space-y-3 pt-3 select-none">
            
            <div className="bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 text-white p-4 rounded-xl shadow-md relative overflow-hidden animate-card-float">
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full pointer-events-none"></div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[9px] text-purple-200 uppercase tracking-wider font-semibold">Workspace Velocity</p>
                  <h3 className="text-xl font-bold tracking-tight mt-0.5">100% Set Up Ready</h3>
                </div>
                <span className="text-[8px] bg-white/20 px-1.5 py-0.5 rounded text-purple-100 uppercase font-bold tracking-wider">v1.0.2</span>
              </div>
              
              <div className="mt-4 pt-1">
                <div className="w-full bg-purple-950/40 rounded-full h-1.5 mb-1.5">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-1.5 rounded-full" style={{ width: "100%" }}></div>
                </div>
                <div className="flex justify-between text-[9px] text-purple-200">
                  <span>Configuration Initialized</span>
                  <span>Pending Activation</span>
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
                {onboardingSteps[activeSlide].icon}
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-xs border border-gray-100 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Active Collaborators</span>
                <span className="text-[9px] text-purple-600 font-semibold">View Group</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold shadow-inner">+12</div>
                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 text-[10px] flex items-center justify-center font-bold border border-white">PM</div>
                <div className="w-7 h-7 rounded-full bg-slate-100 text-gray-600 text-[10px] flex items-center justify-center font-bold border border-white">DEV</div>
                <div className="w-7 h-7 rounded-full bg-slate-100 text-gray-600 text-[10px] flex items-center justify-center font-bold border border-white">QA</div>
              </div>
            </div>

          </div>

          <div className="text-center w-full px-2 select-none mt-2">
            <div className="min-h-[54px] flex flex-col justify-center">
              <h3 className="text-xs font-bold text-gray-800 mb-0.5 transition-all">
                {onboardingSteps[activeSlide].title}
              </h3>
              <p className="text-[10px] text-gray-500 leading-normal max-w-[260px] mx-auto transition-all">
                {onboardingSteps[activeSlide].description}
              </p>
            </div>

            <div className="flex items-center justify-center space-x-1.5 mt-2">
              {onboardingSteps.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeSlide === index ? "w-4 bg-purple-600" : "w-1 bg-gray-300 hover:bg-purple-300"
                  }`}
                  aria-label={`Jump to onboarding slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="w-full border-t border-gray-100 pt-3 mt-3 space-y-1.5 select-none flex-shrink-0">
            <div className="grid grid-cols-2 gap-1.5 max-w-[290px] mx-auto">
              <div className="flex items-center space-x-1.5 bg-white p-1.5 rounded-lg border border-gray-100">
                <span className="text-xs">⚙️</span>
                <span className="text-[9px] font-medium text-gray-600 truncate">MERN Controller</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white p-1.5 rounded-lg border border-gray-100">
                <span className="text-xs">🔒</span>
                <span className="text-[9px] font-medium text-gray-600 truncate">Token Validation</span>
              </div>
            </div>
          </div>

        </div>

        <div className="w-full md:w-1/2 bg-purple-600 text-white p-6 md:p-8 flex flex-col justify-center relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full pointer-events-none"></div>

          <div className="w-full max-w-xs mx-auto">
            <h2 className="text-2xl font-bold tracking-tight mb-1 text-white">
              Create Account
            </h2>
            <p className="text-purple-200 mb-5 text-[10.5px] tracking-wide">
              Sign up to unlock your cross-functional dashboard terminal.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-purple-300 group-focus-within:text-purple-600 z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white text-gray-800 placeholder-gray-400 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-4 focus:ring-amber-400/40 text-xs shadow-inner"
                />
              </div>

              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-purple-300 group-focus-within:text-purple-600 z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white text-gray-800 placeholder-gray-400 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-4 focus:ring-amber-400/40 text-xs shadow-inner"
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
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white text-gray-800 placeholder-gray-400 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-4 focus:ring-amber-400/40 text-xs shadow-inner"
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
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-white text-gray-800 placeholder-gray-400 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-4 focus:ring-amber-400/40 text-xs shadow-inner"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-95 disabled:opacity-70 text-purple-950 py-2.5 rounded-full font-bold transition-all duration-150 shadow-md tracking-wider text-[11px] uppercase"
                >
                  {loading ? "Registering..." : "Sign up"}
                </button>
              </div>

              <div className="text-center pt-2">
                <span className="text-[10.5px] text-purple-200">Already have an account? </span>
                <Link to="/login" className="text-[10.5px] font-bold text-white hover:underline">
                  Sign In
                </Link>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;