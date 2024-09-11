package b3i.monster.be.spring.monsterhunter.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Setter
@Getter
@Document(collection = "monsters")
public class Monster {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private String name;
    private String imageURL;
    private boolean owned;
    private double size;
    private String lang;
    private LocalDate date;


// Constructors, Getters, and Setters
    public Monster() {
    }

    public Monster(String id, String name, String imageURL, boolean owned, double size, String lang, LocalDate date) {
        this.id = id;
        this.name = name;
        this.imageURL = imageURL;
        this.owned = owned;
        this.size = size;
        this.lang = lang;
        this.date = date;
    }
}
