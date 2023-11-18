import { useEffect, useRef } from "react";

/**
 * Custom hook that allows for the execution of a callback function at a specified interval.
 * @param callback The function to be executed at the specified interval.
 * @param delay The delay in milliseconds between each execution of the callback function. If `null` is passed, the interval is cleared.
 */
function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);

    // Remember the latest callback if it changes.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        if (delay === null) {
            return;
        }

        const intervalId = setInterval(() => savedCallback.current(), delay);

        return () => clearInterval(intervalId);
    }, [delay]);
}

export default useInterval;