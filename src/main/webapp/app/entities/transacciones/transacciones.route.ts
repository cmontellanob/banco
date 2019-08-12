import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Transacciones } from 'app/shared/model/transacciones.model';
import { TransaccionesService } from './transacciones.service';
import { TransaccionesComponent } from './transacciones.component';
import { TransaccionesDetailComponent } from './transacciones-detail.component';
import { TransaccionesUpdateComponent } from './transacciones-update.component';
import { TransaccionesDeletePopupComponent } from './transacciones-delete-dialog.component';
import { ITransacciones } from 'app/shared/model/transacciones.model';

@Injectable({ providedIn: 'root' })
export class TransaccionesResolve implements Resolve<ITransacciones> {
  constructor(private service: TransaccionesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITransacciones> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Transacciones>) => response.ok),
        map((transacciones: HttpResponse<Transacciones>) => transacciones.body)
      );
    }
    return of(new Transacciones());
  }
}

export const transaccionesRoute: Routes = [
  {
    path: '',
    component: TransaccionesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bancoApp.transacciones.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TransaccionesDetailComponent,
    resolve: {
      transacciones: TransaccionesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bancoApp.transacciones.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TransaccionesUpdateComponent,
    resolve: {
      transacciones: TransaccionesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bancoApp.transacciones.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TransaccionesUpdateComponent,
    resolve: {
      transacciones: TransaccionesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bancoApp.transacciones.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const transaccionesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TransaccionesDeletePopupComponent,
    resolve: {
      transacciones: TransaccionesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bancoApp.transacciones.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
