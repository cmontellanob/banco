import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransacciones } from 'app/shared/model/transacciones.model';

@Component({
  selector: 'jhi-transacciones-detail',
  templateUrl: './transacciones-detail.component.html'
})
export class TransaccionesDetailComponent implements OnInit {
  transacciones: ITransacciones;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ transacciones }) => {
      this.transacciones = transacciones;
    });
  }

  previousState() {
    window.history.back();
  }
}
