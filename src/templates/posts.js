import * as React from 'react'
import { graphql } from 'gatsby'
import PostLayout from '../components/layouts/post';
import { CloudCannonConnect } from '@cloudcannon/react-connector'

const LiveEditingComponent = CloudCannonConnect(PostLayout);

const PostTemplate = (props) => {
  const node = props.data.page.nodes[0];
	const page = {
    ...node.frontmatter,
    contentHtml: node.html
  };
  const author = null;
  const nextPost = null;
	return (
		<LiveEditingComponent page={page} author={author} nextPost={nextPost} />
	)
}

export const query = graphql`
query ($id: String) {
  page: allMarkdownRemark(filter: {fields: {sourceName: {eq: "posts"}}, id: {eq: $id}}) {
    nodes {
      frontmatter {
        title
        date
        author_staff_member
        show_comments
        categories
      }
      html
    }
  }
}
`

export default PostTemplate