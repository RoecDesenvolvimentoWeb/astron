import toast from "react-hot-toast";

export default async (setIsLoading: (s: boolean) => unknown, ...resources: Promise<void>[]): Promise<void> => {
    try {
        await Promise.all([
            ...resources
        ])
    } catch (e) {
        console.error(e)
        toast.error(
            "Não foi possível carregar as informações"
        );
    } finally {
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }
}