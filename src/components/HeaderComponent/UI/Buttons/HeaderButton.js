const HeaderButton = props => {
    return (
        <a href={props.href} class="btn btn-light">
            <i class={props.logo}></i> <span class="ms-1 d-none d-sm-inline-block">{props.name}</span>
        </a>
    );
}
export default HeaderButton;