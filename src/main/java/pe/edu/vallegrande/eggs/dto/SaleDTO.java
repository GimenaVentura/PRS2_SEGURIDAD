package pe.edu.vallegrande.eggs.dto;

public class SaleDTO {
    private Long idSale;  // Campo para el shedId

    // Getter y Setter para shedId
    public Long getidSale() {
        return idSale;
    }

    public void setidSale(Long idSale) {
        this.idSale = idSale;
    }

    // Método toString para depuración
    @Override
    public String toString() {
        return "SaleDTO{" +
                "idSale=" + idSale +
                '}';
    }

}
