import * as React from 'react'
import { graphql } from 'gatsby'
import PageLayout from '../components/layouts/page';
import StaffMember from '../components/staff';

const AboutPage = ({ data }) => {
	const page = data.page.nodes[0].frontmatter;
	const staffMembers = data.staffMembers.nodes.map((client) => ({
    ...client.frontmatter,
    slug: client.parent.name
  }));

	return (
		<PageLayout page={page}>
      <section className="diagonal patterned">
        <div className="container">
            <p className="editor-link" style={{textAlign:'center'}}><a href="cloudcannon:collections/content/staff-members/" className="btn"><strong>&#9998;</strong>Manage Staff members</a></p>
          <ul className="image-grid">
              {staffMembers.slice(0,2).map((staff, i) => (
                <li key={i}><StaffMember staff={staff} /></li>
              ))}
          </ul>
        </div>
      </section>
    </PageLayout>
	)
}

export const query = graphql`
  query {
    staffMembers: allMarkdownRemark(filter: {fields: {sourceName: {eq: "staff-members"}}}) {
      nodes {
        frontmatter {
          name
          image_path
          position
          twitter
        }
        parent {
          ... on File {
            name
          }
        }
      }
    }
    page: allMarkdownRemark(filter: {fields: {sourceName: {eq: "pages"}}, fileAbsolutePath: {regex: "/.*content\\/pages\\/about/"}}) {
      nodes {
        frontmatter {
          title
          name
          subtitle
          external_url
          image_path
          heading
          subtext_html
          portfolio_heading
          portfolio_description_html
          portfolio_call_to_action
          date
          author_staff_member
          show_comments
          position
          twitter
          _component_type
          post
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

export default AboutPage