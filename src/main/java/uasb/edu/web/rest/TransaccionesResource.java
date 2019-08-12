package uasb.edu.web.rest;

import uasb.edu.domain.Transacciones;
import uasb.edu.service.TransaccionesService;
import uasb.edu.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link uasb.edu.domain.Transacciones}.
 */
@RestController
@RequestMapping("/api")
public class TransaccionesResource {

    private final Logger log = LoggerFactory.getLogger(TransaccionesResource.class);

    private static final String ENTITY_NAME = "transacciones";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TransaccionesService transaccionesService;

    public TransaccionesResource(TransaccionesService transaccionesService) {
        this.transaccionesService = transaccionesService;
    }

    /**
     * {@code POST  /transacciones} : Create a new transacciones.
     *
     * @param transacciones the transacciones to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new transacciones, or with status {@code 400 (Bad Request)} if the transacciones has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/transacciones")
    public ResponseEntity<Transacciones> createTransacciones(@RequestBody Transacciones transacciones) throws URISyntaxException {
        log.debug("REST request to save Transacciones : {}", transacciones);
        if (transacciones.getId() != null) {
            throw new BadRequestAlertException("A new transacciones cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Transacciones result = transaccionesService.save(transacciones);
        return ResponseEntity.created(new URI("/api/transacciones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /transacciones} : Updates an existing transacciones.
     *
     * @param transacciones the transacciones to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated transacciones,
     * or with status {@code 400 (Bad Request)} if the transacciones is not valid,
     * or with status {@code 500 (Internal Server Error)} if the transacciones couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/transacciones")
    public ResponseEntity<Transacciones> updateTransacciones(@RequestBody Transacciones transacciones) throws URISyntaxException {
        log.debug("REST request to update Transacciones : {}", transacciones);
        if (transacciones.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Transacciones result = transaccionesService.save(transacciones);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, transacciones.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /transacciones} : get all the transacciones.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of transacciones in body.
     */
    @GetMapping("/transacciones")
    public List<Transacciones> getAllTransacciones() {
        log.debug("REST request to get all Transacciones");
        return transaccionesService.findAll();
    }

    /**
     * {@code GET  /transacciones/:id} : get the "id" transacciones.
     *
     * @param id the id of the transacciones to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the transacciones, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/transacciones/{id}")
    public ResponseEntity<Transacciones> getTransacciones(@PathVariable Long id) {
        log.debug("REST request to get Transacciones : {}", id);
        Optional<Transacciones> transacciones = transaccionesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(transacciones);
    }

    /**
     * {@code DELETE  /transacciones/:id} : delete the "id" transacciones.
     *
     * @param id the id of the transacciones to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/transacciones/{id}")
    public ResponseEntity<Void> deleteTransacciones(@PathVariable Long id) {
        log.debug("REST request to delete Transacciones : {}", id);
        transaccionesService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
