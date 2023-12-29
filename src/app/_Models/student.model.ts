import { Project } from "./project.model";

export class Student {

    constructor(
        public id?: string,
        public name?: string,
        public email?: string,
        public project?: Project,


    ) {
    }
}