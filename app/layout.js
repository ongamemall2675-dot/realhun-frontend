export const metadata = {
  title: 'Realhun Playground',
  description: 'RAG-powered web application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
