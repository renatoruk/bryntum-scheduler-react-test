import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import "react-testing-library/cleanup-after-each";

enzyme.configure({adapter: new Adapter()});
