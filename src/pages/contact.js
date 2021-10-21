import * as React from 'react'
import { graphql } from 'gatsby'
import ContactPageComponents from '../components/pages/contact'
import { CloudCannonConnect } from '@cloudcannon/react-connector'

const ContactPage = (props) => {
	const page = props.data.page.nodes[0].frontmatter;

	const LiveEditingComponent = CloudCannonConnect(ContactPageComponents);
	return <LiveEditingComponent page={ page } />
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
    page: allMarkdownRemark(filter: {fields: {sourceName: {eq: "pages"}}, fileAbsolutePath: {regex: "/.*content\\/pages\\/contact.md/"}}) {
      nodes {
        frontmatter {
			title
			subtext_html
			heading
			subtitle
			map { 
			  latitude
			  longitude
			  address
			  zoom
			}
        }
      }
    }
  }
`

export default ContactPage