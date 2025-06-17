package edu.pe.vallegrande.TypeKardex.service;
import edu.pe.vallegrande.TypeKardex.dto.ShedDTO;
import edu.pe.vallegrande.TypeKardex.dto.SupplierDTO;
import edu.pe.vallegrande.TypeKardex.dto.ProductDTO;
import edu.pe.vallegrande.TypeKardex.model.TypeKardex;
import edu.pe.vallegrande.TypeKardex.repository.TypeKardexRepository;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

@Service
@AllArgsConstructor
public class TypeKardexService {

    @Autowired
    private TypeKardexRepository repository;

    //WEB CLIENT :
    // WebClient para consumir datos de Shed
    private final WebClient productWebClient = WebClient.builder()
            .baseUrl("https://ms-product-ix0t.onrender.com/NPH/products") // Ajusta la URL si cambia el host
            .defaultHeader("Content-Type", "application/json")
            .build();

    // Método para consumir los datos de Shed desde otro microservicio
    public Mono<ProductDTO> getProductFromExternal(Long productId) {
        return productWebClient.get()
                .uri("/{id}", productId)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(ProductDTO.class);
    }

    //SHED:
    // WebClient para consumir datos de Shed
    private final WebClient shedWebClient = WebClient.builder()
    .baseUrl("https://ms-sheds-3au2.onrender.com/NPH/sheds")
    .defaultHeader("Content-Type", "application/json")
    .build();

    // Método para consumir los datos de Shed desde otro microservicio
    public Mono<ShedDTO> getShedFromExternal(Long shedId) {
    return shedWebClient.get()
        .uri("/{id}", shedId)
        .accept(MediaType.APPLICATION_JSON)
        .retrieve()
        .bodyToMono(ShedDTO.class);
    }

    //Proveedor:
    private final WebClient supplierWebClient = WebClient.builder()
    .baseUrl("https://ms-supplier.onrender.com/NPH/suppliers")
    .defaultHeader("Content-Type", "application/json")
    .build();

    // Método para consumir los datos de Shed desde otro microservicio
    public Mono<SupplierDTO> getSupplierFromExternal(Long supplierId) {
    return supplierWebClient.get()
        .uri("/{id}", supplierId) // Usa el shedId como parámetro en la URL
        .accept(MediaType.APPLICATION_JSON)
        .retrieve()
        .bodyToMono(SupplierDTO.class);  // Retorna un Mono con el DTO de Shed
    }

    // Listar todos los registros
    public Flux<TypeKardex> listAll() {
        return repository.findAllByOrderByIdAsc();
    }

    // Listar solo los registros activos
    public Flux<TypeKardex> listActive() {
        return repository.findByStatus("A");
    }

    // Crear un nuevo TypeKardex
    public Mono<TypeKardex> create(TypeKardex typeKardex) {
        return repository.save(typeKardex);
    }

    // Editar un TypeKardex existente sin afectar su posición en la base de datos
    public Mono<TypeKardex> update(Long id, TypeKardex typeKardex) {
        return repository.findById(id)
                .flatMap(existingTypeKardex -> {
                    existingTypeKardex.setName(typeKardex.getName());
                    existingTypeKardex.setMaximumAmount(typeKardex.getMaximumAmount());
                    existingTypeKardex.setMinimumQuantity(typeKardex.getMinimumQuantity());
                    existingTypeKardex.setSupplierId(typeKardex.getSupplierId());
                    existingTypeKardex.setProductId(typeKardex.getProductId());
                    existingTypeKardex.setShedId(typeKardex.getShedId());
                    existingTypeKardex.setDescription(typeKardex.getDescription());
                    existingTypeKardex.setStatus(typeKardex.getStatus());

                    return repository.save(existingTypeKardex);
                });
    }

    // Eliminar lógicamente (cambia el estado a "I")
    public Mono<Void> deleteLogical(Long id) {
        return repository.findById(id)
                .flatMap(typeKardex -> {
                    typeKardex.setStatus("I");
                    return repository.save(typeKardex);
                })
                .then();
    }

    // Eliminar físicamente
    public Mono<Void> deletePhysical(Long id) {
        return repository.deleteById(id);
    }

    // Restaurar (cambia el estado a "A")
    public Mono<Void> restore(Long id) {
        return repository.findById(id)
                .flatMap(typeKardex -> {
                    typeKardex.setStatus("A");
                    return repository.save(typeKardex);
                })
                .then();
    }
}
