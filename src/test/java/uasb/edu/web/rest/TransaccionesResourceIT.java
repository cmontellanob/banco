package uasb.edu.web.rest;

import uasb.edu.BancoApp;
import uasb.edu.domain.Transacciones;
import uasb.edu.repository.TransaccionesRepository;
import uasb.edu.service.TransaccionesService;
import uasb.edu.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static uasb.edu.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import uasb.edu.domain.enumeration.TransactionType;
/**
 * Integration tests for the {@link TransaccionesResource} REST controller.
 */
@SpringBootTest(classes = BancoApp.class)
public class TransaccionesResourceIT {

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_FECHA = Instant.ofEpochMilli(-1L);

    private static final TransactionType DEFAULT_TRANSACTION_TYPE = TransactionType.Ingreso;
    private static final TransactionType UPDATED_TRANSACTION_TYPE = TransactionType.Egreso;

    private static final Long DEFAULT_CANTIDAD = 1L;
    private static final Long UPDATED_CANTIDAD = 2L;
    private static final Long SMALLER_CANTIDAD = 1L - 1L;

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private TransaccionesRepository transaccionesRepository;

    @Autowired
    private TransaccionesService transaccionesService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTransaccionesMockMvc;

    private Transacciones transacciones;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransaccionesResource transaccionesResource = new TransaccionesResource(transaccionesService);
        this.restTransaccionesMockMvc = MockMvcBuilders.standaloneSetup(transaccionesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Transacciones createEntity(EntityManager em) {
        Transacciones transacciones = new Transacciones()
            .fecha(DEFAULT_FECHA)
            .transactionType(DEFAULT_TRANSACTION_TYPE)
            .cantidad(DEFAULT_CANTIDAD)
            .descripcion(DEFAULT_DESCRIPCION);
        return transacciones;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Transacciones createUpdatedEntity(EntityManager em) {
        Transacciones transacciones = new Transacciones()
            .fecha(UPDATED_FECHA)
            .transactionType(UPDATED_TRANSACTION_TYPE)
            .cantidad(UPDATED_CANTIDAD)
            .descripcion(UPDATED_DESCRIPCION);
        return transacciones;
    }

    @BeforeEach
    public void initTest() {
        transacciones = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransacciones() throws Exception {
        int databaseSizeBeforeCreate = transaccionesRepository.findAll().size();

        // Create the Transacciones
        restTransaccionesMockMvc.perform(post("/api/transacciones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transacciones)))
            .andExpect(status().isCreated());

        // Validate the Transacciones in the database
        List<Transacciones> transaccionesList = transaccionesRepository.findAll();
        assertThat(transaccionesList).hasSize(databaseSizeBeforeCreate + 1);
        Transacciones testTransacciones = transaccionesList.get(transaccionesList.size() - 1);
        assertThat(testTransacciones.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testTransacciones.getTransactionType()).isEqualTo(DEFAULT_TRANSACTION_TYPE);
        assertThat(testTransacciones.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testTransacciones.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createTransaccionesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transaccionesRepository.findAll().size();

        // Create the Transacciones with an existing ID
        transacciones.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransaccionesMockMvc.perform(post("/api/transacciones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transacciones)))
            .andExpect(status().isBadRequest());

        // Validate the Transacciones in the database
        List<Transacciones> transaccionesList = transaccionesRepository.findAll();
        assertThat(transaccionesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTransacciones() throws Exception {
        // Initialize the database
        transaccionesRepository.saveAndFlush(transacciones);

        // Get all the transaccionesList
        restTransaccionesMockMvc.perform(get("/api/transacciones?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transacciones.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].transactionType").value(hasItem(DEFAULT_TRANSACTION_TYPE.toString())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD.intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    
    @Test
    @Transactional
    public void getTransacciones() throws Exception {
        // Initialize the database
        transaccionesRepository.saveAndFlush(transacciones);

        // Get the transacciones
        restTransaccionesMockMvc.perform(get("/api/transacciones/{id}", transacciones.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transacciones.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.transactionType").value(DEFAULT_TRANSACTION_TYPE.toString()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD.intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTransacciones() throws Exception {
        // Get the transacciones
        restTransaccionesMockMvc.perform(get("/api/transacciones/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransacciones() throws Exception {
        // Initialize the database
        transaccionesService.save(transacciones);

        int databaseSizeBeforeUpdate = transaccionesRepository.findAll().size();

        // Update the transacciones
        Transacciones updatedTransacciones = transaccionesRepository.findById(transacciones.getId()).get();
        // Disconnect from session so that the updates on updatedTransacciones are not directly saved in db
        em.detach(updatedTransacciones);
        updatedTransacciones
            .fecha(UPDATED_FECHA)
            .transactionType(UPDATED_TRANSACTION_TYPE)
            .cantidad(UPDATED_CANTIDAD)
            .descripcion(UPDATED_DESCRIPCION);

        restTransaccionesMockMvc.perform(put("/api/transacciones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransacciones)))
            .andExpect(status().isOk());

        // Validate the Transacciones in the database
        List<Transacciones> transaccionesList = transaccionesRepository.findAll();
        assertThat(transaccionesList).hasSize(databaseSizeBeforeUpdate);
        Transacciones testTransacciones = transaccionesList.get(transaccionesList.size() - 1);
        assertThat(testTransacciones.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testTransacciones.getTransactionType()).isEqualTo(UPDATED_TRANSACTION_TYPE);
        assertThat(testTransacciones.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testTransacciones.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingTransacciones() throws Exception {
        int databaseSizeBeforeUpdate = transaccionesRepository.findAll().size();

        // Create the Transacciones

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransaccionesMockMvc.perform(put("/api/transacciones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transacciones)))
            .andExpect(status().isBadRequest());

        // Validate the Transacciones in the database
        List<Transacciones> transaccionesList = transaccionesRepository.findAll();
        assertThat(transaccionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransacciones() throws Exception {
        // Initialize the database
        transaccionesService.save(transacciones);

        int databaseSizeBeforeDelete = transaccionesRepository.findAll().size();

        // Delete the transacciones
        restTransaccionesMockMvc.perform(delete("/api/transacciones/{id}", transacciones.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Transacciones> transaccionesList = transaccionesRepository.findAll();
        assertThat(transaccionesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Transacciones.class);
        Transacciones transacciones1 = new Transacciones();
        transacciones1.setId(1L);
        Transacciones transacciones2 = new Transacciones();
        transacciones2.setId(transacciones1.getId());
        assertThat(transacciones1).isEqualTo(transacciones2);
        transacciones2.setId(2L);
        assertThat(transacciones1).isNotEqualTo(transacciones2);
        transacciones1.setId(null);
        assertThat(transacciones1).isNotEqualTo(transacciones2);
    }
}
