package pe.edu.vallegrande.eggs.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Table("utilitydiary")
public class UtilityDiary {

    @Id
    private Integer id;
    private Integer idSale;
    private Integer idFood;
    private Integer cuidado;
    private BigDecimal costoAdicional;
    private BigDecimal gananciaDiaria;
    private LocalDateTime fecha;
}
