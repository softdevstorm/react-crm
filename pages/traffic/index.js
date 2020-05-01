import React, { useState, useCallback } from "react";
import Layout from '../../components/layout'

const Traffic = (props) => {
    return ( 
        <Layout title={'Traffic'}>
            <div className="empty"><span>NO DATA TO DISPLAY</span></div>
        </Layout>
    );
};

export default Traffic;