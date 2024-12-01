import { OrderEnum } from '../../shared/enum/order.enum';
import { CategoriaEnum } from '../enum/categoria.enum';
import { Produto } from '../schema/produto.schema';

export class FiltrosProdutoDto {
  nome: string;
  idFarmacia: string;
  status: string[];
  categoria: CategoriaEnum;
  skip: number;
  limit: number;
  orderBy?: keyof Produto;
  order: OrderEnum;
}
