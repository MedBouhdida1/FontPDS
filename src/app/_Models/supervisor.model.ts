import { Project } from "./project.model";

export class Supervisor {

    constructor(
        public id?: string,
        public name?: string,
        public email?: string,
        public projects?: Project[]

    ) {
    }
}