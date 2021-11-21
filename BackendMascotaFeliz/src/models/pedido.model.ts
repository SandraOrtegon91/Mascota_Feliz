import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {DetallePedido} from './detalle-pedido.model';

@model()
export class Pedido extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaPedido: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaEntrega: string;

  @property({
    type: 'string',
    required: true,
  })
  formaPago: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoPedido: string;

  @property({
    type: 'string',
    required: true,
  })
  Observaciones: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => DetallePedido)
  detallePedidos: DetallePedido[];

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
