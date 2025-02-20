import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function EmployeeCard({ employee }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img
          src={employee.profilePicture}
          alt={employee.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{employee.name}</h3>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Mail className="h-4 w-4 mr-2" />
            <span className="text-sm">{employee.email}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            <span className="text-sm">{employee.phone}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{employee.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}