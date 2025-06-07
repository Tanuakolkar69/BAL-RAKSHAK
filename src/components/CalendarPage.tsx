import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Updated vaccine schedule based on IAP Immunization Timetable (2020-21)
  const vaccineEvents = {
    // Birth vaccines (assuming baby born on Dec 15, 2024)
    '2024-12-15': { type: 'completed', name: 'BCG (At Birth)', mandatory: true },
    '2024-12-16': { type: 'completed', name: 'Hepatitis B-1 (At Birth)', mandatory: true },
    '2024-12-17': { type: 'completed', name: 'OPV-0 (At Birth)', mandatory: true },
    
    // 6 weeks vaccines (Jan 26, 2025)
    '2025-01-26': { type: 'upcoming', name: 'DTP-1 (6 Weeks)', mandatory: true },
    '2025-01-27': { type: 'upcoming', name: 'IPV-1 (6 Weeks)', mandatory: true },
    '2025-01-28': { type: 'upcoming', name: 'Hepatitis B-2 (6 Weeks)', mandatory: true },
    '2025-01-29': { type: 'upcoming', name: 'Hib-1 (6 Weeks)', mandatory: true },
    '2025-01-30': { type: 'upcoming', name: 'Rotavirus-1 (6 Weeks)', mandatory: true },
    '2025-01-31': { type: 'upcoming', name: 'PCV-1 (6 Weeks)', mandatory: true },
    
    // 10 weeks vaccines (Feb 23, 2025)
    '2025-02-23': { type: 'upcoming', name: 'DTP-2 (10 Weeks)', mandatory: true },
    '2025-02-24': { type: 'upcoming', name: 'IPV-2 (10 Weeks)', mandatory: true },
    '2025-02-25': { type: 'upcoming', name: 'Hib-2 (10 Weeks)', mandatory: true },
    '2025-02-26': { type: 'upcoming', name: 'Rotavirus-2 (10 Weeks)', mandatory: true },
    '2025-02-27': { type: 'upcoming', name: 'PCV-2 (10 Weeks)', mandatory: true },
    
    // 14 weeks vaccines (Mar 23, 2025)
    '2025-03-23': { type: 'upcoming', name: 'DTP-3 (14 Weeks)', mandatory: true },
    '2025-03-24': { type: 'upcoming', name: 'IPV-3 (14 Weeks)', mandatory: true },
    '2025-03-25': { type: 'upcoming', name: 'Hib-3 (14 Weeks)', mandatory: true },
    '2025-03-26': { type: 'upcoming', name: 'Rotavirus-3 (14 Weeks)', mandatory: true },
    '2025-03-27': { type: 'upcoming', name: 'PCV-3 (14 Weeks)', mandatory: true },
    
    // 6 months vaccines (Jun 15, 2025)
    '2025-06-15': { type: 'upcoming', name: 'Hepatitis B-3 (6 Months)', mandatory: true },
    '2025-06-16': { type: 'upcoming', name: 'Influenza-1 (6 Months)', mandatory: false },
    
    // 9 months vaccines (Sep 15, 2025)
    '2025-09-15': { type: 'upcoming', name: 'MMR-1 (9 Months)', mandatory: true },
    '2025-09-16': { type: 'upcoming', name: 'Typhoid Conjugate (9-12 Months)', mandatory: true },
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDateKey = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month, day).toISOString().split('T')[0];
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'completed':
        return 'bg-green-200 border-green-400 text-black';
      case 'upcoming':
        return 'bg-blue-200 border-blue-400 text-black';
      case 'overdue':
        return 'bg-red-200 border-red-400 text-black';
      default:
        return 'bg-gray-100 border-gray-300 text-black';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'completed':
        return <CheckCircle size={12} className="text-green-600" />;
      case 'upcoming':
        return <Clock size={12} className="text-blue-600" />;
      case 'overdue':
        return <AlertCircle size={12} className="text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-purple-400 pt-12 pb-6 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-white text-xl font-semibold text-center mb-4">Vaccine Calendar</h1>
          
          {/* Month Navigation */}
          <div className="flex items-center justify-between bg-white/20 rounded-2xl p-3">
            <button 
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            
            <h2 className="text-white font-semibold">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            
            <button 
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-2 max-w-md mx-auto">
        {/* Calendar */}
        <div className="baby-card">
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center text-sm font-medium text-black py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {getDaysInMonth(currentDate).map((day, index) => {
              if (day === null) {
                return <div key={index} className="h-12"></div>;
              }
              
              const dateKey = getDateKey(day);
              const event = vaccineEvents[dateKey];
              const today = new Date();
              const isToday = dateKey === today.toISOString().split('T')[0];
              
              return (
                <div
                  key={day}
                  className={`h-12 rounded-xl flex flex-col items-center justify-center text-sm transition-all cursor-pointer border-2
                    ${isToday 
                      ? 'bg-purple-500 text-white font-semibold border-purple-600' 
                      : event 
                        ? `${getEventTypeColor(event.type)} border-2`
                        : 'hover:bg-gray-50 text-black border-transparent'
                    }`}
                >
                  <span className={`font-medium ${isToday ? 'text-white' : 'text-black'}`}>{day}</span>
                  {event && !isToday && (
                    <div className="mt-1">
                      {getEventIcon(event.type)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="baby-card mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Legend</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-200 border border-green-400 rounded"></div>
              <span className="text-sm text-gray-700">Completed vaccines</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-200 border border-blue-400 rounded"></div>
              <span className="text-sm text-gray-700">Upcoming vaccines</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-red-200 border border-red-400 rounded"></div>
              <span className="text-sm text-gray-700">Overdue vaccines</span>
            </div>
          </div>
        </div>

        {/* IAP Schedule Summary */}
        <div className="baby-card mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">IAP Immunization Schedule</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            <div className="text-xs text-gray-600 mb-2">Based on IAP 2020-21 Guidelines</div>
            
            <div className="space-y-2">
              <div className="p-2 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-800">Birth (Completed)</p>
                <p className="text-xs text-green-600">BCG, Hepatitis B-1, OPV-0</p>
              </div>
              
              <div className="p-2 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800">6 Weeks (Upcoming)</p>
                <p className="text-xs text-blue-600">DTP-1, IPV-1, Hepatitis B-2, Hib-1, Rotavirus-1, PCV-1</p>
              </div>
              
              <div className="p-2 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800">10 Weeks (Upcoming)</p>
                <p className="text-xs text-blue-600">DTP-2, IPV-2, Hib-2, Rotavirus-2, PCV-2</p>
              </div>
              
              <div className="p-2 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800">14 Weeks (Upcoming)</p>
                <p className="text-xs text-blue-600">DTP-3, IPV-3, Hib-3, Rotavirus-3, PCV-3</p>
              </div>
              
              <div className="p-2 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-800">Future Schedule</p>
                <p className="text-xs text-purple-600">6 months: Hepatitis B-3, Influenza-1</p>
                <p className="text-xs text-purple-600">9 months: MMR-1, Typhoid Conjugate</p>
                <p className="text-xs text-purple-600">12+ months: Hepatitis A, MMR-2, Boosters</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
