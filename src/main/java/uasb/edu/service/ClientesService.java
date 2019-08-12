package uasb.edu.service;

import uasb.edu.domain.Clientes;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Clientes}.
 */
public interface ClientesService {

    /**
     * Save a clientes.
     *
     * @param clientes the entity to save.
     * @return the persisted entity.
     */
    Clientes save(Clientes clientes);

    /**
     * Get all the clientes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Clientes> findAll(Pageable pageable);


    /**
     * Get the "id" clientes.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Clientes> findOne(Long id);

    /**
     * Delete the "id" clientes.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
