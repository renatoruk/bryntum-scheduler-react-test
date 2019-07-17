import {EventModel} from "bryntum-scheduler/scheduler.umd.js";
import {FooTransformer} from "@/transformers/FooTransformer";

export class FooEvent extends EventModel {
    static get fields() {
        return [
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

    constructor(rawFooModel: { bar: { id: string }; dateTo: string; name: string; id: string; dateFrom: string }) {
        const extendedModel = FooTransformer.getExtendedFooModel(
            rawFooModel,
        );
        super(extendedModel);
    }
}
