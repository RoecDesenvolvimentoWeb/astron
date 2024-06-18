import { MolRowAlert } from "@mols/panel/MolRowAlert";
import { ReactElement, useEffect, useState } from "react";
import { IAllowedUser } from "resources/api/server/contracts/ServerApiModel";

interface IOrgPanelActiveAlertsTableProps {
    onEditRemarketing: (userId: number) => unknown
    onDeleteRemarketing: (userId: number) => unknown
    data: IAllowedUser[]
}

export const OrgPanelActiveAlertsTable = (
    props: IOrgPanelActiveAlertsTableProps
): ReactElement => {
    const [data, setData] = useState<IAllowedUser[]>([])
    useEffect(() => {
        setData(props.data)
    }, [props.data])
    return (
        <>
            <table
                className={
                    "border-separate border-spacing-[50px_0] w-full max-w-full flex items-center flex-col justify-between"
                }
            >
                <thead className="bg-[#F6F8F9] border-t-[4px] rounded-t-[4px] sticky top-0 left-0 flex items-center justify-between w-full max-w-full max-md:bg-white max-md:border-0">
                    <tr className="whitespace-nowrap w-full max-w-full flex items-center justify-between px-[50px] max-md:px-[0]">
                        <th className="  rounded-tl-[4px] flex items-center ">
              ID do usuário
                        </th>
                        <th className="  rounded-tr-[4px] flex items-center max-md:hidden">Ações</th>
                    </tr>
                </thead>
                <tbody className="bg-white h-fit w-full max-w-full">
                    {data.map((a) => (
                        <MolRowAlert
                            onDeleteRemarketing={props.onDeleteRemarketing}
                            onEdit={props.onEditRemarketing} userId={a.userId} />
                    ))}
                </tbody>
            </table>
        </>
    );
};
