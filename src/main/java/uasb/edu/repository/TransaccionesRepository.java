package uasb.edu.repository;

import uasb.edu.domain.Transacciones;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Transacciones entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransaccionesRepository extends JpaRepository<Transacciones, Long> {

}
