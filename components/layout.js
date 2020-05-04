import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import Head from "next/head";
import generalRoute from "./generalRoute"
import SideBar from "./sidebar";
import Header from "./header";
import SubHeader from "./subheader";
import UserHeader from "./userheader";
import Footer from "./footer";

const Layout = ({
        children,
        title,
    }) => {
    const router = useRouter()
    const pathName = router.pathname.replace('/', '');

    return (
        <main className="mainContainer">
            <Head>
                <meta charSet="utf-8" />
                <meta title={title} />
                <link href="https://storage.googleapis.com/crmspy/assets/fonts/pro/css/fontawesome.css" />
                <link
                    rel="icon"
                    href="https://storage.googleapis.com/crmspy/assets/favicon.ico"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    charSet="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
                />
                <link
                    rel="stylesheet"
                    href="https://storage.googleapis.com/crmspy/assets/fonts/pro/css/fontawesome.css"
                />
                <link
                    rel="stylesheet"
                    href="https://storage.googleapis.com/crmspy/assets/fonts/pro/css/light.css"
                />
                <link
                    rel="stylesheet"
                    href="https://storage.googleapis.com/crmspy/assets/fonts/pro/css/regular.css"
                />
                <link
                    rel="stylesheet"
                    href="https://storage.googleapis.com/crmspy/assets/fonts/pro/css/solid.css"
                />
                <title>{title}</title>
            </Head>
            <Header />
            { generalRoute.includes(pathName) ? 
                ( <SubHeader /> ) : 
                ( <UserHeader /> )}
            <div className="content-wrapper">
                { generalRoute.includes(pathName) ? <SideBar /> : ''}
                <div className="content">
                    <div className="container">
                        {children}
                        {/* {React.cloneElement(children, { value: 'sss', anotherMessage: 'sdgsdgasgs' })} */}
                    </div>
                    <Footer />
                </div>
            </div>
        </main>
    );
};

export default Layout;
