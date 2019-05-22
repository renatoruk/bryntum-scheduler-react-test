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

const startDate = new Date();

const addDate = (num: number) => {
    return new Date(new Date().getTime() + (num * 24 * 60 * 60 * 1000));
};

const endDate = addDate(5);

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            events: this.createEvents(),
            eventsVersion: 1,
        };

        this.updateEvents = this.updateEvents.bind(this);
    }

    public render() {

        return (
            <div className="App">
                <BryntumSchedulerBasic
                    autoHeight={true}
                    columns={this.createColumns()}
                    resources={this.createResources()}
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
        // this.setState({
        //     events: [],
        // });
        this.setState({
            eventsVersion: this.state.eventsVersion + 1,
            events: this.createEvents(),
        });
    }

    // @ts-ignore
    private createColumnsMain() {
        return [
            {
                type: "tree",
                text: "Employees",
                field: "name",
                width: "15em",
                expandedFolderIconCls: null,
                collapsedFolderIconCls: null,
                leafIconCls: null,
            }
        ]
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
        for (let i = 0; i < 1; i++) {
            const arr = Array(10).fill(0);
            // @ts-ignore
            const subresources = arr.map((el, index) => {
                return {
                    id: (i + 1) * 100 + index,
                    name: "subresource-" + i * 10 + index
                }
            });

            const model = new FooResource({
                id: i,
                name: "resource-" + i,
                expanded: true,
                nestedElements: subresources,
            });
            res.push(model);
        }

        return res;
    }

    // @ts-ignore
    private createEvents() {
        const events = [];
        for (let i = 0; i < 1; i++) {
            const arr = Array(10).fill(0);
            const subevents = arr.map((el, index) => {
                return new FooEvent({
                    endDate: addDate(Math.ceil(Math.random() * 50)),
                    resourceId: (i + 1) * 100 + index,
                    startDate,
                });
            });

            events.push(...subevents);
        }

        console.log(events);
        return events;
    }
}

export default App;
