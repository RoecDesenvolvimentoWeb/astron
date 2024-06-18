import { ReactElement } from "react";

interface IAtomSelectProps {
    options: { value: number | string, text: string }[]
    defaultNotInteractive?: string
    className?: string
    onChange: (v: this["options"][number]["value"]) => unknown
    defaultValue: unknown
}

export const AtomSelect = (props: IAtomSelectProps): ReactElement => {
    return (
        <>
            <select
                onChange={(v): void => {
                    props.onChange(v.target.value)
                }}
                className={"form min-w-full min-h-[50px] w-fit " + props.className}>
                {props.defaultNotInteractive && <option defaultChecked={props.defaultNotInteractive != null}>
                    {props.defaultNotInteractive}
                </option>}
                {props.options.map((option, i) => {
                    return <option key={i} selected={String(option.value) === String(props.defaultValue)} value={option.value}>
                        {option.text}
                    </option>
                })}
            </select>
        </>
    )
}