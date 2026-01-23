import { SkillConfig } from "../types";

export const SKILLS: SkillConfig[] = [
    {
        id: "basic_attack",
        name: "Basic Attack",
        type: "active",
        delay: 2,
        globalCosts: [],
        unitCosts: [],
        globalEffects: [],
        unitEffects: [
            {
                type: "damage",
                amount: 0.1,
                target: "enemy",
                stat: "health",
            },
        ],
    },
    {
        id: "mana_attack",
        name: "Mana-Enhanced Attack",
        type: "active",
        delay: 2,
        globalCosts: [],
        unitCosts: [
            {
                target: "self",
                stat: "mana",
                amount: 0.1,
            }
        ],
        globalEffects: [],
        unitEffects: [
            {
                type: "damage",
                amount: 1,
                target: "enemy",
                stat: "health",
            },
        ],
    },
]