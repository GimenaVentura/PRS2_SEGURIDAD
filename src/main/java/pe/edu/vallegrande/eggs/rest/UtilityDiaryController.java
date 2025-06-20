package pe.edu.vallegrande.eggs.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pe.edu.vallegrande.eggs.model.UtilityDiary;
import pe.edu.vallegrande.eggs.service.UtilityDiaryService;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/utilitydiary")
@RequiredArgsConstructor
public class UtilityDiaryController {

    private final UtilityDiaryService service;

    @GetMapping
    public Flux<UtilityDiary> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Mono<UtilityDiary> getById(@PathVariable Integer id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<UtilityDiary> create(@RequestBody UtilityDiary diary) {
        return service.save(diary);
    }

    @PutMapping("/{id}")
    public Mono<UtilityDiary> update(@PathVariable Integer id, @RequestBody UtilityDiary diary) {
        return service.update(id, diary);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> delete(@PathVariable Integer id) {
        return service.deleteById(id);
    }
}
