import { OrderEnum } from '../../shared/enum/order.enum';
import { Produto } from '../schema/produto.schema';

export class FiltrosProdutoDto {
  nome: string;
  idFarmacia: string;
  status: string[];
  skip: number;
  limit: number;
  orderBy?: keyof Produto;
  order: OrderEnum;
}
