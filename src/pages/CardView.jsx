import React from 'react';
import EmployeeCard from '../components/EmployeeCard';
import { useEmployees } from '../hooks/useEmployees';

export default function CardView() {
  const { employees } = useEmployees();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Employee Cards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
}