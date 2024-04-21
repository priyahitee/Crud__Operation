import React, { useEffect, useState } from "react";
import { employeesData } from "../data/data";
import Swal from "sweetalert2";
import Header from "./Header";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";

const Dashboard = ({ authenticated }) => {
  const [employees, setEmployees] = useState(employeesData);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('employees_data'));
    if (data !== null && Object.keys(data).length !== 0) setEmployees(data);
  }, []);

  const handleEdit = id => {
    const [employee] = employees.filter(employee => employee.id === id);
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      customClass: {
        confirmButton: 'first-btn-class',
      },
    }).then(result=> {
      if (result.value) {
        const [employee] = employees.filter(employee => employee.id === id);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
        const employeesCopy = employees.filter(employee => employee.id !== id);
        localStorage.setItem('employees_data', JSON.stringify(employeesCopy));
        setEmployees(employeesCopy);

      }
    })
  }

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={authenticated}
          />
          <EmployeeList employees={employees} handleEdit={handleEdit} handleDelete={handleDelete}/>
        </>
      )}
       {isAdding && (
       <AddEmployee employees={employees} setEmployees={setEmployees} setIsAdding={setIsAdding}/>
      )}
       {isEditing && (
       <EditEmployee selectedEmployee={selectedEmployee} employees={employees} setEmployees={setEmployees} 
       setIsEditing={setIsEditing}/>
      )}
    </div>
  );
};

export default Dashboard;
