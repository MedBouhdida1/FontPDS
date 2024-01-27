export class Task {

    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public status?: string,
        public createdby?: string,
        public photo?: String,
        public events?: Event[]

    ) {
    }


}

