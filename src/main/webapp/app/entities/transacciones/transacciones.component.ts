import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITransacciones } from 'app/shared/model/transacciones.model';
import { AccountService } from 'app/core';
import { TransaccionesService } from './transacciones.service';

@Component({
  selector: 'jhi-transacciones',
  templateUrl: './transacciones.component.html'
})
export class TransaccionesComponent implements OnInit, OnDestroy {
  transacciones: ITransacciones[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected transaccionesService: TransaccionesService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.transaccionesService
      .query()
      .pipe(
        filter((res: HttpResponse<ITransacciones[]>) => res.ok),
        map((res: HttpResponse<ITransacciones[]>) => res.body)
      )
      .subscribe(
        (res: ITransacciones[]) => {
          this.transacciones = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTransacciones();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITransacciones) {
    return item.id;
  }

  registerChangeInTransacciones() {
    this.eventSubscriber = this.eventManager.subscribe('transaccionesListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
