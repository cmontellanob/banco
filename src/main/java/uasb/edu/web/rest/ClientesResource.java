package uasb.edu.web.rest;

import uasb.edu.domain.Clientes;
import uasb.edu.service.ClientesService;
import uasb.edu.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link uasb.edu.domain.Clientes}.
 */
@RestController
@RequestMapping("/api")
public class ClientesResource {

    private final Logger log = LoggerFactory.getLogger(ClientesResource.class);

    private static final String ENTITY_NAME = "clientes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClientesService clientesService;

    public ClientesResource(ClientesService clientesService) {
        this.clientesService = clientesService;
    }

    /**
     * {@code POST  /clientes} : Create a new clientes.
     *
     * @param clientes the clientes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new clientes, or with status {@code 400 (Bad Request)} if the clientes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/clientes")
    public ResponseEntity<Clientes> createClientes(@RequestBody Clientes clientes) throws URISyntaxException {
        log.debug("REST request to save Clientes : {}", clientes);
        if (clientes.getId() != null) {
            throw new BadRequestAlertException("A new clientes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Clientes result = clientesService.save(clientes);
        return ResponseEntity.created(new URI("/api/clientes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /clientes} : Updates an existing clientes.
     *
     * @param clientes the clientes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clientes,
     * or with status {@code 400 (Bad Request)} if the clientes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the clientes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/clientes")
    public ResponseEntity<Clientes> updateClientes(@RequestBody Clientes clientes) throws URISyntaxException {
        log.debug("REST request to update Clientes : {}", clientes);
        if (clientes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Clientes result = clientesService.save(clientes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, clientes.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /clientes} : get all the clientes.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of clientes in body.
     */
    @GetMapping("/clientes")
    public ResponseEntity<List<Clientes>> getAllClientes(Pageable pageable) {
        log.debug("REST request to get a page of Clientes");
        Page<Clientes> page = clientesService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /clientes/:id} : get the "id" clientes.
     *
     * @param id the id of the clientes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the clientes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/clientes/{id}")
    public ResponseEntity<Clientes> getClientes(@PathVariable Long id) {
        log.debug("REST request to get Clientes : {}", id);
        Optional<Clientes> clientes = clientesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(clientes);
    }

    /**
     * {@code DELETE  /clientes/:id} : delete the "id" clientes.
     *
     * @param id the id of the clientes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Void> deleteClientes(@PathVariable Long id) {
        log.debug("REST request to delete Clientes : {}", id);
        clientesService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
