import type { Component, JSX } from 'solid-js';
import styles from './Button.module.css';

interface ButtonProps {
    class?: string;
    disabled?: boolean;
    onClick?: () => void;
    children?: JSX.Element;
}

const Button: Component<ButtonProps> = (props) => {
    return (
        <div
            class={`${styles.button} ${props.disabled ? styles.disabled : ''} ${props.class || ''}`}
            onClick={(e) => {
                if (!props.disabled && props.onClick) {
                    props.onClick();
                }
            }}
            role="button"
            aria-disabled={props.disabled}
        >
            {props.children}
        </div>
    );
};

export default Button;
