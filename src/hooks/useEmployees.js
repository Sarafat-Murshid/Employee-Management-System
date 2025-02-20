import { useState, useEffect } from "react";
import employeeData from "../data/employees.json";

export function useEmployees() {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem("employees");
    return savedEmployees ? JSON.parse(savedEmployees) : employeeData.employees;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: Math.random().toString(36).substr(2, 9),
    };
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const filteredEmployees = employees.filter((employee) => {
    const trimmedSearch = debouncedSearchTerm.trim().toLowerCase();
    if (!trimmedSearch) return true;

    return (
      employee.name.toLowerCase().includes(trimmedSearch) ||
      employee.email.toLowerCase().includes(trimmedSearch) ||
      (employee.phone &&
        employee.phone.toLowerCase().includes(trimmedSearch)) ||
      (employee.address &&
        employee.address.toLowerCase().includes(trimmedSearch))
    );
  });

  return {
    employees: filteredEmployees,
    searchTerm,
    setSearchTerm,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };
}
