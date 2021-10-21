import * as React from 'react'
import { Link } from 'gatsby'
import PageLayout from '../layouts/page';
import data from '../../../lib/data';
import {useEffect, useRef} from 'react';
import {Loader} from '@googlemaps/js-api-loader';

const ContactPageComponents = ({ page }) => {
	const googlemap = useRef(null);
	useEffect(() => {
		const loader = new Loader({
			apiKey: data.site.google_maps_javascript_api_key,
			version: 'weekly',
		});
		loader.load().then(() => {
			new window.google.maps.Map(googlemap.current, {
				center: {lat: page.map.latitude, lng: page.map.longitude},
				zoom: page.map.zoom,
			});
		});
	});

	return (
		<PageLayout page={page}>
			<section className="diagonal">
				<div className="container">
					<form action={`${data.site.baseurl}/contact-succes`} method="post" className="contact-form">
					<input type="hidden" name="_to" value={data.company.contact_email_address} />
					<input type="text" name="_gotcha" style={{display: 'none'}} />

					<div className="halves">
						<div>
						<label htmlFor="name">First Name</label>
						<input type="text" name="first-name" id="first-name" placeholder="John" />
						</div>

						<div>
						<label htmlFor="name">Last Name</label>
						<input type="text" name="last-name" id="last-name" placeholder="Doe" />
						</div>
					</div>

					<label htmlFor="email">Email Address</label>
					<input type="email" name="email" id="email" placeholder="john@example.com" required />

					<label htmlFor="message">Message</label>
					<textarea name="message" id="message" placeholder="Hi There..."></textarea>

					<input type="submit" value="Send Message" />
					</form>
				</div>
				</section>

			<section className="diagonal map">
				<div id="map" ref={googlemap}></div>
			</section>

			<section className="diagonal">
				<div className="container halves aligned-top">
				<div>
					<h3>Address</h3>
					<address>
						<a target="_blank" href={"https://www.google.com/maps/place/" + encodeURIComponent(page.map.address) } rel="noreferrer" 
						dangerouslySetInnerHTML={{ __html: page.map.address.replace(/,/g, ",</br>")}} >
						</a>
					</address>
				</div>
				<div>
					<h3>Email</h3>
					<p><a href={"mailto:" + data.company.contact_email_address }>{ data.company.contact_email_address }</a></p>
				</div>
				</div>
			</section>
		</PageLayout>
	)
}

export default ContactPageComponents
