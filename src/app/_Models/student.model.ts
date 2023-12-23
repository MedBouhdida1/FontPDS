import { Project } from "./project.model";

export class Organizer {

    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public project?: Project,


    ) {
    }
}