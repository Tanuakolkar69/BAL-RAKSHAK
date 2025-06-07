
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RegistrationProps {
  onRegister: (babyData: any) => void;
  onSwitchToLogin: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    babyName: '',
    dateOfBirth: '',
    gender: '',
    hospitalId: '',
    parentName: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const babyId = `HS-BB-${Math.floor(Math.random() * 90000) + 10000}`;
    const babyData = { ...formData, babyId };
    console.log('Registration data:', babyData);
    onRegister(babyData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 baby-gradient">
      <div className="w-full max-w-md">
        {/* Header with baby illustration */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-200 to-green-200 rounded-full flex items-center justify-center animate-float">
            <span className="text-3xl">👶</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Register Your Newborn</h1>
          <p className="text-gray-600 mt-2">Create a profile for your little one</p>
        </div>

        {/* Registration Form */}
        <div className="baby-card animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="babyName" className="text-sm font-medium text-gray-700">
                Baby's Full Name
              </Label>
              <Input
                id="babyName"
                value={formData.babyName}
                onChange={(e) => handleInputChange('babyName', e.target.value)}
                placeholder="Enter baby's name"
                className="mt-1 rounded-2xl border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                Date of Birth
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="mt-1 rounded-2xl border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger className="mt-1 rounded-2xl border-gray-200">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="hospitalId" className="text-sm font-medium text-gray-700">
                Hospital ID (Optional)
              </Label>
              <Input
                id="hospitalId"
                value={formData.hospitalId}
                onChange={(e) => handleInputChange('hospitalId', e.target.value)}
                placeholder="Hospital identifier"
                className="mt-1 rounded-2xl border-gray-200 focus:border-blue-300 focus:ring-blue-200"
              />
            </div>

            <div>
              <Label htmlFor="parentName" className="text-sm font-medium text-gray-700">
                Parent/Guardian Name
              </Label>
              <Input
                id="parentName"
                value={formData.parentName}
                onChange={(e) => handleInputChange('parentName', e.target.value)}
                placeholder="Your full name"
                className="mt-1 rounded-2xl border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Contact Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@gmail.com"
                className="mt-1 rounded-2xl border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="mt-1 rounded-2xl border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 rounded-2xl py-3 font-medium transition-all duration-200 shadow-lg hover:shadow-xl mt-6"
            >
              Create Profile
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
