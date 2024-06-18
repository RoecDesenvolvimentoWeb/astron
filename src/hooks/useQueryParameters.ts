import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export const useQueryParameters = (key: string): string | null => {
    const [queryParameter, setQueryParameter] = useState<string | null>(null)
    const location = useLocation()

    useEffect(() => {
        setQueryParameter(new URLSearchParams(window.location.search).get(key))
    }, [location])

    return queryParameter;
}