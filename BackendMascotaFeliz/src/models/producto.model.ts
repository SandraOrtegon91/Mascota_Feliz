import {Entity, model, property, hasMany} from '@loopback/repository';
import {DetallePedido} from './detalle-pedido.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  precioCosto: number;

  @property({
    type: 'number',
    required: true,
  })
  precioVenta: number;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @hasMany(() => DetallePedido)
  detallePedidos: DetallePedido[];

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
