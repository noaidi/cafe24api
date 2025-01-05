import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ url }) => {
	const params = url.searchParams

	return new Response(JSON.stringify({
		code: params.get('code'),
		state: params.get('state'),
	}), {
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
