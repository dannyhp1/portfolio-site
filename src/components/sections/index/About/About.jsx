import React, { useEffect, useState, useCallback } from 'react';
import classnames from 'classnames';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { window } from 'utils/SSR';
import ScrollSpyEffect from 'utils/ScrollSpyEffect';

import { Container, Button } from 'common-ui';
import profileImage from 'images/profile.jpg';
import nasaIcon from 'images/icon-nasa.png';
import flexportIcon from 'images/icon-flexport.png';
import amazonIcon from 'images/icon-amazon.png';
import schoolIcon from 'images/icon-school.png';

import styles from './About.module.scss';

const ICONS = {
  nasa: nasaIcon,
  flexport: flexportIcon,
  amazon: amazonIcon,
  school: schoolIcon,
};

const renderIconCards = (data) => {
  const icons = data.allAboutMeIconJson.nodes;
  return icons.map((icon, i) => (
    <div key={icon.name} className={classnames(styles.card, styles[`card${i + 1}`])}>
      <div className={styles.iconWrapper}>
        <img width="100%" src={ICONS[icon.name]} alt={`icon-${icon.name}`} />
      </div>

      <p className={styles.cardTitle}>
        {icon.title}
      </p>
      <p className={styles.cardText}>
        {icon.text}
      </p>
    </div>
  ));
};

const About = () => {
  const [windowTop, setWindowTop] = useState(window.innerHeight);
  const [contentPos, setContentPos] = useState(window.innerHeight + 100);
  const [cardsPos, setCardsPos] = useState(window.innerHeight + 100);

  const contentRef = useCallback((node) => {
    if (node !== null) {
      setContentPos(node.getBoundingClientRect().top);
    }
  }, []);

  const cardsRef = useCallback((node) => {
    if (node !== null) {
      setCardsPos(node.getBoundingClientRect().top);
    }
  }, []);

  useEffect(ScrollSpyEffect((viewport) => {
    setWindowTop(viewport);
  }), []);

  const isContentVisible = contentPos < windowTop;
  const isCardsVisible = cardsPos < windowTop;

  const data = useStaticQuery(graphql`
    query AboutMeIconQuery {
      allAboutMeIconJson {
        nodes {
          name
          title
          text
        }
      }
    }
  `);


  return (
    <main>
      <section>
        <Container className={styles.about}>
          <div className={classnames(styles.aboutMe, isContentVisible ? styles.fadeIn : '')} ref={contentRef}>
            <div className={styles.aboutMeImage}>
              <img src={profileImage} alt="profile" />
            </div>

            <div className={styles.aboutMeContent}>
              <h3 className={styles.title}>
                About Me
              </h3>

              <p className={styles.text}>
                  Hello! My name is Danny Pham.
                  I call many places home. I am from Palm Springs, studied in
                  Irvine and now live in Los Angeles.
                  Making new things with large, positive impact,
                  no matter the medium, sparks my passion.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container ref={cardsRef} className={classnames(styles.cards, isCardsVisible ? styles.fadeIn : '')}>
          {renderIconCards(data)}
        </Container>
      </section>

      <section>
        <Container className={styles.btnContainer}>
          <Link to="/projects">
            <Button>
              See my projects
            </Button>
          </Link>
        </Container>
      </section>
    </main>
  );
};

export default About;
