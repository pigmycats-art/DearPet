
import React, { useState } from 'react';
import { AppTab, Pet } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PetMap from './components/PetMap';
import HealthRecords from './components/HealthRecords';
import Insurance from './components/Insurance';
import Community from './components/Community';
import Calendar from './components/Calendar';
import PetEdit from './components/PetEdit';

const MOCK_PETS: Pet[] = [
  { 
    id: 'pet-1', 
    name: '김미호', 
    species: 'Dog', 
    breed: '푸들', 
    avatar: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600&h=600',
    birthDate: '2019-10-15',
    weight: 4.8,
    regNumber: '410-000-000001'
  },
  { 
    id: 'pet-2', 
    name: '쿠키', 
    species: 'Cat', 
    breed: '코리안 숏헤어', 
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600&h=600',
    birthDate: '2022-03-20',
    weight: 3.2,
    regNumber: '410-000-000002'
  },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [pets, setPets] = useState<Pet[]>(MOCK_PETS);
  const [activePetId, setActivePetId] = useState<string>(MOCK_PETS[0].id);

  const activePet = pets.find(p => p.id === activePetId) || pets[0];

  const handleUpdatePet = (updatedPet: Pet) => {
    setPets(prev => prev.map(p => p.id === updatedPet.id ? updatedPet : p));
    setActiveTab(AppTab.DASHBOARD);
  };

  const handleAddPet = (newPet: Pet) => {
    setPets(prev => [...prev, newPet]);
    setActivePetId(newPet.id);
    setActiveTab(AppTab.DASHBOARD);
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard activePet={activePet} onEditProfile={() => setActiveTab(AppTab.PET_EDIT)} />;
      case AppTab.MAP:
        return <PetMap activePet={activePet} />;
      case AppTab.HEALTH:
        return <HealthRecords activePet={activePet} />;
      case AppTab.CALENDAR:
        return <Calendar activePet={activePet} />;
      case AppTab.INSURANCE:
        return <Insurance activePet={activePet} />;
      case AppTab.COMMUNITY:
        return <Community />;
      case AppTab.PET_EDIT:
        return <PetEdit pet={activePet} onSave={handleUpdatePet} onCancel={() => setActiveTab(AppTab.DASHBOARD)} />;
      case AppTab.PET_ADD:
        return <PetEdit onSave={handleAddPet} onCancel={() => setActiveTab(AppTab.DASHBOARD)} />;
      default:
        return <Dashboard activePet={activePet} onEditProfile={() => setActiveTab(AppTab.PET_EDIT)} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      pets={pets}
      activePetId={activePetId}
      onPetChange={setActivePetId}
      onEditProfile={() => setActiveTab(AppTab.PET_EDIT)}
      onAddPet={() => setActiveTab(AppTab.PET_ADD)}
    >
      <div className="w-full">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
