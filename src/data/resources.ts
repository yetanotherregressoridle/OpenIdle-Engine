import { ResourceConfig } from "../types";

export const RESOURCES: ResourceConfig[] = [
    {
        id: "days",
        name: "Days",
        type: "basic",
        category: "loop",
        baseValue: 5,
        baseMax: 10,
        description: "Days",
        wholeNumbers: true,
        resetOnLoop: true,
    },
    {
        id: "regressions",
        name: "Regressions",
        type: "basic",
        category: "loop",
        baseValue: 0,
        baseMax: -1,
        description: "Number of times you have regressed.",
        wholeNumbers: true,
        hidden: true,
        resetOnLoop: false,
    }
]