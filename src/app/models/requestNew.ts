export class RequestNew{
    constructor(
        public service: string, 
        public description: string,
        public subCategory: string,
        public anexos: string,
        public urgency: string,
        public reportBy: string, // nombre de usuario   
        public reportBranch: string, // nombre de sucursal 
        public status: string,
        public organization: string,
        public analyst: string,
        public manager: string,
        public dateOfReport: string,        
        public dateLastUpdate: string,        
        public dateAssignment: string,        
        public dateSolution: string,        
        public dateClosing: string,        
    ){}
}


// nuevo // se crea el timket
// asignado // cuando se asigna un analista
// pendiente // cuando el analista marca en pendiente que se esta dando seguimiento
// solucionado // cuando el analista marca solucionado
// cerrado // cuando contesta la sucursal la encuesta de satisfaccion