import type { RequestHandler } from '@sveltejs/kit';

import { CAFE24_CLIENT_ID } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit'

export const GET: RequestHandler = ({ url }) => {
	const params = url.searchParams
	const state = params.get('state')

	if (state !== 'install') {
		return new Response(JSON.stringify({
			code: params.get('code'),
		}), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	return new Response();
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.formData();

	const id = data.get('id')
	if (!id) {
		throw error(400, 'id 파라미터가 필요합니다.');
	}

	const to = `https://${id}.cafe24api.com/api/v2/oauth/authorize?`+
		(new URLSearchParams({
			response_type: 'code',
			client_id: CAFE24_CLIENT_ID,
			state: 'install',
			redirect_uri: request.url,
		}).toString())

	throw redirect(302, to)
};
