import React from "react";
import Navigation from "./components/template/Navigation";
import {Route, Routes, useParams} from "react-router-dom";
import {notFoundRoutes, routes} from "./routes/routes";
import Footer from "./components/template/Footer";
import {Container} from "react-bootstrap";
import NotFound from "./views/error/NotFound";

const App : React.FunctionComponent = () => {

    return (
        <>
            <header className={"navigation"}>
                <Navigation/>
            </header>
            <section className={"content"}>
                <Container>
                    <Routes>
                        {routes.map(({path, Component}) => (
                            <Route path={path} element={<Component/>} key={path}/>
                        ))}
                        <Route path={notFoundRoutes.path} element={<notFoundRoutes.Component />}/>
                    </Routes>
                </Container>
            </section>
            <section className="footer">
                <Footer/>
            </section>
        </>
    )
}

export default App;