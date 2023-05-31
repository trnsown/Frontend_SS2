import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { globalSearchFilter } from "../../../../GlobalVariables";

function SearchForm(props) {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const searchFilter = useContext(globalSearchFilter);
    useEffect(() => {
        if (searchFilter.keyword != null) {
            setKeyword(searchFilter.keyword);
        } else {
            setKeyword("");
        }
    }, [props.searchFilter]);
    const onKeywordChange = (event) => {
        setKeyword(event.target.value);
        searchFilter.keyword = event.target.value;
    }
    const onKeyBoardEnter = (event) => {
        if (event.key === 'Enter') {
            Search();
        }

    }
    function Search() {
        console.log(keyword);
        props.searchFilter.keyword=keyword;
        props.searchFilter.pageNum=0;
        console.log(props.searchFilter);
        window.history.replaceState(null, "", `/products/1/${searchFilter.perPage}/${searchFilter.keyword}`);
        props.forceUpdate();
    }
    return (
        <div class="input-group">
            <input
                onKeyDown={onKeyBoardEnter}
                value={keyword}
                type="search"
                class="form-control"
                style={{ width: "55%" }}
                placeholder="Search"

                onChange={onKeywordChange} />

            <NavLink onClick={Search} style={{ height: '100%' }} to={`/products/1/${searchFilter.perPage}/${searchFilter.keyword}`}>
                <button style={{ height: '35px' }} class="btn btn-success ">  <a class="fa fa-search" /> </button>
            </NavLink>

        </div>
    );
}
export default SearchForm;