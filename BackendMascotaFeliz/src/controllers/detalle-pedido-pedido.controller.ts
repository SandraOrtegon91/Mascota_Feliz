import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DetallePedido,
  Pedido,
} from '../models';
import {DetallePedidoRepository} from '../repositories';

export class DetallePedidoPedidoController {
  constructor(
    @repository(DetallePedidoRepository)
    public detallePedidoRepository: DetallePedidoRepository,
  ) { }

  @get('/detalle-pedidos/{id}/pedido', {
    responses: {
      '200': {
        description: 'Pedido belonging to DetallePedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedido)},
          },
        },
      },
    },
  })
  async getPedido(
    @param.path.string('id') id: typeof DetallePedido.prototype.id,
  ): Promise<Pedido> {
    return this.detallePedidoRepository.pedido(id);
  }
}
