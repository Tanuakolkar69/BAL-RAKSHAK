
import React from 'react';
import { Calendar, CheckCircle, Clock, User } from 'lucide-react';

interface HomePageProps {
  babyData: any;
}

const HomePage: React.FC<HomePageProps> = ({ babyData }) => {
  const upcomingVaccines = [
    { name: 'Hepatitis B', date: '2025-01-15', age: '2 months' },
    { name: 'DTaP', date: '2025-02-10', age: '3 months' },
  ];

  const completedVaccines = [
    { name: 'Hepatitis B (Birth)', date: '2024-12-15', hospital: 'General Hospital' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-400 to-pink-400 pt-12 pb-8 px-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">👶</span>
            </div>
            <div>
              <h1 className="text-white text-lg font-semibold">Hello, {babyData?.parentName || 'Parent'}</h1>
              <p className="text-white/80 text-sm">{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Calendar size={20} className="text-white" />
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4 max-w-md mx-auto space-y-6">
        {/* Baby Profile Card */}
        <div className="baby-card">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center">
              <span className="text-2xl">👶</span>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">{babyData?.babyName || 'Baby Name'}</h2>
              <p className="text-gray-600">{babyData?.babyId || 'HS-BB-12345'}</p>
              <p className="text-sm text-gray-500">Born: {babyData?.dateOfBirth || '2024-12-15'}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle size={20} className="text-green-600" />
              <span className="text-sm font-medium text-green-800">Completed</span>
            </div>
            <p className="text-2xl font-bold text-green-700">1</p>
            <p className="text-xs text-green-600">vaccines</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock size={20} className="text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Upcoming</span>
            </div>
            <p className="text-2xl font-bold text-orange-700">2</p>
            <p className="text-xs text-orange-600">vaccines</p>
          </div>
        </div>

        {/* Next Vaccines */}
        <div className="baby-card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Next Vaccines</h3>
          <div className="space-y-3">
            {upcomingVaccines.map((vaccine, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                    <span className="text-sm">💉</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{vaccine.name}</p>
                    <p className="text-sm text-gray-600">Age: {vaccine.age}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-purple-600">{vaccine.date}</p>
                  <p className="text-xs text-gray-500">Due date</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="baby-card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {completedVaccines.map((vaccine, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                  <CheckCircle size={16} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{vaccine.name}</p>
                  <p className="text-sm text-gray-600">{vaccine.hospital}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600">{vaccine.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tip of the Day */}
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-4">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg">💡</span>
            <h3 className="font-semibold text-orange-800">Tip of the Day</h3>
          </div>
          <p className="text-orange-700 text-sm">
            Keep your baby hydrated after vaccinations. Breast milk or formula helps comfort them and supports their immune response.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
