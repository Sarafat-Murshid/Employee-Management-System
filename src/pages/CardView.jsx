import EmployeeCard from "../components/EmployeeCard";
import { useEmployees } from "../hooks/useEmployees";
import { useOutletContext } from "react-router-dom";

function NoResultsMessage() {
  return (
    <div className="p-8 text-center text-gray-500">
      No employees found matching your search.
    </div>
  );
}

export default function CardView() {
  const { employees } = useEmployees();
  const { searchTerm } = useOutletContext();

  const filteredEmployees = employees.filter((employee) => {
    const trimmedSearch = searchTerm.trim().toLowerCase();
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

  return (
    <div className="p-8">
      {filteredEmployees.length === 0 ? (
        <NoResultsMessage />
      ) : (
        <>
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Employee Cards
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
