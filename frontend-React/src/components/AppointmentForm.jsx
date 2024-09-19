import React, { useState } from "react";

const AppointmentForm = ({ addAppointment }) => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addAppointment({ name, date });
      
        sendDataToBe({ name, date });
        setName("");
        setDate("");
    };

    function sendDataToBe(data){

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:8080/', requestOptions)
            .then(response => response.json())
            // .then(data => this.setState({ postId: data.id }));
    }
    return (
        <div class="container">
            <form onSubmit={handleSubmit}>
                <div class="row">
                    <div class="col-25">
                        <label for="fname">Full Name</label>
                    </div>
                    <div class="col-75">
                        <input
                            type="text"
                            id="fname"
                            name="firstname"
                            placeholder="Add your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-25">
                        <label for="fname">Appointment Date: </label>
                    </div>
                    <div class="col-75">
                        <input
                            id="fname"
                            name="firstname"
                            placeholder="Add your name"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>
                <div class="row">
                    <input type="submit" value="Add Appointment" />
                </div>
            </form>
        </div>
    );
};

export default AppointmentForm;