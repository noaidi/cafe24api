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

	const res = await client.retrieveAListOfProducts({})

	// const apiCallLimit = res.headers['x-api-call-limit'] as string ?? '0/1'
	// if (/^\d+\/\d+$/.test(apiCallLimit)) {
	// 	const [called, total] = apiCallLimit.split('/')
	// 	const ratio = parseInt(called) / parseInt(total)
	// 	if (ratio > 0) {
	// 		console.log(ratio)
	// 	}
	// }

	return res.data
};

// import cache from 'memory-cache';
//
// /** 캐시 유효 시간 설정 (밀리초) */
// const CACHE_DURATION = 1000; // 1초
//
// export async function GET() {
//   const cacheKey = 'cafe24-data';
//
//   // 1. 캐시된 데이터 확인
//   const cachedData = cache.get(cacheKey);
//   if (cachedData) {
//     console.log('Returning cached data');
//     return new Response(JSON.stringify(cachedData), { status: 200 });
//   }
//
//   // 2. 캐시에 데이터가 없는 경우 API 호출
//   try {
//     const response = await fetch('https://api.cafe24.com/v2/admin/products', {
//       headers: {
//         'Authorization': `Bearer YOUR_ACCESS_TOKEN`
//       }
//     });
//
//     if (!response.ok) {
//       throw new Error(`API Error: ${response.status}`);
//     }
//
//     const data = await response.json();
//
//     // 3. API 데이터를 캐시에 저장
//     cache.put(cacheKey, data, CACHE_DURATION);
//     console.log('Data cached');
//
//     return new Response(JSON.stringify(data), { status: 200 });
//   } catch (error) {
//     console.error('Error fetching API data:', error);
//     return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
//   }
// }
