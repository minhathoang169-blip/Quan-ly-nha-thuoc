import { useMemo, useState } from 'react'
import './App.css'

const categories = [
  { name: 'Thuốc', icon: '💊', tint: 'mint' },
  { name: 'Vitamin & khoáng chất', icon: '🍊', tint: 'peach' },
  { name: 'Mẹ & bé', icon: '🧸', tint: 'pink' },
  { name: 'Chăm sóc cá nhân', icon: '🧴', tint: 'lavender' },
  { name: 'Thiết bị y tế', icon: '🩺', tint: 'blue' },
  { name: 'Thực phẩm sức khỏe', icon: '🌿', tint: 'green' },
]

const products = [
  { id: 1, name: 'Vitamin C 500mg tăng sức đề kháng', brand: 'DHC · Nhật Bản', price: 125000, old: 150000, badge: '-17%', emoji: '🍊', color: 'orange', category: 'Vitamin & khoáng chất', sold: '2.4k' },
  { id: 2, name: 'Viên uống bổ sung kẽm Zinc gluconate', brand: 'Nature Made · Mỹ', price: 189000, old: 220000, badge: 'Bán chạy', emoji: '💊', color: 'blue', category: 'Vitamin & khoáng chất', sold: '1.8k' },
  { id: 3, name: 'Nước muối sinh lý Natri Clorid 0,9%', brand: 'Pharmedic · Việt Nam', price: 12000, old: null, badge: null, emoji: '🧪', color: 'aqua', category: 'Thuốc', sold: '980' },
  { id: 4, name: 'Kem dưỡng ẩm phục hồi da dịu nhẹ', brand: 'CeraVe · Pháp', price: 325000, old: 360000, badge: '-10%', emoji: '🧴', color: 'cream', category: 'Chăm sóc cá nhân', sold: '1.2k' },
  { id: 5, name: 'Men vi sinh hỗ trợ tiêu hóa cho bé', brand: 'BioGaia · Thụy Điển', price: 285000, old: null, badge: 'Được yêu thích', emoji: '🍼', color: 'pink', category: 'Mẹ & bé', sold: '756' },
  { id: 6, name: 'Máy đo huyết áp bắp tay tự động', brand: 'Omron · Nhật Bản', price: 890000, old: 1050000, badge: '-15%', emoji: '🩺', color: 'lavender', category: 'Thiết bị y tế', sold: '432' },
  { id: 7, name: 'Dầu cá Omega 3 hỗ trợ tim mạch', brand: 'Blackmores · Úc', price: 359000, old: 399000, badge: '-10%', emoji: '🐟', color: 'gold', category: 'Thực phẩm sức khỏe', sold: '1.1k' },
  { id: 8, name: 'Paracetamol 500mg giảm đau hạ sốt', brand: 'Dược Hậu Giang · Việt Nam', price: 28000, old: null, badge: null, emoji: '🌡️', color: 'mint', category: 'Thuốc', sold: '3.6k' },
]

const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + '₫'

function Icon({ name, size = 20 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/></>,
    cart: <><path d="M3 3h2l2.3 11.4a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 7H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 2.7a2 2 0 0 1-.6 1.9L7.7 9.6a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 1.9-.6l2.7.5a2 2 0 0 1 1.7 2.7Z"/></>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function App() {
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [toast, setToast] = useState('')

  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = activeCategory === 'Tất cả' || product.category === activeCategory
    const matchesSearch = `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  }), [activeCategory, search])

  const addToCart = (product) => {
    setCart((items) => [...items, product])
    setToast(`Đã thêm ${product.name} vào giỏ hàng`)
    window.setTimeout(() => setToast(''), 2300)
  }

  return (
    <div className="storefront">
      <div className="announcement"><span>🚚</span> Giao nhanh 2H · Miễn phí giao hàng cho đơn từ 300.000₫ <a href="#products">Mua sắm ngay <Icon name="arrow" size={14} /></a></div>
      <header className="site-header">
        <div className="header-main page-wrap">
          <a className="brand" href="#top" aria-label="An Tâm Pharmacy - trang chủ"><span className="brand-mark">+</span><span className="brand-name">an tâm<span>pharmacy</span></span></a>
          <label className="search-box"><Icon name="search" size={21} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm thuốc, vitamin, sản phẩm chăm sóc sức khỏe..."/><kbd>⌕</kbd></label>
          <button className="header-action location-action"><span className="action-icon"><Icon name="pin" /></span><span><small>Nhà thuốc gần bạn</small><strong>Chọn khu vực</strong></span></button>
          <button className="header-action account-action"><span className="action-icon"><Icon name="user" /></span><span><small>Xin chào bạn</small><strong>Tài khoản</strong></span></button>
          <button className="cart-button" onClick={() => setShowCart(true)} aria-label="Mở giỏ hàng"><Icon name="cart" size={22}/><span>Giỏ hàng</span><b>{cart.length}</b></button>
        </div>
        <nav className="main-nav"><div className="page-wrap nav-inner"><button className="nav-catalog" onClick={() => document.getElementById('categories').scrollIntoView({ behavior: 'smooth' })}>☰ <span>Danh mục sản phẩm</span></button><a className="nav-active" href="#products">Sản phẩm</a><a href="#offers">Khuyến mãi</a><a href="#services">Dịch vụ sức khỏe</a><a href="#health">Góc sức khỏe</a><div className="nav-hotline"><Icon name="phone" size={17}/> Tư vấn dược sĩ <strong>1800 6868</strong></div></div></nav>
      </header>

      <main id="top">
        <section className="hero page-wrap">
          <div className="hero-copy"><div className="hero-eyebrow"><span className="eyebrow-dot"/> CHĂM SÓC SỨC KHỎE MỖI NGÀY</div><h1>Sống khỏe mỗi ngày,<br/><em>an tâm</em> lựa chọn.</h1><p>Sản phẩm chính hãng, dược sĩ tận tâm và giao hàng nhanh đến tận nhà.</p><a className="hero-cta" href="#products">Khám phá sản phẩm <Icon name="arrow" size={18}/></a><div className="hero-proof"><span><Icon name="check" size={15}/> 100% chính hãng</span><span><Icon name="check" size={15}/> Dược sĩ tư vấn</span></div></div>
          <div className="hero-art" aria-hidden="true"><div className="art-sun"/><div className="art-leaf leaf-one"/><div className="art-leaf leaf-two"/><div className="art-pill pill-one"/><div className="art-pill pill-two"/><div className="art-bottle"><span className="bottle-cap"/><span className="bottle-label"><b>AT</b><small>VITAMIN<br/>DAILY</small></span></div><div className="art-box"><span className="box-cross">+</span><span className="box-label">care<br/><small>for you</small></span></div><div className="art-sparkle sparkle-one">✳</div><div className="art-sparkle sparkle-two">✦</div><div className="art-caption">Bắt đầu từ<br/><strong>một lựa chọn tốt</strong></div></div>
          <div className="hero-pagination"><i className="selected"/><i/><i/></div>
        </section>

        <section className="benefits page-wrap" id="services"><div className="benefit"><span className="benefit-icon mint-icon">✚</span><span><strong>Thuốc chính hãng</strong><small>Nguồn gốc rõ ràng</small></span></div><div className="benefit"><span className="benefit-icon peach-icon">♧</span><span><strong>Dược sĩ đồng hành</strong><small>Tư vấn tận tâm</small></span></div><div className="benefit"><span className="benefit-icon blue-icon">⌁</span><span><strong>Giao hàng nhanh</strong><small>Trong 2 giờ nội thành</small></span></div><div className="benefit"><span className="benefit-icon lilac-icon">♡</span><span><strong>Tích điểm An Tâm</strong><small>Ưu đãi dành riêng bạn</small></span></div></section>

        <section className="category-section page-wrap" id="categories"><div className="section-heading"><div><span className="section-kicker">TÌM NHANH THEO NHU CẦU</span><h2>Danh mục nổi bật</h2></div><a href="#products">Xem tất cả <Icon name="arrow" size={16}/></a></div><div className="category-grid">{categories.map((category) => <button className={`category-tile ${category.tint} ${activeCategory === category.name ? 'category-selected' : ''}`} key={category.name} onClick={() => { setActiveCategory(category.name); document.getElementById('products').scrollIntoView({ behavior: 'smooth' }) }}><span className="category-emoji">{category.icon}</span><strong>{category.name}</strong><span className="category-arrow"><Icon name="arrow" size={15}/></span></button>)}</div></section>

        <section className="product-section page-wrap" id="products"><div className="section-heading product-heading"><div><span className="section-kicker">ĐƯỢC KHÁCH HÀNG TIN CHỌN</span><h2>{activeCategory === 'Tất cả' ? 'Sản phẩm bán chạy' : activeCategory}</h2></div><a href="#products" onClick={(event) => { event.preventDefault(); setActiveCategory('Tất cả') }}>Xem tất cả <Icon name="arrow" size={16}/></a></div><div className="product-tabs"><button className={activeCategory === 'Tất cả' ? 'tab-active' : ''} onClick={() => setActiveCategory('Tất cả')}>Tất cả sản phẩm</button><button onClick={() => setActiveCategory('Thuốc')}>Thuốc</button><button onClick={() => setActiveCategory('Vitamin & khoáng chất')}>Vitamin</button><button onClick={() => setActiveCategory('Chăm sóc cá nhân')}>Chăm sóc cá nhân</button></div><div className="product-grid">{visibleProducts.length ? visibleProducts.map((product) => <article className="product-card" key={product.id}><div className={`product-visual ${product.color}`}><button className="favorite" aria-label="Yêu thích"><Icon name="heart" size={18}/></button>{product.badge && <span className={`product-badge ${product.badge === 'Bán chạy' || product.badge === 'Được yêu thích' ? 'badge-popular' : ''}`}>{product.badge}</span>}<div className="product-pack"><div className="pack-top"><span className="pack-logo">AT</span><span className="pack-leaf">✳</span></div><div className="pack-symbol">{product.emoji}</div><div className="pack-name">{product.name.split(' ').slice(0, 3).join(' ')}</div><div className="pack-line"/></div></div><div className="product-info"><small className="product-brand">{product.brand}</small><h3>{product.name}</h3><div className="product-rating"><span>★★★★★</span> <small>({product.sold})</small></div><div className="product-price-row"><div><strong>{formatPrice(product.price)}</strong>{product.old && <del>{formatPrice(product.old)}</del>}</div><button className="add-cart" aria-label={`Thêm ${product.name} vào giỏ`} onClick={() => addToCart(product)}>+</button></div></div></article>) : <div className="empty-results">Chưa tìm thấy sản phẩm phù hợp. Thử từ khóa khác nhé.</div>}</div></section>

        <section className="promo-strip page-wrap" id="offers"><div className="promo-copy"><span>ƯU ĐÃI THÁNG NÀY</span><h2>Khỏe hơn mỗi ngày,<br/>tiết kiệm đến <em>25%</em></h2><p>Ưu đãi đặc biệt cho sản phẩm chăm sóc sức khỏe được yêu thích.</p><a href="#products">Khám phá ưu đãi <Icon name="arrow" size={17}/></a></div><div className="promo-visual" aria-hidden="true"><span className="promo-orbit orbit-a"/><span className="promo-orbit orbit-b"/><span className="promo-jar">🌿</span><span className="promo-bubble bubble-a">−25%</span><span className="promo-bubble bubble-b">♡</span><span className="promo-leaf">✳</span></div></section>

        <section className="trust-section page-wrap" id="health"><div className="trust-seal">✚</div><div><span className="section-kicker">AN TÂM TỪ TÂM</span><h2>Sức khỏe của bạn là ưu tiên của chúng tôi</h2><p>Đội ngũ dược sĩ luôn sẵn sàng giúp bạn chọn đúng sản phẩm và chăm sóc sức khỏe gia đình tốt hơn.</p></div><a href="#services">Tìm hiểu thêm <Icon name="arrow" size={16}/></a></section>
      </main>

      <footer className="site-footer"><div className="page-wrap footer-inner"><a className="brand footer-brand" href="#top"><span className="brand-mark">+</span><span className="brand-name">an tâm<span>pharmacy</span></span></a><p>Chăm sóc sức khỏe bằng sự tận tâm.<br/>Luôn ở đây khi bạn cần.</p><span>© 2026 An Tâm Pharmacy</span></div></footer>

      {showCart && <div className="drawer-backdrop" onClick={() => setShowCart(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-heading"><div><span className="section-kicker">MUA SẮM CỦA BẠN</span><h2>Giỏ hàng ({cart.length})</h2></div><button className="close-drawer" onClick={() => setShowCart(false)}>×</button></div>{cart.length ? <><div className="cart-items">{cart.map((product, index) => <div className="cart-item" key={`${product.id}-${index}`}><span className={`cart-item-icon ${product.color}`}>{product.emoji}</span><div><strong>{product.name}</strong><small>{product.brand}</small><b>{formatPrice(product.price)}</b></div></div>)}</div><div className="drawer-total"><span>Tạm tính</span><strong>{formatPrice(cart.reduce((total, product) => total + product.price, 0))}</strong></div><button className="checkout-button" onClick={() => { setToast('Tính năng đặt hàng sẽ sớm ra mắt'); setShowCart(false); window.setTimeout(() => setToast(''), 2300) }}>Tiến hành đặt hàng <Icon name="arrow" size={18}/></button></> : <div className="cart-empty"><span>🛍️</span><h3>Giỏ hàng đang trống</h3><p>Chọn sản phẩm chăm sóc sức khỏe phù hợp với bạn nhé.</p><button onClick={() => setShowCart(false)}>Tiếp tục mua sắm</button></div>}</aside></div>}
      {toast && <div className="toast"><span>✓</span>{toast}</div>}
    </div>
  )
}

export default App
