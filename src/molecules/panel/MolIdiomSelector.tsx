import { AtomSelect } from "@atom/AtomSelect";
import { ReactElement } from "react";
import { Idiom } from "./MolTelegramConfigForm";

interface IMolIdiomSelectorProps {
    setIdiomInOperation: (data: Idiom) => unknown
}

export const MolIdiomSelector = ({
    setIdiomInOperation
}: IMolIdiomSelectorProps): ReactElement => {
    return (
        <div className="w-[140px] min-w-fit ml-auto">
            <AtomSelect
                defaultValue={"PT"}
                onChange={(data): void => {setIdiomInOperation(data as Idiom)}}
                options={[
                    {
                        text: "Português",
                        value: "PT"
                    },
                    {
                        text: "Inglês",
                        value: "US"
                    }
                ]}
            />
        </div>
    )
}