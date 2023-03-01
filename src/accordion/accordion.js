document.addEventListener("DOMContentLoaded", function () {
	var acc = document.getElementsByClassName(
		"wp-block-wafelmedia-accordion-item"
	);
	var i;
	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function () {
			const active = document.querySelector(
				".wp-block-wafelmedia-accordion-item.active"
			);
			if (active) {
				active.classList.remove("active"); // remove active class from accordions
			}

			if (active !== this) {
				this.classList.toggle("active");
			}
		});
	}
});
