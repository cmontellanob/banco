/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { BancoTestModule } from '../../../test.module';
import { TransaccionesUpdateComponent } from 'app/entities/transacciones/transacciones-update.component';
import { TransaccionesService } from 'app/entities/transacciones/transacciones.service';
import { Transacciones } from 'app/shared/model/transacciones.model';

describe('Component Tests', () => {
  describe('Transacciones Management Update Component', () => {
    let comp: TransaccionesUpdateComponent;
    let fixture: ComponentFixture<TransaccionesUpdateComponent>;
    let service: TransaccionesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BancoTestModule],
        declarations: [TransaccionesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TransaccionesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransaccionesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransaccionesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Transacciones(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Transacciones();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
