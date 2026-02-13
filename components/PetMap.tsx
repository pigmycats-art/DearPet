
import React, { useState, useEffect, useRef } from 'react';
import { Search, Navigation, Hospital, Hotel, Users, Dog, ExternalLink, MapPin, Trees, Home } from 'lucide-react';
import { searchFacilities } from '../services/geminiService';
import { Pet } from '../types';
import L from 'leaflet';

interface PetMapProps {
  activePet: Pet;
}

const PetMap: React.FC<PetMapProps> = ({ activePet }) => {
  // 카테고리 상태 관리 (고양이일 경우 'Hotel'이나 'Sitter'로 기본값 설정 고려 가능하나 Hospital이 기본)
  const [filter, setFilter] = useState<string>('Hospital');
  const [loading, setLoading] = useState(false);
  const [facilities, setFacilities] = useState<any[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number}>({ lat: 37.5665, lng: 126.9780 });

  // 반려동물 종에 따른 카테고리 구성
  const categories = activePet.species === 'Cat' 
    ? [
        { id: 'Hospital', label: '동물병원', icon: Hospital },
        { id: 'Hotel', label: '고양이호텔', icon: Hotel },
        { id: 'Sitter', label: '펫시터/방문탁묘', icon: Home },
      ]
    : [
        { id: 'Hospital', label: '동물병원', icon: Hospital },
        { id: 'Playground', label: '놀이터', icon: Dog },
        { id: 'Park', label: '산책공원', icon: Trees },
      ];

  // 필터가 현재 카테고리에 없는 경우(종 전환 시) 기본값으로 초기화
  useEffect(() => {
    if (!categories.find(c => c.id === filter)) {
      setFilter('Hospital');
    }
  }, [activePet.species]);

  // 지도 초기화 및 리사이징 이슈 해결
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false
      }).setView([userLocation.lat, userLocation.lng], 14);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(mapRef.current);

      markersRef.current = L.layerGroup().addTo(mapRef.current);

      // 리플렛 지도가 컨테이너 크기를 즉시 인식하지 못하는 문제 해결
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 300);

      // 사용자 위치 가져오기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const newLoc = { lat: latitude, lng: longitude };
            setUserLocation(newLoc);
            mapRef.current?.setView([latitude, longitude], 14);
            
            L.circleMarker([latitude, longitude], {
              radius: 8,
              fillColor: '#9333EA',
              fillOpacity: 0.2,
              color: '#9333EA',
              weight: 2
            }).addTo(mapRef.current!);
          },
          () => console.log("위치 정보를 가져올 수 없습니다.")
        );
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // 탭 전환 등으로 지도가 다시 보일 때 크기 재계산
  useEffect(() => {
    const timer = setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // 종 정보를 포함하여 검색 쿼리 강화
      const searchQuery = `${activePet.species === 'Cat' ? '고양이' : '강아지'} 전용 ${filter}`;
      const res = await searchFacilities(userLocation.lat, userLocation.lng, searchQuery);
      
      if (markersRef.current) {
        markersRef.current.clearLayers();
        
        const validFacilities = res.filter((chunk: any) => chunk.maps);
        setFacilities(validFacilities);

        validFacilities.forEach((chunk: any) => {
          const place = chunk.maps;
          const markerLat = userLocation.lat + (Math.random() - 0.5) * 0.015;
          const markerLng = userLocation.lng + (Math.random() - 0.5) * 0.015;

          const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: #9333EA; padding: 8px; border-radius: 50%; color: white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border: 2px solid white;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/></svg>
                  </div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32]
          });

          L.marker([markerLat, markerLng], { icon: customIcon })
            .bindPopup(`<div class="p-2 text-left"><strong>${place.title}</strong><br/><p class="text-[10px] text-gray-500 my-1">${activePet.name}를 위한 추천 장소</p><a href="${place.uri}" target="_blank" class="text-purple-600 text-xs font-bold underline">상세 보기</a></div>`)
            .addTo(markersRef.current!);
        });
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [filter, userLocation, activePet.species]);

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500 text-left">
      <div className="mb-6 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder={`${activePet.name} 주변 장소 검색...`} 
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
          />
        </div>
        
        <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm w-full lg:w-auto overflow-x-auto">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${filter === cat.id ? 'bg-purple-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <cat.icon size={16} /> {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 지도가 보이지 않는 문제를 해결하기 위해 고정된 최소 높이(min-h)와 h-full을 확실히 부여 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[500px] h-[calc(100vh-280px)]">
        <div className="lg:col-span-2 relative rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-lg z-0 bg-gray-100">
          <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />
          
          <button 
            onClick={() => mapRef.current?.setView([userLocation.lat, userLocation.lng], 15)}
            className="absolute bottom-6 right-6 z-[1000] p-3 bg-white rounded-full shadow-2xl text-purple-600 hover:bg-purple-50 transition-colors border border-gray-100 active:scale-95"
          >
            <Navigation size={20} />
          </button>
          
          {loading && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <span className="text-xs font-bold text-gray-600">주변 장소 탐색 중...</span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <MapPin size={18} className="text-purple-600" />
              {activePet.name} 주변 추천
            </h3>
            <span className="text-[10px] bg-purple-50 text-purple-600 px-2 py-1 rounded-lg font-bold">
              {activePet.species === 'Cat' ? 'Cat Friendly' : 'Dog Friendly'}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {loading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse flex gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : facilities.length > 0 ? (
              facilities.map((chunk, i) => (
                <div key={i} className="flex flex-col p-4 rounded-2xl border border-gray-50 hover:border-purple-100 hover:bg-purple-50/30 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-1">
                      {chunk.maps.title}
                    </h4>
                    <a href={chunk.maps.uri} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <p className="text-[11px] text-gray-500 mb-2 leading-relaxed">
                    {activePet.species === 'Cat' ? '묘주들이 선호하는 깔끔한 시설입니다.' : '반려견과 함께하기 좋은 쾌적한 장소입니다.'}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map(s => <span key={s} className="text-yellow-400 text-[10px]">★</span>)}
                    </div>
                    <span className="text-[10px] font-bold text-gray-400">리뷰 확인 가능</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                  <MapPin size={32} />
                </div>
                <p className="text-gray-400 text-sm font-medium">검색된 추천 장소가 없습니다.<br/><span className="text-[10px]">지도를 움직여 다시 시도해 보세요.</span></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetMap;
