module.exports = {
    preset: "ts-jest",
    testPathIgnorePatterns: [
        "build/.+",
        "vendor"
    ],
    collectCoverageFrom: [
        "**/*.{ts,tsx}",
        "!**/node_modules/**",
        "!**/build/**",
        "!**/features/**"
    ],
    moduleNameMapper: {
        "^@/(.*)": "<rootDir>/src/$1",
        "^styles/(.*)": "<rootDir>/src/styles/$1",
        "^test/(.*)": "<rootDir>/test/$1",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    transform: {
        ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
    },
    setupFiles: [
        "<rootDir>/__mocks__/client.ts",
        "<rootDir>/__mocks__/mutationObserver.ts",
        "jest-canvas-mock",
    ],
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    testMatch: [
        "**/*.test.{ts,tsx}",
        "**/*.steps.{ts,tsx}",
    ],
};
