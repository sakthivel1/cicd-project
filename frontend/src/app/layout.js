export const metadata = {
  title: 'Items Manager',
  description: 'CI/CD Demo App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}