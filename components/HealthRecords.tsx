
import React, { useState } from 'react';
import { Activity, Plus, Sparkles, TrendingUp, Heart, ChevronRight, Download, Timer, Footprints } from 'lucide-react';
import { getHealthInsights } from '../services/geminiService';
import { Pet } from '../types';

interface HealthRecordsProps {
  activePet: Pet;
}

const HealthRecords: React.FC<HealthRecordsProps> = ({ activePet }) => {
  const [symptom, setSymptom] = useState('');
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');

  const weeklyData = [45, 60, 55, 80, 75, 90, 85];
  const weeklyLabels = ['월', '화', '수', '목', '금', '토', '일'];
  
  const monthlyData = [70, 65, 80, 75, 85, 90, 95];
  const monthlyLabels = ['9월', '10월', '11월', '12월', '1월', '2월', '3월'];

  const currentData = viewMode === 'weekly' ? weeklyData : monthlyData;
  const currentLabels = viewMode === 'weekly' ? weeklyLabels : monthlyLabels;

  const askAi = async () => {
    if (!symptom) return;
    setLoading(true);
    const result = await getHealthInsights(`${activePet.breed} (${activePet.species})`, symptom);
    setInsight(result);
    setLoading(false);
  };

  return (
    <div className="animate-in fade-in duration-500 text-left px-6 py-10 md:px-10 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">{activePet.name}의 건강 리포트</h2>
          <p className="text-gray-500 text-sm font-medium">활동 및 건강 데이터가 실시간으로 분석되고 있습니다.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-white border border-gray-100 text-gray-600 px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
            <Download size={18} />
            <span>기록 가져오기</span>
          </button>
          <button className="flex-1 md:flex-none lavender-button text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-100">
            <Plus size={20} />
            <span>기록 추가</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          {/* Main Activity Chart Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-gray-800 flex items-center gap-2">
                <Footprints size={20} className="text-purple-600" />
                활동 추이
              </h3>
              <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
                <button 
                  onClick={() => setViewMode('weekly')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    viewMode === 'weekly' 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  주간
                </button>
                <button 
                  onClick={() => setViewMode('monthly')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    viewMode === 'monthly' 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  월간
                </button>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm h-80 flex items-end justify-between gap-3">
              {currentData.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group h-full justify-end">
                  <div className="relative w-full flex flex-col items-center justify-end h-full">
                    <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] px-2 py-1 rounded mb-2 z-10">
                      {h}분
                    </div>
                    <div 
                      className="w-full bg-purple-100 rounded-t-xl transition-all duration-700 ease-out group-hover:bg-purple-500 group-hover:shadow-lg group-hover:shadow-purple-100" 
                      style={{ height: `${h}%` }}
                    ></div>
                  </div>
                  <span className="text-[11px] text-gray-400 mt-4 font-black group-hover:text-purple-600 transition-colors">
                    {currentLabels[i]}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Detailed Activity Logs */}
          <section className="pb-8">
            <h3 className="text-xl font-black text-gray-800 mb-6">최근 활동 로그</h3>
            <div className="space-y-4">
              {[
                { type: '활동', value: '45분 / 2.4km', date: '오늘 오후 03:30', icon: Timer, color: 'text-purple-600', bg: 'bg-purple-50' },
                { type: '체중', value: '5.2kg', date: '어제 오전 09:30', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
                { type: '심박수', value: '85 bpm', date: '2월 24일', icon: Heart, color: 'text-red-600', bg: 'bg-red-50' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-white rounded-[2rem] border border-gray-100 hover:border-purple-100 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${log.bg} ${log.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                      <log.icon size={20} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-black text-gray-800">{log.type} 기록</h4>
                      <p className="text-xs text-gray-400 font-bold">{log.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-black text-gray-700">{log.value}</span>
                    <ChevronRight size={20} className="text-gray-300 group-hover:text-purple-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="lavender-gradient p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden text-left">
            <Sparkles className="absolute -top-4 -right-4 text-white opacity-20" size={100} />
            <div className="relative z-10">
              <h4 className="text-xl font-black text-purple-900 mb-4 flex items-center gap-2">
                <Sparkles size={20} /> AI 건강 비서
              </h4>
              <p className="text-sm text-purple-800 mb-6 font-medium leading-relaxed">
                {activePet.name}의 상태나 궁금한 점을 적어주세요. AI가 데이터를 분석해 가이드를 드립니다.
              </p>
              <textarea 
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                placeholder="예: 밥을 갑자기 잘 안 먹는데 병원에 가야 할까요?"
                className="w-full h-32 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/40 focus:bg-white focus:outline-none transition-all text-sm mb-4 placeholder:text-purple-400 font-medium"
              />
              <button 
                onClick={askAi}
                disabled={loading}
                className="w-full bg-purple-800 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-purple-900 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : '인사이트 확인하기'}
              </button>
            </div>
          </div>

          {insight && (
            <div className="bg-white p-6 rounded-[2rem] border border-purple-100 shadow-sm animate-in zoom-in-95 duration-300 text-left">
              <h5 className="font-black text-purple-600 mb-2">AI 분석 결과</h5>
              <p className="text-sm text-gray-600 font-medium leading-relaxed whitespace-pre-line">{insight}</p>
            </div>
          )}

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h4 className="font-black text-gray-800 mb-6">활동 요약</h4>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 font-bold">주간 평균 활동</span>
                <span className="text-sm font-black text-gray-800">52분</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 font-bold">목표 달성일</span>
                <span className="text-sm font-black text-gray-800">5 / 7일</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;
