package pe.edu.vallegrande.eggs.dto;

public class FoodDTO {
    private Long idFood;  // Campo para el shedId

    // Getter y Setter para shedId
    public Long getidFood() {
        return idFood;
    }

    public void setidFood(Long idFood) {
        this.idFood = idFood;
    }

    // Método toString para depuración
    @Override
    public String toString() {
        return "FoodDTO{" +
                "idFood=" + idFood +
                '}';
    }
}
