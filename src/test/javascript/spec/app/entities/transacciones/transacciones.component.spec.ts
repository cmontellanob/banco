/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BancoTestModule } from '../../../test.module';
import { TransaccionesComponent } from 'app/entities/transacciones/transacciones.component';
import { TransaccionesService } from 'app/entities/transacciones/transacciones.service';
import { Transacciones } from 'app/shared/model/transacciones.model';

describe('Component Tests', () => {
  describe('Transacciones Management Component', () => {
    let comp: TransaccionesComponent;
    let fixture: ComponentFixture<TransaccionesComponent>;
    let service: TransaccionesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BancoTestModule],
        declarations: [TransaccionesComponent],
        providers: []
      })
        .overrideTemplate(TransaccionesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransaccionesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransaccionesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Transacciones(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.transacciones[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
