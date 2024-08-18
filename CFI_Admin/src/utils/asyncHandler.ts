import { setLoading } from "@/redux/slices/AdminSlice";
import { useAppDispatch } from "@/redux/Store";
import axios from "axios";
import toast from "react-hot-toast";

const useAsyncHandler = <T extends (...args: any[]) => Promise<any>>(fn: T) => {
    const dispatch = useAppDispatch();
    return async (...args: Parameters<T>): Promise<ReturnType<T> | void> => {
        try {
            dispatch(setLoading(true));
            // axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
            return await fn(...args);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.message || error?.response?.data?.message || "Internal Server Error");
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export { useAsyncHandler };
