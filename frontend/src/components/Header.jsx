import React from 'react';

function Header() {
  return (
    <header style={{backgroundColor: 'var(--color-primary)', color: '#fff', padding: 'var(--space-16)'}}>
      <h1 style={{margin: 0, fontSize: '1.5rem', fontWeight: 600}}>
        MedLens
      </h1>
    </header>
  );
}

export default Header;
