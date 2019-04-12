import { cleanup, render } from "react-testing-library";
import * as React from "react";
import { BryntumScheduler } from "./BryntumScheduler";
import { events } from "./mocks/events";
import { columns } from "./mocks/columns";
import { resources } from "./mocks/resources";

afterEach(cleanup);

test("Renders scheduler with rows and resources", () => {
    const { getByText } = render(
        <BryntumScheduler
            columns={columns}
            events={events}
            resources={resources}
        />,
    );

    const resource = getByText("Arcady");

    expect(resource).toBeInstanceOf(HTMLElement);
});
