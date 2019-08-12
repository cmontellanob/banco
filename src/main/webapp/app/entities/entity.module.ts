import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'clientes',
        loadChildren: () => import('./clientes/clientes.module').then(m => m.BancoClientesModule)
      },
      {
        path: 'transacciones',
        loadChildren: () => import('./transacciones/transacciones.module').then(m => m.BancoTransaccionesModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BancoEntityModule {}
