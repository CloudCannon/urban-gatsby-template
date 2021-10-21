module.exports = {
  siteMetadata: {
    title: "My Gatsby Site",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `clients`,
        path: `${__dirname}/content/clients`,
        ignore: [`**/_*`, `**/\.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/pages`,
        ignore: [`**/_*`, `**/\.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
        ignore: [`**/_*`, `**/\.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `staff-members`,
        path: `${__dirname}/content/staff-members`,
        ignore: [`**/_*`, `**/\.*`],
      },
    },
    'gatsby-source-filesystem-markdown-name',
    `gatsby-transformer-remark`,
  ],
}