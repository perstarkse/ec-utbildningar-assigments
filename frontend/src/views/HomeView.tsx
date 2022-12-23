import NavBar from "../components/NavBar";
import StartBanner from '../components/StartBanner';
import ClearanceNewArrivals from "../components/ClearanceNewArrivals";
import FeaturedProduct from "../components/FeaturedProduct";
import FocusedProducts from "../components/FocusedProducts";
import Speciality from "../components/Speciality";
import OneBigAndGrid from "../components/OneBigAndGrid";
import SeventyPercentOff from "../components/SeventyPercentOff";
import ProductOverviewGrid from "../components/ProductOverviewGrid";
import SiteDisclaimerIconsFour from "../components/SiteDisclaimerIconsFour";
import Footer from "../components/Footer";


const HomeView = () => {

    window.top!.document.title = 'Fixxo.';

    return (
        <>
            <NavBar />
            <StartBanner />
            <ClearanceNewArrivals />
            <FeaturedProduct title={"Featured Products"} tag={"featured"} />
            <FocusedProducts />
            <Speciality />
            <OneBigAndGrid category={"T-Shirts"} take={4} direction="bigleft" titleBig="2 FOR USD $29" />
            <OneBigAndGrid category={"Pants"} take={4} direction="bigright" titleBig="2 FOR USD $49" />
            <SeventyPercentOff />
            <ProductOverviewGrid />
            <SiteDisclaimerIconsFour />
            <Footer />
        </>
    )
}

export default HomeView