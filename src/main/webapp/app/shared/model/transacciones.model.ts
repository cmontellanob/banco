import { Moment } from 'moment';
import { IClientes } from 'app/shared/model/clientes.model';

export const enum TransactionType {
  Ingreso = 'Ingreso',
  Egreso = 'Egreso'
}

export interface ITransacciones {
  id?: number;
  fecha?: Moment;
  transactionType?: TransactionType;
  cantidad?: number;
  descripcion?: string;
  clientes?: IClientes;
}

export class Transacciones implements ITransacciones {
  constructor(
    public id?: number,
    public fecha?: Moment,
    public transactionType?: TransactionType,
    public cantidad?: number,
    public descripcion?: string,
    public clientes?: IClientes
  ) {}
}
