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
  Producto,
} from '../models';
import {DetallePedidoRepository} from '../repositories';

export class DetallePedidoProductoController {
  constructor(
    @repository(DetallePedidoRepository)
    public detallePedidoRepository: DetallePedidoRepository,
  ) { }

  @get('/detalle-pedidos/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to DetallePedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.string('id') id: typeof DetallePedido.prototype.id,
  ): Promise<Producto> {
    return this.detallePedidoRepository.producto(id);
  }
}
