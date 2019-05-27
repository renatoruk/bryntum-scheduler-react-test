import {RawFooModel} from "@/interfaces/RawFooModel";
import {RawResourceModel} from "@/interfaces/RawResourceModel";

export class FooTransformer {
    static getExtendedFooModel(rawFooModel: RawFooModel) {
        return {
            ...rawFooModel,
            computedDateTo: new Date(rawFooModel.dateTo),
            computedDateFrom: new Date(rawFooModel.dateFrom)
        }
    }

    static getExtendedResourceModel(rawResourceModel: RawResourceModel) {
        return {
            ...rawResourceModel,
            expanded: true,
            code: rawResourceModel.id + "." + rawResourceModel.name
        }
    }
}
