import * as React from 'react'
import PostTitle from './post-title';
import data from '../../lib/data';
import { Link } from 'gatsby'

export default function PostSummary({ post }) {
	return (
		<>
			<h3><Link to={ `${data.site.baseurl}/blog/${post.slug}` }>{ post.title }</Link></h3>
			<PostTitle post={post}/>
			<div className="post-content">
				<p>{ post.excerptHtml }</p>
				<p><Link to={ `${data.site.baseurl}/blog/${post.slug}` }>Read More &rarr;</Link></p>
			</div>
		</>
	);
}





