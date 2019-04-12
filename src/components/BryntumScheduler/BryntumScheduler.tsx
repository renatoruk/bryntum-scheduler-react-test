import * as React from "react";
import { Scheduler } from "bryntum-scheduler/scheduler.umd.js";
import { BryntumSchedulerProps } from "./interfaces/BryntumSchedulerProps";
import "bryntum-scheduler/scheduler.stockholm.css";
import { ViewPreset } from "./enums/ViewPreset";

export class BryntumScheduler extends React.Component<BryntumSchedulerProps> {
    public el: HTMLElement | null;
    private schedulerEngine: Scheduler;

    public componentDidMount(): void {
        if (this.el === null) {
            throw new Error("Container div is null, can not instantiate scheduler");
        }

        this.schedulerEngine = new Scheduler({
            autoHeight: true,
            appendTo: this.el,
            viewPreset: ViewPreset.DayAndWeek,
            startDate: new Date(2018, 4, 6),
            endDate: new Date(2018, 4, 12),
            columns: this.props.columns,
            events: this.props.events,
            resources: this.props.resources,
        });
    }

    public componentDidUpdate(prevProps: BryntumSchedulerProps) {
        const { resources, events } = this.props;

        this.schedulerEngine.resources = resources;
        this.schedulerEngine.events = events;
    }

    public componentWillUnmount() {
        this.schedulerEngine.destroy();
    }

    public render() {
        return <div ref={(el) => this.el = el}/>;
    }
}
