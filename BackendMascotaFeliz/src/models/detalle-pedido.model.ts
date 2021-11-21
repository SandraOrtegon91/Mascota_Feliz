import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Pedido} from './pedido.model';
import {Producto} from './producto.model';

@model()
export class DetallePedido extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @belongsTo(() => Pedido)
  pedidoId: string;

  @belongsTo(() => Producto)
  productoId: string;

  constructor(data?: Partial<DetallePedido>) {
    super(data);
  }
}

export interface DetallePedidoRelations {
  // describe navigational properties here
}

export type DetallePedidoWithRelations = DetallePedido & DetallePedidoRelations;
