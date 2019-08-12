/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BancoTestModule } from '../../../test.module';
import { TransaccionesDetailComponent } from 'app/entities/transacciones/transacciones-detail.component';
import { Transacciones } from 'app/shared/model/transacciones.model';

describe('Component Tests', () => {
  describe('Transacciones Management Detail Component', () => {
    let comp: TransaccionesDetailComponent;
    let fixture: ComponentFixture<TransaccionesDetailComponent>;
    const route = ({ data: of({ transacciones: new Transacciones(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BancoTestModule],
        declarations: [TransaccionesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TransaccionesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TransaccionesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.transacciones).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
