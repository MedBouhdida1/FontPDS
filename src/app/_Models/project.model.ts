import { Supervisor } from "./supervisor.model";

export class Project {

    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public timeline?: string,
        public document?: any,
        public supervisorId?: Supervisor


    ) {
    }
}