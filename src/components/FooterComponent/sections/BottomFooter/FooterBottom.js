import LanguageDropdown from "./LanguageDropdown";
function FooterBottom() {
    return (
        <section className="footer-bottom d-flex justify-content-lg-between border-top">
            <div>
                <i className="fab fa-lg fa-cc-visa"></i>
                <i className="fab fa-lg fa-cc-amex"></i>
                <i className="fab fa-lg fa-cc-mastercard"></i>
                <i className="fab fa-lg fa-cc-paypal"></i>
            </div>
            <LanguageDropdown />
        </section>
    );
}
export default FooterBottom;