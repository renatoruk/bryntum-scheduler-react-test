import {ResourceModel} from "bryntum-scheduler/scheduler.umd.js";
import {RawResourceModel} from "@/interfaces/RawResourceModel";
import {FooTransformer} from "@/transformers/FooTransformer";

export class FooResource extends ResourceModel {
    static get fields() {
        return [{ name: "name", dataSource: "code" }];
    }

    constructor(rawResourceModel: RawResourceModel) {
        const extendedModel = FooTransformer.getExtendedResourceModel(rawResourceModel);
        super(extendedModel);
    }

}

FooResource.childrenField = "foobars";
