const path = require('path');

const ROOT_PATH = path.resolve(__dirname, './src');

module.exports = {
  siteMetadata: {
    title: 'Phamtastic · Software Engineer',
    author: 'Phamtastic',
    description: "Phamtastic's Portfolio",
    url: 'https://phamtastic.netlify.com',
    image: '/screenshot.png',
    siteUrl: 'https://phamtastic.netlify.com',
  },
  plugins: [
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        pages: path.join(__dirname, 'src/pages'),
        images: path.join(__dirname, 'src/images'),
        'common-ui': path.join(__dirname, 'src/components/commons/CommonUI.jsx'),
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${ROOT_PATH}/data/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${ROOT_PATH}/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
};
