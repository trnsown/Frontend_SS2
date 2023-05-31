
import { memo } from "react";
import Category from "./Category";


function CategoryListSideBar({ categories,searchFilter,setProductPageUpdate }) {

    return (
        <div className="row">
            {
                categories.map((category) => (
                    <Category key={category.id} {...category} setProductPageUpdate={setProductPageUpdate} searchFilter={searchFilter}/>
                ))
            }
        </div>
    )
}
export default memo(CategoryListSideBar);