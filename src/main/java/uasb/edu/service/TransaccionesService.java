package uasb.edu.service;

import uasb.edu.domain.Transacciones;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Transacciones}.
 */
public interface TransaccionesService {

    /**
     * Save a transacciones.
     *
     * @param transacciones the entity to save.
     * @return the persisted entity.
     */
    Transacciones save(Transacciones transacciones);

    /**
     * Get all the transacciones.
     *
     * @return the list of entities.
     */
    List<Transacciones> findAll();


    /**
     * Get the "id" transacciones.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Transacciones> findOne(Long id);

    /**
     * Delete the "id" transacciones.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
