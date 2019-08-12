import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BancoSharedModule } from 'app/shared';
import {
  TransaccionesComponent,
  TransaccionesDetailComponent,
  TransaccionesUpdateComponent,
  TransaccionesDeletePopupComponent,
  TransaccionesDeleteDialogComponent,
  transaccionesRoute,
  transaccionesPopupRoute
} from './';

const ENTITY_STATES = [...transaccionesRoute, ...transaccionesPopupRoute];

@NgModule({
  imports: [BancoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TransaccionesComponent,
    TransaccionesDetailComponent,
    TransaccionesUpdateComponent,
    TransaccionesDeleteDialogComponent,
    TransaccionesDeletePopupComponent
  ],
  entryComponents: [
    TransaccionesComponent,
    TransaccionesUpdateComponent,
    TransaccionesDeleteDialogComponent,
    TransaccionesDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BancoTransaccionesModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
