
import React from 'react';
import { Calendar, CheckCircle, Clock, User } from 'lucide-react';

interface HomePageProps {
  babyData: any;
}

const HomePage: React.FC<HomePageProps> = ({ babyData }) => {
  // Updated vaccine data based on IAP Immunization Timetable (2020-21)
  const upcomingVaccines = [
    { name: 'DTP-1 (6 Weeks)', date: '2025-01-26', age: '6 weeks', mandatory: true },
    { name: 'IPV-1 (6 Weeks)', date: '2025-01-27', age: '6 weeks', mandatory: true },
    { name: 'Hepatitis B-2 (6 Weeks)', date: '2025-01-28', age: '6 weeks', mandatory: true },
    { name: 'Hib-1 (6 Weeks)', date: '2025-01-29', age: '6 weeks', mandatory: true },
  ];

  const completedVaccines = [
    { name: 'BCG (At Birth)', date: '2024-12-15', hospital: 'General Hospital', mandatory: true },
    { name: 'Hepatitis B-1 (At Birth)', date: '2024-12-16', hospital: 'General Hospital', mandatory: true },
    { name: 'OPV-0 (At Birth)', date: '2024-12-17', hospital: 'General Hospital', mandatory: true },
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
              <p className="text-xs text-purple-600">Following IAP 2020-21 Schedule</p>
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
            <p className="text-2xl font-bold text-green-700">3</p>
            <p className="text-xs text-green-600">vaccines (Birth)</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock size={20} className="text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Next Phase</span>
            </div>
            <p className="text-2xl font-bold text-orange-700">6</p>
            <p className="text-xs text-orange-600">vaccines at 6 weeks</p>
          </div>
        </div>

        {/* Next Vaccines (6 weeks schedule) */}
        <div className="baby-card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Next: 6 Weeks Schedule</h3>
          <div className="space-y-3">
            {upcomingVaccines.map((vaccine, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                    <span className="text-sm">💉</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{vaccine.name}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-600">Age: {vaccine.age}</p>
                      {vaccine.mandatory && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Mandatory</span>
                      )}
                    </div>
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

        {/* Recent Activity (Birth vaccines) */}
        <div className="baby-card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Completed: Birth Vaccines</h3>
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
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Mandatory</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IAP Schedule Info */}
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-4">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg">📋</span>
            <h3 className="font-semibold text-purple-800">IAP Schedule 2020-21</h3>
          </div>
          <p className="text-purple-700 text-sm">
            Your baby's immunization follows the official Indian Academy of Pediatrics guidelines. 
            All mandatory vaccines are essential for your baby's health and development.
          </p>
        </div>

        {/* Tip of the Day */}
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-4">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg">💡</span>
            <h3 className="font-semibold text-orange-800">Tip of the Day</h3>
          </div>
          <p className="text-orange-700 text-sm">
            The 6-week vaccination schedule includes multiple vaccines. Discuss with your pediatrician about 
            spacing them across a few days to monitor for any reactions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
