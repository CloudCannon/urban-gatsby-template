import * as React from 'react'
import { graphql } from 'gatsby'
import PostLayout from '../components/layouts/post';

const PostTemplate = (props) => {
  const node = props.data.page.nodes[0];
  console.log(props)
	const page = {
    ...node.frontmatter,
    contentHtml: node.html
  };
  const author = null;
  const nextPost = null;
	return (
		<PostLayout page={page} author={author} nextPost={nextPost} />
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