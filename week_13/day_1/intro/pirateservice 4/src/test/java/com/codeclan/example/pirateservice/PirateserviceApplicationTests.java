package com.codeclan.example.pirateservice;

import com.codeclan.example.pirateservice.repositories.PirateRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PirateserviceApplicationTests {

	@Test
	public void contextLoads() {
	}

	@Autowired
	PirateRepository pirateRepository;

	@Test
	public void createPirate(){
		Pirate jack = new Pirate("Jack", "Sparrow", 32);
		pirateRepository.save(jack);
	}

}
