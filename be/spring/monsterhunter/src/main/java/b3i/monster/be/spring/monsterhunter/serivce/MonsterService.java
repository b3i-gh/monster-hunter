package b3i.monster.be.spring.monsterhunter.serivce;

import b3i.monster.be.spring.monsterhunter.model.Monster;
import b3i.monster.be.spring.monsterhunter.repository.MonsterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MonsterService {

    @Autowired
    private MonsterRepository monsterRepository;

    public List<Monster> getAllMonsters() {
        return monsterRepository.findAll();
    }

    public Optional<Monster> getMonsterById(String id) {
        return monsterRepository.findById(id);
    }

    public Monster addMonster(Monster monster) {
        return monsterRepository.save(monster);
    }

    public Monster updateMonster(String id, Monster monsterDetails) {
        Monster monster = monsterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Monster not found"));

        monster.setName(monsterDetails.getName());
        monster.setImageURL(monsterDetails.getImageURL());
        monster.setOwned(monsterDetails.isOwned());
        monster.setSize(monsterDetails.getSize());
        monster.setLang(monsterDetails.getLang());
        monster.setDate(monsterDetails.getDate());
        return monsterRepository.save(monster);
    }

    public void deleteMonster(String id) {
        monsterRepository.deleteById(id);
    }

    public List<Monster> getMonsterByName(String name) {
        return monsterRepository.findByNameContaining(name);
    }

    public List<Monster> getOwnedMonsters(){
        return monsterRepository.findByOwnedTrue();
    }

    public List<Monster> getNotOwnedMonsters(){
        return monsterRepository.findByOwnedFalse();
    }
}
