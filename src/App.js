import "./App.css";
import WowWrapper from "./WowWrapper";
import "animate.css/animate.min.css";
import Navbar from "./components/Navbar/Navbar";
import CustomizePage from "./pages/customize-3d/CustomizePage";
import Uniform from "./pages/customize/uniform/Uniform";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <Router>
                <WowWrapper>
                    <Navbar />
                    <div className=" w-full bg-slate-100 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48 pt-20">
                        <Routes>
                            <Route index element={<CustomizePage />} />
                            <Route path="/customize" element={<Uniform />} />
                            {/* <Route
                            path="/customize-3d"
                            element={<CustomizePage />} */}
                            {/* /> */}
                        </Routes>
                    </div>
                </WowWrapper>
            </Router>
        </>
    );
}

export default App;
