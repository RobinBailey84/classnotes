package com.codeclan.example.WhiskyTracker.repositories.DistilleryRepository;

import com.codeclan.example.WhiskyTracker.models.Distillery;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

public class DistilleryRepositoryImpl implements DistilleryRepositoryCustom {

    @Autowired
    EntityManager entityManager;

    @Transactional
    @Override
    public List<Distillery> findDistilleryByWhiskyAge(int age) {
        List<Distillery> results = null;

        Session session = entityManager.unwrap(Session.class);

        Criteria cr = null;
        try {
            cr = session.createCriteria(Distillery.class);
            cr.createAlias("whiskies", "whisky");
            cr.add(Restrictions.eq("whisky.age", age));
        } catch (HibernateException e) {
            e.printStackTrace();
        }

        results = cr.list();

        return results;
    }
}
