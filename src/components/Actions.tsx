import type { Component, Accessor } from 'solid-js';
import { Show, createSignal, For, Index } from "solid-js";
import styles from './Actions.module.css';
import Details from './Details';
import PrerequisiteList from './PrerequisiteList';
import Button from './Button';
import { useState } from "../stateContext";
import { ActionConfig, CategoryConfig, Prerequisite } from "../types";
import { ACTIONS, CATEGORIES } from '../base';

const Actions: Component<{}> = () => {
    return (
        <div>
            <Index each={CATEGORIES}>
                {(category) => <Category category={category} />}
            </Index>
        </div>

    )
}

const Category: Component<{ category: Accessor<CategoryConfig> }> = (props) => {
    const category = props.category;
    return (
        <div>
            <Details
                startOpen
                summary={
                    <span>
                        <b>{category().name}</b>
                        <p>{category().description}</p>
                    </span>
                }
            >
                <Index each={ACTIONS.filter((action) => action.category === category().id)}>
                    {(item) => <Action item={item} />}
                </Index>
            </Details>
        </div>
    )
}

const Action: Component<{ item: Accessor<ActionConfig> }> = (props) => {
    const [_, stateApi] = useState();
    const item = props.item;

    return (
        <Show when={stateApi.computeVisibility(item().id)}>
            <div class={styles.actionContainer}>
                <Button
                    disabled={!stateApi.computeEnabled(item().id)}
                    onClick={() => stateApi.doAction(item())}
                >
                    <div class={styles.actionContent}>
                        <Details
                            summary={
                                <span>
                                    <b>{item().name}</b>
                                    <hr />
                                    {item().description}
                                </span>
                            }
                        >
                            <Show when={item().flavorText}>
                                <p class={styles.flavorText}>{item().flavorText}</p>
                            </Show>
                            <Show when={item().prerequisites.length > 0}>
                                <div class={styles.prerequisites}>
                                    <strong>Prerequisites:</strong>
                                    <PrerequisiteList prerequisites={item().prerequisites} />
                                </div>
                            </Show>
                        </Details>
                    </div>
                </Button>
            </div>
        </Show>
    )
}

export default Actions;
