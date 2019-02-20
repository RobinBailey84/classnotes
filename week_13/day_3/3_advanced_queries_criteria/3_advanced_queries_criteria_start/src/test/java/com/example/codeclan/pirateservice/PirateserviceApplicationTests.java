package com.example.codeclan.pirateservice;

import com.example.codeclan.pirateservice.models.Pirate;
import com.example.codeclan.pirateservice.models.Raid;
import com.example.codeclan.pirateservice.repository.PirateRepository.PirateRepository;
import com.example.codeclan.pirateservice.repository.RaidRepository.RaidRepository;
import com.example.codeclan.pirateservice.repository.ShipRepository.ShipRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PirateserviceApplicationTests {

	@Autowired
	PirateRepository pirateRepository;

	@Autowired
	ShipRepository shipRepository;

	@Autowired
	RaidRepository raidRepository;

	@Test
	public void contextLoads() {
	}

	@Test
	public void findPiratesByShipId(){
		List<Pirate> found = pirateRepository.findPiratesByShipId(1L);
		assertEquals("John", found.get(0).getFirstName());
		assertEquals("Silver", found.get(0).getLastName());
	}

	@Test
	public void findRaidByLocation(){
		List<Raid> found = raidRepository.findRaidByLocation("Tortuga");
		assertEquals("Tortuga", found.get(0).getLocation());
	}


}
