import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatCard = ({ title, value, change, isPositive, icon: Icon, colorClass }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between relative overflow-hidden group hover:shadow-md transition-shadow duration-200">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
        
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-1">
            <span className={`inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded-md ${
              isPositive ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
            }`}>
              {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {change}%
            </span>
          </div>
        )}
      </div>

      <div className={`p-3 rounded-xl ${colorClass || "bg-violet-50 text-violet-600"}`}>
        <Icon size={20} />
      </div>
    </div>
  );
};

export default StatCard;