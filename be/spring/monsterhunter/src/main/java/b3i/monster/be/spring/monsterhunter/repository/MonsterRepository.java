package b3i.monster.be.spring.monsterhunter.repository;

import b3i.monster.be.spring.monsterhunter.model.Monster;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

@Repository
public interface MonsterRepository extends MongoRepository<Monster, String> {
    List<Monster> findByNameContaining(String name);
    List<Monster> findByOwnedTrue();
    List<Monster> findByOwnedFalse();
}
