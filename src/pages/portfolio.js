import * as React from 'react'
import { graphql, Link } from 'gatsby'
import PageLayout from '../components/layouts/page';
import data from '../../lib/data';
import { CloudCannonConnect } from '@cloudcannon/react-connector'

const LiveEditingComponent = CloudCannonConnect(PageLayout);

const PortfolioPage = (props) => {
	const page = props.data.page.nodes[0].frontmatter;
	const clients = props.data.clients.nodes.map((client) => ({
		...client.frontmatter,
		slug: client.parent.name
	  }));

	return (
		<LiveEditingComponent page={page}>
			<section className="diagonal patterned">
			<div className="container">
				<p className="editor-link" style={{textAlign:'center'}}><a href="cloudcannon:collections/content/clients/" className="btn"><strong>&#9998;</strong> Manage Clients</a></p>
				<ul className="image-grid">
					{clients.map((client, i) => (
						<li key={i}>
						<Link to={`${data.site.baseurl}/clients/${client.slug}`}>
							<img src={client.image_path.replace(/^\/src\//, '/')} alt={ client.name }/>
							<div className="details">
							<div className="name">{ client.name }</div>
							<div className="position">{ client.subtitle }</div>
							</div>
						</Link>
						</li>
					))}
				<li className="filler"></li>
				<li className="filler"></li>
				</ul>
			</div>
			</section>
		</LiveEditingComponent>
	)
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
    page: allMarkdownRemark(filter: {fields: {sourceName: {eq: "pages"}}, fileAbsolutePath: {regex: "/.*content\\/pages\\/portfolio/"}}) {
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

export default PortfolioPage