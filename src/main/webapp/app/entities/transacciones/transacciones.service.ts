import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransacciones } from 'app/shared/model/transacciones.model';

type EntityResponseType = HttpResponse<ITransacciones>;
type EntityArrayResponseType = HttpResponse<ITransacciones[]>;

@Injectable({ providedIn: 'root' })
export class TransaccionesService {
  public resourceUrl = SERVER_API_URL + 'api/transacciones';

  constructor(protected http: HttpClient) {}

  create(transacciones: ITransacciones): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transacciones);
    return this.http
      .post<ITransacciones>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(transacciones: ITransacciones): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transacciones);
    return this.http
      .put<ITransacciones>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITransacciones>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITransacciones[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(transacciones: ITransacciones): ITransacciones {
    const copy: ITransacciones = Object.assign({}, transacciones, {
      fecha: transacciones.fecha != null && transacciones.fecha.isValid() ? transacciones.fecha.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha != null ? moment(res.body.fecha) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((transacciones: ITransacciones) => {
        transacciones.fecha = transacciones.fecha != null ? moment(transacciones.fecha) : null;
      });
    }
    return res;
  }
}
