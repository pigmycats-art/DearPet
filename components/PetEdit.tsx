
import React, { useState } from 'react';
import { Pet } from '../types';
import { Camera, Check, X, Dog, Cat, Hash, Weight, Calendar } from 'lucide-react';

interface PetEditProps {
  pet?: Pet;
  onSave: (pet: Pet) => void;
  onCancel: () => void;
}

const PetEdit: React.FC<PetEditProps> = ({ pet, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Pet>>(pet || {
    name: '',
    species: 'Dog',
    breed: '',
    birthDate: '2020-01-01',
    weight: 5.0,
    regNumber: '',
    avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600&h=600'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: pet?.id || `pet-${Date.now()}`
    } as Pet);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-left max-w-xl mx-auto px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-gray-900">{pet ? '정보 수정' : '아이 등록'}</h2>
        <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 pb-12">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <img 
              src={formData.avatar} 
              className="w-40 h-40 rounded-[3rem] object-cover ring-4 ring-purple-100 shadow-xl" 
              alt="avatar preview" 
            />
            <button 
              type="button"
              className="absolute bottom-0 right-0 p-3 bg-purple-600 text-white rounded-2xl shadow-lg border-4 border-white hover:scale-110 transition-all"
            >
              <Camera size={20} />
            </button>
          </div>
          <p className="text-[11px] text-gray-400 font-black">사랑스러운 사진을 등록해주세요!</p>
        </div>

        {/* Input Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">반려동물 이름</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-6 py-4 bg-white rounded-[1.5rem] border border-gray-100 focus:border-purple-300 outline-none transition-all font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">종류</label>
                <div className="flex gap-2">
                    {['Dog', 'Cat'].map(s => (
                        <button
                            key={s}
                            type="button"
                            onClick={() => setFormData({ ...formData, species: s as any })}
                            className={`flex-1 py-4 rounded-2xl border font-black text-sm transition-all ${
                                formData.species === s 
                                    ? 'bg-purple-600 border-purple-600 text-white shadow-lg' 
                                    : 'bg-white border-gray-100 text-gray-400'
                            }`}
                        >
                            {s === 'Dog' ? '강아지' : '고양이'}
                        </button>
                    ))}
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">품종</label>
                <input 
                    required
                    type="text" 
                    value={formData.breed}
                    onChange={e => setFormData({ ...formData, breed: e.target.value })}
                    className="w-full px-6 py-4 bg-white rounded-[1.5rem] border border-gray-100 focus:border-purple-300 outline-none transition-all font-bold"
                />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                    <Calendar size={12} /> 출생일
                </label>
                <input 
                    required
                    type="date" 
                    value={formData.birthDate}
                    onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-6 py-4 bg-white rounded-[1.5rem] border border-gray-100 focus:border-purple-300 outline-none font-bold"
                />
             </div>
             <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                    <Weight size={12} /> 몸무게 (kg)
                </label>
                <input 
                    required
                    type="number" 
                    step="0.1"
                    value={formData.weight}
                    onChange={e => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })}
                    className="w-full px-6 py-4 bg-white rounded-[1.5rem] border border-gray-100 focus:border-purple-300 outline-none font-bold"
                />
             </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                <Hash size={12} /> 동물등록번호 (선택)
            </label>
            <input 
              type="text" 
              value={formData.regNumber}
              onChange={e => setFormData({ ...formData, regNumber: e.target.value })}
              placeholder="000-00-000000"
              className="w-full px-6 py-4 bg-white rounded-[1.5rem] border border-gray-100 focus:border-purple-300 outline-none transition-all font-bold"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="button"
            onClick={onCancel}
            className="flex-1 py-5 bg-gray-100 text-gray-500 rounded-[2rem] font-black"
          >
            취소
          </button>
          <button 
            type="submit"
            className="flex-[2] py-5 lavender-button text-white rounded-[2rem] font-black shadow-xl flex items-center justify-center gap-2"
          >
            <Check size={20} /> {pet ? '저장하기' : '등록완료'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PetEdit;
