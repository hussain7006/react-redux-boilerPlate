
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LogIn, Layout, SignUp, Home } from "./Screen";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home/:id/*" element={<Layout />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<LogIn />} />
                {/* <Route path="/" element={<Home />} /> */}

            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;