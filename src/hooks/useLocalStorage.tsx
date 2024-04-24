export const useLocalStorage = (key: string) => {

    const win = window.localStorage;
    const setItem = (value: unknown) => {
        try {
            win.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    };

    const getItem = () => {
        try {
            const item = win.getItem(key);
            return item ? JSON.parse(item) : undefined;            
        } catch (error) {
            console.log(error);
        }
    };

    return { setItem, getItem };
};