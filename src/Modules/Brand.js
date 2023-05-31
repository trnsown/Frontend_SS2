import { memo, useEffect, useState } from "react";


function Brand(props) {
    const [isChecked, setChecked] = useState(false);
    let searchFilter = props.searchFilter;

    useEffect(() => {
        const found = searchFilter.brand_ids.find((element) => element === props.id);
        if (found !== undefined) {
            setChecked(true);
        }
    }, [])

    function addCategory() {
        if (!isChecked) {
            searchFilter.brand_ids.push(props.id);

        } else {
            for (let i = 0; i < searchFilter.brand_ids.length; i++) {
                if (searchFilter.brand_ids[i] === props.id) {
                    searchFilter.brand_ids.splice(i, 1);
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
                window.history.replaceState(null, "Products", `/products/1/${searchFilter.perPage}`)
            }

            } />

            <span class="form-check-label"> {props.name} </span>
        </label>
    )
}
export default memo(Brand);