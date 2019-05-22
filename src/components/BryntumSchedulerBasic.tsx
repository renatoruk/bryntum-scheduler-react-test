/* tslint:disable */
import * as React from "react";
// UMD bundle is used to support IE11 browser. If you don't need it just use import from 'bryntum-scheduler' instead
import { Scheduler } from "bryntum-scheduler/scheduler.umd.js";

// Defines a React component that wraps Bryntum Scheduler
export class BryntumSchedulerBasic extends React.Component {

    public static defaultProps = {
        viewPreset: "hourAndDay",
        barMargin: 2,
        timeRanges: true,
        eventsVersion: 0,
        resourcesVersion: 0,
    };
    // Features requires special handling when used as props
    public schedulerFeatures = [
        "cellEdit",
        "columnLines",
        "dependencies",
        "eventDrag",
        "eventContextMenu",
        "eventDrag",
        "eventDragCreate",
        "eventEdit",
        "eventFilter",
        "eventResize",
        "eventTooltip",
        "group",
        "groupSummary",
        "headerContextMenu",
        "labels",
        "nonWorkingTime",
        "regionResize",
        "sort",
        "scheduleTooltip",
        "stripe",
        "summary",
        "timeRanges",
    ];

    public props: {
        // tslint:disable-next-line
        [name: string]: any,
    };

    public el: HTMLElement | null;
    public schedulerEngine: Scheduler;

    // React component rendered to DOM, render scheduler to it
    public componentDidMount() {
        const config = {
            appendTo: this.el,

            callOnFunctions: true,

            features: {},
            events: this.props.events,
            resources: this.props.resources,
        };

        this.schedulerFeatures.forEach((fieldName) => {
            if (fieldName in this.props) {
                config.features[fieldName] = this.props[fieldName];
            }
        });

        // Handle config (relaying all props except those used for features to scheduler)
        Object.keys(this.props).forEach((propName) => {
            if (!this.schedulerFeatures.includes(propName)) {
                config[propName] = this.props[propName];
            }
        });

        // Create the actual scheduler, used as engine for the wrapper
        const engine = this.schedulerEngine = new Scheduler(config);

        // Map all features from schedulerEngine to scheduler to simplify calls
        Object.keys(engine.features).forEach((key) => {
            if (!this[key]) {
                this[key] = engine.features[key];
            }
        });
    }

    // React component removed, destroy engine
    public componentWillUnmount() {
        this.schedulerEngine.destroy();
    }

    // Component updated, from changing a prop using state. React to it depending on what changed
    // tslint:disable-next-line
    public componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        // tslint:disable-next-line
        const engine = this.schedulerEngine,
            props = this.props,
            // These props are ignored or has special handling below
            // tslint:disable-next-line
            exludeProps = ["events", "resources", "eventsVersion", "resourcesVersion", "timeRanges", "columns", "adapter", "ref", "children", ...this.schedulerFeatures];

        // tslint:disable-next-line
        // Reflect configuration changes. Since most scheduler configs are reactive the scheduler will update automatically
        Object.keys(props).forEach((propName) => {
            // Only apply if prop has changed
            if (!exludeProps.includes(propName) && props[propName] !== prevProps[propName]) {
                engine[propName] = props[propName];
            }
        });

        // xxVersion used to flag that data has changed
        if (prevProps.resourcesVersion !== props.resourcesVersion) {
            engine.resources = props.resources;
        }

        if (prevProps.eventsVersion !== props.eventsVersion) {
            engine.eventStore.data = props.events;
        }

        // Reflect feature config changes
        this.schedulerFeatures.forEach((fieldName) => {
            // tslint:disable-next-line
            const currentProp = props[fieldName],
                prevProp = prevProps[fieldName];

            // tslint:disable-next-line
            if (fieldName in props && currentProp !== prevProp && JSON.stringify(currentProp) !== JSON.stringify(prevProp)) {
                engine.features[fieldName].setConfig(currentProp);
            }
        });
    }

    public render() {
        // tslint:disable-next-line
        return <div className={"b-react-scheduler-container"} id={this.props.id} ref={(el) => this.el = el}></div>;
    }

    public addEvent() {
        // tslint:disable-next-line
        const scheduler = this.schedulerEngine,
            startDate = new Date(scheduler.startDate.getTime()),
            endDate = new Date(startDate.getTime());

        endDate.setHours(endDate.getHours() + 1);

        scheduler.eventStore.add({
            resourceId: scheduler.resourceStore.first.id,
            startDate,
            endDate,
            name: "New task",
            eventType: "Meeting",
        });
    }

    public removeEvent() {
        // Remove selected event (if any)
        // tslint:disable-next-line
        this.schedulerEngine.selectedEvents && this.schedulerEngine.selectedEvents[0].remove();
    }
}
