
import EmployeeCard from '../components/EmployeeCard';
import { useEmployees } from '../hooks/useEmployees';

function NoResultsMessage() {
  return (
    <div className="p-8 text-center text-gray-500">
      No employees found matching your search.
    </div>
  );
}

export default function CardView() {
  const { employees } = useEmployees();


  return (
    <div className="p-8">
      {employees.length === 0 ? (
        <NoResultsMessage />
      ) : (
        <>
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Employee Cards</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
          </div>
        </>
      )}
    </div>

  );
}
