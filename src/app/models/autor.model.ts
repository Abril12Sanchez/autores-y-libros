
export class Autor{
    id!:string;
    nombre!:string;
    ApellidoMaterno!:string;
    ApellidoPaterno!:string;
    fechadenacimiento!:string;
    nacionalidad!:string;

    constructor(data?: Partial<Autor>) {
        if (data) {
          this.id = data.id || '';
          this.nombre = data.nombre || '';
          this.ApellidoMaterno = data.ApellidoMaterno || '';
          this.ApellidoPaterno = data.ApellidoPaterno || '';
          this.fechadenacimiento = data.fechadenacimiento || '';
          this.nacionalidad = data.nacionalidad || '';
        }
      }
}