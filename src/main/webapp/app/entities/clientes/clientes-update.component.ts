import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IClientes, Clientes } from 'app/shared/model/clientes.model';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'jhi-clientes-update',
  templateUrl: './clientes-update.component.html'
})
export class ClientesUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    code: [],
    firstName: [],
    lastName: [],
    email: [],
    phoneNumber: []
  });

  constructor(protected clientesService: ClientesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ clientes }) => {
      this.updateForm(clientes);
    });
  }

  updateForm(clientes: IClientes) {
    this.editForm.patchValue({
      id: clientes.id,
      code: clientes.code,
      firstName: clientes.firstName,
      lastName: clientes.lastName,
      email: clientes.email,
      phoneNumber: clientes.phoneNumber
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const clientes = this.createFromForm();
    if (clientes.id !== undefined) {
      this.subscribeToSaveResponse(this.clientesService.update(clientes));
    } else {
      this.subscribeToSaveResponse(this.clientesService.create(clientes));
    }
  }

  private createFromForm(): IClientes {
    return {
      ...new Clientes(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      firstName: this.editForm.get(['firstName']).value,
      lastName: this.editForm.get(['lastName']).value,
      email: this.editForm.get(['email']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClientes>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
