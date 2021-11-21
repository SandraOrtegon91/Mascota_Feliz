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
  Producto,
  DetallePedido,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoDetallePedidoController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/detalle-pedidos', {
    responses: {
      '200': {
        description: 'Array of Producto has many DetallePedido',
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
    return this.productoRepository.detallePedidos(id).find(filter);
  }

  @post('/productos/{id}/detalle-pedidos', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetallePedido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallePedido, {
            title: 'NewDetallePedidoInProducto',
            exclude: ['id'],
            optional: ['productoId']
          }),
        },
      },
    }) detallePedido: Omit<DetallePedido, 'id'>,
  ): Promise<DetallePedido> {
    return this.productoRepository.detallePedidos(id).create(detallePedido);
  }

  @patch('/productos/{id}/detalle-pedidos', {
    responses: {
      '200': {
        description: 'Producto.DetallePedido PATCH success count',
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
    return this.productoRepository.detallePedidos(id).patch(detallePedido, where);
  }

  @del('/productos/{id}/detalle-pedidos', {
    responses: {
      '200': {
        description: 'Producto.DetallePedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetallePedido)) where?: Where<DetallePedido>,
  ): Promise<Count> {
    return this.productoRepository.detallePedidos(id).delete(where);
  }
}
