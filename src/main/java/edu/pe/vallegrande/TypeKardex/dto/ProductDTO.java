package edu.pe.vallegrande.TypeKardex.dto;

public class ProductDTO {
    private Long productId;  // Campo para el shedId

    // Getter y Setter para shedId
    public Long getproductId() {
        return productId;
    }

    public void setproductId(Long productId) {
        this.productId = productId;
    }

    // Método toString para depuración
    @Override
    public String toString() {
        return "ProductDTO{" +
                "productId=" + productId +
                '}';
    }

}
