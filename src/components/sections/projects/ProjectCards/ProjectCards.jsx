import React, { useState, useCallback, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import classnames from 'classnames';
import { Container } from 'common-ui';
import { window } from 'utils/SSR';
import ScrollSpyEffect from 'utils/ScrollSpyEffect';

import decoratorImg from 'images/temp-background.png';

import gradecalculatorImg from 'images/project-gradecalculator.png';
import autoenrollImg from 'images/project-autoenroll.png';
import flaskblogImg from 'images/project-flaskblog.png';

import styles from './ProjectCards.module.scss';

const CARD_IMAGES = {
  gradecalculator: gradecalculatorImg,
  autoenroll: autoenrollImg,
  flaskblog: flaskblogImg,
};

const renderCards = (data) => {
  const projects = data.allProjectsJson.nodes;

  return projects.map((project, i) => (
    <div key={project.name} className={styles.projectCardsCol}>
      <div className={styles.card}>
        <section className={`${styles.cardHeader} ${styles[`colorCard${i + 1}`]}`}>
          <h1 className={styles.cardTitle}>
            {project.title}
          </h1>
          <div className={styles.cardImage} style={{ backgroundImage: `url(${CARD_IMAGES[project.name]})` }} />
        </section>
        <section className={styles.cardDesc}>
          <p className={styles.cardText}>
            {project.text}
          </p>
          <div className={styles.cardTags}>
            {project.tags.map(tag => (<span key={tag} className={styles.cardTag}>{tag}</span>))}
          </div>
        </section>
        <section className={styles.btnGroup}>
          {
            project.links.map(link => (
              <a className={styles.iconBtn} key={link.icon} href={link.link} target="_blank" rel="noreferrer noopener">
                <i className={`fa fa-${link.icon} ${styles[link.icon]}`} aria-hidden="true" />
              </a>
            ))
          }
        </section>
      </div>
    </div>
  ));
};

const ProjectCards = () => {
  const [windowPos, setWindowPos] = useState(window.innerHeight);
  const [cardsPos, setCardsPos] = useState(window.innerHeight + 100);
  const cardsRef = useCallback((node) => {
    if (node !== null) {
      setCardsPos(node.getBoundingClientRect().top);
    }
  }, []);

  useEffect(ScrollSpyEffect((viewport) => {
    setWindowPos(viewport);
  }), []);

  const isVisible = cardsPos < windowPos;
  const data = useStaticQuery(graphql`
  query {
    allProjectsJson {
      nodes {
        links {
          icon
          link
        }
        name
        title
        tags
      }
    }
  }
`);

  return (
    <section className={styles.projectCardsWrapper}>
      <Container ref={cardsRef} className={classnames(styles.projectCards, isVisible ? styles.fadeIn : '')}>
        {renderCards(data)}
      </Container>

      <div className={styles.decoratorImg}>
        <img src={decoratorImg} alt="decorator" />
      </div>
    </section>
  );
};

export default ProjectCards;
