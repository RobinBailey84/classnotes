package com.codeclan.example.WhiskyTracker.repositories.WhiskyRepository;


import com.codeclan.example.WhiskyTracker.models.Whisky;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

public class WhiskyRepositoryImpl implements WhiskyRepositoryCustom {

    @Autowired
    EntityManager entityManager;


    @Transactional
    @Override
    public List<Whisky> findWhiskiesByAgeAndDistilleryId(int age, Long distilleryId) {
        List<Whisky> results;
        Session session = entityManager.unwrap(Session.class);

        Criteria cr = null;
        try {
            cr = session.createCriteria(Whisky.class);
            cr.add(Restrictions.eq("distillery.id", distilleryId));
            cr.add(Restrictions.eq("age", age));
        } catch (Exception e) {
            e.printStackTrace();
        }

        results = cr.list();



        return results;
    }

    @Transactional
    @Override
    public List<Whisky> findWhiskiesByRegion(String region) {
        List<Whisky> results = null;
        Session session = entityManager.unwrap(Session.class);

        Criteria cr = null;
        try {
            cr = session.createCriteria(Whisky.class);
            cr.createAlias("distillery", "distilleryAlias");
            cr.add(Restrictions.eq("distilleryAlias.region", region));
        } catch (HibernateException e) {
            e.printStackTrace();
        }

        results = cr.list();

        return results;
    }
}
