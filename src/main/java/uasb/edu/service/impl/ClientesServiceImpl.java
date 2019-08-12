package uasb.edu.service.impl;

import uasb.edu.service.ClientesService;
import uasb.edu.domain.Clientes;
import uasb.edu.repository.ClientesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Clientes}.
 */
@Service
@Transactional
public class ClientesServiceImpl implements ClientesService {

    private final Logger log = LoggerFactory.getLogger(ClientesServiceImpl.class);

    private final ClientesRepository clientesRepository;

    public ClientesServiceImpl(ClientesRepository clientesRepository) {
        this.clientesRepository = clientesRepository;
    }

    /**
     * Save a clientes.
     *
     * @param clientes the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Clientes save(Clientes clientes) {
        log.debug("Request to save Clientes : {}", clientes);
        return clientesRepository.save(clientes);
    }

    /**
     * Get all the clientes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Clientes> findAll(Pageable pageable) {
        log.debug("Request to get all Clientes");
        return clientesRepository.findAll(pageable);
    }


    /**
     * Get one clientes by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Clientes> findOne(Long id) {
        log.debug("Request to get Clientes : {}", id);
        return clientesRepository.findById(id);
    }

    /**
     * Delete the clientes by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Clientes : {}", id);
        clientesRepository.deleteById(id);
    }
}
