import React from "react";
import { useRouter } from "next/router";
import { FilterByWeek, FilterByDate } from './filter'

const SubHeader = () => {
    const router = useRouter()
    const pathName = router.pathname.replace('/', '');

    React.useEffect(() => {
    })

    return (
        <div className="row sub-top-bar">
            <div className="col-md-6">
                <div className="company-logo-container"></div>
            </div>
            <div className="col-md-6">
                <div className="filter">
                    {pathName.includes('overview') ? (
                        <FilterByWeek />
                    ) : (
                        <FilterByDate />
                    )}
                </div>
            </div>
        </div>
    )
};

export default SubHeader;
