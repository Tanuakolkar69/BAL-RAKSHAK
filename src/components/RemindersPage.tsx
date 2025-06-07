
import React, { useState } from 'react';
import { Bell, Clock, Calendar, Settings as SettingsIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const RemindersPage: React.FC = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    smsNotifications: false,
    emailNotifications: true,
  });

  const upcomingReminders = [
    {
      id: 1,
      type: 'vaccine',
      title: 'Hepatitis B Vaccine',
      description: 'Due in 3 days',
      date: '2025-01-15',
      time: '09:00 AM',
      urgency: 'medium',
    },
    {
      id: 2,
      type: 'appointment',
      title: 'Dr. Sarah Johnson',
      description: 'Routine checkup',
      date: '2025-01-20',
      time: '02:00 PM',
      urgency: 'low',
    },
    {
      id: 3,
      type: 'vaccine',
      title: 'DTaP Vaccine',
      description: 'Due in 2 weeks',
      date: '2025-02-10',
      time: '10:30 AM',
      urgency: 'low',
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
          <h1 className="text-white text-xl font-semibold">Reminders</h1>
          <p className="text-white/80 text-sm mt-1">Stay on top of your baby's health</p>
        </div>
      </div>

      <div className="px-4 -mt-2 max-w-md mx-auto space-y-6">
        {/* Today's Progress */}
        <div className="baby-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Today's Progress</h3>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
              <span className="text-xl">📅</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                <Clock size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-800">All caught up!</p>
                <p className="text-sm text-green-600">No reminders for today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Reminders */}
        <div className="baby-card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Reminders</h3>
          <div className="space-y-3">
            {upcomingReminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`p-4 rounded-2xl border bg-gradient-to-r ${getUrgencyColor(reminder.urgency)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getUrgencyIcon(reminder.urgency)}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{reminder.title}</h4>
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

        {/* Reminder Timing */}
        <div className="baby-card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Reminder Timing</h3>
          
          <div className="space-y-3">
            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Notify 3 days before</span>
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Notify 1 day before</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="p-3 bg-green-50 rounded-2xl border border-green-100">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Notify on the day</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemindersPage;
