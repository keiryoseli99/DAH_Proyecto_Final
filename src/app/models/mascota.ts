import { Cita } from '../model/cita';
export class Mascota {
    id?: string;
    nombre: string;
    tipo: string;
    contacto: string;
    telefono;
    img?: string;
    citas?: Cita[];
}
