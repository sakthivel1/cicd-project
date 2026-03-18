import { render, screen } from '@testing-library/react'
import ItemList from './ItemList'

describe('ItemList Component', () => {

  test('renders no items message when list is empty', () => {
    render(<ItemList items={[]} />)
    const element = screen.getByText('No items found')
    expect(element).toBeTruthy()
  })

  test('renders list of items correctly', () => {
    const mockItems = [
      { id: 1, name: 'Item One', description: 'First item' },
      { id: 2, name: 'Item Two', description: 'Second item' }
    ]
    render(<ItemList items={mockItems} />)
    expect(screen.getByText('Item One')).toBeTruthy()
    expect(screen.getByText('Item Two')).toBeTruthy()
  })

  test('renders item without description', () => {
    const mockItems = [{ id: 1, name: 'No Desc Item', description: null }]
    render(<ItemList items={mockItems} />)
    expect(screen.getByText('No Desc Item')).toBeTruthy()
  })
})
