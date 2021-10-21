import * as React from 'react'
import { Link } from 'gatsby'
import data from '../../lib/data';


export default function Navigation({ children, page }) {
	return (
        <>
        <nav>
            <a className="nav-toggle" id="open-nav" href="#">&#9776;</a>
            <ul>
                {data.navigation.links.map((link, i) => (
                    <li key={i}>
                        <Link to={ `${data.site.baseurl}${link.link}` } className={page?.slug?.toLowerCase() === link.name.toLowerCase()  ? 'active' : ''}>
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
        <p className="editor-link" style={{textAlign: 'right'}}><a href="cloudcannon:data/data/navigation.json" className="btn"><strong>&#9998;</strong> Edit Navigation</a></p>
    </>
	);
}
