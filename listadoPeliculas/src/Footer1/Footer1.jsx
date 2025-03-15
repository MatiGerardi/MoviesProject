import './Footer1.css'
import Social from './Social/Social.jsx'

function Footer1() {
  return (
    <div className='footer-container'>
      <div className="footer-wrapper">

        <Social></Social>

        <div className="footer-copyright">
          <p>©2025 GerardiMatias, Inc. All rights reserved.</p>
          <p>Privacy Policy.</p>
          <p>Terms of Use.</p>
        </div>
      </div>
    </div>
  );
}
export default Footer1;
