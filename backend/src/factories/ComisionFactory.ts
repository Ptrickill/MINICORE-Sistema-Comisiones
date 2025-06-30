// factories/ComisionFactory.ts

import { IComisionStrategy } from '../interfaces/IComisionStrategy';
import { ComisionBasica } from '../strategies/ComisionBasica';
import { ComisionMedia } from '../strategies/ComisionMedia';
import { ComisionAlta } from '../strategies/ComisionAlta';

export class ComisionFactory {
  // Crea la estrategia correcta segun el monto
  static crearEstrategia(monto: number): IComisionStrategy {
    if (monto <= 1000) {
      return new ComisionBasica();
    } else if (monto <= 5000) {
      return new ComisionMedia();
    } else {
      return new ComisionAlta();
    }
  }
}