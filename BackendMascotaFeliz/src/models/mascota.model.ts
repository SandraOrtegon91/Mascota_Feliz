import {Entity, model, property} from '@loopback/repository';

@model()
export class Mascota extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoAnimal: string;

  @property({
    type: 'string',
    required: true,
  })
  raza: string;

  @property({
    type: 'string',
    required: true,
  })
  sexo: string;

  @property({
    type: 'string',
  })
  color?: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoAfiliacion: string;

  @property({
    type: 'string',
    required: true,
  })
  observacionesAfiliacion: string;

  @property({
    type: 'string',
    required: true,
  })
  peso: string;

  @property({
    type: 'string',
  })
  antecedentesSalud?: string;

  @property({
    type: 'string',
  })
  observacionesAntecedentes?: string;

  @property({
    type: 'string',
  })
  estadoSaludInicial?: string;

  @property({
    type: 'string',
  })
  foto?: string;


  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
