/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export const useLocalStorage = (key: string, initialValue:any) => {

    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue
        }
    })

    const setValue = (value:string) => {
        try {
            setStoredValue(value)
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error(error)
        }
    }

    return [ storedValue, setValue ];
};