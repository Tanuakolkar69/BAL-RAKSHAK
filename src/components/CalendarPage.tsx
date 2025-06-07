
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const vaccineEvents = {
    '2024-12-15': { type: 'completed', name: 'Hepatitis B (Birth)' },
    '2025-01-15': { type: 'upcoming', name: 'Hepatitis B' },
    '2025-02-10': { type: 'upcoming', name: 'DTaP' },
    '2025-02-15': { type: 'overdue', name: 'Rotavirus' },
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
        return 'bg-green-100 border-green-300 text-green-700';
      case 'upcoming':
        return 'bg-blue-100 border-blue-300 text-blue-700';
      case 'overdue':
        return 'bg-red-100 border-red-300 text-red-700';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-700';
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
              <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
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
                  className={`h-12 rounded-xl flex flex-col items-center justify-center text-sm transition-all cursor-pointer
                    ${isToday 
                      ? 'bg-purple-500 text-white font-semibold' 
                      : event 
                        ? getEventTypeColor(event.type)
                        : 'hover:bg-gray-50'
                    }`}
                >
                  <span className={`${isToday ? 'text-white' : ''}`}>{day}</span>
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
              <div className="w-4 h-4 bg-green-200 border border-green-300 rounded"></div>
              <span className="text-sm text-gray-700">Completed vaccines</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-200 border border-blue-300 rounded"></div>
              <span className="text-sm text-gray-700">Upcoming vaccines</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-red-200 border border-red-300 rounded"></div>
              <span className="text-sm text-gray-700">Overdue vaccines</span>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="baby-card mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming This Month</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-2xl">
              <Clock size={20} className="text-blue-600" />
              <div className="flex-1">
                <p className="font-medium text-gray-800">Hepatitis B</p>
                <p className="text-sm text-gray-600">January 15, 2025</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-2xl">
              <Clock size={20} className="text-blue-600" />
              <div className="flex-1">
                <p className="font-medium text-gray-800">DTaP</p>
                <p className="text-sm text-gray-600">February 10, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
