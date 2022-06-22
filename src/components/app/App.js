import AppHeader from "../appHeader/AppHeader";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from 'react';
import Loader from "../Tools/Loader/Loader";
import SinglePage from "../pages/SinglePage";
import Auth from "../Auth/Auth";
const Page404 = lazy(() => import('../pages/Page404'));
const Main = lazy(() => import('../pages/Main'));
const Comics = lazy(() => import('../pages/Comics'));








const App = () => {

    return (
        <div className="app">
            <AppHeader />

            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route element={<Main />} path="/" />
                    <Route element={<Page404 />} path="/*" />
                    <Route element={<Auth/>} path="/login"/>
                    <Route element={<Comics />} exact path="/comics" />
                    <Route path="/comics/:id" element={<SinglePage type={'comics'} />}>
                    </Route>
                    <Route exact path="/characters" />
                    <Route path="/characters/:id" element={<SinglePage type={'charater'} />}>
                    </Route>
                </Routes>
            </Suspense>

        </div>
    )
}

export default App;