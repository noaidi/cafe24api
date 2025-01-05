<script lang="ts">
	import type { PageData } from './$types';

	let {
		data
	}: {
		data: PageData;
	} = $props();
</script>

<ul>
	{#each data.products as product}
		<li>
			{product.product_name}
		</li>
	{/each}
</ul>
