import * as React from 'react'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import data from '../../../lib/data';
import Icon from '../icon';
import Navigation from '../navigation';

export default function DefaultLayout({ children, page }) {
	const title = page.title ? `${page.title} | ${data.seo.site_title}` : data.seo.site_title;
	const description = page.description || data.seo.description;

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>{ title }</title>
				<link rel="apple-touch-icon" href={`${data.site.baseurl}/apple-touch-icon.png`} />
				<link rel="icon" type="image/png" href={`${data.site.baseurl}/touch-icon.png`} sizes="192x192" />
				<link rel="icon" type="image/png" href={`${data.site.baseurl}/images/favicon.png`} />
				<meta name="robots" content="index,follow" />
				<meta name="googlebot" content="index,follow" />
				<meta name="description" content={description} />
				<meta property="og:url" content={data.site.url} />
				<meta property="og:title" content={ title } />
				<meta property="og:description" content={description} />
				<meta property="og:site_name" content={data.seo.site_name} />
			
				{ data.site.google_analytics_key &&
					<>
						<script
							dangerouslySetInnerHTML={{
								__html: `
									window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
									ga('create', '${data.site.google_analytics_key}', 'auto');
									ga('send', 'pageview');
								`,
							}}
						/>
						<script async src={'https://www.google-analytics.com/analytics.js'}/>
					</>
				}

			</Helmet>

            <header>
                <div className="container">
                    <h1 className="company-name"><Link to={`${data.site.baseurl || "/"}`}><img src={`${data.site.baseurl}/images/logo.svg`} alt="Urban" width="150"/></Link></h1>
                    <Navigation  page={page}/>
                </div>
            </header>

            {children}
            
			<footer className="diagonal">
				<div className="container">
					<p className="editor-link"><a href="cloudcannon:data/data/footer.json" className="btn"><strong>&#9998;</strong> Edit Footer</a></p>
					<div className="footer-columns">
						{data.footer.map((column) => (
							<ul className="footer-links" key={column.title}>
								<li>
									<h2>{column.title}</h2>
								</li>

								{column.links.map((link) => (
									<li key={link.name}>
										{ link.new_window &&
											<a href={link.link} target={link.new_window ? '_blank' : '_self'} rel="noreferrer">
												{link.social_icon && <Icon icon={link.social_icon} />} {link.name}
											</a>
										}
										{ !link.new_window &&
											<Link to={link.link}>
												{link.social_icon && <Icon icon={link.social_icon} />} {link.name}
											</Link>
										}
									</li>
								))}
							</ul>
						))}

						<ul className="footer-links">
							<li>
								<h2>{data.company.site_title}</h2>
							</li>
							<li>{data.company.description}</li>
							<li>
								<Link to={`${data.site.baseurl}/feed.xml`}><Icon icon="RSS" /> Subscribe with RSS</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="legal-line">
					<p className="container">
						&copy; {new Date().getFullYear()} {data.company.site_title} &bull; Template by <Link to="https://cloudcannon.com/">CloudCannon</Link>
					</p>
				</div>
			</footer>
		</>
	);
}
