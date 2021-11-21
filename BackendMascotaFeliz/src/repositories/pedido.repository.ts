import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pedido, PedidoRelations, Cliente, DetallePedido} from '../models';
import {ClienteRepository} from './cliente.repository';
import {DetallePedidoRepository} from './detalle-pedido.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Pedido.prototype.id>;

  public readonly detallePedidos: HasManyRepositoryFactory<DetallePedido, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('DetallePedidoRepository') protected detallePedidoRepositoryGetter: Getter<DetallePedidoRepository>,
  ) {
    super(Pedido, dataSource);
    this.detallePedidos = this.createHasManyRepositoryFactoryFor('detallePedidos', detallePedidoRepositoryGetter,);
    this.registerInclusionResolver('detallePedidos', this.detallePedidos.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
