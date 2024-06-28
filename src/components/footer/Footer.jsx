import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import PropTypes from "prop-types";

const Footer = ({ theme }) => {
  return (
    <footer className={`footer ${theme}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="footer-section">
              <span className="footer-title">Encontranos en:</span>
              <a href="#" className="social-link">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="social-icon mr-3"
                  size="2x"
                />
                <span className="social-name">Facebook</span>
              </a>
              <a href="#" className="social-link">
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="social-icon mr-3"
                  size="2x"
                />
                <span className="social-name">Twitter</span>
              </a>
              <a href="#" className="social-link">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="social-icon mr-3"
                  size="2x"
                />
                <span className="social-name">Instagram</span>
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <div className="footer-section">
              <span className="footer-title">Mapa:</span>
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26051.4642513549!2d-60.66689535066436!3d-32.94404496793378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b43d0403eb0c61%3A0xa6180c65b9cb41fd!2sRosario%2C%20Santa%20Fe!5e0!3m2!1sen!2sar!4v1649247419818!5m2!1sen!2sar"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <div className="footer-section">
              © Augusto Camani, Fernando Rodriguez
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default Footer;
