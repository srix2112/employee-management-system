import React, { useState } from "react";
import Swal from "sweetalert2";
import { employeesData } from "../../data";
import Add from "./Add";
import Edit from "./Edit";
import Header from "./Header";
import List from "./List";

function Dashboard() {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [employees, setEmployees] = useState(employeesData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEdit = (id) => {
    const [employee] = employees.filter((employee) => employee.id === id);
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "Warning",
      title: "Are you sure !",
      text: "You won't be able to revert this",
      showCancelButton: true,
      showConfirmButton: true,
      confirmedButtonText: "Yes, delete it !",
      cancelButtonText: "No, cancel !",
    }).then((result) => {
      if (result.value) {
        const [employee] = employees.filter((employee) => employee.id === id);

        Swal.fire({
          icon: "Success",
          title: "Deleted !",
          text: `${employee.firstName} ${employee.lastName} data has been deleted.`,
          showConfirmedButton: false,
          timer: 1500,
        });

        setEmployees(employees.filter((employee) => employee.id !== id));
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} />
          <List
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          employees={employees}
          setIsAdding={setIsAdding}
          setEmployees={setEmployees}
        />
      )}
      {isEditing && (
        <Edit
          employees={employees}
          setIsEditing={setIsEditing}
          setEmployees={setEmployees}
          selectedEmployee={selectedEmployee}
        />
      )}
    </div>
  );
}

export default Dashboard;
