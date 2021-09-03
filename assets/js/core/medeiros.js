var Medeiros = function() {};

Medeiros.prototype = {
	blockUI: function(options) {
		options = $.extend(true, {}, options);
		var html = '';
		if (options.animate) {
			html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '">' + '<div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>' + '</div>';
		} else if (options.iconOnly) {
			html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><i class="icon-spinner4 spinner"></i></div>';
		} else if (options.textOnly) {
			html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
		} else {
			html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><i class="icon-spinner4 spinner"></i>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
		}

		if (options.target) { // element blocking
			var el = $(options.target);
			if (el.height() <= ($(window).height())) {
				options.cenrerY = true;
				options.cenrerX = true;
			}
			el.block({
				message: html,
				baseZ: options.zIndex ? options.zIndex : 1000,
				centerY: options.cenrerY !== undefined ? options.cenrerY : false,
				css: {
					top: '10%',
					border: '0',
					padding: '0',
					backgroundColor: 'none'
				},
				overlayCSS: {
					backgroundColor: options.overlayColor ? options.overlayColor : '#555',
					opacity: options.boxed ? 0.05 : 0.1,
					cursor: 'auto'
				}
			});
		} else { // page blocking
			$.blockUI({
				message: html,
				baseZ: options.zIndex ? options.zIndex : 1000,
				css: {
					border: '0',
					padding: '0',
					backgroundColor: 'none'
				},
				overlayCSS: {
					backgroundColor: options.overlayColor ? options.overlayColor : '#555',
					opacity: options.boxed ? 0.05 : 0.1,
					cursor: 'auto'
				}
			});
		}
	},
	unblockUI: function(target) {
		if (target) {
			$(target).unblock({
				onUnblock: function() {
					$(target).css('position', '');
					$(target).css('zoom', '');
				}
			});
		} else {
			$.unblockUI();
		}
	},
	progressCounter: function (element, radius, border, color, end, iconClass, textTitle, textAverage) {
		// Main variables
		var d3Container = d3.select(element),
			startPercent = 0,
			iconSize = 32,
			endPercent = end,
			twoPi = Math.PI * 2,
			formatPercent = d3.format('.0%'),
			boxSize = radius * 2;

		// Values count
		var count = Math.abs((endPercent - startPercent) / 0.01);

		// Values step
		var step = endPercent < startPercent ? -0.01 : 0.01;

		// Add SVG element
		var container = d3Container.append('svg');

		// Add SVG group
		var svg = container
			.attr('width', boxSize)
			.attr('height', boxSize)
			.append('g')
			.attr('transform', 'translate(' + (boxSize / 2) + ',' + (boxSize / 2) + ')');

		// Arc
		var arc = d3.svg.arc()
			.startAngle(0)
			.innerRadius(radius)
			.outerRadius(radius - border);

		// Background path
		svg.append('path')
			.attr('class', 'd3-progress-background')
			.attr('d', arc.endAngle(twoPi))
			.style('fill', '#eee');

		// Foreground path
		var foreground = svg.append('path')
			.attr('class', 'd3-progress-foreground')
			.attr('filter', 'url(#blur)')
			.style('fill', color)
			.style('stroke', color);

		// Front path
		var front = svg.append('path')
			.attr('class', 'd3-progress-front')
			.style('fill', color)
			.style('fill-opacity', 1);

		// Percentage text value
		var numberText = d3.select(element)
			.append('h2')
			.attr('class', 'mt-15 mb-5')

		// Icon
		d3.select(element)
			.append("i")
			.attr("class", iconClass + " counter-icon")
			.attr('style', 'top: ' + ((boxSize - iconSize) / 2) + 'px');

		// Title
		d3.select(element)
			.append('div')
			.text(textTitle);

		// Subtitle
		d3.select(element)
			.append('div')
			.attr('class', 'text-size-small text-muted')
			.text(textAverage);

		// Animate path
		function updateProgress(progress) {
			foreground.attr('d', arc.endAngle(twoPi * progress));
			front.attr('d', arc.endAngle(twoPi * progress));
			numberText.text(formatPercent(progress));
		}

		// Animate text
		var progress = startPercent;
		(function loops() {
			updateProgress(progress);
			if (count > 0) {
				count--;
				progress += step;
				setTimeout(loops, 10);
			}
		})();
	}
};

var App = new Medeiros();