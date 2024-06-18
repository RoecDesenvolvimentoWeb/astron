import { ReactElement } from "react"

interface AtomCloseBtn {
    onClick?: () => unknown
    className?: string
}

export const AtomCloseBtn = (props: AtomCloseBtn): ReactElement => {
    return (
        <div className={"cursor-pointer " + props.className} onClick={props.onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
                <circle cx="21.5" cy="21.5" r="21" fill="#EBEEF2" stroke="#BEC1C1"/>
                <path d="M15.6562 15.6572L26.97 26.9709" stroke="#BEC1C1" stroke-width="2" stroke-linecap="round"/>
                <path d="M26.9707 15.6572L15.657 26.9709" stroke="#BEC1C1" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </div>
    )
}