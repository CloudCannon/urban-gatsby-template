import * as React from 'react'
import { graphql } from 'gatsby'
import ClientLayout from '../components/layouts/client';
import { CloudCannonConnect } from '@cloudcannon/react-connector'

const LiveEditingComponent = CloudCannonConnect(ClientLayout);

const ClientTemplate = (props) => {
  const data = props.data;
  const page = data.page.nodes[0].frontmatter;
  const portfolio = data.portfolio.nodes[0].frontmatter;

	return (
		<LiveEditingComponent page={page} portfolio={portfolio}/>
	)
}

export const query = graphql`
  query ($id: String) {
    page: allMarkdownRemark(filter: {fields: {sourceName: {eq: "clients"}}, id: {eq: $id}}) {
      nodes {
        frontmatter {
          name
          subtitle
          external_url
          image_path
        }
        html
      }
    }
    portfolio: allMarkdownRemark(filter: {fields: {sourceName: {eq: "pages"}}, fileAbsolutePath: {regex: "/.*content\\/pages\\/portfolio/"}}) {
      nodes {
        frontmatter {
          title
          heading
          subtitle
        }
      }
    }
  }
`

export default ClientTemplate