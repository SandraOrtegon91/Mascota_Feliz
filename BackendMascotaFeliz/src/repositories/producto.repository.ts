import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Producto, ProductoRelations, DetallePedido} from '../models';
import {DetallePedidoRepository} from './detalle-pedido.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly detallePedidos: HasManyRepositoryFactory<DetallePedido, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DetallePedidoRepository') protected detallePedidoRepositoryGetter: Getter<DetallePedidoRepository>,
  ) {
    super(Producto, dataSource);
    this.detallePedidos = this.createHasManyRepositoryFactoryFor('detallePedidos', detallePedidoRepositoryGetter,);
    this.registerInclusionResolver('detallePedidos', this.detallePedidos.inclusionResolver);
  }
}
