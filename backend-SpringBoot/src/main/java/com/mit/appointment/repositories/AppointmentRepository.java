package com.mit.appointment.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mit.appointment.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>{

}
