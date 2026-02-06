
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Tag as TagIcon, 
  Bell, 
  History, 
  BarChart3, 
  Users, 
  Activity,
  Menu,
  ChevronRight,
  Wifi,
  Thermometer,
  ShieldAlert,
  Download,
  Filter,
  Cpu,
  Radio,
  Clock,
  ExternalLink,
  Flame,
  Plus,
  Zap,
  Trash2,
  Calendar,
  Search,
  PieChart as PieChartIcon,
  TrendingUp,
  ArrowUpRight,
  MapPin,
  UserPlus,
  ShieldCheck,
  MoreVertical,
  Lock,
  Eye
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, Legend, PieChart, Cell, Pie
} from 'recharts';
import { mockDevices, mockTags, mockAlerts, generateHistoryData, mockUsers } from './mockData';
import { DeviceStatus, AlertLevel, AlertStatus, UserStatus, UserRole } from './types';

// --- 通用组件 ---

const StatCard = ({ label, value, sub, colorClass, icon: Icon }: any) => (
  <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon size={80} className={colorClass} />
    </div>
    <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">{label}</p>
    <div className="flex items-end gap-3 mt-4">
      <h3 className={`text-5xl font-bold font-tech glow-text ${colorClass}`}>{value}</h3>
      <span className="text-xs mb-2 text-slate-500">{sub}</span>
    </div>
    <div className={`h-2 w-full mt-6 rounded-full bg-slate-800 overflow-hidden`}>
       <div className={`h-full animate-pulse-slow ${colorClass.replace('text-', 'bg-')}`} style={{ width: '70%' }}></div>
    </div>
  </div>
);

const SectionHeader = ({ title, icon: Icon, extra }: any) => (
  <div className="flex justify-between items-center mb-8">
    <h3 className="text-2xl font-bold flex items-center gap-3 glow-text text-cyan-400">
      <div className="p-2 rounded-lg bg-cyan-400/10 border border-cyan-400/20">
        <Icon size={24}/>
      </div>
      {title}
    </h3>
    {extra}
  </div>
);

// --- 页面组件 ---

const Dashboard = () => {
  const stats = [
    { label: '数据完整率', value: '99.8%', colorClass: 'text-cyan-400', sub: '指标 ≥ 99%', icon: Cpu },
    { label: '平均响应', value: '3.2min', colorClass: 'text-indigo-400', sub: '指标 ≤ 5min', icon: Clock },
    { label: '降本增效', value: '-55%', colorClass: 'text-emerald-400', sub: '指标 ↓ 50%', icon: Activity },
    { label: '未处理告警', value: '2', colorClass: 'text-rose-400', sub: '紧急状态', icon: ShieldAlert },
  ];

  const data = generateHistoryData(15);

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 glass-card p-10 rounded-2xl border-l-8 border-l-cyan-400">
          <SectionHeader 
            title="实时温度趋势演化 (仓储A区)" 
            icon={Thermometer} 
            extra={<span className="text-xs bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 px-4 py-1.5 rounded-full animate-pulse font-bold">实时监控中</span>}
          />
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={14} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={14} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(34, 211, 238, 0.2)', borderRadius: '12px', color: '#fff', fontSize: '14px' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Area type="monotone" dataKey="temp" stroke="#22d3ee" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={4} dot={{ r: 5, fill: '#22d3ee', strokeWidth: 3, stroke: '#020617' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-10 rounded-2xl border-l-8 border-l-rose-500">
          <SectionHeader title="紧急异常事件" icon={ShieldAlert} />
          <div className="space-y-6">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="relative group p-6 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-rose-500/30 transition-all overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500 opacity-50"></div>
                <div className="flex justify-between items-start">
                  <div className="flex gap-4 items-center">
                    <div className="p-3 rounded-lg bg-rose-500/10 text-rose-400">
                      <Bell size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-slate-200">{alert.target}</p>
                      <p className="text-xs text-slate-500 font-mono mt-1">{alert.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-rose-500 font-tech">{alert.temp}°C</p>
                    <button className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 justify-end mt-2 uppercase font-bold">
                      介入处理 <ExternalLink size={12}/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full py-4 rounded-xl border border-slate-700 text-slate-400 text-sm hover:bg-slate-800 transition-colors uppercase tracking-widest font-bold">
              查看全部历史记录
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeviceList = () => (
  <div className="glass-card rounded-2xl overflow-hidden border-t-8 border-t-cyan-400">
    <div className="p-8 border-b border-slate-800/50 flex justify-between items-center bg-slate-900/40">
      <h3 className="text-2xl font-bold flex items-center gap-4 text-cyan-400 glow-text">
        <Radio size={28} className="animate-pulse" /> 
        接入设备矩阵
      </h3>
      <button className="bg-cyan-500 text-slate-900 font-bold px-8 py-3 rounded-xl text-sm hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 uppercase tracking-widest">
        部署新节点
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-xs text-slate-500 bg-slate-900/60 uppercase tracking-widest">
            <th className="px-10 py-6">节点 ID</th>
            <th className="px-10 py-6">设备名称</th>
            <th className="px-10 py-6">所属区域</th>
            <th className="px-10 py-6">状态</th>
            <th className="px-10 py-6">心跳时间</th>
            <th className="px-10 py-6 text-right">系统操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/30">
          {mockDevices.map(d => (
            <tr key={d.id} className="text-lg hover:bg-cyan-400/5 transition-colors group">
              <td className="px-10 py-6 font-mono text-cyan-400/80">{d.id}</td>
              <td className="px-10 py-6 font-bold text-slate-200">{d.name}</td>
              <td className="px-10 py-6 text-slate-400">{d.location}</td>
              <td className="px-10 py-6">
                <span className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full text-xs font-bold border uppercase ${
                  d.status === DeviceStatus.ONLINE ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-500 border-slate-700'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${d.status === DeviceStatus.ONLINE ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`}></span>
                  {d.status === DeviceStatus.ONLINE ? '在线' : '离线'}
                </span>
              </td>
              <td className="px-10 py-6 text-slate-500 font-mono text-sm">{d.lastHeartbeat}</td>
              <td className="px-10 py-6 text-right">
                <div className="flex justify-end gap-6 text-sm font-bold uppercase tracking-widest">
                  <button className="text-cyan-400 hover:text-cyan-200">配置</button>
                  <button className="text-rose-400 hover:text-rose-300">重启</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const TagManagement = () => (
  <div className="glass-card rounded-2xl overflow-hidden border-t-8 border-t-indigo-500">
    <div className="p-8 border-b border-slate-800/50 flex justify-between items-center bg-slate-900/40">
      <h3 className="text-2xl font-bold flex items-center gap-4 text-indigo-400 glow-text">
        <TagIcon size={28} /> 
        数字资产标签池
      </h3>
      <div className="flex gap-4">
        <button className="border border-slate-700 px-6 py-3 rounded-xl text-sm text-slate-300 hover:bg-slate-800 flex items-center gap-3 uppercase font-bold tracking-widest transition-all">
          <Download size={18}/> 导出报表
        </button>
        <button className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-xl text-sm hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 uppercase tracking-widest">
          资产绑定
        </button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-xs text-slate-500 bg-slate-900/60 uppercase tracking-widest">
            <th className="px-10 py-6">EPC 序列号</th>
            <th className="px-10 py-6">标签型号</th>
            <th className="px-10 py-6">电量</th>
            <th className="px-10 py-6">绑定资产</th>
            <th className="px-10 py-6">健康状态</th>
            <th className="px-10 py-6 text-right">操作执行</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/30">
          {mockTags.map(t => (
            <tr key={t.epc} className="text-lg hover:bg-indigo-400/5 transition-colors">
              <td className="px-10 py-6 font-mono text-slate-300">{t.epc}</td>
              <td className="px-10 py-6 text-slate-400">{t.type}</td>
              <td className="px-10 py-6">
                <div className="flex items-center gap-4">
                   <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
                      <div className={`h-full transition-all duration-1000 ${t.battery < 20 ? 'bg-rose-500' : 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]'}`} style={{ width: `${t.battery}%` }}></div>
                   </div>
                   <span className={`text-xs font-mono ${t.battery < 20 ? 'text-rose-500 font-bold animate-pulse' : 'text-slate-400'}`}>{t.battery}%</span>
                </div>
              </td>
              <td className="px-10 py-6 font-bold text-slate-200">{t.boundAsset || '--'}</td>
              <td className="px-10 py-6">
                <span className={`px-4 py-1.5 rounded text-xs font-bold uppercase border ${t.status === '正常' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                  {t.status === '正常' ? '安全' : '异常'}
                </span>
              </td>
              <td className="px-10 py-6 text-right">
                <div className="flex justify-end gap-6 text-sm font-bold uppercase">
                  <button className="text-indigo-400 hover:text-indigo-200">日志</button>
                  <button className="text-slate-500 hover:text-slate-300">解绑</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const RealtimeMonitor = () => {
  const [selectedTag, setSelectedTag] = useState(mockTags[0]);
  const history = generateHistoryData(40);

  return (
    <div className="flex flex-col lg:flex-row gap-10 animate-fadeIn">
      {/* 列表栏 */}
      <div className="lg:w-2/5 space-y-8">
        <div className="glass-card p-6 rounded-2xl flex items-center justify-between border-l-8 border-l-cyan-400">
          <h3 className="font-bold flex items-center gap-4 text-cyan-400 glow-text uppercase tracking-widest text-base">
            <Activity size={24} className="animate-spin-slow"/> 
            实时传感器阵列数据流
          </h3>
          <select className="bg-slate-900 border border-slate-700 text-xs rounded-lg px-4 py-2 outline-none text-slate-300 uppercase font-bold tracking-tighter">
            <option>全域集群</option>
            <option>A区集群</option>
          </select>
        </div>
        <div className="grid gap-6 overflow-y-auto max-h-[800px] pr-4 scrollbar-hide">
          {mockTags.map(tag => (
            <div 
              key={tag.epc} 
              onClick={() => setSelectedTag(tag)}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer group relative overflow-hidden ${
                selectedTag.epc === tag.epc 
                  ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10 scale-[1.02]' 
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              {selectedTag.epc === tag.epc && <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 blur-3xl rounded-full"></div>}
              <div className="flex justify-between items-center">
                <div className="relative z-10">
                  <h4 className={`text-xl font-bold transition-colors ${selectedTag.epc === tag.epc ? 'text-cyan-400 glow-text' : 'text-slate-300'}`}>{tag.boundAsset}</h4>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-slate-500 font-mono tracking-tighter">{tag.epc}</span>
                    <span className="w-1.5 h-1.5 bg-slate-700 rounded-full"></span>
                    <span className="text-xs text-slate-500 uppercase font-bold">{tag.type}</span>
                  </div>
                </div>
                <div className="text-right relative z-10">
                  <span className={`text-5xl font-black font-tech ${tag.currentTemp > 5 || tag.currentTemp < -20 ? 'text-rose-500 glow-text' : 'text-cyan-400 glow-text'}`}>
                    {tag.currentTemp}°C
                  </span>
                  <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest font-bold">同步时间: {tag.lastUpdate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 详情图表栏 */}
      <div className="lg:w-3/5 glass-card p-10 rounded-2xl h-fit sticky top-24 border-r-8 border-r-cyan-400">
        <div className="mb-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-3xl font-black text-slate-100 glow-text uppercase tracking-tight">{selectedTag.boundAsset} <span className="text-cyan-400">遥测数据</span></h3>
              <p className="text-sm text-slate-500 font-mono mt-2">序列号: {selectedTag.epc}</p>
            </div>
            <button className="bg-slate-800 text-slate-300 border border-slate-700 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors flex items-center gap-3">
              <History size={18}/> 深度分析
            </button>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">峰值温度</p>
              <p className="text-3xl font-black text-rose-500 font-tech">6.2°C</p>
            </div>
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">最低温度</p>
              <p className="text-3xl font-black text-cyan-400 font-tech">2.1°C</p>
            </div>
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">温度偏差</p>
              <p className="text-3xl font-black text-indigo-400 font-tech">±0.4</p>
            </div>
          </div>
        </div>
        <div className="h-[450px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="time" hide />
              <YAxis domain={['auto', 'auto']} fontSize={12} stroke="#475569" tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(34, 211, 238, 0.3)', borderRadius: '16px', fontSize: '14px' }}
                itemStyle={{ color: '#22d3ee' }}
              />
              <Line 
                type="monotone" 
                dataKey="temp" 
                stroke="#22d3ee" 
                strokeWidth={5} 
                dot={false}
                activeDot={{ r: 10, fill: '#22d3ee', stroke: '#020617', strokeWidth: 4 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-10 pt-8 border-t border-slate-800/50 flex justify-between items-center">
           <div className="flex items-center gap-4 text-sm text-slate-400 font-bold">
             <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_12px_rgba(34,211,238,0.6)]"></div> 
             数据流传输中
           </div>
           <div className="flex items-center gap-8">
             <p className="text-xs text-slate-500 font-mono font-bold">频率: 300s/次</p>
             <p className="text-xs text-slate-500 font-mono font-bold">信号强度: -42dBm</p>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- 规则中心组件 ---
const RuleCenter = () => {
  const [rules, setRules] = useState([
    { id: 1, name: '冷链疫苗超温告警', target: '疫苗类资产', condition: '温度 > 8°C', severity: '危急', enabled: true },
    { id: 2, name: '低电量提醒', target: '全域标签', condition: '电量 < 20%', severity: '预警', enabled: true },
    { id: 3, name: '生鲜牛肉恒温监控', target: '生鲜牛肉-BatchA', condition: '温度 < 2°C 或 > 6°C', severity: '提示', enabled: false },
    { id: 4, name: '血液样本深度冷冻告警', target: '血液类资产', condition: '温度 > -15°C', severity: '危急', enabled: true },
  ]);

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
           <h3 className="text-3xl font-black text-white glow-text uppercase tracking-tight">告警规则引擎</h3>
           <p className="text-sm text-slate-500 mt-2 font-mono">活跃规则总数: {rules.filter(r => r.enabled).length}</p>
        </div>
        <button className="bg-cyan-500 text-slate-900 font-bold px-8 py-4 rounded-xl text-sm hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-3 uppercase tracking-widest">
          <Plus size={20}/> 新增监控规则
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {rules.map(rule => (
          <div key={rule.id} className={`glass-card p-8 rounded-3xl border-t-4 transition-all ${rule.enabled ? 'border-t-cyan-400' : 'border-t-slate-700 opacity-60'}`}>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${rule.enabled ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-800 text-slate-500'}`}>
                  <Zap size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-100">{rule.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">规则编号: RX-00{rule.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className={`w-14 h-7 rounded-full p-1 cursor-pointer transition-colors ${rule.enabled ? 'bg-cyan-500' : 'bg-slate-700'}`}>
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${rule.enabled ? 'translate-x-7' : 'translate-x-0'}`}></div>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 py-6 border-y border-slate-800/50">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">监控对象</p>
                <p className="text-sm text-slate-300">{rule.target}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">触发阈值</p>
                <p className="text-sm text-cyan-400 font-bold">{rule.condition}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
               <span className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase border ${
                 rule.severity === '危急' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 
                 rule.severity === '预警' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
               }`}>
                 {rule.severity}
               </span>
               <div className="flex gap-4">
                  <button className="p-2 text-slate-500 hover:text-cyan-400 transition-colors"><Settings size={20}/></button>
                  <button className="p-2 text-slate-500 hover:text-rose-500 transition-colors"><Trash2 size={20}/></button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 时空回溯组件 ---
const SpatioTemporalHistory = () => {
  const [historyItems, setHistoryItems] = useState([
    { id: 1, time: '2024-05-20 10:15:22', asset: '生鲜牛肉-003', event: '温度越上限告警', location: '冷链仓A区', details: '实时温度 8.9°C (阈值 6°C)' },
    { id: 2, time: '2024-05-20 09:30:00', asset: '疫苗-Batch2024A', event: '资产入库', location: '冷链仓A区', details: '由 码头读写器 移入' },
    { id: 3, time: '2024-05-20 08:45:10', asset: '血液样本-X02', event: '电量低预警', location: '冷链仓B区', details: '剩余电量 12%' },
    { id: 4, time: '2024-05-20 07:20:00', asset: '生物试剂-S01', event: '定期上报', location: '冷链仓A区', details: '温度 3.8°C (波动 ±0.2)' },
    { id: 5, time: '2024-05-19 23:55:00', asset: '码头读写器', event: '节点离线', location: '物流码头', details: '心跳丢失 > 300s' },
  ]);

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="glass-card p-10 rounded-3xl border-t-8 border-t-indigo-500">
        <SectionHeader title="时空回溯追踪" icon={History} extra={
          <div className="flex gap-4">
             <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-700 px-6 py-2 rounded-xl">
                <Calendar size={18} className="text-slate-500"/>
                <span className="text-sm text-slate-300 font-bold">2024-05-14 至 2024-05-20</span>
             </div>
             <button className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-slate-400 hover:text-cyan-400 transition-all"><Search size={22}/></button>
          </div>
        }/>

        <div className="relative mt-12 space-y-10">
          <div className="absolute left-[31px] top-0 bottom-0 w-1 bg-slate-800"></div>
          
          {historyItems.map((item, idx) => (
            <div key={item.id} className="relative pl-16 group">
              <div className={`absolute left-0 top-1 w-16 h-16 rounded-2xl flex items-center justify-center border-4 border-slate-900 z-10 transition-all ${
                item.event.includes('告警') || item.event.includes('离线') ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 'bg-slate-800 text-cyan-400'
              }`}>
                {item.event.includes('告警') ? <ShieldAlert size={28}/> : item.event.includes('入库') ? <Download size={28}/> : <Activity size={28}/>}
              </div>
              
              <div className="glass-card p-8 rounded-2xl group-hover:border-indigo-500/50 transition-all">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold text-slate-100">{item.event}</span>
                    <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-400 uppercase font-mono">{item.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <MapPin size={16} className="text-indigo-400"/>
                    {item.location}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-8 sm:items-center">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400"><TagIcon size={20}/></div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">关联资产</p>
                        <p className="text-sm font-bold text-slate-300">{item.asset}</p>
                      </div>
                   </div>
                   <div className="hidden sm:block w-px h-8 bg-slate-800"></div>
                   <div>
                     <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">事件详情描述</p>
                     <p className="text-sm text-slate-400 italic">“{item.details}”</p>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
           <button className="text-sm text-slate-500 hover:text-cyan-400 transition-colors uppercase font-bold tracking-widest flex items-center gap-2 mx-auto">
             加载更多历史事件序列 <ChevronRight size={16}/>
           </button>
        </div>
      </div>
    </div>
  );
};

// --- 量化分析组件 ---
const QuantitativeAnalysis = () => {
  const barData = [
    { name: '周一', alerts: 12, quality: 98 },
    { name: '周二', alerts: 8, quality: 99 },
    { name: '周三', alerts: 22, quality: 96 },
    { name: '周四', alerts: 5, quality: 99 },
    { name: '周五', alerts: 15, quality: 97 },
    { name: '周六', alerts: 4, quality: 99 },
    { name: '周日', alerts: 2, quality: 100 },
  ];

  const pieData = [
    { name: '温度告警', value: 45, color: '#f43f5e' },
    { name: '设备离线', value: 15, color: '#6366f1' },
    { name: '低电量预警', value: 30, color: '#f59e0b' },
    { name: '资产遗失', value: 10, color: '#94a3b8' },
  ];

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="glass-card p-10 rounded-3xl">
          <SectionHeader title="异常事件时序分布" icon={BarChart3} extra={
             <div className="flex gap-4">
                <span className="flex items-center gap-2 text-xs text-rose-500 font-bold"><div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div> 告警数</span>
                <span className="flex items-center gap-2 text-xs text-indigo-400 font-bold"><div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div> 合规率 (%)</span>
             </div>
          }/>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 14}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 14}} />
                <Tooltip cursor={{fill: 'rgba(34,211,238,0.05)'}} contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b'}} />
                <Bar dataKey="alerts" fill="#f43f5e" radius={[6, 6, 0, 0]} barSize={30} />
                <Bar dataKey="quality" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-10 rounded-3xl">
          <SectionHeader title="异常分类结构占比" icon={PieChartIcon} />
          <div className="flex flex-col sm:flex-row items-center justify-around h-[400px]">
             <div className="w-full sm:w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={130}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b'}} />
                  </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="w-full sm:w-1/2 space-y-6 pl-10">
                {pieData.map((item, idx) => (
                   <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                        <span className="text-sm text-slate-400 font-bold">{item.name}</span>
                      </div>
                      <span className="text-lg font-tech text-white">{item.value}%</span>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-10 rounded-3xl border-t-8 border-t-emerald-500">
        <SectionHeader title="核心资产效能报告" icon={TrendingUp} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
             <div className="flex justify-between items-start mb-4">
               <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">冷链合规指数</p>
               <ArrowUpRight className="text-emerald-400" size={24}/>
             </div>
             <p className="text-4xl font-tech text-emerald-400 glow-text">98.4<span className="text-xl">.0</span></p>
             <p className="text-xs text-slate-500 mt-4">较上周环比提升 <span className="text-emerald-400 font-bold">+2.1%</span></p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
             <div className="flex justify-between items-start mb-4">
               <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">平均盘点耗时</p>
               <TrendingUp className="text-indigo-400" size={24}/>
             </div>
             <p className="text-4xl font-tech text-indigo-400 glow-text">0.4<span className="text-xl">秒</span></p>
             <p className="text-xs text-slate-500 mt-4">自动采集覆盖率 <span className="text-indigo-400 font-bold">100%</span></p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
             <div className="flex justify-between items-start mb-4">
               <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">人力成本节约</p>
               <Zap className="text-amber-400" size={24}/>
             </div>
             <p className="text-4xl font-tech text-amber-400 glow-text">¥14.2<span className="text-xl">k</span></p>
             <p className="text-xs text-slate-500 mt-4">当月累计节约成本估算</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 访问权限管理组件 ---
const AccessControl = () => {
  const stats = [
    { label: '总注册用户', value: '4', sub: '授权席位: 10', colorClass: 'text-cyan-400', icon: Users },
    { label: '在线管理员', value: '1', sub: '活跃会话: 1', colorClass: 'text-indigo-400', icon: ShieldCheck },
    { label: '安全审计等级', value: 'L4', sub: '最高权限开启', colorClass: 'text-emerald-400', icon: Lock },
    { label: '挂起审批', value: '0', sub: '即时处理中', colorClass: 'text-amber-400', icon: Clock },
  ];

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border-t-8 border-t-cyan-500">
        <div className="p-8 border-b border-slate-800/50 flex justify-between items-center bg-slate-900/40">
          <h3 className="text-2xl font-bold flex items-center gap-4 text-cyan-400 glow-text">
            <Users size={28} /> 
            账户与权限矩阵
          </h3>
          <button className="bg-cyan-500 text-slate-900 font-bold px-8 py-3 rounded-xl text-sm hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-3 uppercase tracking-widest">
            <UserPlus size={20}/> 邀请新成员
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-slate-500 bg-slate-900/60 uppercase tracking-widest">
                <th className="px-10 py-6">用户信息</th>
                <th className="px-10 py-6">角色权限</th>
                <th className="px-10 py-6">访问等级</th>
                <th className="px-10 py-6">最近登录</th>
                <th className="px-10 py-6">状态</th>
                <th className="px-10 py-6 text-right">管理操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/30">
              {mockUsers.map(u => (
                <tr key={u.id} className="text-lg hover:bg-cyan-400/5 transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden font-bold text-cyan-400 text-sm">
                        <img 
                          src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${u.id}`} 
                          alt={u.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-slate-200">{u.name}</p>
                        <p className="text-xs text-slate-500 font-mono mt-1">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`px-4 py-1.5 rounded-lg text-xs font-bold border ${
                      u.role === UserRole.ADMIN ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 
                      u.role === UserRole.OPERATOR ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 
                      'bg-slate-800 text-slate-500 border-slate-700'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2">
                       {Array.from({ length: 4 }).map((_, i) => (
                         <div key={i} className={`w-3 h-1 rounded-full ${i < u.level ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]' : 'bg-slate-800'}`}></div>
                       ))}
                       <span className="text-xs text-slate-500 font-mono ml-2">LV.{u.level}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-slate-500 font-mono text-sm">{u.lastLogin}</td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${u.status === UserStatus.ACTIVE ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-slate-600'}`}></span>
                      <span className={`text-sm font-bold ${u.status === UserStatus.ACTIVE ? 'text-emerald-400' : 'text-slate-500'}`}>{u.status}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex justify-end gap-6">
                      <button className="p-2 text-slate-500 hover:text-cyan-400 transition-colors" title="权限详情"><Eye size={20}/></button>
                      <button className="p-2 text-slate-500 hover:text-cyan-400 transition-colors" title="编辑设置"><Settings size={20}/></button>
                      <button className="p-2 text-slate-500 hover:text-rose-500 transition-colors" title="吊销权限"><ShieldAlert size={20}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- 主布局 ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'dashboard', label: '指挥中心', icon: LayoutDashboard },
    { id: 'devices', label: '读写矩阵', icon: Wifi },
    { id: 'tags', label: '资产标签', icon: TagIcon },
    { id: 'monitor', label: '全域监控', icon: Thermometer },
    { id: 'alerts', label: '规则中心', icon: ShieldAlert },
    { id: 'history', label: '时空回溯', icon: History },
    { id: 'reports', label: '量化分析', icon: BarChart3 },
    { id: 'users', label: '访问权限', icon: Users },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'devices': return <DeviceList />;
      case 'tags': return <TagManagement />;
      case 'monitor': return <RealtimeMonitor />;
      case 'alerts': return <RuleCenter />;
      case 'history': return <SpatioTemporalHistory />;
      case 'reports': return <QuantitativeAnalysis />;
      case 'users': return <AccessControl />;
      default: return (
        <div className="flex flex-col items-center justify-center h-[500px] text-slate-600 glass-card rounded-3xl border-dashed border-2 border-slate-800">
          <Settings size={80} className="mb-8 animate-spin-slow opacity-20" />
          <p className="text-3xl font-tech uppercase tracking-widest text-slate-700">协议开发中</p>
          <p className="text-sm mt-4 text-slate-800 font-mono">核心版本 2.0.4-LTS</p>
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* 侧边栏 */}
      <aside className={`fixed inset-y-4 left-4 z-50 w-72 glass-card rounded-3xl transition-transform duration-500 lg:relative lg:translate-x-0 lg:ml-4 lg:my-4 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-[calc(100%+2rem)]'}`}>
        <div className="flex h-24 items-center px-10 border-b border-slate-800/50">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center font-bold text-slate-900 shadow-xl shadow-cyan-500/30">
               <Flame size={30}/>
             </div>
             <div className="flex flex-col justify-center">
               <span className="font-tech text-xl text-white block leading-none">海康热芯</span>
               <span className="text-[10px] text-cyan-400 tracking-[0.25em] uppercase font-bold mt-1">热芯管理系统 v2.0</span>
             </div>
          </div>
        </div>
        <nav className="p-6 mt-6 space-y-3 overflow-y-auto max-h-[calc(100vh-300px)]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-5 px-6 py-4.5 text-base font-bold uppercase tracking-widest rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-cyan-500 text-slate-950 shadow-xl shadow-cyan-500/30 translate-x-2' 
                  : 'text-slate-500 hover:bg-slate-800/50 hover:text-cyan-400'
              }`}
            >
              <item.icon size={22} className={activeTab === item.id ? 'animate-pulse' : ''} />
              {item.label}
              {activeTab === item.id && <div className="ml-auto w-2 h-2 rounded-full bg-slate-950"></div>}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-8 left-8 right-8 p-6 bg-slate-900/80 rounded-2xl border border-slate-800/50">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-full border-2 border-cyan-500 p-0.5 overflow-hidden">
              <img 
                src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=HikCoreAdmin" 
                alt="admin" 
                className="w-full h-full rounded-full bg-slate-800 object-cover"
              />
            </div>
            <div className="text-xs overflow-hidden">
              <p className="text-white font-bold truncate text-sm uppercase tracking-wider">admin</p>
              <p className="text-slate-500 truncate font-mono mt-0.5">4级访问权限</p>
            </div>
          </div>
          <button className="w-full py-3 text-xs text-slate-600 uppercase tracking-[0.3em] font-black border border-slate-800 rounded-lg hover:border-rose-500 hover:text-rose-500 transition-all">
            退出登录
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 flex flex-col min-w-0 px-6 lg:px-10">
        <header className="h-24 flex items-center justify-between sticky top-0 z-40 bg-transparent">
          <div className="flex items-center gap-8">
             <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden p-3 glass-card rounded-xl text-cyan-400">
               <Menu size={24} />
             </button>
             <div>
               <h2 className="text-4xl font-black text-white font-tech uppercase tracking-tighter glow-text">
                 {navItems.find(n => n.id === activeTab)?.label}
               </h2>
               <p className="text-xs text-slate-500 font-mono mt-1 font-bold">节点集群: 华东_01 // 安全连接: 已建立</p>
             </div>
          </div>
          
          <div className="flex items-center gap-8">
             <div className="hidden xl:flex items-center gap-6 px-6 py-3 glass-card rounded-full">
               <div className="flex items-center gap-3">
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                 <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-widest">系统运行正常</span>
               </div>
               <div className="h-6 w-px bg-slate-800"></div>
               <span className="text-xs font-mono text-slate-400 font-bold">{currentTime}</span>
             </div>

             <div className="flex items-center gap-4">
                <button className="p-4 glass-card rounded-xl text-slate-400 hover:text-cyan-400 transition-colors relative">
                  <Bell size={24} />
                  <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-slate-900 shadow-[0_0_10px_rgba(244,63,94,0.8)]"></span>
                </button>
                <button className="p-4 glass-card rounded-xl text-slate-400 hover:text-cyan-400 transition-colors">
                  <Settings size={24} />
                </button>
             </div>
          </div>
        </header>

        <div className="py-10 max-w-[1800px] mx-auto w-full">
          {renderContent()}
        </div>

        <footer className="mt-auto py-10 text-center border-t border-slate-800/30">
          <p className="text-xs text-slate-600 uppercase tracking-[0.5em] font-bold">
            云边协同架构平台 // 加密传输协议 v2.5
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
