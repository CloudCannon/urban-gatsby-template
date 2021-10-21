import * as React from 'react'
import DefaultLayout from './default';

import '../../../styles/main.scss';

export default function PageLayout({ children, page }) {
	const title = page.heading ?  page.heading  : page.title;
	return (
		<DefaultLayout page={page}>
            <section className="hero diagonal">
                <div className="container">
                { title &&
                    <h2>{ title }</h2>
                }
                { page.subtitle &&
                    <p className="subtext">{ page.subtitle }</p>
                }
                { page.subtext_html &&
			        <div className="subtext" dangerouslySetInnerHTML={{ __html: page.subtext_html }} />
                }
                </div>
            </section>
            {children}
		 </DefaultLayout>
	);
}
