function Copyright(props) {
    return (
        <aside className="col-12 col-sm-12 col-lg-3">
            <article className="me-lg-4">
                <p className="mt-3">{props.owner}<br />{props.text}</p>
            </article>
        </aside>
    );
}
export default Copyright;