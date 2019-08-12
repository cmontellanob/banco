import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BancoSharedModule } from 'app/shared';
import {
  ClientesComponent,
  ClientesDetailComponent,
  ClientesUpdateComponent,
  ClientesDeletePopupComponent,
  ClientesDeleteDialogComponent,
  clientesRoute,
  clientesPopupRoute
} from './';

const ENTITY_STATES = [...clientesRoute, ...clientesPopupRoute];

@NgModule({
  imports: [BancoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ClientesComponent,
    ClientesDetailComponent,
    ClientesUpdateComponent,
    ClientesDeleteDialogComponent,
    ClientesDeletePopupComponent
  ],
  entryComponents: [ClientesComponent, ClientesUpdateComponent, ClientesDeleteDialogComponent, ClientesDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BancoClientesModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
