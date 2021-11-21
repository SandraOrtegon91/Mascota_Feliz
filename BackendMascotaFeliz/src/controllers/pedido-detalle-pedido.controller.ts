import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Pedido,
  DetallePedido,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoDetallePedidoController {
  constructor(
    @repository(PedidoRepository) protected pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/detalle-pedidos', {
    responses: {
      '200': {
        description: 'Array of Pedido has many DetallePedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetallePedido)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DetallePedido>,
  ): Promise<DetallePedido[]> {
    return this.pedidoRepository.detallePedidos(id).find(filter);
  }

  @post('/pedidos/{id}/detalle-pedidos', {
    responses: {
      '200': {
        description: 'Pedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetallePedido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pedido.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallePedido, {
            title: 'NewDetallePedidoInPedido',
            exclude: ['id'],
            optional: ['pedidoId']
          }),
        },
      },
    }) detallePedido: Omit<DetallePedido, 'id'>,
  ): Promise<DetallePedido> {
    return this.pedidoRepository.detallePedidos(id).create(detallePedido);
  }

  @patch('/pedidos/{id}/detalle-pedidos', {
    responses: {
      '200': {
        description: 'Pedido.DetallePedido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallePedido, {partial: true}),
        },
      },
    })
    detallePedido: Partial<DetallePedido>,
    @param.query.object('where', getWhereSchemaFor(DetallePedido)) where?: Where<DetallePedido>,
  ): Promise<Count> {
    return this.pedidoRepository.detallePedidos(id).patch(detallePedido, where);
  }

  @del('/pedidos/{id}/detalle-pedidos', {
    responses: {
      '200': {
        description: 'Pedido.DetallePedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetallePedido)) where?: Where<DetallePedido>,
  ): Promise<Count> {
    return this.pedidoRepository.detallePedidos(id).delete(where);
  }
}
