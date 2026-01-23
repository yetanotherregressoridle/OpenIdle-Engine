import type { Component, JSX } from 'solid-js';
import { Show, createSignal } from "solid-js";
import styles from './Details.module.css';

interface DetailsProps {
    children: JSX.Element;
    summary?: JSX.Element;
    startOpen?: boolean;
}

const Details: Component<DetailsProps> = (props) => {
    const [isExpanded, setIsExpanded] = createSignal(props.startOpen || false);

    return (
        <div class={styles.detailsContainer}>
            <div class={styles.detailsHeader}>
                <div class={styles.detailsHeaderContent}>
                    {props.summary}
                </div>
                <Show when={props.children} >
                    <button
                        class={styles.toggleButton}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(!isExpanded());
                        }}
                        aria-label="Toggle details"
                        type="button">
                        {isExpanded() ? '▼' : '▶'}
                    </button>
                </Show>
            </div>
            <Show when={isExpanded() && props.children}>
                <div class={styles.expandedDetails}>
                    {props.children}
                </div>
            </Show>
        </div>
    );
};

export default Details;
