import type { RequestHandler } from '@sveltejs/kit';

import { CAFE24_CLIENT_ID } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit'

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

	return new Response(JSON.stringify({
		code: params.get('code'),
	}), {
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.formData();

	const id = data.get('id')
	if (!id) {
		throw error(400, 'invalid params: id');
	}

	const to = `https://${id}.cafe24api.com/api/v2/oauth/authorize?`+
		(new URLSearchParams({
			response_type: 'code',
			client_id: CAFE24_CLIENT_ID,
			state: 'install',
			redirect_uri: request.url,
			scope: scopes.join(','),
		}).toString())

	throw redirect(302, to)
};
