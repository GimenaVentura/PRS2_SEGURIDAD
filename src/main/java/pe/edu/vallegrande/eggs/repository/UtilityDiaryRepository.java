package pe.edu.vallegrande.eggs.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import pe.edu.vallegrande.eggs.model.UtilityDiary;

public interface UtilityDiaryRepository extends ReactiveCrudRepository<UtilityDiary, Integer> {
    // Puedes agregar métodos personalizados si necesitas
}
