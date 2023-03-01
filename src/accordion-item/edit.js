/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import classnames from "classnames";
import find from "lodash";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	InnerBlocks,
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
	useSetting,
} from "@wordpress/block-editor";
import {
	ToolbarDropdownMenu,
	PanelBody,
	FontSizePicker,
	ColorPalette,
} from "@wordpress/components";
//import { useRef, useState } from "@wordpress/element";

/**
 * Internal Dependencies
 */
import HeadingLevelIcon from "./heading-level-icons.js";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		headingText,
		level,
		headingFontSize,
		primaryColor,
		headingTextColor,
		accordionIcon,
	} = attributes;

	const headingLevel = level ?? 2,
		HeadingTag = "h" + headingLevel;

	const fontSizes = useSetting("typography.fontSizes"),
		activeFontSize = find(fontSizes, { size: headingFontSize });

	const colors = useSetting("color.palette"),
		activePrimaryColor = find(colors, { color: primaryColor }),
		activeHeadingTextColor = find(colors, { color: headingTextColor });

	// const toggleButton = useRef(),
	// 	selectedIcon = accordionIcon ?? "caret",
	// 	icons = {};

	function setHeadingLevel(level) {
		setAttributes({ level: parseInt(level) });
	}

	const blockProps = useBlockProps();

	return (
		<div {...blockProps} style={{ borderColor: primaryColor }}>
			<BlockControls group="block">
				<ToolbarDropdownMenu
					icon={<HeadingLevelIcon level={headingLevel} />}
					label={__("Heading level", "wafelmedia-accordion")}
					controls={[
						{
							icon: (
								<HeadingLevelIcon level="2" isPressed={headingLevel === 2} />
							),
							onClick: () => setHeadingLevel(2),
							isActive: headingLevel === 2,
							className: "custom-class",
						},
						{
							icon: (
								<HeadingLevelIcon level="3" isPressed={headingLevel === 3} />
							),
							isActive: headingLevel === 3,
							onClick: () => setHeadingLevel(3),
						},
						{
							icon: (
								<HeadingLevelIcon level="4" isPressed={headingLevel === 4} />
							),
							isActive: headingLevel === 4,
							onClick: () => setHeadingLevel(4),
						},
					]}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__("Accordion Settings", "wafelmedia-accordion")}>
					<h3>Heading Styles</h3>
					<fieldset>
						<legend style={{ marginBottom: "0.5rem" }}>Primary Color</legend>
						<ColorPalette
							value={primaryColor}
							onChange={(val) => setAttributes({ primaryColor: val })}
							colors={colors}
							disableCustomColors={true}
						/>
					</fieldset>
					<FontSizePicker
						value={headingFontSize}
						onChange={(val) => setAttributes({ headingFontSize: val })}
						disableCustomFontSizes={true}
						fontSizes={fontSizes}
					/>
					<fieldset>
						<legend style={{ marginBottom: "0.5rem" }}>
							Heading Text Color
						</legend>
						<ColorPalette
							value={headingTextColor}
							onChange={(val) => setAttributes({ headingTextColor: val })}
							colors={colors}
							disableCustomColors={true}
						/>
					</fieldset>
				</PanelBody>
			</InspectorControls>
			<HeadingTag
				className={classnames("accordion-header", {
					[`has-${activeFontSize?.slug}-font-size`]: activeFontSize,
				})}
				style={{
					backgroundColor: primaryColor,
					color: headingTextColor,
				}}
			>
				<button type="button" class="accordion-triger">
					<RichText
						tagName="span"
						value={headingText}
						allowedFormats={["core/bold", "core/italic"]}
						onChange={(headingText) => setAttributes({ headingText })}
						placeholder={__("Wpisz text")}
					/>
					<span class="icon">X</span>
				</button>
			</HeadingTag>
			<div class="accordion-panel">
				<InnerBlocks />
			</div>
		</div>
	);
}
