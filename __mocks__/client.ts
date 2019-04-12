// @ts-ignore
if (global.document) {
    document.createRange = () => ({
        setStart: () => {
            return;
        },
        setEnd: () => {
            return;
        },
        // @ts-ignore
        commonAncestorContainer: {
            nodeName: "BODY",
            ownerDocument: document,
        },
    });
}
