import React, { useState } from 'react';
import { Search, MapPin, Phone, Navigation, Radar, ShoppingCart, User, ChevronDown } from 'lucide-react';

export default function NightVisionDealerships() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('ALL REGIONS');
  const [hoveredCard, setHoveredCard] = useState(null);

  const dealers = [
    { id: 1, name: 'R MOBILE SECURITY', location: 'New Road, Kathmandu, Bagmati Province, Nepal', phone: '+977 01-4XXXXXX', status: 'AUTHORIZED', isPlatinum: true },
    { id: 2, name: 'AXE TECH SOLUTIONS', location: 'Lakeside, Pokhara, Gandaki Province, Nepal', phone: '+977 61-5XXXXXX', status: 'PLATINUM PARTNER', isPlatinum: true },
    { id: 3, name: 'VISIONARY SURVEILLANCE', location: 'Traffic Chowk, Butwal, Lumbini Province, Nepal', phone: '+977 71-5XXXXXX', status: 'AUTHORIZED', isPlatinum: false },
    { id: 4, name: 'NEPAL DEFENSE TECH', location: 'Main Road, Biratnagar, Koshi Province, Nepal', phone: '+977 21-4XXXXXX', status: 'AUTHORIZED' },
    { id: 5, name: 'CYBEREYE SYSTEMS', location: 'Jhamsikhel, Lalitpur, Bagmati Province, Nepal', phone: '+977 01-5XXXXXX', status: 'AUTHORIZED' },
    { id: 6, name: 'HIMALAYAN WATCHMEN', location: 'Birendranagar, Surkhet, Karnali Province, Nepal', phone: '+977 83-5XXXXXX', status: 'AUTHORIZED' }
  ];

 const filteredDealers = dealers.filter((dealer) => {
  const matchesSearch = dealer.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesRegion =
    selectedRegion === 'ALL REGIONS' ||
    dealer.location.includes(selectedRegion);

  return matchesSearch && matchesRegion;
});

  const keyframes = `
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
    @keyframes ping { 0% { opacity: 1; } 75%, 100% { opacity: 0; transform: scale(2); } }
  `;

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', fontFamily: 'Inter, sans-serif', minHeight: '100vh' }}>
      <style>{keyframes}</style>

      {/* Top App Bar */}

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '614px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        overflow: 'hidden',
        borderBottom: '1px solid #555',
        backgroundColor: '#000'
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.1) 50%)', backgroundSize: '100% 4px', pointerEvents: 'none' }}></div>

        {/* Crosshairs */}
        {[{ top: '32px', left: '32px' }, { top: '32px', right: '32px' }, { bottom: '32px', left: '32px' }, { bottom: '32px', right: '32px' }].map((pos, i) => (
          <span key={i} style={{ position: 'absolute', color: '#94da32', fontSize: '24px', fontWeight: 'bold', ...pos }}>+</span>
        ))}

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '56rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffb4ab', animation: 'pulse 2s infinite' }}></span>
            <span style={{ color: '#94da32', fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase' }}>SYSTEM LIVE: GLOBAL NETWORK</span>
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1, color: '#fff', textAlign: 'center' }}>OUR DEALER NETWORK</h1>
          <p style={{ fontSize: '18px', color: '#999', maxWidth: '42rem', margin: '0 auto 32px', lineHeight: 1.6, textAlign: 'center' }}>
             is expanding. Locate an authorized surveillance specialist near you or join our elite distribution network. Uncompromising vigilance starts here.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'center', alignItems: 'center' }}>
            <a href="#directory" style={{ backgroundColor: '#b5e75d', color: '#000', padding: '16px 48px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', border: 'none', cursor: 'pointer', textDecoration: 'none', fontSize: '14px', display: 'inline-block' }}>
              FIND A DEALER
            </a>
            <a href="#apply" style={{ border: '1px solid #94da32', color: '#94da32', padding: '16px 48px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', backgroundColor: 'transparent', cursor: 'pointer', textDecoration: 'none', fontSize: '14px', display: 'inline-block' }}>
              PARTNER WITH US
            </a>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '16px', right: '24px', fontSize: '12px', color: '#444' }}>
          LOC: 27.7172° N, 85.3240° E // NEPAL_OPS
        </div>
      </section>

      {/* Dealer Directory */}
      <section id="directory" style={{ padding: '80px 24px', maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ color: '#94da32', fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>AUTHORIZED PARTNERS</h2>
            <p style={{ color: '#999', fontSize: '16px' }}>Vetted installation and service experts across Nepal.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#555', width: '18px', height: '18px' }} />
              <input
                type="text"
                placeholder="SEARCH DEALERS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  backgroundColor: '#000',
                  border: '1px solid #444',
                  color: '#fff',
                  paddingLeft: '40px',
                  paddingRight: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  outline: 'none',
                  width: '100%',
                  maxWidth: '256px',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#94da32'}
                onBlur={(e) => e.target.style.borderColor = '#444'}
              />
            </div>

            <div style={{ position: 'relative', width: '100%', maxWidth: '192px' }}>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                style={{
                  backgroundColor: '#000',
                  border: '1px solid #444',
                  color: '#fff',
                  padding: '12px 30px 12px 16px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  outline: 'none',
                  width: '100%',
                  appearance: 'none',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#94da32'}
                onBlur={(e) => e.target.style.borderColor = '#444'}
              >
                <option>ALL REGIONS</option>
                <option>Koshi Province</option>
                <option>Madhesh Province</option>
                <option>Bagmati Province</option>
                <option>Gandaki Province</option>
                <option>Lumbini Province</option>
                <option>Karnali Province</option>
                <option>Sudurpashchim Province</option>
              </select>
              <ChevronDown style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#555', width: '16px', height: '16px' }} />
            </div>
          </div>
        </div>

        {/* Dealer Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {filteredDealers.map((dealer, idx) => (
            <div
              key={dealer.id}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: '#111',
                border: `1px solid ${hoveredCard === idx ? '#94da32' : '#333'}`,
                padding: '24px',
                position: 'relative',
                transition: 'all 0.3s',
                boxShadow: hoveredCard === idx ? '0 0 15px rgba(148, 218, 50, 0.3)' : 'none'
              }}
            >
              <div style={{ position: 'absolute', top: '0', right: '0', padding: '8px', fontSize: '10px', color: '#555' }}>
                {String(dealer.id).padStart(3, '0')}_AUTHORIZED
              </div>

              {dealer.isPlatinum && (
                <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#94da32' }}></span>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#94da32' }}>PLATINUM PARTNER</span>
                </div>
              )}

              <h3 style={{ color: '#94da32', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', marginTop: dealer.isPlatinum ? '16px' : '0', textTransform: 'uppercase' }}>
                {dealer.name}
              </h3>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                <MapPin size={18} style={{ color: '#555', flexShrink: 0, marginTop: '4px' }} />
                <p style={{ color: '#999', fontSize: '14px' }}>{dealer.location}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '24px' }}>
                <Phone size={18} style={{ color: '#555', flexShrink: 0, marginTop: '4px' }} />
                <p style={{ color: '#999', fontSize: '14px' }}>{dealer.phone}</p>
              </div>

              <button
                style={{
                  width: '100%',
                  backgroundColor: dealer.isPlatinum ? '#94da32' : 'transparent',
                  borderColor: '#94da32',
                  color: dealer.isPlatinum ? '#000' : '#94da32',
                  border: '1px solid',
                  padding: '12px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.3s',
                  ...(hoveredCard === idx && !dealer.isPlatinum ? { backgroundColor: 'rgba(148, 218, 50, 0.1)' } : {})
                }}
              >
                GET DIRECTIONS <Navigation size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid #555', borderBottom: '1px solid #555', backgroundColor: '#111', overflow: 'hidden', position: 'relative' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div style={{ position: 'relative', zIndex: 10 }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>
              DOMINATING THE<br />
              <span style={{ color: '#94da32' }}>NEPALESE TERRAIN</span>
            </h2>
            <p style={{ fontSize: '18px', color: '#999', marginBottom: '32px', lineHeight: 1.6 }}>
              From the high mountain passes to the bustling urban centers, NV// hardware is deployed in the most demanding environments across the country.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ borderLeft: '2px solid #94da32', paddingLeft: '24px' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#94da32' }}>50+</div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em' }}>INSTALLATION HUBS</div>
              </div>
              <div style={{ borderLeft: '2px solid #94da32', paddingLeft: '24px' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#94da32' }}>24/7</div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em' }}>LOCAL SUPPORT</div>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', height: '400px', border: '1px solid #555', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1NTrgUfi7r729Nuok8DVlAC9KsIK1uc9Zyqyt2ZrKoxf68pU6QioqxO6z1Sk-k-UKLSIYpjnf2oDNT-XoDGJ23UJQK_exW8BNkgGi4xwqcn_2C1j70rt51KCi6ObuPB-ey9y1kleGn7me31h4h98sXiC_52CxFDUVWDH39cvSf6eujPyp-lvRy_5FDcuiEro3knUGwTkvOjq6wFFzQDwWYMlhNp6o9b5B7t8mmoFlBhyTKL1DozizXfcaSfDmq7JGidKVlUugDB_e"
              alt="Nepal map"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
            />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '128px', height: '128px' }}>
                <div style={{ position: 'absolute', inset: 0, border: '2px solid #94da32', borderRadius: '50%', animation: 'ping 2s infinite', opacity: 0.2 }}></div>
                <div style={{ position: 'absolute', inset: '16px', border: '1px solid rgba(148, 218, 50, 0.4)', borderRadius: '50%' }}></div>
                <Radar size={48} style={{ color: '#94da32', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
              </div>
            </div>
            <div style={{ position: 'absolute', top: '16px', left: '16px', fontSize: '12px', color: '#94da32', padding: '8px', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
              SIGNAL_STRENGTH: OPTIMAL
            </div>
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section id="apply" style={{ position: 'relative', padding: '80px 24px', overflow: 'hidden', backgroundColor: '#b5e75d' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, fontSize: '20vw', fontWeight: 'bold', opacity: 0.1, pointerEvents: 'none', userSelect: 'none', transform: 'translateY(-20%)', color: '#94da32' }}>
          DEALER
        </div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '80rem', margin: '0 auto', color: '#000' }}>
          <div style={{ maxWidth: '48rem' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1 }}>JOIN THE NIGHTVISION FORCE</h2>
            <p style={{ fontSize: '18px', marginBottom: '32px', fontWeight: 500, opacity: 0.8, lineHeight: 1.6 }}>
              Providing the hardware, training, and authority for Nepal's premier security providers. We don't just sell cameras; we build infrastructure for SURVEILLANCE.
            </p>

            {/* Steps */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '32px' }}>
              {[{ num: '01', label: 'Apply Online' }, { num: '02', label: 'Verification' }, { num: '03', label: 'Inventory Setup' }, { num: '04', label: 'Certified Status' }].map((step, i) => (
                <div key={i} style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: '24px', border: '1px solid rgba(0, 0, 0, 0.2)' }}>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>{step.num}</div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{step.label}</div>
                </div>
              ))}
            </div>

            <button style={{
              backgroundColor: '#000',
              color: '#94da32',
              padding: '20px 48px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              border: '1px solid #000',
              cursor: 'pointer',
              fontSize: '18px',
              transition: 'background-color 0.3s'
            }}>
              APPLY FOR DEALERSHIP
            </button>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '33%', height: '100%', opacity: 0.1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px', fontSize: '15rem', pointerEvents: 'none' }}>
          🔒
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}