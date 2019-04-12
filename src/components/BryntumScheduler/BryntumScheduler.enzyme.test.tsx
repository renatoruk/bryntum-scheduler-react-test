import { mount } from "enzyme";
import { BryntumScheduler } from "./BryntumScheduler";
import * as React from "react";
import { columns } from "./mocks/columns";
import { events } from "./mocks/events";
import { resources } from "./mocks/resources";

describe("BryntumScheduler", () => {
    it("should render without crashing", () => {
        const wrapper = mount(
            <BryntumScheduler
                columns={columns}
                events={events}
                resources={resources}
            />,
        );

        const widget = wrapper.find("div");

        wrapper.update();

        console.log(wrapper.debug());
        expect(widget).toHaveLength(1);

        wrapper.unmount();
    });
});
