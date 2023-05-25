import { createContext, useContext, useState } from "react";
import ReactLoading from "react-loading";
import "../css/LoadingStyle.css"

export const LoadingContext = createContext({});

export default function LoadingContextProvider({ children }) {
    const [isLoading, setIsLoading] = useState(null);
    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export function LoadingIcon() {
    const { isLoading } = useContext(LoadingContext);
    return (
        <>
            {isLoading && (
                <div className="loading-box">
                    <ReactLoading className="react-loading" type="spin" color="#999999" width={30} height={30} />
                </div>
            )}
        </>
    )
}