import { Stage } from "./stage.model";
import { Supervisor } from "./supervisor.model";

export class Project {

    constructor(
        public id?: string,
        public title?: string,
        public description?: string,
        public timeline?: string,
        public document?: any,
        public supervisorId?: Supervisor,
        public team?: any,
        public stages?: Stage[]


    ) {
    }
}