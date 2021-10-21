import * as React from 'react'
import { graphql } from 'gatsby'
import HomePageComponents from '../components/pages/index';
import { CloudCannonConnect } from '@cloudcannon/react-connector'

const HomePage = (props) => {
	const page = props.data.page.nodes[0].frontmatter;
	const clients = props.data.clients.nodes.map((client) => ({
		...client.frontmatter,
		slug: client.parent.name
	  }));

	const LiveEditingComponent = CloudCannonConnect(HomePageComponents);
	return <LiveEditingComponent page={page} clients={clients}/>
}

export const query = graphql`
  query {
    clients: allMarkdownRemark(filter: {fields: {sourceName: {eq: "clients"}}}) {
      nodes {
        frontmatter {
          name
          subtitle
          external_url
          image_path
        }
        parent {
          ... on File {
            name
          }
        }
      }
    }
    page: allMarkdownRemark(filter: {fields: {sourceName: {eq: "pages"}}, fileAbsolutePath: {regex: "/.*content\\/pages\\/index/"}}) {
      nodes {
        frontmatter {
			title
			subtext_html
			heading
			subtitle
			portfolio_heading
			portfolio_description_html
			portfolio_call_to_action
        }
      }
    }
  }
`

export default HomePage