export function Newsletter() {
  return (
    <section className="newsletter">
      <h2>Subscribe to our Newsletter</h2>
      <p>Stay updated with our latest posts and news.</p>
      <form>
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="border rounded px-3 py-2 mr-2"
        />
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Subscribe
        </button>
      </form>
    </section>
  )
}