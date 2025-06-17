package edu.pe.vallegrande.TypeKardex.dto;

public class ShedDTO {
    private Long shedId;  // Campo para el shedId

    // Getter y Setter para shedId
    public Long getshedId() {
        return shedId;
    }

    public void setshedId(Long shedId) {
        this.shedId = shedId;
    }

    // Método toString para depuración
    @Override
    public String toString() {
        return "ShedDTO{" +
                "shedId=" + shedId +
                '}';
    }

}
