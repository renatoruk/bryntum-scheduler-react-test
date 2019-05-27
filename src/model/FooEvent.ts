import {EventModel} from "bryntum-scheduler/scheduler.umd.js";
import {RawFooModel} from "@/interfaces/RawFooModel";
import {FooTransformer} from "@/transformers/FooTransformer";

export class FooEvent extends EventModel {
    static get fields() {
        return [
            {
                name: "resourceId",
                dataSource: "bar.id",
            },
            {
                name: "startDate",
                dataSource: "computedDateFrom",
            },
            {
                name: "endDate",
                dataSource: "computedDateTo",
            },
        ]
    }

    constructor(rawFooModel: RawFooModel) {
        const extendedModel = FooTransformer.getExtendedFooModel(
            rawFooModel,
        );
        super(extendedModel);
    }
}
