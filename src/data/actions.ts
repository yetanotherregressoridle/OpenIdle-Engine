import { ActionConfig } from "../types";

export const ACTIONS: ActionConfig[] = [
    // Chapter 0
    {
        id: "avoid",
        name: "Avoid Danger",
        category: "officebuilding",
        description: "Survive to the next day by avoiding danger.",
        flavorText: "Knowing the ins and outs of the office building, you decide to hide from the monsters until help arrives.",
        globalEffects: [{ type: "increase_value", resourceID: "days", amount: 1 }],
        unitEffects: [],
        prerequisites: [
            { resourceID: "regressions", maxValue: 0, },
            { resourceID: "days", valueLessThanMax: true },
        ],
    },
    {
        id: "battle",
        name: "Battle",
        category: "officebuilding",
        description: "Fight your way out of the office building.",
        flavorText: "More monsters have come through the dungeon gate and you can no longer find a safe place to hide. The only way out is past the monsters.",
        globalEffects: [{ type: "start_encounter", encounterID: "first" }],
        unitEffects: [],
        maxExecutions: 1,
        prerequisites: [
            { resourceID: "regressions", maxValue: 0, },
            { resourceID: "days", valueEqualToMax: true },
        ],
    },
    /*{
        id: "rest",
        name: "Rest",
        category: "common",
        description: "Rest and recover.",
        flavorText: "TODO: Add flavor text",
        globalEffects: [
            { type: "increase_value", resourceID: "days", amount: 1 }
        ],
        unitEffects: [
            { type: "increase_value", target: 'mainCharacter', stat: 'health', amount: 1 },
        ],
        prerequisites: [{ resourceID: "days", valueLessThanMax: true }],
    },*/
    {
        id: "awaken",
        name: "Awaken",
        category: "officebuilding",
        description: "Awaken your latent abilities.",
        flavorText: "There are stories of people who have awakened their abilities in times of crisis. With the clarity of imminent death, you focus your mind and reach for the sleeping power within you.",
        globalEffects: [],
        unitEffects: [
            { type: "increase_max", target: 'mainCharacter', stat: 'mana', amount: 1 },
            { type: "increase_value", target: 'mainCharacter', stat: 'mana', amount: 1 },
        ],
        maxExecutions: 1,
        prerequisites: [
            { resourceID: "regressions", maxValue: 0, },
            { metaProgressionID: "lost_first_battle" },
        ],
    },
    {
        id: "loop",
        name: "Loop",
        category: "officebuilding",
        description: "Regress to the past.",
        flavorText: "This unknown power allows you to regress to the past. You can use this power to try again.",
        globalEffects: [
            { type: "loop" },
        ],
        unitEffects: [],
        prerequisites: [
            { resourceID: "regressions", maxValue: 0, },
            { unit: "mainCharacter", unitStat: "mana", minMax: 1 },
        ],
    },
]