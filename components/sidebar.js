import React from 'react';
import $ from 'jquery'

const barItems = [
    {
        iconName: "fa fa-tachometer-alt",
        title: "Overview",
        link: 'overview'
    },
    {
        iconName: "fa fa-chart-network",
        title: "Traffic",
        link: 'traffic'
    },
    {
        iconName: "fa fa-calendar-alt",
        title: "Frequency",
        link: 'frequency'
    },
    {
        iconName: "fa fa-chart-bar",
        title: "Product Category",
        link: 'product-category'
    },
    {
        iconName: "fa fa-tag",
        title: "Promotions",
        link: 'promotions'
    },
    {
        iconName: "fa fa-sparkles",
        title: "Events",
        link: 'events'
    },
    {
        iconName: "fa fa-user-chart",
        title: "Customer Journey",
        link: 'customer-journey'
    },
    {
        iconName: "fa fa-table",
        title: "Touchpoint Bank",
        link: 'touchpoint-bank'
    },
];

const SideBar = (props) => {
    const [toogleOpended, setToogleStatus] = React.useState(true)
    const toogleSideBar = () => {
        let status = !toogleOpended
        setToogleStatus(status);
        if (status) {
            $('.side-bar').css('width', '275px')
            $('#sidebar-toogle').css('width', '275px')
            $('#sidebar-toogle .fa').removeClass('fa-angle-right')
            $('#sidebar-toogle .fa').addClass('fa-angle-left')
            $('.content').css('margin-left', '275px')
            $('.content').css('width', 'calc(100% - 275px)')
        } else {
            $('.side-bar').css('width', '80px')
            $('#sidebar-toogle').css('width', '80px')
            $('#sidebar-toogle .fa').removeClass('fa-angle-left')
            $('#sidebar-toogle .fa').addClass('fa-angle-right')
            $('.content').css('margin-left', '80px')
            $('.content').css('width', 'calc(100% - 80px)')
        }
    }

    return (
        <aside className="side-bar">
            <ul className="navList">
                {barItems.map(function(item, index){
                    return <li className="nav sidebar-nav-link" key={index}>
                                <a href={`/${item.link}`}>
                                    <i className={item.iconName} />
                                    <span className="sidebar-link">{item.title}</span>
                                </a>
                            </li>
                })}
            </ul>
            <div id="sidebar-toogle" onClick={()=>toogleSideBar()}><i className="fa fa-angle-left"></i></div>
        </aside>
    );
};

export default SideBar;
