function FooterColumn(props) {
  const { title, items } = props;

  return (
    <aside className="col-6 col-sm-4 col-lg-2">
      <h6 className="title">{title}</h6>
      <ul className="list-menu mb-4">
        {
          items.map((item, index) => (
            <li key={index}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))
        }
      </ul>
    </aside>
  );
}
export default FooterColumn;