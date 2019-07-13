/* tslint:disable */
// import {BryntumScheduler} from "@/components/BryntumScheduler/BryntumScheduler";
import * as React from "react";
import "bryntum-scheduler/scheduler.stockholm.css";
import "./App.css";
// @ts-ignore
// @ts-ignore
import {FooResource} from "@/model/FooResource";
// @ts-ignore
import {BryntumSchedulerBasic} from "@/components/BryntumSchedulerBasic";
import {FooEvent} from "@/model/FooEvent";
// @ts-ignore
import {BryntumScheduler} from "@/components/BryntumScheduler/BryntumScheduler";

const startDate = new Date();

const addDate = (num: number) => {
    return new Date(new Date().getTime() + (num * 24 * 60 * 60 * 1000));
};

const endDate = addDate(5);

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            resources: this.createResources(),
            events: this.createEvents(),
            eventsVersion: 1,
        };

        this.updateEvents = this.updateEvents.bind(this);
    }

    public render() {
        return (
            <div className="App">
                <BryntumScheduler
                    height={window.innerHeight - 200}
                    columns={this.createColumns()}
                    resources={this.state.resources}
                    resourcesVersion={1}
                    eventsVersion={this.state.eventsVersion}
                    features={{tree: true}}
                    startDate={startDate}
                    endDate={endDate}
                    events={this.state.events}
                />

                <button onClick={this.updateEvents}>update events</button>
            </div>
        );
    }

    updateEvents() {
        const newEvents = this.createEvents();
        const newResources = this.createResources();

        this.setState({
            eventsVersion: this.state.eventsVersion + 1,
            events: newEvents,
            resources: newResources,
        });
    }

    // @ts-ignore
    private createColumns() {
        return [
            {
                field: "name",
                text: "code",
                type: "tree",
                // tslint:disable-next-line:object-literal-sort-keys
                width: "15%",
            },
        ];
    }

    // @ts-ignore
    private createResources() {

        const res = [];
        for (let i = 0; i < 10; i++) {
            const arr = Array(10).fill(0);
            const id = (i + 1) * 100;

            const subresources = arr.map((el, index) => {
                return {
                    // exception gets thrown on deletion from store as the id from resource and sub-resource is the same
                    id: "resource-" + id.toString(),
                    name: "subresource-" + i * 10 + index
                }
            });

            let model: FooResource;
            model = new FooResource({
                id: "resource-" + id.toString(),
                name: "resource-" + i,
                foobars: subresources,
            });

            res.push(model);
        }

        return res;
    }

    // @ts-ignore
    private createEvents() {
        const events = [];
        for (let i = 0; i < 1; i++) {
            const arr = Array(400).fill(0);
            const subevents = arr.map((el, index) => {
                return new FooEvent({
                    id: Math.random().toString(),
                    dateTo: addDate(Math.ceil(Math.random() * 50)).toString(),
                    dateFrom: startDate.toString(),
                    bar: {
                        id: "sub-" + ((i + 1) * 10 + index).toString(10),
                    }
                });
            });

            events.push(...subevents);
        }

        return events;
    }
}

export default App;
