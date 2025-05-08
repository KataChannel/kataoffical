// src/townerdefense/interfaces.ts

// Định nghĩa một điểm trên đường đi
export interface PathPoint {
  x: number;
  y: number;
}

// Định nghĩa kẻ địch
export interface Enemy {
  id: number;
  type: string; // Loại địch (ví dụ: 'basic', 'fast')
  hp: number; // Máu hiện tại
  maxHp: number; // Máu tối đa
  speed: number; // Tốc độ di chuyển (ví dụ: pixel/tick)
  bounty: number; // Tiền nhận được khi tiêu diệt
  pathProgress: number; // Tiến độ di chuyển trên đường đi (ví dụ: số pixel đã đi)
  position: { x: number; y: number }; // Tọa độ hiện tại trên màn hình
}

// Định nghĩa tháp phòng thủ
export interface Tower {
  id: number;
  type: string; // Loại tháp (ví dụ: 'basic', 'aoe')
  cost: number; // Chi phí xây dựng
  range: number; // Tầm bắn (pixel)
  damage: number; // Sát thương mỗi lần bắn
  attackSpeed: number; // Tốc độ bắn (ví dụ: số tick giữa 2 lần bắn)
  lastFired: number; // Tick cuối cùng tháp đã bắn
  position: { x: number; y: number }; // Tọa độ trên màn hình (tại điểm xây tháp)
}

// Định nghĩa điểm có thể xây tháp
export interface BuildSpot {
    id: number;
    position: { x: number; y: number }; // Tọa độ của điểm xây
    occupiedBy: number | null; // ID của tháp đang chiếm giữ, null nếu trống
}

// Định nghĩa các loại địch (dữ liệu mẫu)
export const ENEMY_TYPES: { [key: string]: Omit<Enemy, 'id' | 'hp' | 'pathProgress' | 'position'> } = {
    basic: { type: 'basic', maxHp: 50, speed: 2, bounty: 10 },
    fast: { type: 'fast', maxHp: 30, speed: 4, bounty: 15 }
    // Thêm các loại địch khác
};

// Định nghĩa các loại tháp (dữ liệu mẫu)
export const TOWER_TYPES: { [key: string]: Omit<Tower, 'id' | 'lastFired' | 'position'> } = {
    basic: { type: 'basic', cost: 50, range: 100, damage: 15, attackSpeed: 30 }, // Bắn mỗi 30 ticks
    // Thêm các loại tháp khác
};

// Định nghĩa đường đi của địch (dữ liệu mẫu - các điểm nối tiếp)
// Tọa độ này là tọa độ trên "bản đồ" của GameAreaComponent
export const PATH: PathPoint[] = [
    { x: 0, y: 200 }, // Start
    { x: 150, y: 200 },
    { x: 150, y: 50 },
    { x: 400, y: 50 },
    { x: 400, y: 300 },
    { x: 600, y: 300 }, // End
];

// Định nghĩa các điểm có thể xây tháp (dữ liệu mẫu)
export const BUILD_SPOTS: Omit<BuildSpot, 'id' | 'occupiedBy'>[] = [
    { position: { x: 75, y: 150 } },
    { position: { x: 250, y: 100 } },
    { position: { x: 350, y: 200 } },
    { position: { x: 500, y: 250 } }
    // Thêm các điểm xây khác
];