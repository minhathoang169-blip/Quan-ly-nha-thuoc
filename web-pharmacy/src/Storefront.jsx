import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import './storefront.css'
import './reference-home.css'
import './health-sections.css'
import HealthDiseasePage, { diseaseGuides } from './HealthDiseasePage.jsx'

const demoProducts = [
  { id: 1, name: 'Paracetamol 500mg', category: 'Giảm đau, hạ sốt', price: 18000, stock: 86, pack: 'Hộp 10 vỉ x 10 viên', tag: 'Bán chạy', tone: 'blue', symbol: '✚' },
  { id: 2, name: 'Vitamin C 500mg', category: 'Vitamin & khoáng chất', price: 42000, stock: 45, pack: 'Lọ 100 viên', tag: 'Hỗ trợ đề kháng', tone: 'orange', symbol: 'C' },
  { id: 3, name: 'Men vi sinh BioCare', category: 'Tiêu hóa', price: 89000, stock: 24, pack: 'Hộp 20 gói', tag: 'Được yêu thích', tone: 'green', symbol: '✿' },
  { id: 4, name: 'Khẩu trang y tế 4 lớp', category: 'Vật tư y tế', price: 35000, stock: 120, pack: 'Hộp 50 cái', tag: 'Chính hãng', tone: 'lavender', symbol: '✳' },
  { id: 5, name: 'Nước muối sinh lý 0.9%', category: 'Chăm sóc cá nhân', price: 12000, stock: 60, pack: 'Chai 500ml', tag: '', tone: 'mint', symbol: '◉' },
  { id: 6, name: 'Dầu cá Omega 3', category: 'Vitamin & khoáng chất', price: 125000, stock: 18, pack: 'Lọ 60 viên', tag: 'Ưu đãi', tone: 'yellow', symbol: '◎' },
]
const categories = [
  ['▣', 'Thuốc không kê đơn', 'blue'], ['▤', 'Thuốc kê đơn (Rx)', 'orange'], ['⌁', 'Vitamin & khoáng chất', 'mint'],
  ['♧', 'Chăm sóc da', 'lavender'], ['▧', 'Huyết áp & đường huyết', 'blue'], ['✚', 'Dụng cụ sơ cứu y tế', 'pink'], ['♡', 'Mẹ & bé an toàn', 'mint'], ['♙', 'Chăm sóc người cao tuổi', 'yellow'],
]
const flashProducts = [
  { name: 'Panadol Extra đỏ giảm đau hạ sốt', brand: 'GSK GLAXOSMITHKLINE', price: 195000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs6rUjioOuebXvFw-BXE0mAjkWKdoVUVK8Y7jqgoicvAqSy5PqaenATLD1g0g9EEsi9ujpSk0BgVdEL2SNRI4X2sygf0l9ba9bj9loGlP0--xX8Z9jcnmVSflAUPiQnONw18aG1o_8nqFeSK2kBUMXRxlMiHXYeTjgvQ5NBB8y4v3BVsIixivbrEnbh2UqyAdOTK2QLF2xJ_PJCEZbswIGl1SaQvuWThSnWzZ56eYGtszirtfy0mP8' },
  { name: 'Berocca viên sủi bổ sung năng lượng', brand: 'BAYER HEALTHCARE', price: 99000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwWf01fVgzHmHiUZtAOpuc8bK9vZA7l1rpuLsjaHoVCS84eYYYAwo9ZJ9jCux0OWLjJtPK7Eln6MRc4IOp4tPRF9ehD9FHYirxBBZsSEVWr35Ye5W1RY_x5CgdrRHJUsbbel1WE51rWJwOdetGDaxPcZTBIGVLdl5cMQ1LxbkxaKPCcZKwMFduWt6PSX3YgVfQwPpfOjiIsB1CQG47QScpOF1TT8joRe56s4F1owuSH-n72IMUb1QM' },
  { name: 'Khẩu trang y tế 4 lớp kháng khuẩn N95', brand: 'AN TÂM MEDICAL', price: 65000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0yTKN9kW0TKqhzdnTMLjSmtmsN-ckCqUeqnabAVdfH3Eyds0p-hIo1QmGAWzkBh2_1YUqku6yVY_Ilp6x3yEFN60Xjtm8hMryHHP-fh2DbqRZ7_4kqxnw2UZNJ5L1rmb_ApOT9-5HDoaewVIt14wImUu9_rTGqYXsrLXF1dovzddJiXC4wRuR4qw-nPt_CGQG1gTKPZzHtZdjYfxSAwPdTWxNFf-qY1jnZYnztB6p9tbDAFP5l45N' },
  { name: 'Men vi sinh BioGaia Protectis dạng giọt', brand: 'BIOGAIA THỤY ĐIỂN', price: 395000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEBkEW-xAzMtBswu1F9htCm5pqvlco2uGyR3yZtPKCTaS7rnpjBbv1yldydKjZ5wQT_bQuPao-YRr42e3RVUD-n67ueFhVD3Vv0eeECi0FpxAM0T2-j3Prni4-atpaYGySqdsIijdHLQp6sXjsFIVkfzIW8uyBn-uYjp9fJGIBAe_LkviXhsCsoqgf9rg3ENyWRT0ZClLN4Gm7fsXd4P4TqH8IMIA5iw8-dkFdXYvuzUFZOxkoMsku' },
  { name: 'Nước muối sinh lý Physiodose Pháp', brand: 'GILBERT PHÁP', price: 110000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz989jjGXus1Fsj3_4j6iFPDsX8F2TVN-aRsjEmbKqV38Zxrtl6ZMDruOZ_GG5ux1k9TsLQviBbVK0yptXGfmoT4x7LEngQ8hJd9_uI4GNrZWJSooP-EcDa58DKzQ5791HQeAUfUt-cswqe6N5E6nEUL_Btvo6dBmTKIU2bHNOoLmLZudq9-FYi3FYBpG5eJ-Aul8B9xDy7z2cCLsQo0tNc1OVnDUYJDk7mMlcTp725-eBXH-8XIIR' },
]
const seasonalProducts = [
  { name: 'Viên uống Blackmores Bio C 1000mg', brand: 'BLACKMORES', price: 545000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuZatWFDy8aObmz1CyMn6rNpXO6fxLDAnjHDNQoCezonBrq225DTSrT_Bb9XAHoCrbR3Offezb5o9VpoYQ0l8VPTxeWOnV_-Nso4fjYhtMNEXrc0lJWWMAh69iAOcyHfOXAbW_55akZ4XRzztEYhg1jlX0pT8ZzRTMxMvAFSbnP1gE_MzUzcamqj3tY6mc5IgKOJq4MmvOG4jt2hJppTcWeL9AMJsle2Oj11gTsQIsUGqXfOblHAFo' },
  { name: 'Máy đo huyết áp bắp tay Omron HEM-7121', brand: 'OMRON HEALTHCARE', price: 890000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpEgsbpL7cVtJSSe5E0SiRURfgJzg-2SlJZ4XMIuEUkRbqfORteXeh5sCj5k5vd0VozisX0AP-YpKPmfjcIT4KO-O4F8MDCtaYmUKsWY9fIFGA3em4aunFB-bAIkJgfdQrBajEg1aEf_D-NAacEtTq1C4U_5EzeLvdsQCD6soQ5oIlbInmcLB8ZgtDZBEQIGdPt-IvCf6k7zEqrE8tmNzxwrEwhh9C05Lz52cJdxDCy7JdTR7MrxRH' },
  { name: 'Sữa bột Ensure Gold Abbott hương Vani', brand: 'ABBOTT NUTRITION', price: 825000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlvGMKEvs8V9AvMqxhn_1YTQVieTkQdJVHyL5mv13Br1Y6WU4QEQr_YHQGUHjzMbsKSudEHCzlH2WwE6g1y5aWBf0otOY8zZgTuf5StANy50IGg6sXbiHyBr4PFShCODA0Mrwtj5MHrxBie0wLvbC0x-6dmt4RjfGWSCoyzV64mmtuAO8RpTl0F7synkYz0lXoHXBIM1hr9443gSVryVLjGnVc6eZM4O27btzJPWgS43wOt75H6feb' },
  { name: "Dầu cá Nature's Bounty Fish Oil Omega-3", brand: "NATURE'S BOUNTY", price: 470000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIEewsDCvcIoh51dUZ1a6SumgRCB9Eu0k8xqn0ajFDaajKGcskBVfMpXpasX2MnLV1jPTvFxpLdRrSDz8jadKDVPAu0QQWB87iMsfxtjm9hmlKwx9f37gSgsaQD8RNp4QuAkPoaFsLPutiMgCuKgup2jAgppPWaUJJMBGjTu42spyj5RRQWnDCXKQQo7kVUX7k71NBjk3QPQySr_1IXMxnCi70n70f51yrt0RC1_5hYStBdHFybTNM' },
]
const pharmacistImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJe4VciuRrwKTocGxENYfun4h_JUjt-9DDIRMOevfqQUKIGyjg0E4OY67nfupuom4TXO4TKngw1OVhCY-5lsf2Lx1JRmU6JI8biUQYFQ2pTs-mEhJ0jGE7vhrnNmbnX1vMTthCAkNSrU-M6o6sxUdLzjJlPf82G3O_6KrIQkPRgHzXCUvUy3fAuO48jmsToUlmvcZ4QtyU63EeiPc15YuZVz5A51NnaRJ9IOekookx1crRyNJANvCa'
const seasonalDiseases = [
  ['Bệnh phổi tắc nghẽn mạn tính', '/health/copd.jpg'], ['Bệnh sởi', '/health/measles.jpg'], ['Bệnh cúm', '/health/flu.jpg'], ['Bệnh dị ứng', '/health/allergy.jpg'],
  ['Trào ngược dạ dày', '/health/reflux.jpg'], ['Đau mắt đỏ', '/health/red-eye.jpg'], ['Sốt phát ban', '/health/dengue.jpg'], ['Đau cơ xương khớp', '/health/joint-pain.jpg'],
]
const healthTopics = ['Bài viết nổi bật', 'Bệnh mạn tính', 'Bệnh thường gặp', 'Bệnh ung thư', 'Bệnh viện', 'Chăm sóc chuyên sâu']
const healthArticles = [
  { category: 'Bài viết nổi bật', title: 'Dược sĩ cộng đồng đồng hành chăm sóc sức khỏe mỗi ngày', image: pharmacistImage },
  { category: 'Bệnh mạn tính', title: 'Chủ động theo dõi sức khỏe khi sống chung với bệnh mạn tính', image: '/health/copd.jpg' },
  { category: 'Bệnh thường gặp', title: 'Những lưu ý khi thời tiết thay đổi', image: '/health/flu.jpg' },
  { category: 'Bệnh ung thư', title: 'Đồng hành cùng người bệnh trong quá trình chăm sóc', image: '/health/allergy.jpg' },
  { category: 'Bệnh viện', title: 'Chuẩn bị thông tin sức khỏe trước buổi tư vấn', image: pharmacistImage },
  { category: 'Chăm sóc chuyên sâu', title: 'Trao đổi với dược sĩ về cách dùng thuốc an toàn', image: '/health/joint-pain.jpg' },
]
const money = (amount) => new Intl.NumberFormat('vi-VN').format(amount) + '₫'

export default function Storefront({ onAdmin }) {
  const [products, setProducts] = useState(demoProducts)
  const [source, setSource] = useState('demo')
  const [page, setPage] = useState(() => window.location.pathname.startsWith('/benh/') ? 'disease' : 'home')
  const [diseaseSlug, setDiseaseSlug] = useState(() => window.location.pathname.startsWith('/benh/') ? window.location.pathname.split('/').pop().replace(/\.html$/, '') : '')
  const [selected, setSelected] = useState(null)
  const [category, setCategory] = useState('Tất cả sản phẩm')
  const [query, setQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('pharmacare-cart') || '{}'))
  const [notice, setNotice] = useState('')
  const [diseaseOffset, setDiseaseOffset] = useState(0)
  const [healthTopic, setHealthTopic] = useState(healthTopics[0])

  useEffect(() => {
    const controller = new AbortController()
    axios.get('/api/medicines', { signal: controller.signal }).then(({ data }) => {
      if (!Array.isArray(data) || data.length === 0) return
      setProducts(data.map((item, index) => ({
        ...item, category: item.category || 'Dược phẩm', pack: item.unit || 'Hộp sản phẩm', tag: '',
        tone: ['blue', 'mint', 'orange', 'lavender'][index % 4], symbol: ['✚', 'C', '✿', '◉'][index % 4],
      })))
      setSource('api')
    }).catch(() => {})
    return () => controller.abort()
  }, [])

  useEffect(() => {
    const syncDiseaseRoute = () => {
      const isDiseaseRoute = window.location.pathname.startsWith('/benh/')
      setDiseaseSlug(isDiseaseRoute ? window.location.pathname.split('/').pop().replace(/\.html$/, '') : '')
      setPage(isDiseaseRoute ? 'disease' : 'home')
    }
    window.addEventListener('popstate', syncDiseaseRoute)
    return () => window.removeEventListener('popstate', syncDiseaseRoute)
  }, [])

  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0)
  const cartItems = products.filter((product) => cart[product.id]).map((product) => ({ ...product, quantity: cart[product.id] }))
  const total = cartItems.reduce((sum, product) => sum + product.price * product.quantity, 0)
  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'Tất cả sản phẩm' || product.category?.toLocaleLowerCase('vi').includes(category.toLocaleLowerCase('vi').split(' ')[0])
    const needle = submittedQuery.trim().toLocaleLowerCase('vi')
    return matchesCategory && (!needle || `${product.name} ${product.category}`.toLocaleLowerCase('vi').includes(needle))
  }), [products, category, submittedQuery])
  const orderedDiseases = [...seasonalDiseases.slice(diseaseOffset), ...seasonalDiseases.slice(0, diseaseOffset)]
  const selectedArticles = healthTopic === healthTopics[0]
    ? healthArticles.slice(1)
    : healthArticles.filter((article) => article.category === healthTopic)
  const healthFeature = healthTopic === healthTopics[0]
    ? healthArticles[0]
    : (selectedArticles[0] || healthArticles[0])
  const healthSideArticles = healthArticles.filter((article) => article !== healthFeature)

  function navigate(nextPage) {
    setPage(nextPage)
    if (window.location.pathname.startsWith('/benh/')) window.history.pushState({}, '', '/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  function openDisease(disease) {
    setDiseaseSlug(disease.slug)
    setPage('disease')
    window.history.pushState({}, '', `/benh/${disease.slug}.html`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  function addToCart(product, amount = 1) {
    const next = { ...cart, [product.id]: (cart[product.id] || 0) + amount }
    setCart(next); localStorage.setItem('pharmacare-cart', JSON.stringify(next))
    setNotice(`Đã thêm ${product.name} vào giỏ hàng`)
    window.setTimeout(() => setNotice(''), 2600)
  }
  function changeQuantity(id, amount) {
    const next = { ...cart, [id]: Math.max(0, (cart[id] || 0) + amount) }
    if (!next[id]) delete next[id]
    setCart(next); localStorage.setItem('pharmacare-cart', JSON.stringify(next))
  }
  function showProduct(product) { setSelected(product); navigate('detail') }
  function search(event) { event.preventDefault(); setSubmittedQuery(query); setCategory('Tất cả sản phẩm'); navigate('catalog') }

  return <div className="shop">
    <div className="announcement"><div className="shop-container announcement-inner"><a href="tel:18006821">♧ <span>Hotline miễn phí <b>1800 6821</b> (Dược sĩ trực 24/7)</span></a><span className="delivery-note">⌖ Giao nhanh tới: <b>TP. Hồ Chí Minh</b></span><span className="top-links"><button onClick={() => setNotice('Tra cứu đơn hàng')} type="button">♧ Tra cứu đơn hàng</button><button onClick={() => setNotice('Tải ứng dụng An Tâm')} type="button">▣ Tải ứng dụng An Tâm</button></span><span className="gpp-note">✓ Chuẩn GPP Bộ Y Tế</span></div></div>
    <header className="shop-header"><div className="shop-container header-main">
      <button className="shop-logo" onClick={() => navigate('home')} type="button" aria-label="An Tâm trang chủ"><span className="logo-icon">✚</span><span><b>An <span>Tâm</span></b><small>NHÀ THUỐC CHUẨN GPP</small></span></button>
      <form className="shop-search" onSubmit={search}><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm thuốc, vitamin, sản phẩm chăm sóc sức khỏe..."/><button type="submit">Tìm kiếm</button></form>
      <button className="pharmacist" type="button" onClick={() => setNotice('Dược sĩ đang trực tuyến — gọi 1800 6821 để được tư vấn')}><span className="pharmacist-avatar">DS<i/></span><span><b>Trực tuyến 24/7</b><small>Dược sĩ tư vấn</small></span></button>
      <button className="prescription-shortcut" type="button" onClick={() => setNotice('Gửi đơn thuốc để dược sĩ kiểm tra')}>▧ Gửi đơn thuốc</button>
      <button className="account-shortcut" type="button" onClick={() => setNotice('Chào mừng bạn đến với An Tâm')}><b>♙</b><span>Khách hàng An Tâm<small>Tài khoản</small></span></button>
      <button className="cart-shortcut" type="button" onClick={() => navigate('cart')}><span className="cart-icon">🛒<i>{cartCount}</i></span><span>Giỏ hàng</span></button>
    </div><nav className="shop-container shop-nav"><button onClick={() => navigate('home')} type="button">Trang chủ</button><button onClick={() => navigate('catalog')} type="button">Danh mục thuốc &amp; TPCN</button><button onClick={() => navigate('catalog')} type="button">Thuốc kê đơn (Rx)</button><button onClick={() => navigate('catalog')} type="button">Ưu đãi độc quyền</button><button onClick={() => navigate('catalog')} type="button">Cẩm nang sức khỏe &amp; Bệnh lý</button><button onClick={() => navigate('catalog')} type="button">Hệ thống 1.000+ Nhà thuốc</button><span className="source-indicator">ϟ GIAO SIÊU TỐC 2H</span></nav></header>

    <main className="shop-container shop-main">
      {page === 'home' && <>
        <section className="reference-hero"><div className="reference-promo"><span className="promo-label">✦ CHƯƠNG TRÌNH TẾT Y TẾ PHÒNG BỆNH 2025</span><h1>MÙA DỊCH BẢO VỆ GIA ĐÌNH</h1><p>Giảm đến 40% cho sản phẩm tăng đề kháng, Vitamin C tổng hợp &amp; máy đo bảo vệ sức khỏe chuẩn GPP.</p><div className="promo-actions"><button onClick={() => navigate('catalog')} type="button">Mua Ngay →</button><button onClick={() => setNotice('Mã voucher HEALTH50 đã sẵn sàng')} type="button">▣ Nhận Voucher 50K</button><small>♧ Áp dụng đơn từ 250K</small></div><div className="promo-shield">✚</div><div className="promo-pagination">━━ ••</div></div><aside className="quick-services"><button type="button" onClick={() => setNotice('Gửi đơn thuốc: dược sĩ sẽ gọi xác nhận')}><span className="service-icon violet">▧</span><span><b>Gửi Đơn Thuốc Chụp</b><small>Ưu tiên xử lý đơn lẻ miễn phí</small></span><i>›</i></button><button type="button" onClick={() => setNotice('Dược sĩ đang trực tuyến — gọi 1800 6821')}><span className="service-icon emerald">♧</span><span><b>Dược Sĩ Trực Tuyến</b><small>Hỗ trợ tư vấn thuốc &amp; triệu chứng</small></span><i>›</i></button><button type="button" onClick={() => setNotice('Giao siêu tốc 2 giờ tại khu vực áp dụng')}><span className="service-icon amber">ϟ</span><span><b>Giao Siêu Tốc 2 Giờ</b><small>Tỏa sáng kinh tuyến Khỏe Bộ Y Tế</small></span><i>›</i></button></aside></section>
        <section className="reference-categories"><div className="reference-section-heading"><div><small>DANH MỤC KHUYẾN NGHỊ</small><h2>Tìm Kiếm Nhanh Theo Nhu Cầu Sức Khỏe</h2></div><button onClick={() => navigate('catalog')} type="button">Tất cả chuyên mục ›</button></div><div className="reference-category-list">{categories.map(([symbol,name,tone])=><button key={name} onClick={() => { setCategory(name); navigate('catalog') }} type="button"><span className={`reference-category-icon ${tone}`}>{symbol}</span><b>{name}</b></button>)}</div></section>
        <section className="flash-sale"><div className="flash-heading"><h2>⏱ GIỜ VÀNG GIÁ SỐC <span>04 · 12 · 27</span></h2><small>◷ Khung giờ tiếp theo bắt đầu lúc 16:00 Hôm nay</small></div><div className="reference-product-row">{flashProducts.map((product,index)=><ReferenceProduct key={product.name} product={product} badge={index===2?'−20%':'−10%'} onAdd={() => { const found=products.find(p=>p.name.toLowerCase().includes(product.name.split(' ')[0].toLowerCase())) || products[index%products.length]; addToCart(found) }} onOpen={() => showProduct({ ...product, id:100+index, stock:50, category:'Dược phẩm chính hãng', pack:'Hộp sản phẩm', tone:'blue', symbol:'✚' })}/>)}</div></section>
        <section className="rx-banner"><div className="rx-symbol">▤</div><div><small>ⓘ QUY ĐỊNH CỦA BỘ Y TẾ VỀ NHÀ THUỐC BÁN THUỐC ĐƠN (RX)</small><h2>Thuốc Kê Đơn Bắt Buộc Cần Có Chỉ Định Của Bác Sĩ</h2><p>Theo Thông tư số 52/2017/TT-BYT, các nhóm thuốc đặc trị, kháng sinh, huyết áp - tim mạch, thần kinh chỉ được bán khi có đơn thuốc hợp lệ. Quý khách vui lòng tải đơn hoặc chụp hồ sơ bệnh viện để dược sĩ An Tâm kiểm tra và tư vấn chuyên môn kỹ thuật.</p><button onClick={() => setNotice('Gửi ảnh đơn thuốc để dược sĩ kiểm tra')} type="button">▧ Tải đơn hoặc đặt Dược sĩ liên hệ xác nhận</button><button className="rx-call" onClick={() => setNotice('Dược sĩ sẽ tư vấn qua hotline 1800 6821')} type="button">⌕ Tư vấn qua tổng đài miễn cước 1800 6821</button></div><div className="rx-watermark">▤</div></section>
        <section className="seasonal-section"><div className="reference-section-heading"><div><small>✳ SỰ LỰA CHỌN CỦA 500.000+ KHÁCH HÀNG</small><h2>Sản Phẩm Bán Chạy Theo Mùa</h2></div><div className="seasonal-chips"><button className="active" type="button">Tất cả</button><button type="button">Tăng sức đề kháng</button><button type="button">Tim mạch &amp; Huyết áp</button><button type="button">Xương khớp</button></div></div><div className="reference-product-row seasonal-row">{seasonalProducts.map((product,index)=><ReferenceProduct key={product.name} product={product} badge="100% Chính Hãng" onAdd={() => addToCart(products[index%products.length])} onOpen={() => showProduct({ ...product, id:200+index, stock:32, category:'Chăm sóc sức khỏe', pack:'Hộp sản phẩm', tone:'blue', symbol:'✚' })}/>)}</div></section>
        <section className="seasonal-disease-section"><div className="disease-shell"><div className="blue-section-heading"><h2>Nhóm bệnh theo mùa</h2><button onClick={() => document.getElementById('seasonal-diseases')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} type="button">Xem tất cả <span>→</span></button></div><div className="disease-grid" id="seasonal-diseases">{orderedDiseases.map(([name,image])=>{const guide=diseaseGuides.find((item)=>item.image===image);return <button className="disease-card" key={name} onClick={() => guide&&openDisease(guide)} type="button"><img src={image} alt=""/><span>{name}</span></button>})}</div><button className="disease-next" aria-label="Xem nhóm bệnh tiếp theo" onClick={() => setDiseaseOffset((diseaseOffset+1)%seasonalDiseases.length)} type="button">›</button></div></section>
        <section className="health-corner-section"><div className="health-corner-shell"><div className="blue-section-heading"><h2>Góc sức khỏe</h2><button onClick={() => setNotice('Thư viện bài viết sức khỏe An Tâm đang được cập nhật')} type="button">Xem tất cả <span>→</span></button></div><div className="health-tabs">{healthTopics.map((topic)=><button className={healthTopic===topic?'active':''} key={topic} onClick={() => setHealthTopic(topic)} type="button">{topic}</button>)}</div><div className="health-articles"><article className="health-feature"><button className="health-feature-image" onClick={() => setNotice('Bài viết đang được biên tập bởi đội ngũ dược sĩ An Tâm.')} type="button"><img src={healthFeature.image} alt=""/></button><button className="health-feature-title" onClick={() => setNotice('Bài viết đang được biên tập bởi đội ngũ dược sĩ An Tâm.')} type="button">{healthFeature.title}</button><p>Góc thông tin An Tâm chia sẻ kiến thức chăm sóc sức khỏe dễ hiểu. Nội dung chuyên môn sẽ được dược sĩ kiểm duyệt trước khi đăng.</p></article><div className="health-side-grid">{healthSideArticles.slice(0,4).map((article)=><article className="health-article-card" key={article.title}><button className="health-article-image" onClick={() => setNotice('Bài viết đang được biên tập bởi đội ngũ dược sĩ An Tâm.')} type="button"><img src={article.image} alt=""/></button><span>{article.category}</span><button className="health-article-title" onClick={() => setNotice('Bài viết đang được biên tập bởi đội ngũ dược sĩ An Tâm.')} type="button">{article.title}</button></article>)}</div></div></div></section>
        <section className="pharmacist-banner"><img src={pharmacistImage} alt="Dược sĩ An Tâm tư vấn tại nhà thuốc"/><div className="pharmacist-copy"><small>✥ ĐỘI NGŨ DƯỢC SĨ HỌC VỊ DƯỢC</small><h2>Tư Vấn Đúng Thuốc - Chuẩn Y Khoa Cho Cả Gia Đình</h2><p>Đội ngũ dược sĩ được đào tạo chuyên môn dược phẩm, hiểu rõ tương tác giữa các hoạt chất. Dược sĩ An Tâm đồng hành cùng bạn từ sớm, sẵn sàng kiểm tra toa thuốc, hướng dẫn liều dùng theo độ tuổi và thể trạng, bảo đảm an toàn cho cả gia đình.</p><div className="pharmacist-points"><span>✓ Kiểm tra tương tác thuốc ngay</span><span>✓ Tư vấn dược sĩ chuyên ngành</span><span>✓ Hướng dẫn liều dùng trẻ sơ sinh &amp; mẹ bầu</span><span>✓ Bảo mật hồ sơ bệnh nhân tuyệt đối</span></div><button onClick={() => setNotice('Đang kết nối trò chuyện với Dược sĩ')} type="button">▣ Trò chuyện cùng Dược sĩ ngay</button><a href="tel:18006821">☏ Gọi Hotline: 1800 6821 (Miễn cước)</a></div></section>
        <section className="promise-section"><div className="reference-section-heading centered"><div><small>UY TÍN VỮNG CHẮC TỪ 2012</small><h2>4 Cam Kết Vàng Vì Sức Khỏe Cộng Đồng</h2></div></div><div className="promise-grid">{[['⬡','100% Thuốc Chính Hãng','Nguồn gốc minh bạch, đầy đủ hồ sơ công bố và bảo quản nghiêm ngặt theo tiêu chuẩn chuẩn GPP.'],['▣','Đổi Trả Trong 30 Ngày','Hỗ trợ đổi trả minh bạch đối với thiết bị y tế và sản phẩm chăm sóc sức khỏe có lỗi từ nhà sản xuất.'],['▤','Dược Sĩ Tận Tâm 24/7','Tư vấn trung thực, đúng người đúng bệnh, không vì doanh số mà bỏ qua khuyến cáo của dược sĩ.'],['♙','Giao Hàng Kín Đáo Bảo Mật','Đóng gói riêng tư, bảo vệ thông tin và sản phẩm nhạy cảm của quý khách.']].map(([icon,title,desc])=><article key={title}><span>{icon}</span><b>{title}</b><p>{desc}</p></article>)}</div></section>
      </>}
      {page === 'disease' && <HealthDiseasePage disease={diseaseGuides.find((item)=>item.slug===diseaseSlug)} onHome={()=>navigate('home')} onDisease={openDisease}/>}
      {page === 'catalog' && <><div className="breadcrumbs"><button onClick={() => navigate('home')} type="button">Trang chủ</button><span>›</span> Danh mục sản phẩm</div><div className="catalog-heading"><div><span className="eyebrow">AN TÂM · SẢN PHẨM CHÍNH HÃNG</span><h1>{submittedQuery ? `Kết quả cho “${submittedQuery}”` : category}</h1><p>{visibleProducts.length} sản phẩm được chọn lọc bởi dược sĩ</p></div><select aria-label="Sắp xếp sản phẩm"><option>Sắp xếp: Phổ biến</option><option>Giá thấp đến cao</option><option>Giá cao đến thấp</option></select></div><div className="catalog-layout"><aside className="catalog-filters"><h3>Danh mục</h3>{['Tất cả sản phẩm', ...categories.map((item)=>item[1]), 'Giảm đau, hạ sốt'].map((item)=><button className={category===item?'filter-active':''} key={item} onClick={()=>setCategory(item)} type="button">{item}<span>›</span></button>)}<div className="filter-note"><b>✓ Sản phẩm chính hãng</b><p>Được kiểm duyệt bởi đội ngũ dược sĩ An Tâm.</p></div></aside><div className="catalog-products"><div className="catalog-filter-pills">{['Tất cả','Còn hàng','Chính hãng'].map((text)=><button key={text} type="button">{text}</button>)}</div><div className="product-grid">{visibleProducts.map((product)=><ProductCard key={product.id} product={product} onOpen={showProduct} onAdd={addToCart}/>)}</div>{visibleProducts.length===0&&<div className="empty-state">Chưa tìm thấy sản phẩm phù hợp. Hãy thử từ khóa khác nhé.</div>}</div></div></>}
      {page === 'detail' && selected && <><div className="breadcrumbs"><button onClick={() => navigate('home')} type="button">Trang chủ</button><span>›</span><button onClick={() => navigate('catalog')} type="button">Sản phẩm</button><span>›</span>{selected.name}</div><section className="detail-panel"><div className="detail-image"><ProductArt product={selected}/><span className="detail-seal">✓ CHÍNH HÃNG</span></div><div className="detail-info"><span className="eyebrow">{selected.category || 'DƯỢC PHẨM CHÍNH HÃNG'}</span><h1>{selected.name}</h1><div className="rating">★★★★★ <span>4.9 · Được dược sĩ khuyên dùng</span></div><div className="detail-price">{money(selected.price)}</div><p className="detail-desc">Sản phẩm chính hãng được lựa chọn kỹ lưỡng, bảo quản theo tiêu chuẩn nhà thuốc. Vui lòng đọc kỹ hướng dẫn sử dụng trước khi dùng.</p><div className="detail-meta"><div><span>Quy cách</span><b>{selected.pack}</b></div><div><span>Tình trạng</span><b className="stock-label">● {selected.stock > 0 ? 'Còn hàng' : 'Liên hệ nhà thuốc'}</b></div></div><div className="detail-actions"><button className="primary-button" onClick={() => addToCart(selected)} type="button">♧ Thêm vào giỏ hàng</button><a href="tel:18006821">♡ Tư vấn dược sĩ</a></div><div className="detail-assurance">✓ Giao nhanh · ✓ Hỗ trợ đổi trả · ✓ Dược sĩ tư vấn</div></div></section></>}
      {page === 'cart' && <><div className="breadcrumbs"><button onClick={() => navigate('home')} type="button">Trang chủ</button><span>›</span> Giỏ hàng</div><div className="cart-heading"><div><span className="eyebrow">PHARMA CARE</span><h1>Giỏ hàng của bạn</h1></div><span>{cartCount} sản phẩm</span></div>{cartItems.length ? <div className="cart-layout"><section className="cart-list">{cartItems.map((product)=><article className="cart-line" key={product.id}><button className="cart-product-art" onClick={()=>showProduct(product)} type="button"><ProductArt product={product}/></button><div className="cart-product-name"><b>{product.name}</b><span>{product.pack}</span><small>✓ Còn hàng · Chính hãng</small></div><div className="quantity-stepper"><button onClick={()=>changeQuantity(product.id,-1)} type="button">−</button><span>{product.quantity}</span><button onClick={()=>changeQuantity(product.id,1)} type="button">+</button></div><b className="line-price">{money(product.price * product.quantity)}</b><button className="remove-item" aria-label={`Xóa ${product.name}`} onClick={()=>changeQuantity(product.id,-product.quantity)} type="button">×</button></article>)}<button className="continue-shopping" onClick={()=>navigate('catalog')} type="button">← Tiếp tục mua sắm</button></section><aside className="order-summary"><h3>Tóm tắt đơn hàng</h3><div><span>Tạm tính ({cartCount} sản phẩm)</span><b>{money(total)}</b></div><div><span>Phí giao hàng</span><b className="free-shipping">Miễn phí</b></div><div className="summary-total"><span>Tổng cộng</span><b>{money(total)}</b></div><p>Đã bao gồm VAT (nếu có)</p><button className="primary-button" type="button" onClick={()=>setNotice('Tính năng đặt hàng sẽ sớm được kết nối với hệ thống')}>Tiến hành đặt hàng <span>→</span></button><small>🔒 Thông tin của bạn được bảo mật</small></aside></div> : <div className="empty-cart"><span>♧</span><h2>Giỏ hàng đang trống</h2><p>Hãy chọn sản phẩm phù hợp để chăm sóc sức khỏe gia đình.</p><button className="primary-button" onClick={()=>navigate('catalog')} type="button">Khám phá sản phẩm</button></div>}</>}
    </main>
    <footer className="shop-footer"><div className="shop-container footer-inner"><div><b>AN <span>TÂM</span></b><p>Nhà thuốc tận tâm vì sức khỏe cộng đồng.</p></div><div><b>Hỗ trợ khách hàng</b><a href="tel:18006821">Hotline 1800 6821</a><a href="#top">Chính sách giao hàng</a></div><div><b>Thông tin</b><a href="#top">Về An Tâm</a><a href="#top">Hệ thống nhà thuốc</a></div><div className="footer-gpp">✓ <span>Nhà thuốc đạt chuẩn<br/><b>GPP Bộ Y Tế</b></span></div></div><div className="shop-container footer-bottom"><span>© 2026 An Tâm. Chăm sóc sức khỏe bằng sự tận tâm.</span><button type="button" onClick={onAdmin}>Dành cho nhân viên · Quản trị kho →</button></div></footer>
    {notice&&<div className="shop-toast">✓ <span>{notice}</span><button onClick={()=>setNotice('')} type="button">×</button></div>}
  </div>
}

function ReferenceProduct({ product, badge, onAdd, onOpen }) { return <article className="reference-product"><button className="reference-product-photo" onClick={onOpen} type="button"><img src={product.image} alt={product.name} loading="lazy"/><span className="sale-badge">{badge}</span></button><small className="reference-brand">{product.brand}</small><button className="reference-product-name" onClick={onOpen} type="button">{product.name}</button><div className="reference-stars">★ 4.9 <small>(1.820 đánh giá)</small></div><div className="reference-price">{money(product.price)}</div><button className="reference-add" onClick={onAdd} type="button">♧ Thêm giỏ</button></article> }
function ProductArt({ product }) { return <div className={`product-art art-${product.tone || 'blue'}`}>{product.image ? <img src={product.image} alt={product.name} loading="lazy"/> : <><span className="art-glow"/><div className="product-box"><div className="box-top"/><div className="box-cross">{product.symbol || '✚'}</div><div className="box-copy"><b>{product.name.split(' ').slice(0,2).join(' ')}</b><small>{product.category || 'PHARMA CARE'}</small><i/></div></div><span className="art-leaf">✳</span></>}</div> }
function ProductCard({ product, onOpen, onAdd }) { return <article className="product-card"><button className="product-open" onClick={()=>onOpen(product)} type="button" aria-label={`Xem ${product.name}`}><ProductArt product={product}/></button>{product.tag&&<span className="product-tag">{product.tag}</span>}<div className="product-details"><span className="product-category">{product.category || 'Dược phẩm'}</span><button className="product-name" onClick={()=>onOpen(product)} type="button">{product.name}</button><span className="product-pack">{product.pack}</span><div className="product-rating"><span>★★★★★</span> <small>(128)</small></div><div className="product-buy"><b>{money(product.price)}</b><button onClick={()=>onAdd(product)} type="button" aria-label={`Thêm ${product.name} vào giỏ`}>＋</button></div></div></article> }
