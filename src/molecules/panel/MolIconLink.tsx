import { ReactElement } from "react";
import { Link } from "react-router-dom";

export interface ILink {
    name: string
    path: string
}

// The icon can be a link with path
interface IMolIconLinkProps {
    path?: string
    message: string
    iconIsLink?: boolean
    Icon: ReactElement
    links?: ILink[]
    showMessage?: boolean
    onClick?: () => unknown
    className?: string
}

export const MolIconLink = (props: IMolIconLinkProps): ReactElement => {
    const IconResult = props.iconIsLink ?
        <Link
            onClick={props.onClick}
            className="flex flex-row items-center justify-center space-x-3"
            to={props.path as string}
        >
            {props.Icon}
            {props.showMessage && <span>
                {props.message}
            </span>}
        </Link> :
        <div
            className="flex flex-row items-center justify-center space-x-3 shrink-0"
        >
            {props.Icon}
            {props.showMessage && <span>
                {props.message}
            </span>}
        </div>
    return (
        <>
            <div className={"fill-[#5F5A7A] hover:fill-[#D25AC4] stroke-[#5F5A7A] hover:stroke-[#D25AC4] hover:text-[#D25AC4] text-[#5F5A7A] text-[20px] flex flex-col justify-start items-start font-geo font-light " + props.className}>
                <div className={"flex flex-col justify-center items-center h-[30px] max-h-[30px]"}>
                    {IconResult}
                </div>
                {props.showMessage && <div className="text-[#5F5A7A] flex flex-col items-start">
                    {props.links?.map(link => <Link
                        onClick={props.onClick}
                        to={link.path}
                        className={"hover:text-[#D25AC4] text-[16px] font-extralight pt-5 pl-1 leading-[140%]"}
                    >{link.name}</Link>)}
                </div>}
            </div>
        </>
    )
}