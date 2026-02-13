
import React from 'react';
import { Users, MapPin, Calendar, ArrowRight, MessageCircle } from 'lucide-react';

const Community: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col items-center text-center gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">펫 커뮤니티</h2>
          <p className="text-gray-500">우리 동네 친구들과 함께하는 즐거운 산책 모임</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-100 px-6 py-3 rounded-2xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
            내 모임
          </button>
          <button className="lavender-button text-white px-8 py-3 rounded-2xl flex items-center gap-2 font-semibold shadow-lg shadow-purple-100">
            <Users size={20} />
            <span>모임 만들기</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: '반포 한강공원 야간 산책', loc: '반포 한강공원', time: '오늘 저녁 8시', members: 12, category: '산책' },
          { title: '골든 리트리버 대가족 정기모임', loc: '강남 반려견 놀이터', time: '이번주 토요일 14:00', members: 25, category: '품종별' },
          { title: '강아지 행동 교정 무료 나눔', loc: '역삼동 카페 퍼피', time: '3월 2일 11:00', members: 8, category: '교육' },
          { title: '댕댕이 피크닉 하실 분?', loc: '올림픽공원', time: '내일 오후 1시', members: 5, category: '자유' },
          { title: '소형견 전용 산책 친구 찾아요', loc: '압구정 로데오', time: '매주 일요일', members: 10, category: '산책' },
        ].map((meetup, i) => (
          <div key={i} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition-all group text-left">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold bg-purple-50 text-purple-600 px-3 py-1.5 rounded-full uppercase tracking-wider">
                {meetup.category}
              </span>
              <div className="flex -space-x-2">
                {[1, 2, 3].map(p => (
                  <div key={p} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${p + i}/100/100`} alt="member" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-100 flex items-center justify-center text-[10px] font-bold text-purple-600">
                  +{meetup.members}
                </div>
              </div>
            </div>
            
            <h4 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors">
              {meetup.title}
            </h4>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={16} className="text-gray-400" />
                <span>{meetup.loc}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={16} className="text-gray-400" />
                <span>{meetup.time}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-gray-50 text-gray-600 py-3 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <MessageCircle size={16} /> 톡 참여
              </button>
              <button className="flex-1 bg-purple-600 text-white py-3 rounded-2xl font-bold text-sm hover:bg-purple-700 shadow-md shadow-purple-100 transition-all flex items-center justify-center gap-2">
                참가신청 <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
