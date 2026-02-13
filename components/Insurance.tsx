
import React from 'react';
import { Shield, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { Pet } from '../types';

interface InsuranceProps {
  activePet: Pet;
}

const Insurance: React.FC<InsuranceProps> = ({ activePet }) => {
  return (
    <div className="animate-in fade-in duration-500 text-left">
      <div className="flex flex-col items-center text-center gap-6 mb-12">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img src={activePet.avatar} alt={activePet.name} className="w-20 h-20 rounded-[2rem] object-cover border-4 border-white shadow-lg" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Shield size={16} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{activePet.name}의 보험 관리</h2>
          <p className="text-gray-500">보장 범위와 청구 내역을 한눈에 확인하세요.</p>
        </div>
        <button className="lavender-button text-white px-8 py-3.5 rounded-2xl flex items-center gap-2 font-semibold shadow-lg shadow-purple-100">
          <FileText size={20} />
          <span>신규 청구하기</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-[4rem] flex items-center justify-center -translate-y-2 translate-x-2">
            <Shield size={48} className="text-purple-200" />
          </div>
          <div className="relative z-10 text-left">
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">가입 중</span>
            <h3 className="text-2xl font-bold text-gray-800 mt-4 mb-2">DB 손해보험 펫건강플랜</h3>
            <p className="text-gray-400 text-sm mb-6">증권번호: 12345-67890-ABC</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-green-500" />
                <span className="text-gray-600">입/통원 의료비 70% 보장</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-green-500" />
                <span className="text-gray-600">수술비 연 2회 한도 내 전액</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <span className="text-sm text-gray-500">다음 갱신일</span>
              <span className="font-bold text-gray-800">2026. 03. 15</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-left">보장 한도 현황</h3>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-gray-100 stroke-current"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-purple-600 stroke-current"
                  strokeWidth="3"
                  strokeDasharray="65, 100"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">65%</span>
                <span className="text-[10px] text-gray-400">잔여 한도</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">입통원비</span>
              <span className="font-medium">1.3M / 2.0M KRW</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;
