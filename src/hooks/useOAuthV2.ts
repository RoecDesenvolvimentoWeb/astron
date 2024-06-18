import { useEffect, useState } from "react";

export interface IOAuthRes {
    accessToken?: string
    error?: string
}

export const useOAuthV2 = (): IOAuthRes => {
    const params = new URLSearchParams(document.location.hash.replace("#", ""));
    const [data, setData] = useState<IOAuthRes>({
        accessToken: undefined,
        error: undefined
    })
    useEffect(() => {
        setData({
            accessToken: params.get("access_token") ?? undefined,
            error: params.get("error") ?? undefined
        })
    }, [])

    return data
}