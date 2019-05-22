// tslint:disable-next-line:interface-name
export interface BryntumSchedulerProps {
    startDate: Date;
    endDate: Date;
    columns: Array<{}>;
    events: Array<{}>;
    resources: Array<{}>;
    features?: {
        [key: string]: any;
    }
}
