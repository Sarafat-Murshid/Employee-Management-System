import { useState, useEffect } from 'react';
import employeeData from '../data/employees.json';

export function useEmployees() {
  // Initialize state from localStorage or fall back to the JSON data
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : employeeData.employees;
  });
  const [searchTerm, setSearchTerm] = useState('');


  // Save to localStorage whenever employees change
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: Math.random().toString(36).substr(2, 9)
    };
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(employees.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ));
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  // Filter employees based on search term (name or email)
  const filteredEmployees = employees.filter(employee => {
    const searchLower = searchTerm.toLowerCase();
    return employee.name.toLowerCase().includes(searchLower) ||
           employee.email.toLowerCase().includes(searchLower);
  });

  return {
    employees: filteredEmployees,
    allEmployees: employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    searchTerm,
    setSearchTerm
  };

}
