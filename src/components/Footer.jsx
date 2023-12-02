import axios from '../api/axios';
import { useState, useEffect } from 'react'

const Footer = () => {
  const [ apiStatus, setAPIStatus ] = useState({'version': ''});

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchStatus = async () => {
      try {
        const rep = await axios.get('status', {signal: controller.signal });
        isMounted && setAPIStatus(rep.data);
      } catch (error) {
        if (error.response && error.response.status === 503) {
          isMounted && setAPIStatus(error.response.data);
        } else {
          isMounted && setAPIStatus({'status': 'offline', 'uptime': '', 'version': ''});
        }
      }
    }

    fetchStatus();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])

  return (
    <footer className='footer'>
      <div className='container'>
        <div className='d-flex flex-wrap justify-content-between align-items-center py-3 my-3 border-top'>
        <p className='col-md-4 mb-0 text-muted'>Made with &spades; by <a className='link-dark text-decoration-none' href="https://github.com/bbengfort">@bbengfort</a></p>
        <div className='col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto'>
          <img src="/logo192.png" height="32" width="32" />
        </div>
        <p className='col-md-4 text-end text-muted mb-0'>
          Cosmos API <span id="cosmos-api-version">v{apiStatus.version}</span>
        </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
