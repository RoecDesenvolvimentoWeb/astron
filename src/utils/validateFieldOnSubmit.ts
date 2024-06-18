import toast from "react-hot-toast";

export const validateFieldsOnSubmit = (field: {[v: string]: {
    isValid: boolean,
    messageError?: string
}}): boolean => {
    for (const x of Object.values(field)) {
        if (!x.isValid) {
            toast.error(x.messageError ?? "")
            return false;
        }
    }
    return true;
}