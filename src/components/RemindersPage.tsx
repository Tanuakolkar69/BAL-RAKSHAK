
import React, { useState } from 'react';
import { Bell, Clock, Calendar, Settings as SettingsIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const RemindersPage: React.FC = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    smsNotifications: false,
    emailNotifications: true,
  });

  // Updated reminders based on IAP Immunization Timetable (2020-21)
  const upcomingReminders = [
    {
      id: 1,
      type: 'vaccine',
      title: 'DTP-1 (6 Weeks)',
      description: 'First dose - Mandatory',
      date: '2025-01-26',
      time: '09:00 AM',
      urgency: 'high',
      mandatory: true,
    },
    {
      id: 2,
      type: 'vaccine',
      title: 'IPV-1 (6 Weeks)',
      description: 'First dose - Mandatory',
      date: '2025-01-27',
      time: '09:30 AM',
      urgency: 'high',
      mandatory: true,
    },
    {
      id: 3,
      type: 'vaccine',
      title: 'Hepatitis B-2 (6 Weeks)',
      description: 'Second dose - Mandatory',
      date: '2025-01-28',
      time: '10:00 AM',
      urgency: 'high',
      mandatory: true,
    },
    {
      id: 4,
      type: 'vaccine',
      title: 'Hib-1 (6 Weeks)',
      description: 'First dose - Mandatory',
      date: '2025-01-29',
      time: '10:30 AM',
      urgency: 'high',
      mandatory: true,
    },
    {
      id: 5,
      type: 'vaccine',
      title: 'Rotavirus-1 (6 Weeks)',
      description: 'First dose - Mandatory',
      date: '2025-01-30',
      time: '11:00 AM',
      urgency: 'high',
      mandatory: true,
    },
    {
      id: 6,
      type: 'vaccine',
      title: 'PCV-1 (6 Weeks)',
      description: 'First dose - Mandatory',
      date: '2025-01-31',
      time: '11:30 AM',
      urgency: 'high',
      mandatory: true,
    },
    {
      id: 7,
      type: 'appointment',
      title: 'Dr. Sarah Johnson',
      description: '6-week checkup & vaccinations',
      date: '2025-01-25',
      time: '02:00 PM',
      urgency: 'medium',
    },
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'from-red-100 to-orange-100 border-red-200';
      case 'medium':
        return 'from-yellow-100 to-amber-100 border-yellow-200';
      case 'low':
        return 'from-blue-100 to-purple-100 border-blue-200';
      default:
        return 'from-gray-100 to-gray-200 border-gray-200';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🔵';
      default:
        return '⚪';
    }
  };

  const toggleNotificationSetting = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-400 to-purple-400 pt-12 pb-6 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center animate-pulse-soft">
            <Bell size={24} className="text-white" />
          </div>
          <h1 className="text-white text-xl font-semibold">Vaccination Reminders</h1>
          <p className="text-white/80 text-sm mt-1">IAP 2020-21 Schedule</p>
        </div>
      </div>

      <div className="px-4 -mt-2 max-w-md mx-auto space-y-6">
        {/* Current Phase Info */}
        <div className="baby-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Current Phase</h3>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
              <span className="text-xl">📅</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                <Clock size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-blue-800">6 Weeks Schedule</p>
                <p className="text-sm text-blue-600">6 mandatory vaccines due</p>
                <p className="text-xs text-gray-500">Starting January 26, 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Reminders */}
        <div className="baby-card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Vaccines</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {upcomingReminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`p-4 rounded-2xl border bg-gradient-to-r ${getUrgencyColor(reminder.urgency)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getUrgencyIcon(reminder.urgency)}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-800">{reminder.title}</h4>
                      {reminder.mandatory && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Mandatory</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{reminder.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>{reminder.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{reminder.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="baby-card">
          <div className="flex items-center space-x-3 mb-4">
            <SettingsIcon size={20} className="text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">Notification Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Push Notifications</p>
                <p className="text-sm text-gray-600">Get alerts on your device</p>
              </div>
              <Switch
                checked={notificationSettings.pushNotifications}
                onCheckedChange={() => toggleNotificationSetting('pushNotifications')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">SMS Notifications</p>
                <p className="text-sm text-gray-600">Receive text messages</p>
              </div>
              <Switch
                checked={notificationSettings.smsNotifications}
                onCheckedChange={() => toggleNotificationSetting('smsNotifications')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Email Notifications</p>
                <p className="text-sm text-gray-600">Get reminders via email</p>
              </div>
              <Switch
                checked={notificationSettings.emailNotifications}
                onCheckedChange={() => toggleNotificationSetting('emailNotifications')}
              />
            </div>
          </div>
        </div>

        {/* IAP Reminder Timing */}
        <div className="baby-card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">IAP Reminder Schedule</h3>
          
          <div className="space-y-3">
            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">3 days before vaccine due</span>
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Day of vaccination</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="p-3 bg-orange-50 rounded-2xl border border-orange-100">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">2 days after (if missed)</span>
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* IAP Guidelines Note */}
        <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-3xl p-4">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg">📋</span>
            <h3 className="font-semibold text-teal-800">Important Note</h3>
          </div>
          <p className="text-teal-700 text-sm">
            This schedule follows IAP 2020-21 guidelines. Some vaccines can be given together, 
            but consult your pediatrician for the best timing and spacing for your baby.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RemindersPage;
