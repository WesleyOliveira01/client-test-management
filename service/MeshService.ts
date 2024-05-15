import { BaseService } from "./BaseService";

export class MeshService extends BaseService {
    constructor() {
        super("/v1/api")
    }
}
