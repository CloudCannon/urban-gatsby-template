import * as React from 'react'
import { graphql } from 'gatsby'
import PageLayout from '../../components/layouts/page';
import PostSummary from '../../components/post-summary';
import { CloudCannonConnect } from '@cloudcannon/react-connector'

const LiveEditingComponent = CloudCannonConnect(PageLayout);

const BlogListPage = (props) => {
	const page = props.data.page.nodes[0].frontmatter;
	const posts = props.data.posts.nodes.map((post) => ({
		...post.frontmatter,
		slug: post.parent.name
	  }));

	return (
	<LiveEditingComponent page={page}>
		<section className="diagonal">
		<div className="text-container">
			<p className="editor-link"><a href="cloudcannon:collections/content/posts" className="btn"><strong>&#9998;</strong> Add Post</a></p>
			<ul className="blog-posts">
				{posts.map((post, i) => (
					<li className="blog-post" key={i}>
						<PostSummary post={post} />
					</li>
				))}
			</ul>
		</div>
		</section>
    </LiveEditingComponent>
	)
}

export const query = graphql`
  query {
    posts: allMarkdownRemark(filter: {fields: {sourceName: {eq: "posts"}}}) {
      nodes {
        frontmatter {
          title
          date
          author_staff_member
          show_comments
          categories
        }
        parent {
          ... on File {
            name
          }
        }
        excerpt
      }
    }
    page: allMarkdownRemark(filter: {fields: {sourceName: {eq: "pages"}}, fileAbsolutePath: {regex: "/.*content\\/pages\\/blog/"}}) {
      nodes {
        frontmatter {
			title
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

export default BlogListPage