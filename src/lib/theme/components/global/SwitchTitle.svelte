<script>
	let { title } = $props();
</script>

<div>
	<label class="relative flex justify-between items-center group">
		{title}
		<input
			type="checkbox"
			class="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md border-0 cursor-pointer"
		/>
		<span
			class="w-10 h-6 flex items-center flex-shrink-0 ml-4 p-0.5 bg-switch rounded-full ease-in-out peer-checked:bg-switchChecked after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4"
		></span>
	</label>
</div>
