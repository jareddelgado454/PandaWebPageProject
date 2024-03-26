"use client"

import { Provider } from "react-redux"
import { store } from "./store"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"

const Providers = ({children}) => {
    const persistor = persistStore(store)
    return (    
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}
export default Providers