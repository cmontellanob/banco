import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransacciones } from 'app/shared/model/transacciones.model';
import { TransaccionesService } from './transacciones.service';

@Component({
  selector: 'jhi-transacciones-delete-dialog',
  templateUrl: './transacciones-delete-dialog.component.html'
})
export class TransaccionesDeleteDialogComponent {
  transacciones: ITransacciones;

  constructor(
    protected transaccionesService: TransaccionesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.transaccionesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'transaccionesListModification',
        content: 'Deleted an transacciones'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-transacciones-delete-popup',
  template: ''
})
export class TransaccionesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ transacciones }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TransaccionesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.transacciones = transacciones;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/transacciones', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/transacciones', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
