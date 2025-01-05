import type { RequestHandler } from '@sveltejs/kit';

import { CAFE24_MALL_ID, CAFE24_CLIENT_ID } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit'

const cafe24api = `https://${CAFE24_MALL_ID}.cafe24api.com/api/v2`
const api = {
	auth: `${cafe24api}/oauth/authorize`,
	token: `${cafe24api}/oauth/token`,
}

const scopes = [
	'mall.read_application',
	'mall.write_application',
	'mall.read_product',
];

export const GET: RequestHandler = ({ url }) => {
	const params = url.searchParams

	if (params.get('state') !== 'install') {
		throw error(400, 'invalid params: state');
	}

	const code = params.get('code')
	if (!code) {
		throw error(400, 'invalid params: code');
	}

	return new Response(JSON.stringify({
		code: params.get('code'),
	}), {
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

export const POST: RequestHandler = async ({ request }) => {
	throw redirect(302, `${api.auth}?`+
		(new URLSearchParams({
			response_type: 'code',
			client_id: CAFE24_CLIENT_ID,
			state: 'install',
			redirect_uri: request.url,
			scope: scopes.join(','),
		}).toString()))
};
