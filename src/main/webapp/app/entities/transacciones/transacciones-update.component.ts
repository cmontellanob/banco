import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ITransacciones, Transacciones } from 'app/shared/model/transacciones.model';
import { TransaccionesService } from './transacciones.service';
import { IClientes } from 'app/shared/model/clientes.model';
import { ClientesService } from 'app/entities/clientes';

@Component({
  selector: 'jhi-transacciones-update',
  templateUrl: './transacciones-update.component.html'
})
export class TransaccionesUpdateComponent implements OnInit {
  isSaving: boolean;

  clientes: IClientes[];

  editForm = this.fb.group({
    id: [],
    fecha: [],
    transactionType: [],
    cantidad: [],
    descripcion: [],
    clientes: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected transaccionesService: TransaccionesService,
    protected clientesService: ClientesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ transacciones }) => {
      this.updateForm(transacciones);
    });
    this.clientesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClientes[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClientes[]>) => response.body)
      )
      .subscribe((res: IClientes[]) => (this.clientes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(transacciones: ITransacciones) {
    this.editForm.patchValue({
      id: transacciones.id,
      fecha: transacciones.fecha != null ? transacciones.fecha.format(DATE_TIME_FORMAT) : null,
      transactionType: transacciones.transactionType,
      cantidad: transacciones.cantidad,
      descripcion: transacciones.descripcion,
      clientes: transacciones.clientes
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const transacciones = this.createFromForm();
    if (transacciones.id !== undefined) {
      this.subscribeToSaveResponse(this.transaccionesService.update(transacciones));
    } else {
      this.subscribeToSaveResponse(this.transaccionesService.create(transacciones));
    }
  }

  private createFromForm(): ITransacciones {
    return {
      ...new Transacciones(),
      id: this.editForm.get(['id']).value,
      fecha: this.editForm.get(['fecha']).value != null ? moment(this.editForm.get(['fecha']).value, DATE_TIME_FORMAT) : undefined,
      transactionType: this.editForm.get(['transactionType']).value,
      cantidad: this.editForm.get(['cantidad']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      clientes: this.editForm.get(['clientes']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransacciones>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackClientesById(index: number, item: IClientes) {
    return item.id;
  }
}
