import { MolRectGraphSales } from "@mols/panel/MolRectGraphSalesRect";
import { ReactElement } from "react";

interface IOrgGraphSalesProps {
    height: string
    salesCount: number
}

export const OrgRectGraphSales = (props: IOrgGraphSalesProps): ReactElement => {
    return (
        <>
            <div className={"h-fit"}>
                <MolRectGraphSales
                    height={props.height}
                    salesCount={props.salesCount}
                />
            </div>
        </>
    )
}