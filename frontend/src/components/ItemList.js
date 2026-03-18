export default function ItemList({ items }) {
  if (!items || items.length === 0) {
    return <p>No items found</p>
  }

  return (
    <ul data-testid="item-list">
      {items.map((item) => (
        <li key={item.id} data-testid="item">
          <strong>{item.name}</strong>
          {item.description && <span> - {item.description}</span>}
        </li>
      ))}
    </ul>
  )
}