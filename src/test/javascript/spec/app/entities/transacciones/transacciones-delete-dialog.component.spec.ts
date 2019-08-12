/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BancoTestModule } from '../../../test.module';
import { TransaccionesDeleteDialogComponent } from 'app/entities/transacciones/transacciones-delete-dialog.component';
import { TransaccionesService } from 'app/entities/transacciones/transacciones.service';

describe('Component Tests', () => {
  describe('Transacciones Management Delete Component', () => {
    let comp: TransaccionesDeleteDialogComponent;
    let fixture: ComponentFixture<TransaccionesDeleteDialogComponent>;
    let service: TransaccionesService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BancoTestModule],
        declarations: [TransaccionesDeleteDialogComponent]
      })
        .overrideTemplate(TransaccionesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TransaccionesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransaccionesService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
