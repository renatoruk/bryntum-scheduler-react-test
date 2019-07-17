import "bryntum-scheduler/scheduler.stockholm.css";
import { Scheduler } from "bryntum-scheduler/scheduler.umd.js";
import * as React from "react";
// @ts-ignore
import { ViewPreset } from "./enums/ViewPreset";
import { BryntumSchedulerProps } from "./interfaces/BryntumSchedulerProps";

export class BryntumScheduler extends React.Component<BryntumSchedulerProps> {
    public el: HTMLElement | null;
    public schedulerEngine: Scheduler;

    public componentDidMount(): void {
        if (this.el === null) {
            throw new Error("Container div is null, can not instantiate scheduler");
        }

        console.log(this.props.startDate, this.props.endDate);

        this.schedulerEngine = new Scheduler({
            viewPreset: "dayAndWeek",
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            height: this.props.height,
            // tslint:disable-next-line:object-literal-sort-keys
            appendTo: this.el,
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

        if (this.props.resources !== prevProps.resources) {
            this.schedulerEngine.resourceStore.data = resources;
        }

        if (this.props.events !== prevProps.events) {
            this.schedulerEngine.eventStore.removeAll(false);
            this.schedulerEngine.eventStore.data = events;
        }

        if (this.props.scrollToEvent !== undefined) {
                // @ts-ignore
                this.schedulerEngine.scrollEventIntoView(this.props.scrollToEvent, {
                    animate: 1000,
                    highlight: true,
                }).then(() => {
                    // @ts-ignore
                    console.log(`scrolled ${this.props.scrollToEvent.name} into view`);
                });
                // @ts-ignore
                this.schedulerEngine.selectEvent(this.props.scrollToEvent);
        }
    }

    public componentWillUnmount() {
        this.schedulerEngine.destroy();
    }

    public render() {
        return <div ref={(el) => this.el = el}/>;
    }
}
