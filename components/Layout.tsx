
import React, { useState } from 'react';
import { AppTab, Pet } from '../types';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Activity, 
  ShieldCheck, 
  Users, 
  Settings,
  Calendar as CalendarIcon,
  Plus,
  Bell,
  Heart,
  Search
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  pets: Pet[];
  activePetId: string;
  onPetChange: (petId: string) => void;
  onEditProfile: () => void;
  onAddPet: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange, 
  pets, 
  activePetId, 
  onPetChange,
  onEditProfile,
  onAddPet
}) => {
  const [showPetSwitcher, setShowPetSwitcher] = useState(false);

  const navItems = [
    { id: AppTab.DASHBOARD, icon: LayoutDashboard, label: '홈' },
    { id: AppTab.MAP, icon: MapIcon, label: '플레이스' },
    { id: AppTab.HEALTH, icon: Activity, label: '육아수첩' },
    { id: AppTab.CALENDAR, icon: CalendarIcon, label: '캘린더' },
    { id: AppTab.INSURANCE, icon: ShieldCheck, label: '보험/병원' },
    { id: AppTab.COMMUNITY, icon: Users, label: '커뮤니티' },
  ];

  const activePet = pets.find(p => p.id === activePetId) || pets[0];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FBFBFD]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 h-screen sticky top-0 bg-white border-r border-gray-100 p-6 overflow-y-auto">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg">
            <Heart size={24} fill="white" />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-gray-800">DearPet</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                activeTab === item.id 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} />
              <span className="font-bold">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-50">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-gray-800 transition-colors">
            <Settings size={20} />
            <span className="text-sm font-bold">환경설정</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-x-hidden">
        {/* Header */}
        <header className="sticky top-0 z-[100] apple-blur border-b border-gray-100 px-6 py-3 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <button className="md:hidden p-2 text-gray-400"><Settings size={20} /></button>
            <span className="font-black text-xl text-gray-800 hidden md:block">DearPet</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-gray-400"><Heart size={22} /></button>
            <button className="text-gray-400 relative">
                <Bell size={22} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button 
              onClick={() => setShowPetSwitcher(true)}
              className="w-10 h-10 rounded-full border-2 border-purple-100 p-0.5 active:scale-95 transition-transform"
            >
              <img src={activePet.avatar} alt={activePet.name} className="w-full h-full rounded-full object-cover" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto pb-24 md:pb-8">
           {children}
        </div>

        {/* Pet Switcher Bottom Sheet (Mobile & Desktop Overlay) */}
        {showPetSwitcher && (
          <>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] animate-in fade-in" onClick={() => setShowPetSwitcher(false)} />
            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[3rem] z-[201] p-8 animate-in slide-in-from-bottom duration-300 md:max-w-xl md:mx-auto md:rounded-[3rem] md:bottom-10">
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8 md:hidden" />
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-black text-gray-800">나의 반려동물</h3>
                 <button onClick={onAddPet} className="p-2 bg-purple-50 text-purple-600 rounded-xl"><Plus size={20} /></button>
              </div>
              <div className="flex gap-6 overflow-x-auto pb-4 px-2 scrollbar-hide snap-x">
                {pets.map(pet => (
                  <button 
                    key={pet.id}
                    onClick={() => { onPetChange(pet.id); setShowPetSwitcher(false); }}
                    className={`flex-shrink-0 flex flex-col items-center gap-3 snap-start transition-all ${activePetId === pet.id ? 'scale-110' : 'opacity-60'}`}
                  >
                    <div className={`w-20 h-20 rounded-[2rem] p-1 border-2 ${activePetId === pet.id ? 'border-purple-600' : 'border-transparent'}`}>
                       <img src={pet.avatar} alt={pet.name} className="w-full h-full rounded-[1.7rem] object-cover" />
                    </div>
                    <span className="text-xs font-black text-gray-800">{pet.name}</span>
                  </button>
                ))}
                <button 
                  onClick={() => { onAddPet(); setShowPetSwitcher(false); }}
                  className="flex-shrink-0 flex flex-col items-center gap-3 snap-start"
                >
                  <div className="w-20 h-20 rounded-[2rem] border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300">
                     <Plus size={32} />
                  </div>
                  <span className="text-xs font-bold text-gray-400">아이 추가</span>
                </button>
              </div>
              <button 
                onClick={() => setShowPetSwitcher(false)}
                className="w-full mt-6 py-4 bg-gray-100 rounded-2xl font-bold text-gray-500"
              >
                닫기
              </button>
            </div>
          </>
        )}

        {/* Mobile Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 apple-blur border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeTab === item.id ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              <span className="text-[10px] font-black">{item.label}</span>
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
};

export default Layout;
