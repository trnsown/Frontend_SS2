import React from 'react';
import FooterBottom from '../sections/BottomFooter/FooterBottom';
import FooterMain from '../FooterMain/FooterMain';
function Footer() {

    return (
        <div className="footer-section">
            <footer class="section-footer bg-white border-top">
                <div class="container">
                    <FooterMain />
                    <FooterBottom />
                </div>
            </footer>
        </div>
    );
}
export default Footer;