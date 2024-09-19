
import React, { useEffect, useState } from "react";

const AppointmentList = () => {
    const [apiData, setApiData] = useState([]);
    const [editedIndex, setEditedIndex] = useState(null);
    const [editedName, setEditedName] = useState("");
    const [editedDate, setEditedDate] = useState("");

    // Fetch appointments from the backend
    useEffect(() => {
        fetch('http://localhost:8080/')
            .then((res) => res.json())
            .then((data) => setApiData(data))
            .catch((err) => console.error(err));
    }, []);

    // Edit appointment
    const handleEdit = (appointment) => {
        setEditedIndex(appointment.id);
        setEditedName(appointment.name);
        setEditedDate(appointment.date);
    };

    // Save edited appointment
    const handleSaveEdit = (id) => {
        const updatedAppointment = { name: editedName, date: editedDate };
        fetch(`http://localhost:8080/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedAppointment),
        })
        .then((res) => res.json())
        .then((data) => {
            setApiData((prev) =>
                prev.map((item) => (item.id === id ? data : item))
            );
            setEditedIndex(null);
            setEditedName("");
            setEditedDate("");
        })
        .catch((err) => console.error(err));
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditedIndex(null);
        setEditedName("");
        setEditedDate("");
    };

    // Delete appointment
    const handleDelete = (id) => {
        fetch(`http://localhost:8080/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            setApiData((prev) => prev.filter((item) => item.id !== id));
        })
        .catch((err) => console.error(err));
    };

    // Clear all appointments
    const clearAppointments = () => {
        fetch('http://localhost:8080/', {
            method: 'DELETE',
        })
        .then(() => {
            setApiData([]);
        })
        .catch((err) => console.error(err));
    };

    return (
        <div className="container">
            <h1>Appointment List</h1>
            <table id="list">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {apiData.map((data, index) => (
                        <tr key={data.id}>
                            <td>{index + 1}</td> {/* Serial numbering */}
                            <td>
                                {editedIndex === data.id ? (
                                    <input
                                        type="text"
                                        value={editedName}
                                        onChange={(e) =>
                                            setEditedName(e.target.value)
                                        }
                                    />
                                ) : (
                                    data.name
                                )}
                            </td>
                            <td>
                                {editedIndex === data.id ? (
                                    <input
                                        type="date"
                                        value={editedDate}
                                        onChange={(e) =>
                                            setEditedDate(e.target.value)
                                        }
                                    />
                                ) : (
                                    data.date
                                )}
                            </td>
                            <td>
                                {editedIndex === data.id ? (
                                    <>
                                        <button onClick={() => handleSaveEdit(data.id)}>
                                            Save
                                        </button>
                                        <button onClick={handleCancelEdit}>
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(data)}>
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(data.id)}>
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={clearAppointments}>Clear All Appointments</button>
        </div>
    );
};

export default AppointmentList;




