import { memo } from "react";
import Brand from "./Brand"


function BrandListSideBar({ brands, searchFilter, setProductPageUpdate }) {
    return (

        <div className="row">
            {
                brands.map((brand) => (
                    <Brand key={brand.id}{...brand} setProductPageUpdate={setProductPageUpdate} searchFilter={searchFilter} />
                ))
            }
        </div>
    )
}
export default memo(BrandListSideBar);