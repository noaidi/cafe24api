import type { PageServerLoad } from './$types'

import { CAFE24_MALL_ID, CAFE24_CLIENT_ID } from '$env/static/private';
import cafe24 from 'cafe24api-client';
import Products from 'cafe24api-client/front/endpoints/products'

const front = cafe24.Cafe24FrontAPIClient

export const load: PageServerLoad = async () => {
	front.use(Products)

	const client = new front({
		mallId: CAFE24_MALL_ID,
		clientId: CAFE24_CLIENT_ID
	});

	const { data } = await client.retrieveAListOfProducts({})
	return data
};
