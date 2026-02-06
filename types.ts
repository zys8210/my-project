
export enum DeviceStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export enum AlertLevel {
  INFO = '提示',
  WARNING = '预警',
  CRITICAL = '危急'
}

export enum AlertStatus {
  PENDING = '待处理',
  PROCESSING = '处理中',
  CLOSED = '已关闭'
}

export enum UserRole {
  ADMIN = '系统管理员',
  OPERATOR = '操作员',
  VIEWER = '访客'
}

export enum UserStatus {
  ACTIVE = '正常',
  DISABLED = '停用'
}

export interface Device {
  id: string;
  name: string;
  location: string;
  status: DeviceStatus;
  lastHeartbeat: string;
}

export interface Tag {
  epc: string;
  type: string;
  battery: number;
  boundAsset: string;
  status: '正常' | '异常';
  currentTemp: number;
  lastUpdate: string;
}

export interface Alert {
  id: string;
  time: string;
  target: string;
  temp: number;
  level: AlertLevel;
  status: AlertStatus;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  level: number;
  lastLogin: string;
  status: UserStatus;
}

export interface DashboardStats {
  integrityRate: number;
  avgResponseTime: number;
  manualCostReduction: number;
  activeAlerts: number;
}
