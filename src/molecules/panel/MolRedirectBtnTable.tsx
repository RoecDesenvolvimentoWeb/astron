import { ReactElement } from "react"
import { MolLoadMoreRedirectBtn } from "./MolLoadMoreRedirectBtn"
import { MolRedirectBtnRow } from "./MolRedirectBtnRow"


interface IMolRedirectBtnTableProps {
    rows: {
        id: number
        title: string,
        objective: string,
        link: string
    }[]
    onEditRedirectBtn: (id: number) => unknown
    onDeleteRedirectBtn: (id: number) => unknown
}

export const MolRedirectBtnTable = (props: IMolRedirectBtnTableProps): ReactElement => {
    return (
        <>
            <div className="min-w-full flex-1">
                <table className="w-full">
                    <thead className="bg-[#F6F8F9] text-[#32063D] hidden md:table-header-group">
                        <tr>
                            <th>Título</th>
                            <th>Link</th>
                            <th>Objetivo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="flex flex-col gap-y-4 md:table-row-group md:flex-none">
                        {props.rows.map((r, i) => <MolRedirectBtnRow
                            onDeleteRedirectBtn={(): void => {
                                props.onDeleteRedirectBtn(r.id)
                            }}
                            onEditRedirectBtn={(): void => {
                                props.onEditRedirectBtn(r.id)
                            }}
                            key={i}
                            {...r}/>)}
                    </tbody>
                </table>
                <MolLoadMoreRedirectBtn
                    onLoadMore={():void => {}}
                />
            </div>
        </>
    )
}