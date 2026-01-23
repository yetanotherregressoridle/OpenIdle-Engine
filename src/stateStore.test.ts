import { describe, it, expect } from 'vitest';
import { createStateStore } from './stateStore';
import { ACTION_CONFIG_MAP, ENCOUNTER_CONFIG_MAP } from './base';
import { MainCharacterPartyUnitID } from './types';

describe('stateStore with real data', () => {

    it('initializes state with real resources', () => {
        const [state, api] = createStateStore();
        api.initialize(api);

        // Check for 'days' resource from resources.ts
        // Base value is 99, max is 100
        expect(state.resources['days']).toBeDefined();
        expect(state.resources['days'].value).toBe(5);
        expect(state.resources['days'].max).toBe(10);

        // Check for 'health' resource
        // Base value 5, max 10
        expect(state.party[MainCharacterPartyUnitID].health).toBeDefined();
        expect(state.party[MainCharacterPartyUnitID].health.value).toBe(5);
        expect(state.party[MainCharacterPartyUnitID].health.max).toBe(10);
    });

    it('computes visibility and enabled state correctly', () => {
        const [state, api] = createStateStore();
        api.initialize(api);

        // 'avoid' action: 
        // Prereq: days valueLessThanMax (99 < 100 is true).
        expect(api.computeEnabled('avoid')).toBe(true);

        // 'awaken' action: 
        // Prereq: days valueEqualToMax (99 == 100 is false).
        // Prereq: mana maxMax 0 (mana max is 0 -> true).
        // Should be disabled/not enabled.
        expect(api.computeEnabled('awaken')).toBe(false);
    });

    it('runs through a full encounter', () => {
        const [state, api] = createStateStore();
        api.initialize(api);

        // Check that battle is not enabled
        expect(api.computeEnabled('battle')).toBe(false);

        const avoidAction = ACTION_CONFIG_MAP['avoid'];
        api.doAction(avoidAction);
        api.doAction(avoidAction);
        api.doAction(avoidAction);
        api.doAction(avoidAction);
        api.doAction(avoidAction);

        // Start battle
        const battleAction = ACTION_CONFIG_MAP['battle'];
        api.doAction(battleAction);

        expect(state.encounter).not.toBeNull();
        if (state.encounter) {
            expect(state.encounter.currentEnemyIndex).toBe(0);
            expect(state.encounter.enemies.length).toBe(0);
            expect(Object.keys(state.encounter.allies).length).toBe(1);
            expect(state.encounter.allies[MainCharacterPartyUnitID]).toBeDefined();
        }

        // Run for 8 seconds (16 iterations of 0.5s)
        for (let i = 0; i < 16; i++) {
            api.runEncounter(0.5);

            if (i === 0) {
                expect(state.encounter).not.toBeNull();
                if (state.encounter) {
                    expect(state.encounter.currentEnemyIndex).toBe(0);
                    expect(state.encounter.enemies.length).toBe(1);
                    expect(Object.keys(state.encounter.allies).length).toBe(1);
                    expect(state.encounter.allies[MainCharacterPartyUnitID]).toBeDefined();
                }
            }
        }

        // Verify state at 8 seconds
        expect(state.party[MainCharacterPartyUnitID].health.value).toBe(1);

        if (state.encounter?.enemies.length! > 0) {
            expect(state.encounter!.enemies[0].health.value).toBeCloseTo(4.6);
        } else {
            throw new Error("Enemy should still be alive at 8s");
        }

        let iterations = 0;
        const maxIterations = 100;

        // Finish the encounter
        while (state.encounter !== null && iterations < maxIterations) {
            api.runEncounter(0.5);
            iterations++;
        }

        expect(state.encounter).toBeNull();
        expect(iterations).toBeLessThan(maxIterations);

        // Now perform "awaken"
        // Effect: increase mana max by 1
        const awakenAction = ACTION_CONFIG_MAP['awaken'];
        api.doAction(awakenAction);

        expect(state.party[MainCharacterPartyUnitID].mana.max).toBe(1);

        // Awaken has maxExecutions: 1. Try doing it again.
        api.doAction(awakenAction);
        // executions should stay at 1 (if logic prevents it) or just fail prereq if logic is separate
        // store check: if (action.maxExecutions && state.actions[action.id].executions >= action.maxExecutions) return
        expect(state.actions['awaken'].executions).toBe(1);
    });
});
