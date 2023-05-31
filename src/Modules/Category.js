import { memo, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


function Category(props) {
    const [isChecked, setChecked] = useState(false);
    let searchFilter = props.searchFilter;


    useEffect(() => {
        const found = searchFilter.category_ids.find((element) => element === props.id);
        if (found !== undefined) {
            setChecked(true);
        }
    }, [])


    function addCategory() {
        if (!isChecked) {
            searchFilter.category_ids.push(props.id);

        } else {
            for (let i = 0; i < searchFilter.category_ids.length; i++) {
                if (searchFilter.category_ids[i] === props.id) {
                    searchFilter.category_ids.splice(i, 1);
                    break;
                }
            }
        }
        setChecked(!isChecked);
        searchFilter.pageNum = 0;
    }
    return (
        <label class="form-check mb-2">
            <input class="form-check-input" type="checkbox" value="" checked={isChecked} onClick={() => {
                addCategory();
                props.setProductPageUpdate();
                window.history.replaceState(null,"Products",`/products/1/${searchFilter.perPage}`)
            }

            } />

            <span class="form-check-label"> {props.name} </span>
        </label>
    )
}
export default memo(Category);