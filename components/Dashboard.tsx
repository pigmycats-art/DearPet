
import React from 'react';
import { 
  Search, 
  Utensils, 
  MapPin, 
  Pocket, 
  Footprints, 
  BookOpen, 
  ShoppingBag, 
  PawPrint, 
  Scale, 
  Bot, 
  Hospital,
  ChevronRight,
  Heart
} from 'lucide-react';
import { Pet } from '../types';

interface DashboardProps {
  activePet: Pet;
  onEditProfile?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ activePet, onEditProfile }) => {
  // 나이 계산 로직 (4.5세 형식)
  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const now = new Date();
    const ageInMs = now.getTime() - birth.getTime();
    const ageInYears = ageInMs / (1000 * 60 * 60 * 24 * 365.25);
    return ageInYears.toFixed(1);
  };

  const menuItems = [
    { icon: Utensils, label: '혼합급여량', color: 'bg-red-50 text-red-500' },
    { icon: MapPin, label: '플레이스', color: 'bg-green-50 text-green-500' },
    { icon: Pocket, label: '모두의포켓', color: 'bg-purple-50 text-purple-500' },
    { icon: Footprints, label: '산책기록', color: 'bg-orange-50 text-orange-500' },
    { icon: BookOpen, label: '육아수첩', color: 'bg-pink-50 text-pink-500' },
    { icon: ShoppingBag, label: '멍냥마켓', color: 'bg-gray-50 text-gray-700' },
    { icon: PawPrint, label: '입양하기', color: 'bg-blue-50 text-blue-500' },
    { icon: Scale, label: '몸무게예측', color: 'bg-teal-50 text-teal-500' },
    { icon: Bot, label: 'AI 가이드', color: 'bg-amber-50 text-amber-500' },
    { icon: Hospital, label: '착한병원', color: 'bg-emerald-50 text-emerald-500' },
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Instagram-style Hero Section */}
      <section className="px-6 pt-6 pb-2">
        <div className="relative group cursor-pointer" onClick={onEditProfile}>
          <div className="flex items-center gap-6 mb-8">
             <div className="relative">
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-yellow-400 to-purple-600">
                    <img 
                        src={activePet.avatar} 
                        alt={activePet.name} 
                        className="w-full h-full rounded-full object-cover border-4 border-white" 
                    />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-purple-600 text-white p-2 rounded-full border-2 border-white">
                    <Heart size={16} fill="white" />
                </div>
             </div>
             <div className="flex-1 text-left">
                <h2 className="text-3xl font-black text-gray-800 mb-1">{activePet.name}</h2>
                <p className="text-sm text-gray-500 font-medium leading-tight">
                    지금 {activePet.name}(은)는 건강 관리를 배우고 있어요. 잘 하고 있나요?
                </p>
                <button className="text-xs font-bold text-gray-400 flex items-center mt-2 hover:text-purple-600 transition-colors">
                    상태 관리 바로가기 <ChevronRight size={14} />
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* Modern Search Bar */}
      <div className="px-6 mb-8">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="궁금한 정보를 검색해보세요" 
            className="w-full bg-white border border-gray-100 py-4 pl-14 pr-6 rounded-[2rem] shadow-sm focus:ring-4 focus:ring-purple-50 focus:border-purple-200 outline-none transition-all font-medium"
          />
        </div>
      </div>

      {/* 10-Grid Icons Menu */}
      <div className="px-6 mb-10">
        <div className="grid grid-cols-5 gap-y-8 gap-x-2">
          {menuItems.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3 cursor-pointer group">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${item.color}`}>
                <item.icon size={28} />
              </div>
              <span className="text-[11px] font-black text-gray-600 text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Status Banner */}
      <div className="px-6 mb-10">
        <div className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between">
           <span className="text-xs font-black text-gray-400">{calculateAge(activePet.birthDate)}세 | {activePet.weight}kg</span>
           <span className="text-xs font-bold text-gray-500">지금은 한창 성장기예요! 🚀</span>
        </div>
      </div>

      {/* Feed Style: Friends Section */}
      <section className="px-6 pb-12">
        <h3 className="text-lg font-black text-gray-800 mb-6 flex items-center justify-between">
          친구들이 다녀왔어요!
          <button className="text-xs text-gray-400 font-bold">더보기</button>
        </h3>
        <div className="grid grid-cols-2 gap-4">
           {[1, 2, 3, 4].map(i => (
             <div key={i} className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm">
                <div className="aspect-square bg-gray-100 relative">
                   <img src={`https://picsum.photos/seed/${i + 50}/400/400`} alt="feed" className="w-full h-full object-cover" />
                   <div className="absolute top-3 right-3 p-1.5 bg-white/60 backdrop-blur rounded-full">
                      <Heart size={14} className="text-red-500" />
                   </div>
                </div>
                <div className="p-4 text-left">
                   <p className="text-[11px] font-bold text-gray-800 line-clamp-1">오늘 산책 성공적! ☀️</p>
                   <span className="text-[9px] text-gray-400">한강공원 • 2시간 전</span>
                </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
