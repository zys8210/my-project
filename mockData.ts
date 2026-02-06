
import { Device, DeviceStatus, Tag, Alert, AlertLevel, AlertStatus, User, UserRole, UserStatus } from './types';

export const mockDevices: Device[] = [
  { id: 'RD-001', name: '1号仓库读写器', location: '冷链仓A区', status: DeviceStatus.ONLINE, lastHeartbeat: '2024-05-20 10:30:15' },
  { id: 'RD-002', name: '2号仓库读写器', location: '冷链仓B区', status: DeviceStatus.ONLINE, lastHeartbeat: '2024-05-20 10:28:44' },
  { id: 'RD-003', name: '转运口读写器', location: '物流码头', status: DeviceStatus.OFFLINE, lastHeartbeat: '2024-05-19 23:55:00' },
];

export const mockTags: Tag[] = [
  { epc: 'EPC-10001', type: '高精度温度标签', battery: 85, boundAsset: '疫苗-Batch2024A', status: '正常', currentTemp: 4.2, lastUpdate: '10:32:01' },
  { epc: 'EPC-10002', type: '高精度温度标签', battery: 92, boundAsset: '血液样本-X02', status: '正常', currentTemp: -18.5, lastUpdate: '10:31:55' },
  { epc: 'EPC-10003', type: '常规温度标签', battery: 12, boundAsset: '生鲜牛肉-003', status: '异常', currentTemp: 8.9, lastUpdate: '10:30:12' },
  { epc: 'EPC-10004', type: '高精度温度标签', battery: 77, boundAsset: '生物试剂-S01', status: '正常', currentTemp: 3.8, lastUpdate: '10:32:05' },
];

export const mockAlerts: Alert[] = [
  { id: 'AL-001', time: '2024-05-20 10:15:22', target: '生鲜牛肉-003', temp: 8.9, level: AlertLevel.CRITICAL, status: AlertStatus.PENDING },
  { id: 'AL-002', time: '2024-05-20 09:44:10', target: '1号仓库读写器', temp: 0, level: AlertLevel.WARNING, status: AlertStatus.PROCESSING },
];

export const mockUsers: User[] = [
  { id: 'U-001', name: '张建国', email: 'zhang.jg@hikcore.com', role: UserRole.ADMIN, level: 4, lastLogin: '2024-05-20 10:05:00', status: UserStatus.ACTIVE },
  { id: 'U-002', name: '李晓明', email: 'li.xm@hikcore.com', role: UserRole.OPERATOR, level: 2, lastLogin: '2024-05-20 08:30:12', status: UserStatus.ACTIVE },
  { id: 'U-003', name: '王芳', email: 'wang.f@hikcore.com', role: UserRole.OPERATOR, level: 2, lastLogin: '2024-05-19 17:45:33', status: UserStatus.ACTIVE },
  { id: 'U-004', name: '赵强', email: 'zhao.q@hikcore.com', role: UserRole.VIEWER, level: 1, lastLogin: '2024-05-18 11:20:05', status: UserStatus.DISABLED },
];

export const generateHistoryData = (points = 24) => {
  return Array.from({ length: points }, (_, i) => ({
    time: `${i}:00`,
    temp: (Math.random() * 5 + 2).toFixed(1),
  }));
};
