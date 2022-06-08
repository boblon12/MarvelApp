import AppHeader from "../appHeader/AppHeader";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from 'react';
import Loader from "../Tools/Loader/Loader";
const Page404 = lazy(() => import('../pages/Page404'));
const Main = lazy(() => import('../pages/Main'));

const Comics = lazy(() => import('../pages/Comics'));
// const SingleComics= lazy(() => import('../pages/SingleComicPage'));







const App = () => {

    return (
        <div className="app">
            <AppHeader />
            <Suspense fallback={<Loader/>}>
                <Routes>
                    <Route element={<Main />} exact path="/" />
                    {/* <Route path="/posts/:id" element={<PostPage />}></Route> */}
                    <Route element={<Page404 />} path="/*" />
                    <Route element={<Comics/>} path="/comics" />
                    {/* <button style={{ margin: 10, width: 700 }} onClick={() => setVisible(true)}>Добавить пост</button> */}
                </Routes>
            </Suspense>
        </div>
    )
}

export default App;