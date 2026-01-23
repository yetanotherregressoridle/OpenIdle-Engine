import type { Component } from 'solid-js';
import { For } from "solid-js";
import { Prerequisite } from "../types";

const PrerequisiteList: Component<{ prerequisites: Prerequisite[] }> = (props) => {
    const formatPrerequisite = (prereq: Prerequisite): string => {
        const parts: string[] = [];

        if (prereq.resourceID) {
            parts.push(`Resource: ${prereq.resourceID}`);
            if (prereq.minValue !== undefined) parts.push(`min value: ${prereq.minValue}`);
            if (prereq.maxValue !== undefined) parts.push(`max value: ${prereq.maxValue}`);
            if (prereq.minMax !== undefined) parts.push(`min max: ${prereq.minMax}`);
            if (prereq.maxMax !== undefined) parts.push(`max max: ${prereq.maxMax}`);
            if (prereq.valueGreaterThanZero) parts.push(`value > 0`);
            if (prereq.valueLessThanMax) parts.push(`value < max`);
            if (prereq.valueEqualToMax) parts.push(`value = max`);
        }

        if (prereq.actionID) {
            parts.push(`Action: ${prereq.actionID}`);
            if (prereq.actionMinExecutions !== undefined) parts.push(`min executions: ${prereq.actionMinExecutions}`);
            if (prereq.actionMaxExecutions !== undefined) parts.push(`max executions: ${prereq.actionMaxExecutions}`);
        }

        if (prereq.unit) {
            parts.push(`Unit: ${prereq.unit}`);
            if (prereq.unitStat) parts.push(`stat: ${prereq.unitStat}`);
        }

        return parts.join(', ');
    };

    return (
        <ul>
            <For each={props.prerequisites}>
                {(prereq) => <li>{formatPrerequisite(prereq)}</li>}
            </For>
        </ul>
    );
};

export default PrerequisiteList;
