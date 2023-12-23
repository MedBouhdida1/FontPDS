import { Project } from "./project.model";

export class Supervisor {

    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public projects?: Project[]

    ) {
    }
}