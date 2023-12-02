import api from '../api';
import { useState, useEffect } from 'react'

const Footer = () => {
  const [ apiStatus, setAPIStatus ] = useState({'version': ''});

  useEffect(() => {
    const fetchStatus = async () => {
      const rep = await api.get("/status");
      if (rep.status == 200) {
        setAPIStatus(rep.data);
      }
    }

    fetchStatus();
  }, [])

  return (
    <div className='container'>
      <footer className='d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top'>
        <p className='col-md-4 mb-0 text-muted'>Made with &spades; by <a className='link-dark text-decoration-none' href="https://github.com/bbengfort">@bbengfort</a></p>
        <div className='col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto'>
          <img src="/logo192.png" height="32" width="32" />
        </div>
        <p className='col-md-4 text-end text-muted mb-0'>
          Cosmos API <span id="cosmos-api-version">v{apiStatus.version}</span>
        </p>
      </footer>
    </div>
  )
}

export default Footer;
