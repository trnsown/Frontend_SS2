import Copyright from '../sections/Copyrights/Copyright';
import FooterColumn from '../sections/sectionTitle/FooterColumn';

function FooterMain() {
    const footer1 = [{ href: "#", label: "About us" }, { href: "#", label: "FindStore" }, { href: "#", label: "Categories" },]
    const footer2 = [{ href: "#", label: "Help center" }, { href: "#", label: "Terms and Conditions" }, { href: "#", label: "Shipping Info" },]
    const footer3 = [{ href: "#", label: "Help center" }, { href: "#", label: "Documentation" }, { href: "#", label: "Contact us" },]
    return (
        <section className="footer-main padding-y">
            <div className="row">
                <Copyright owner="2022-2023 HanuSport" text="All right reserved." />
                <FooterColumn title="Store" items={footer1} />
                <FooterColumn title="Information" items={footer2} />
                <FooterColumn title="Support" items={footer3} />
            </div>
        </section>
    );
}
export default FooterMain;