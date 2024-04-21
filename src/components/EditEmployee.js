import React, { useState } from 'react';
import Swal from 'sweetalert2';

const EditEmployee = ({ employees, selectedEmployee, setEmployees, setIsEditing }) => {

  const id = selectedEmployee.id;
  const [firstName, setFirstName] = useState(selectedEmployee.firstName);
  const [lastName, setLastName] = useState(selectedEmployee.lastName);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [salary, setSalary] = useState(selectedEmployee.salary);
  const [date, setDate] = useState(selectedEmployee.date);

  const handleUpdate = e => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !salary || !date){
      return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'All fields are required.',
          showConfirmButton: true,
        });
  }

  const editEmployee = {
      id,
      firstName,
      lastName,
      email,
      salary,
      date,
    };
    let data = JSON.parse(localStorage.getItem('employees_data'));
    const updatedTasks= data.map(item => {
      if (item.id === id) {
          return {
              ...item,
              ...editEmployee,
          }
      }
      return item;
  });
  setEmployees(updatedTasks);
  setIsEditing(false);
  Swal.fire({
    icon: 'success',
    title: 'Updated!',
    text: `${editEmployee.firstName} ${editEmployee.lastName}'s data has been updated.`,
    showConfirmButton: false,
    timer: 1500,
  });
  localStorage.setItem("employees_data", JSON.stringify(updatedTasks));
  window.location.reload();
  }

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="salary">Salary ($)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={salary}
          onChange={e => setSalary(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  )
}

export default EditEmployee