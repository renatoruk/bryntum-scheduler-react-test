import "bryntum-scheduler/scheduler.stockholm.css";
import { Scheduler } from "bryntum-scheduler/scheduler.umd.js";
import * as React from "react";
// @ts-ignore
import { ViewPreset } from "./enums/ViewPreset";
import { BryntumSchedulerProps } from "./interfaces/BryntumSchedulerProps";

export class BryntumScheduler extends React.Component<BryntumSchedulerProps> {
    public el: HTMLElement | null;
    private schedulerEngine: Scheduler;

    public componentDidMount(): void {
        if (this.el === null) {
            throw new Error("Container div is null, can not instantiate scheduler");
        }

        this.schedulerEngine = new Scheduler({
            autoHeight: true,
            // tslint:disable-next-line:object-literal-sort-keys
            appendTo: this.el,
            // if view preset is not set and zoom event occurs before event update, there is no bug
            viewPreset: "dayAndWeek",
            // startDate: this.props.startDate,
            // endDate: this.props.endDate,
            columns: this.props.columns,
            events: this.props.events,
            resources: this.props.resources,
            features: this.props.features,
        });
    }

    public componentDidUpdate(prevProps: BryntumSchedulerProps) {
        // @ts-ignore
        const { resources, events } = this.props;
        //
        // this.schedulerEngine.resources = resources;
        this.schedulerEngine.eventStore.data = events;
    }

    public componentWillUnmount() {
        this.schedulerEngine.destroy();
    }

    public render() {
        return <div ref={(el) => this.el = el}/>;
    }
}
