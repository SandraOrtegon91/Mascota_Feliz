import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DetallePedido, DetallePedidoRelations, Pedido, Producto} from '../models';
import {PedidoRepository} from './pedido.repository';
import {ProductoRepository} from './producto.repository';

export class DetallePedidoRepository extends DefaultCrudRepository<
  DetallePedido,
  typeof DetallePedido.prototype.id,
  DetallePedidoRelations
> {

  public readonly pedido: BelongsToAccessor<Pedido, typeof DetallePedido.prototype.id>;

  public readonly producto: BelongsToAccessor<Producto, typeof DetallePedido.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(DetallePedido, dataSource);
    this.producto = this.createBelongsToAccessorFor('producto', productoRepositoryGetter,);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
    this.pedido = this.createBelongsToAccessorFor('pedido', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedido', this.pedido.inclusionResolver);
  }
}
