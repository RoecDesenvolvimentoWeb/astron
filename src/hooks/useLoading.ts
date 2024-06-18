import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useLoading = (setIsLoading: (s: boolean) => void): void => {
    const location = useLocation()
    useEffect(() => {
        setIsLoading(true)
    }, [location]);
}