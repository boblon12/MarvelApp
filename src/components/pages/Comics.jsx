import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import SinglePage from "./SinglePage";

const Comics = () => {
    return (
        <>
            <AppBanner/>
            <ComicsList/>
            {/* <SinglePage/> */}
        </>
    )
}

export default Comics;