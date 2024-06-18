import { AtomGraphRect } from "@atom/AtomGraphRect";
import { AtomSalesBalloonCount } from "@atom/AtomSalesBalloonCount";
import { ReactElement, useState } from "react";

interface IMolGraphSalesProps {
    salesCount: number,
    height: string
}

export const MolRectGraphSales = (props: IMolGraphSalesProps): ReactElement => {
    const [isHovering, setIsHovering] = useState(false)
    return (
        <>
            <div className="relative flex justify-center">
                <div
                    onMouseOver={(): void => {
                        setIsHovering(true)
                    }}
                    onMouseOut={(): void => {
                        setIsHovering(false)
                    }}
                    className={isHovering ? "absolute hover:block z-10 -top-6" : "hidden"}>
                    <AtomSalesBalloonCount
                        salesCount={props.salesCount}
                    />
                </div>
                <AtomGraphRect
                    isHovering={isHovering}
                    onHoverIn={(): void => {
                        setIsHovering(true)
                    }}
                    onHoverOut={(): void => {
                        setIsHovering(false)
                    }}
                    style={{
                        height: props.height,
                        animation: "growth 2s linear"
                    }}
                />
            </div>
        </>
    )
}