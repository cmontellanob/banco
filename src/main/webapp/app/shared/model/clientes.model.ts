import { ITransacciones } from 'app/shared/model/transacciones.model';

export interface IClientes {
  id?: number;
  code?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  codes?: ITransacciones[];
}

export class Clientes implements IClientes {
  constructor(
    public id?: number,
    public code?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public codes?: ITransacciones[]
  ) {}
}
