import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";

export const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};