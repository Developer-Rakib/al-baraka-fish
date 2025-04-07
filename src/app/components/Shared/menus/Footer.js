import React from 'react';
import { Link } from 'react-router-dom';
import smallLogo from './../../img/small-logo.png'

const Footer = () => {
    return (
        <>
            <footer className="footer  p-10 bg-neutral text-neutral-content border-t">
                <div className='mx-auto sm:mx-0'>
                    <img className='w-36 mx-auto' src={smallLogo} alt="" />
                    <p>Poristhan Fashion<br />A Shop of Shari Panjabi</p>
                </div>
                <div className='flex  flex-col items-center sm:items-start w-full'>
                    <span className="footer-title">Services</span>
                    <Link to={''} className="link link-hover">Branding</Link>
                    <Link to={''} className="link link-hover">Design</Link>
                    <Link to={''} className="link link-hover">Marketing</Link>
                    <Link to={''} className="link link-hover">Advertisement</Link>
                </div>
                <div className='flex  flex-col items-center sm:items-start w-full'>
                    <span className="footer-title">Company</span>
                    <Link to={''} className="link link-hover">About us</Link>
                    <Link to={''} className="link link-hover">Contact</Link>
                    <Link to={''} className="link link-hover">Jobs</Link>
                    <Link to={''} className="link link-hover">Press kit</Link>
                </div>
                <div className='flex  flex-col items-center sm:items-start w-full'>
                    <span className="footer-title">Legal</span>
                    <Link to={''} className="link link-hover">Terms of use</Link>
                    <Link to={''} className="link link-hover">Privacy policy</Link>
                    <Link to={''} className="link link-hover">Cookie policy</Link>
                </div>
            </footer>
            <footer className="footer px-10 py-4 border-t bg-neutral text-neutral-content ">
                <p className='mx-auto flex flex-col justify-center items-center  sm:flex-row'>
                    <span>Copyright © 2024 - All right reserved by</span>
                    <a className='text-[#f15048] hover:underline hover:tracking-wide transition-all  ' href="https://github.com/Developer-Rakib">Developer Rakib</a></p>

            </footer>
        </>
    );
};

export default Footer;