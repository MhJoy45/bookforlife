 "use client";

import { useMemo, useState } from "react";

type Product = { id: number; title: string; author: string; price: number; oldPrice?: number; category: string; image: string; tag?: string };
type Line = { product: Product; quantity: number };

const products: Product[] = [
  { id: 1, title: "Atomic Habits", author: "James Clear", price: 450, oldPrice: 550, category: "PERSONAL DEVELOPMENT", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=700&q=85", tag: "BESTSELLER" },
  { id: 2, title: "The Psychology of Money", author: "Morgan Housel", price: 390, category: "BUSINESS & FINANCE", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=85", tag: "POPULAR" },
  { id: 3, title: "Ikigai", author: "Héctor García & Francesc Miralles", price: 340, oldPrice: 420, category: "LIFESTYLE", image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=700&q=85" },
  { id: 4, title: "The Alchemist", author: "Paulo Coelho", price: 320, category: "FICTION", image: "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=700&q=85" },
  { id: 5, title: "Deep Work", author: "Cal Newport", price: 410, category: "PRODUCTIVITY", image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=700&q=85", tag: "EDITOR'S PICK" },
  { id: 6, title: "Think Like a Monk", author: "Jay Shetty", price: 380, category: "PERSONAL DEVELOPMENT", image: "https://images.unsplash.com/photo-151110意_placeholder?w=700&q=85" }
];
// Replace the last demo cover with a stable image URL.
products[5].image = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=700&q=85";

const money = (n: number) => `৳${n.toLocaleString("en-BD")}`;

export default function Storefront() {
  const [cart, setCart] = useState<Line[]>([]);
  const [details, setDetails] = useState({ name: "", phone: "", address: "", city: "" });
  const [done, setDone] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("ALL BOOKS");
  const totalItems = cart.reduce((s, l) => s + l.quantity, 0);
  const subtotal = useMemo(() => cart.reduce((s, l) => s + l.product.price * l.quantity, 0), [cart]);
  const categories = ["ALL BOOKS", "PERSONAL DEVELOPMENT", "BUSINESS & FINANCE", "FICTION", "LIFESTYLE"];
  const filtered = category === "ALL BOOKS" ? products : products.filter(p => p.category === category);

  function add(product: Product) {
    setDone(null); setMessage("");
    setCart(old => {
      const found = old.find(x => x.product.id === product.id);
      return found ? old.map(x => x.product.id === product.id ? { ...x, quantity: x.quantity + 1 } : x) : [...old, { product, quantity: 1 }];
    });
  }
  function qty(id: number, value: number) {
    setCart(old => value < 1 ? old.filter(x => x.product.id !== id) : old.map(x => x.product.id === id ? { ...x, quantity: value } : x));
  }
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!cart.length) { setMessage("Your bag is empty. Add a book before continuing."); return; }
    setDone(`BFL-${Date.now().toString().slice(-6)}`);
    setCart([]);
    setDetails({ name: "", phone: "", address: "", city: "" });
  }

  return <main>
    <div className="topline">FREE DELIVERY ON ORDERS OVER ৳1,000 <span>•</span> CASH ON DELIVERY AVAILABLE</div>
    <header className="header">
      <a className="logo" href="#"><span className="logo-icon">B.</span><span>BOOK FOR LIFE<small>YOUR EVERYDAY BOOKSTORE</small></span></a>
      <nav><a href="#shop">Shop books</a><a href="#benefits">Why Book For Life</a><a href="#checkout">How to order</a></nav>
      <a className="header-cart" href="#checkout">MY BAG <b>{totalItems}</b></a>
    </header>

    <section className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <div className="kicker"><span /> READ MORE. BECOME MORE.</div>
          <h1>ONE GOOD BOOK<br />CAN <em>CHANGE</em><br />EVERYTHING.</h1>
          <p>Big ideas. Unforgettable stories. Better everyday habits. Find the book that takes you one step further.</p>
          <div className="hero-buttons"><a href="#shop" className="btn btn-yellow">SHOP THE COLLECTION <span>↗</span></a><span className="hero-note">Carefully picked for curious minds.</span></div>
          <div className="hero-stats"><div><b>500+</b><small>BOOKS TO EXPLORE</small></div><i></i><div><b>Every page</b><small>A NEW POSSIBILITY</small></div></div>
        </div>
        <div className="hero-visual">
          <div className="hero-blob"></div>
          <div className="hero-photo"><img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1000&q=90" alt="Warm library bookshelf" /></div>
          <div className="floating-book"><img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=85" alt="Featured book" /><span>YOUR NEXT<br />FAVOURITE<br /><b>IS HERE.</b></span></div>
          <div className="round-stamp">TURN THE PAGE<br /><b>START TODAY ↗</b></div>
        </div>
      </div>
      <div className="hero-bottom"><span>BOOKS FOR BIG THINKERS</span><span>BOOKS FOR QUIET MOMENTS</span><span>BOOKS FOR WHAT'S NEXT</span></div>
    </section>

    <section className="benefit-strip" id="benefits">
      <div><b>01</b><span><strong>Curated collection</strong><small>Worthwhile reads for every mind</small></span></div>
      <div><b>02</b><span><strong>Simple ordering</strong><small>Choose, checkout, done</small></span></div>
      <div><b>03</b><span><strong>Cash on delivery</strong><small>Pay when your order arrives</small></span></div>
    </section>

    <section className="shop section" id="shop">
      <div className="section-top"><div><span className="section-label">THE BOOKSHELF</span><h2>FIND YOUR NEXT<br /><em>FAVOURITE READ.</em></h2><p>Handpicked titles to inspire your next chapter.</p></div><a className="text-link" href="#checkout">READY TO ORDER? <b>↓</b></a></div>
      <div className="filters">{categories.map(c => <button key={c} className={category === c ? "active" : ""} onClick={() => setCategory(c)}>{c}</button>)}</div>
      <div className="product-grid">{filtered.map((p, i) => <article className="product" key={p.id}>
        <div className="product-image"><img src={p.image} alt={p.title} loading="lazy" />{p.tag && <span className="product-tag">{p.tag}</span>}<span className="product-index">0{i + 1}</span></div>
        <div className="product-meta"><span>{p.category}</span><span>★ 4.8</span></div>
        <h3>{p.title}</h3><p className="author">by {p.author}</p>
        <div className="product-foot"><div><b>{money(p.price)}</b>{p.oldPrice && <del>{money(p.oldPrice)}</del>}</div><button onClick={() => add(p)}>ADD TO BAG <span>+</span></button></div>
      </article>)}</div>
    </section>

    <section className="statement"><div className="statement-mark">“</div><p>MAKE TIME FOR<br /><em>WHAT MOVES YOU.</em></p><span>A BETTER DAY CAN START WITH A BETTER BOOK.</span></section>

    <section className="checkout section" id="checkout">
      <div className="checkout-side"><span className="section-label">ALMOST YOURS</span><h2>YOUR NEXT<br />CHAPTER<br /><em>STARTS HERE.</em></h2><p>Fill in your details and review your selected books. This is a frontend checkout demo.</p><div className="checkout-points"><span>✓ Easy order form</span><span>✓ Cash on delivery option</span><span>✓ No account needed</span></div></div>
      <div className="checkout-card">
        {done ? <div className="success"><div className="success-check">✓</div><span className="section-label">DEMO ORDER COMPLETE</span><h3>YOU'RE ALL SET.</h3><p>Your demo order number is <b>{done}</b>. No order has been sent to a store or saved.</p><button className="dark-button" onClick={() => setDone(null)}>BACK TO SHOP ↗</button></div> : <>
          <div className="card-heading"><div><span className="section-label">01 / YOUR SELECTION</span><h3>YOUR BAG <small>({totalItems} ITEMS)</small></h3></div><a href="#shop">+ ADD BOOKS</a></div>
          <div className="bag-list">{cart.length === 0 ? <div className="empty"><b>YOUR BAG IS EMPTY.</b><span>Pick a book you love. It will show up here.</span><a href="#shop">EXPLORE BOOKS ↓</a></div> : cart.map(l => <div className="bag-line" key={l.product.id}><img src={l.product.image} alt="" /><div className="bag-info"><b>{l.product.title}</b><small>{money(l.product.price)} each</small><div className="quantity"><button onClick={() => qty(l.product.id, l.quantity - 1)}>−</button><span>{l.quantity}</span><button onClick={() => qty(l.product.id, l.quantity + 1)}>+</button></div></div><strong>{money(l.product.price * l.quantity)}</strong><button className="remove" onClick={() => qty(l.product.id, 0)}>×</button></div>)}</div>
          <div className="total-row"><span>SUBTOTAL</span><b>{money(subtotal)}</b></div>
          <div className="card-heading delivery-heading"><div><span className="section-label">02 / DELIVERY</span><h3>WHERE TO SEND IT?</h3></div></div>
          <form onSubmit={submit} className="order-form">
            <label>FULL NAME *<input required value={details.name} onChange={e => setDetails({ ...details, name: e.target.value })} placeholder="Enter your full name" /></label>
            <label>PHONE NUMBER *<input required type="tel" value={details.phone} onChange={e => setDetails({ ...details, phone: e.target.value })} placeholder="01XXXXXXXXX" /></label>
            <label>DELIVERY ADDRESS *<textarea required rows={2} value={details.address} onChange={e => setDetails({ ...details, address: e.target.value })} placeholder="House, road, area..." /></label>
            <label>CITY / DISTRICT *<input required value={details.city} onChange={e => setDetails({ ...details, city: e.target.value })} placeholder="Your city or district" /></label>
            <div className="payment"><span>৳</span><div><b>CASH ON DELIVERY</b><small>Pay when your books arrive.</small></div><i>✓</i></div>
            {message && <p className="form-error">{message}</p>}
            <button className="submit-order" disabled={!cart.length}>CONFIRM DEMO ORDER <b>{money(subtotal)} ↗</b></button>
            <small className="disclaimer">DEMO ONLY — NO INFORMATION IS SENT OR STORED.</small>
          </form>
        </>}
      </div>
    </section>

    <footer><a className="logo footer-logo" href="#"><span className="logo-icon">B.</span><span>BOOK FOR LIFE<small>YOUR EVERYDAY BOOKSTORE</small></span></a><p>READ MORE. BECOME MORE.</p><span>© {new Date().getFullYear()} BOOK FOR LIFE</span></footer>
  </main>;
}