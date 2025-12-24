export default function Home() {
  return (
    <div style={{padding: '50px', fontFamily: 'Arial, sans-serif'}}>
      <h1>🎮 Realhun 놀이터</h1>
      <h2>Welcome to Realhun Playground</h2>
      <p>This is a modern web application powered by:</p>
      <ul>
        <li>Next.js 14 (Frontend)</li>
        <li>FastAPI (Backend)</li>
        <li>PostgreSQL + pgvector (Database)</li>
      </ul>
      <div style={{marginTop: '30px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px'}}>
        <h3>Server Status</h3>
        <p>✅ Frontend is running</p>
        <p>📡 Connect to API at: http://152.42.210.15:8000</p>
      </div>
    </div>
  )
}
