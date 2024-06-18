import { OrgPolicy } from "@org/policy/OrgPolicy";
import { PolicyTemplate } from "@temp/policy/PolicyTemplate";
import { ReactElement } from "react";

export const PolicyPage = (): ReactElement => {
    return (
        <PolicyTemplate
            orgPolicy={<OrgPolicy/>}
        />
    )
}