import React from 'react';
import { Container } from 'common-ui';
import './Footer.scss';

const Footer = () => (
  <section className="footer">
    <Container className="footer-container">
      <p className="footer-text footer-text-desktop">
        Copyright © 2020 &nbsp;&nbsp;|&nbsp;&nbsp;
        <strong>Danny Pham</strong>
        &nbsp;&nbsp;|&nbsp;&nbsp; All right reserved.
      </p>

      <p className="footer-text footer-text-mobile">
        Copyright © 2020 &nbsp;&nbsp;|&nbsp;&nbsp;by&nbsp;
        <strong>Danny Pham</strong>
        &nbsp;&nbsp;|&nbsp;&nbsp; All right reserved.
      </p>
    </Container>
  </section>
);

export default Footer;
