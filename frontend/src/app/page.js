'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setItems(data)
    } catch (error) {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
      })
      if (response.ok) {
        setMessage('Item created successfully!')
        setName('')
        setDescription('')
        fetchItems()
      }
    } catch (error) {
      setMessage('Error creating item')
    }
  }

  if (!mounted) return null

  return (
    <main style={{ fontFamily: 'Arial', maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <h1>Items Manager</h1>
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '8px', boxSizing: 'border-box' }}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <button
            type="submit"
            style={{ background: '#0070f3', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Add Item
          </button>
        </form>
        {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
      </div>
      <div>
        <h2>Items List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p>No items yet. Add one above!</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {items.map((item) => (
              <li key={item.id} style={{ background: 'white', border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '4px' }}>
                <strong>{item.name}</strong>
                {item.description && <p style={{ margin: '5px 0 0', color: '#666' }}>{item.description}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
