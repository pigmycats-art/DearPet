
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  MapPin, 
  Bell, 
  RefreshCw, 
  Calendar as CalendarIcon, 
  X,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Pet } from '../types';

interface CalendarProps {
  activePet: Pet;
}

const Calendar: React.FC<CalendarProps> = ({ activePet }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [connectedServices, setConnectedServices] = useState<string[]>([]);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

  const handleSync = (service: string) => {
    setIsSyncing(true);
    setTimeout(() => {
      setConnectedServices(prev => prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]);
      setIsSyncing(false);
    }, 1500);
  };

  const renderDays = () => {
    const totalDays = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const startDay = firstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
    const result = [];

    for (let i = 0; i < startDay; i++) {
      result.push(<div key={`empty-${i}`} className="h-24 md:h-32 border-b border-r border-gray-50"></div>);
    }

    for (let d = 1; d <= totalDays; d++) {
      const isSelected = selectedDate.getDate() === d && 
                         selectedDate.getMonth() === currentDate.getMonth() && 
                         selectedDate.getFullYear() === currentDate.getFullYear();
      const hasEvent = d === 15 || d === 20 || d === 28;
      const isExternal = d === 28 && connectedServices.includes('google');

      result.push(
        <div 
          key={d} 
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), d))}
          className={`h-24 md:h-32 p-2 border-b border-r border-gray-50 cursor-pointer transition-all hover:bg-purple-50/50 relative ${isSelected ? 'bg-purple-50/80' : 'bg-white'}`}
        >
          <span className={`text-sm font-semibold ${isSelected ? 'text-purple-600' : 'text-gray-700'}`}>
            {d}
          </span>
          {hasEvent && (
            <div className="mt-1 space-y-1 overflow-hidden">
              <div className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded truncate font-medium flex items-center gap-1">
                🐾 일정
              </div>
              {d === 20 && (
                <div className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded truncate font-medium">
                  💊 체크
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return result;
  };

  return (
    <div className="animate-in fade-in duration-500 relative text-left">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold text-gray-900">
                {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}
              </h2>
              <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
                <button onClick={prevMonth} className="p-1.5 hover:bg-white rounded-lg transition-all text-gray-600">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextMonth} className="p-1.5 hover:bg-white rounded-lg transition-all text-gray-600">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowSyncModal(true)}
                className="bg-white border border-gray-100 text-gray-600 px-5 py-2.5 rounded-2xl flex items-center gap-2 font-bold shadow-sm hover:bg-gray-50 transition-all"
              >
                <RefreshCw size={18} className={isSyncing ? "animate-spin" : ""} />
                <span>데이터 연동</span>
              </button>
              <button className="lavender-button text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 font-bold shadow-lg shadow-purple-100">
                <Plus size={18} />
                <span>일정 추가</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
              {days.map(day => (
                <div key={day} className="py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {renderDays()}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <img src={activePet.avatar} alt={activePet.name} className="w-10 h-10 rounded-full object-cover border-2 border-purple-100" />
              <h3 className="text-xl font-bold text-gray-800">
                {activePet.name}의 일정
              </h3>
            </div>
            
            <div className="space-y-4">
              {[
                { time: '오전 10:00', title: '병원 정기 검진', loc: '도기 동물병원', type: 'Health' },
                { time: '오후 04:00', title: '산책 모임', loc: '반포 한강공원', type: 'Community' },
              ].map((event, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-600 mt-2"></div>
                      <div className="w-0.5 flex-1 bg-gray-100 my-1 group-last:bg-transparent"></div>
                    </div>
                    <div className="pb-6">
                      <p className="text-xs font-bold text-purple-600 mb-1">{event.time}</p>
                      <h4 className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors">{event.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                        <MapPin size={12} />
                        <span>{event.loc}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-2 py-3 bg-gray-50 text-gray-500 rounded-2xl text-sm font-bold hover:bg-gray-100 transition-colors">
              전체 일정 보기
            </button>
          </div>

          <div className="lavender-gradient p-8 rounded-[2.5rem] relative overflow-hidden shadow-sm">
            <div className="relative z-10">
              <Clock className="text-purple-600 mb-4" size={32} />
              <h4 className="text-lg font-bold text-purple-900 mb-2">건강 관리 팁</h4>
              <p className="text-sm text-purple-800/80 leading-relaxed">
                매달 정해진 날짜에 건강 상태를 체크해보세요. {activePet.name}가 훨씬 행복해질 거예요!
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Sync Modal Overlay */}
      {showSyncModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">데이터 연동 관리</h3>
                <button onClick={() => setShowSyncModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={24} className="text-gray-400" />
                </button>
              </div>
              
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                외부 캘린더나 다른 앱의 기록을 {activePet.name}의 계정으로 가져옵니다.
              </p>

              <div className="space-y-4">
                <button 
                  onClick={() => handleSync('google')}
                  disabled={isSyncing}
                  className="w-full flex items-center justify-between p-5 rounded-[2rem] border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center">
                      <img src="https://www.gstatic.com/images/branding/product/2x/calendar_2020q4_48dp.png" className="w-6 h-6" alt="Google" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-800">Google Calendar</h4>
                      <p className="text-xs text-gray-400">일정 자동 동기화</p>
                    </div>
                  </div>
                  {connectedServices.includes('google') ? (
                    <CheckCircle2 size={20} className="text-green-500" />
                  ) : (
                    <Plus size={20} className="text-gray-300 group-hover:text-purple-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
