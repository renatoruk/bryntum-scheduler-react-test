import {RawBarModel} from "@/interfaces/RawBarModel";

export interface RawResourceModel {
    id: string;
    name: string;
    foobars: RawBarModel[];
}
