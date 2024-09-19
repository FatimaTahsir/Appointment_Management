package com.mit.appointment.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mit.appointment.model.Appointment;
import com.mit.appointment.repositories.AppointmentRepository;

@RestController
@CrossOrigin("http://localhost:5173")
public class AppointmentController {

	@Autowired
	private AppointmentRepository AppRepo;

	@GetMapping("/")
	public List<Appointment> getAllApp() {
		return AppRepo.findAll();
	}

	@GetMapping("/{id}")
	public Optional<Appointment> getAppById(@PathVariable long id) {
		return AppRepo.findById(id);
	}

	@PostMapping("/")
	public Appointment createApp(@RequestBody Appointment app) {
		return AppRepo.save(app);
	}

	// Update an existing appointment
	@PutMapping("/{id}")
	public Appointment updateApp(@PathVariable long id, @RequestBody Appointment appDetails) {
		return AppRepo.findById(id).map(app -> {
			app.setName(appDetails.getName());
			app.setDate(appDetails.getDate());
			return AppRepo.save(app);
		}).orElseThrow(() -> new RuntimeException("Appointment not found with id " + id));
	}

	// Delete an appointment
	@DeleteMapping("/{id}")
	public void deleteApp(@PathVariable long id) {
		AppRepo.deleteById(id);
	}

	// Delete all appointments
	@DeleteMapping("/")
	public void deleteAllApps() {
		AppRepo.deleteAll();
	}
}
