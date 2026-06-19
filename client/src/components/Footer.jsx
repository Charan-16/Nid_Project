import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="brand-mark">NID</div>
          <div>
            <strong>NID Bengaluru</strong>
            <small>R&D Campus</small>
          </div>
        </div>
        
        <div className="footer-links">
          <h4>Campus Resources</h4>
          <ul>
            <li><a href="#">Academic Calendar</a></li>
            <li><a href="#">Library Portal</a></li>
            <li><a href="#">IT Support</a></li>
            <li><a href="#">Campus Safety</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p><MapPin size={14} /> 12th H Main Rd, Peenya ITI Area, Bengaluru, 560058</p>
          <p><Phone size={14} /> +91 80 2337 3006</p>
          <p><Mail size={14} /> info@nid.edu</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} National Institute of Design, Bengaluru. All rights reserved.</p>
      </div>
    </footer>
  );
}
