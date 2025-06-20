package pe.edu.vallegrande.eggs.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import pe.edu.vallegrande.eggs.dto.FoodDTO;
import pe.edu.vallegrande.eggs.dto.SaleDTO;
import pe.edu.vallegrande.eggs.model.UtilityDiary;
import pe.edu.vallegrande.eggs.repository.UtilityDiaryRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class UtilityDiaryService {

    private final UtilityDiaryRepository repository;

    // WebClient para consumir datos de ventas
    private final WebClient saleWebClient = WebClient.builder()
            .baseUrl("https://ms-product-ix0t.onrender.com/NPH/products") // Ajusta la URL si cambia el host
            .defaultHeader("Content-Type", "application/json")
            .build();

    public Mono<SaleDTO> getSaleFromExternal(Long idSale) {
        return saleWebClient.get()
                .uri("/{id}", idSale)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(SaleDTO.class);
    }

    // WebClient para consumir datos de alimentos
    private final WebClient foodWebClient = WebClient.builder()
            .baseUrl("https://8080-vallegrandea-msfoodcost-mgmy5lnuc2x.ws-us118.gitpod.io/api/food-costs/actives") // Cambia esta URL si el endpoint de alimentos es diferente
            .defaultHeader("Content-Type", "application/json")
            .build();

    public Mono<FoodDTO> getFoodFromExternal(Long idFood) {
        return foodWebClient.get()
                .uri("/{id}", idFood)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(FoodDTO.class);
    }

    public Flux<UtilityDiary> findAll() {
        return repository.findAll();
    }

    public Mono<UtilityDiary> findById(Integer id) {
        return repository.findById(id);
    }

    public Mono<UtilityDiary> save(UtilityDiary diary) {
        return repository.save(diary);
    }

    public Mono<Void> deleteById(Integer id) {
        return repository.deleteById(id);
    }

    public Mono<UtilityDiary> update(Integer id, UtilityDiary diary) {
        return repository.findById(id)
                .flatMap(existing -> {
                    diary.setId(id);
                    return repository.save(diary);
                });
    }
}
