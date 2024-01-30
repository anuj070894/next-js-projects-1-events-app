import { MainLayout } from "@/src/layout/main-layout";
// import "/app/globals.css";
import "/app/temp.sass";

function MyApp({ Component, pageProps }) {
    return <>
        <MainLayout>
            <Component {...pageProps} />
        </MainLayout>
    </>;
}

export default MyApp;