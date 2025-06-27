import { useEffect, useRef } from 'react';
import { LogEntry } from '../types/game';

interface ActivityLogProps {
  logs: LogEntry[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ logs }) => {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="h-48 overflow-auto w-full bg-gray-800 p-2 rounded-xl shadow-2xl border border-gray-700 flex flex-col">
      <h3 className="text-xl font-semibold mb-3 text-white">Nhật Ký Hoạt Động</h3>
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {logs.map((log, index) => (
          <p
            key={index}
            className={`text-xs mb-1 ${
              log.type === 'error' ? 'text-red-300' : log.type === 'success' ? 'text-green-300' : 'text-gray-300'
            }`}
          >
            <span className="text-gray-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span> {log.message}
          </p>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default ActivityLog;