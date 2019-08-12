package uasb.edu.service.impl;

import uasb.edu.service.TransaccionesService;
import uasb.edu.domain.Transacciones;
import uasb.edu.repository.TransaccionesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Transacciones}.
 */
@Service
@Transactional
public class TransaccionesServiceImpl implements TransaccionesService {

    private final Logger log = LoggerFactory.getLogger(TransaccionesServiceImpl.class);

    private final TransaccionesRepository transaccionesRepository;

    public TransaccionesServiceImpl(TransaccionesRepository transaccionesRepository) {
        this.transaccionesRepository = transaccionesRepository;
    }

    /**
     * Save a transacciones.
     *
     * @param transacciones the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Transacciones save(Transacciones transacciones) {
        log.debug("Request to save Transacciones : {}", transacciones);
        return transaccionesRepository.save(transacciones);
    }

    /**
     * Get all the transacciones.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Transacciones> findAll() {
        log.debug("Request to get all Transacciones");
        return transaccionesRepository.findAll();
    }


    /**
     * Get one transacciones by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Transacciones> findOne(Long id) {
        log.debug("Request to get Transacciones : {}", id);
        return transaccionesRepository.findById(id);
    }

    /**
     * Delete the transacciones by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Transacciones : {}", id);
        transaccionesRepository.deleteById(id);
    }
}
