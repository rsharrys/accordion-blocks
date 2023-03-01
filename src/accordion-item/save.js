/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { __ } from "@wordpress/i18n";
import classnames from "classnames";
import find from "lodash";

import {
	useSetting,
	InnerBlocks,
	useBlockProps,
	RichText,
} from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const {
		headingText,
		level,
		headingFontSize,
		primaryColor,
		headingTextColor,
		accordionIcon,
	} = attributes;

	const HeadingTag = "h" + (level !== undefined ? level : 2);

	//Error: Minified React error #321; visit

	// const fontSizes = useSetting("typography.fontSizes"),
	// 	activeFontSize = find(fontSizes, { size: headingFontSize });

	// const colors = useSetting("color.palette"),
	// 	activePrimaryColor = find(colors, { color: primaryColor }),
	// 	activeHeadingTextColor = find(colors, { color: headingTextColor });

	const classes = classnames();
	const blockProps = useBlockProps.save({
		className: classes,
	});

	return (
		<div {...blockProps}>
			<HeadingTag
				className={classnames("accordion-header", {
					//[`has-${activeFontSize?.slug}-font-size`]: activeFontSize,
				})}
			>
				<button type="button" aria-expanded="true" class="accordion-triger">
					<RichText.Content tagName="span" value={headingText} />
					<span class="icon">X</span>
				</button>
			</HeadingTag>
			<div class="accordion-panel">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
