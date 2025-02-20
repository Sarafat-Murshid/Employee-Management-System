import { useState, useEffect } from 'react';
import employeeData from '../data/employees.json';

export function useEmployees() {
  // Initialize state from localStorage or fall back to the JSON data
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : employeeData.employees;
  });

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

  return {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee
  };
}