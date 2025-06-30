// strategies/ComisionMedia.ts

import { IComisionStrategy } from '../interfaces/IComisionStrategy';

export class ComisionMedia implements IComisionStrategy {
  calcular(monto: number): number {
    return monto * 0.075; // 7.5%
  }

  getTipo(): string {
    return "Comisión Media";
  }

  getRango(): string {
    return "$1,000 - $5,000";
  }
}