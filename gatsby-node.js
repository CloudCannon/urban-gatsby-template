
exports.createPages = async function ({ actions, graphql }) {
	const { data } = await graphql(`
		query {
			allMarkdownRemark {
				edges {
					node {
						id
						fields {
							sourceName
						}
						parent {
							... on File {
								id
								name
							}
						}
					}
				}
			}
		}
	`)
	data?.allMarkdownRemark?.edges?.forEach((edge) => {
		const id = edge.node.id;
		const slug = edge.node.parent.name;
		const type = edge.node.fields.sourceName;

		let component;
		let url;
		switch (type) {
			case 'posts':
				component = require.resolve(`./src/templates/posts.js`);
				url = `/blog/${slug}`;
				break;
			case 'clients':
				component = require.resolve(`./src/templates/clients.js`);
				url = `/${type}/${slug}`;
				break;
			default:
				return;
		}
		actions.createPage({
			path: url,
			component: component,
			context: { slug: slug, id: id },
		});
	});
}