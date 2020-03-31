import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt, faClipboard, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import { User } from "../models";
import { useState, createRef } from "react";

export const DisabledMessage = <em></em>

interface UserDisplayProps {
    user: User;
}

export const UserDisplay = (props: UserDisplayProps) =>
    <span>
        {props.user.first_name} {props.user.last_name} <em>({props.user.username})</em>
    </span>

interface RemoveButtonProps {
    remove: () => void;
    disabled: boolean;
    size?: "block"|"lg"|"sm";
}

export const RemoveButton: React.FC<RemoveButtonProps> = (props) => {
    const className = "btn btn-danger " + (props.size ? ` btn-${props.size}` : "");
    const disabledMessage = props.disabled && DisabledMessage;
    return (
        <button onClick={() => props.remove()} disabled={props.disabled} className={className}>
            <span aria-hidden="true">&times;</span>
            {props.children}
            {disabledMessage}
        </button>
    );
}

interface AddButtonProps {
    add: () => void;
    disabled: boolean;
    size?: "block"|"lg"|"sm";
}

export const AddButton: React.FC<AddButtonProps> = (props) => {
    const className = "btn btn-success" + (props.size ? ` btn-${props.size}` : "");
    const disabledMessage = props.disabled && DisabledMessage;
    return (
        <button onClick={() => props.add()} disabled={props.disabled} className={className}>
            <span aria-hidden="true">+</span>
            {props.children}
            {disabledMessage}
        </button>
    );
}

interface LoadingDisplayProps {
    loading: boolean;
}

export const LoadingDisplay: React.FC<LoadingDisplayProps> = (props) => {
    if (!props.loading) return null;
    return (
        <p className="bottom-right alert alert-info">
            <FontAwesomeIcon icon={faSyncAlt} spin />
        </p>
    )
}

interface ErrorDisplayProps {
    error?: Error;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = (props) => {
    if (!props.error) return null;
    return (
        <p className="alert alert-danger" role="alert">
            {props.error.message}
        </p>
    )
}

interface SingleInputFormProps {
    placeholder: string;
    disabled: boolean;
    onSubmit: (value: string) => void;
    buttonType: "info"|"warning"|"success"|"primary"|"alternate"|"danger";
}

export const SingleInputForm: React.FC<SingleInputFormProps> = (props) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState(undefined as Error | undefined);
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            props.onSubmit(value);
            setValue("");
        } catch(e) {
            setError(e);
        }
    }
    const errorDisplay = error && <ErrorDisplay error={error}/>
    const buttonClass = "btn btn-" + props.buttonType;
    return (
        <form onSubmit={submit} className="input-group">
            <input onChange={(e) => setValue(e.target.value)} value={value} type="text" className="form-control" placeholder={props.placeholder}/>
            <div className="input-group-append">
                <button className={buttonClass} type="submit">
                    {props.children}
                </button>
            </div>
            {errorDisplay}
        </form>
    );
}

export const invalidUniqnameMessage = (uniqname: string) =>
    uniqname + " is not a valid user. Please make sure the uniqname is correct, and that they have logged onto Remote Office Hours Queue at least once."

interface DateDisplayProps {
    date: string;
}

export const DateDisplay = (props: DateDisplayProps) =>
    <span>{new Date(props.date).toDateString()}</span>

interface CopyFieldProps {
    text: string;
}

export const CopyField: React.FC<CopyFieldProps> = (props) => {
    const [copied, setCopied] = useState(false);
    const inputRef = createRef<HTMLInputElement>();
    const copy = () => {
        inputRef.current!.select();
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    }
    const buttonInner = copied
        ? (
            <span><FontAwesomeIcon icon={faClipboardCheck}/> Copied!</span>
        )
        : (
            <span><FontAwesomeIcon icon={faClipboard}/> Copy</span>
        );
    return (
        <div className="input-group">
            <input readOnly ref={inputRef} onClick={copy} value={props.text} type="text" className="form-control"/>
            <div className="input-group-append">
                <button type="button" onClick={copy} className="btn btn-secondary">
                    {buttonInner}
                </button>
            </div>
        </div>
    );
}
