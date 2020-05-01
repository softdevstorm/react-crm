import React, { useState, useCallback } from "react";
import Head from "next/head";
import router from "next/router";
import Link from 'next/link'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout, { siteTitle } from '../../components/layout'

const Frequency = (props) => {
    return ( 
        <Layout>
            <div className="empty"><span>NO DATA TO DISPLAY</span></div>
        </Layout>
    );
};

export default Frequency;