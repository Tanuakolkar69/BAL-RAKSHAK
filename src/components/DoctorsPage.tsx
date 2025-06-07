import React, { useState } from 'react';
import { User, Calendar, MapPin, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DoctorsPage: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  const doctor = {
    name: 'Dr. Sarah Johnson',
    specialty: 'Pediatrician',
    hospital: 'Children\'s Medical Center',
    address: '123 Healthcare Blvd, Medical District',
    phone: '+1 (555) 123-4567',
    rating: 4.9,
    experience: '15 years',
    photo: '👩‍⚕️',
  };

  const appointmentHistory = [
    {
      id: 1,
      date: '2024-12-15',
      time: '10:00 AM',
      type: 'Newborn Checkup',
      notes: 'Healthy development, vaccines up to date',
    },
    {
      id: 2,
      date: '2024-11-20',
      time: '2:30 PM',
      type: 'Consultation',
      notes: 'Discussed feeding schedule and sleep patterns',
    },
  ];

  const availableSlots = [
    { date: '2025-01-20', time: '09:00 AM' },
    { date: '2025-01-20', time: '10:30 AM' },
    { date: '2025-01-20', time: '02:00 PM' },
    { date: '2025-01-22', time: '11:00 AM' },
    { date: '2025-01-22', time: '03:30 PM' },
  ];

  const handleBookAppointment = () => {
    if (selectedSlot) {
      console.log('Booking appointment for:', selectedSlot);
      setShowBooking(false);
      setSelectedSlot(null);
      // Here you would typically make an API call to book the appointment
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-400 to-blue-400 pt-12 pb-6 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
            <User size={24} className="text-white" />
          </div>
          <h1 className="text-white text-xl font-semibold">Your Doctor</h1>
          <p className="text-white/80 text-sm mt-1">Healthcare provider information</p>
        </div>
      </div>

      <div className="px-4 -mt-2 max-w-md mx-auto space-y-6">
        {/* Doctor Profile */}
        <div className="baby-card">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center text-4xl">
              {doctor.photo}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
              <p className="text-purple-600 font-medium">{doctor.specialty}</p>
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm text-gray-600">{doctor.rating} • {doctor.experience}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl">
              <MapPin size={16} className="text-gray-600" />
              <div>
                <p className="font-medium text-gray-800">{doctor.hospital}</p>
                <p className="text-sm text-gray-600">{doctor.address}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl">
              <Phone size={16} className="text-gray-600" />
              <div>
                <p className="font-medium text-gray-800">Contact</p>
                <p className="text-sm text-gray-600">{doctor.phone}</p>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setShowBooking(!showBooking)}
            className="w-full mt-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 rounded-2xl py-3"
          >
            <Calendar size={20} className="mr-2" />
            Book Appointment
          </Button>
        </div>

        {/* Appointment Booking */}
        {showBooking && (
          <div className="baby-card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Appointments</h3>
            
            <div className="space-y-2 mb-4">
              {availableSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSlot(`${slot.date} ${slot.time}`)}
                  className={`w-full p-3 rounded-2xl border transition-all ${
                    selectedSlot === `${slot.date} ${slot.time}`
                      ? 'bg-teal-50 border-teal-300 text-teal-700'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{slot.date}</span>
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{slot.time}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <Button
              onClick={handleBookAppointment}
              disabled={!selectedSlot}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-2xl py-3 disabled:opacity-50"
            >
              Confirm Booking
            </Button>
          </div>
        )}

        {/* Appointment History */}
        <div className="baby-card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment History</h3>
          
          <div className="space-y-3">
            {appointmentHistory.map((appointment) => (
              <div key={appointment.id} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-800">{appointment.type}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 bg-white/50 p-2 rounded-xl">
                  {appointment.notes}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="baby-card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border border-purple-200 hover:from-purple-200 hover:to-pink-200 transition-all">
              <div className="text-2xl mb-2">📋</div>
              <p className="text-sm font-medium text-gray-800">Medical Records</p>
            </button>
            
            <button className="p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl border border-green-200 hover:from-green-200 hover:to-emerald-200 transition-all">
              <div className="text-2xl mb-2">💬</div>
              <p className="text-sm font-medium text-gray-800">Ask Question</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
