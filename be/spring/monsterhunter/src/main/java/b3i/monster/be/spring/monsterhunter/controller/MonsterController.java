package b3i.monster.be.spring.monsterhunter.controller;

import b3i.monster.be.spring.monsterhunter.model.Monster;
import b3i.monster.be.spring.monsterhunter.serivce.MonsterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
@RestController
@RequestMapping("/api/monsters")
public class MonsterController {

    @Autowired
    private MonsterService monsterService;

    @GetMapping
    public List<Monster> getAllMonsters() {
        return monsterService.getAllMonsters();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Monster> getMonsterById(@PathVariable String id) {
        return monsterService.getMonsterById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Monster addMonster(@RequestBody Monster monster) {
        return monsterService.addMonster(monster);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Monster> updateMonster(@PathVariable String id, @RequestBody Monster monsterDetails) {
        try {
            return ResponseEntity.ok(monsterService.updateMonster(id, monsterDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMonster(@PathVariable String id) {
        monsterService.deleteMonster(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/filter={name}")
    public List<Monster> getMonsterByName(@PathVariable String name) {
        return monsterService.getMonsterByName(name.toUpperCase());
    }

    @GetMapping("/owned")
    public List<Monster> getOwnedMonsters() {
        return monsterService.getOwnedMonsters();
    }

    @GetMapping("/notOwned")
    public List<Monster> getNotOwnedMonsters() {
        return monsterService.getNotOwnedMonsters();
    }
}