import { AxiosResponse } from "axios"
import toast from "react-hot-toast"
import { IApiResponseModel, errors } from "resources/api/server/contracts/ServerApiModel"


export const commonPromiseHandle = async <R> (
    promise: Promise<AxiosResponse<IApiResponseModel<unknown>>>,
    setState?: (v: React.SetStateAction<R>) => void,
    customResErrOnNone?: string,
    successMessage?: string,
    joinOpts?: {
        currentData: R
    },
    successCallback?: () => unknown): Promise<void> => {
    await promise.then(result => {
        if (result.data.success) {
            const r = result.data.data
            if (setState != null) {
                if (joinOpts != null) {
                    setState([...joinOpts.currentData as never, ...r as never] as never)
                } else {
                    setState(r as never)
                }
            }
            if (successMessage != null) toast.success(successMessage)
            if (successCallback) successCallback()
            return
        }
        if (result.data.code === errors.NOT_MATCHED) {
            toast.error(
                customResErrOnNone != null ? customResErrOnNone : "Ocorreu um erro ao buscar as informações"
            )
            return
        }
        toast.error(
            (result.data.data as { message?: string })?.message ?? (customResErrOnNone != null ? customResErrOnNone : "Ocorreu um erro ao buscar as informações")
        )
    })
}