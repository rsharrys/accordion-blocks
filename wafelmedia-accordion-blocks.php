<?php
/**
 * Plugin Name:       Wafelmedia Accordion Blocks
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wafelmedia-accordion
 *
 * @package           wafelmedia
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function wafelmedia_accordion_block_init() {
	register_block_type( __DIR__ . '/build/accordion/' );
	register_block_type( __DIR__ . '/build/accordion-item/' );
}
add_action( 'init', 'wafelmedia_accordion_block_init' );

/**
 * JS Accordion
 */
function custom_block_enqueue() {
    wp_enqueue_script(
        'accordion-block', // nazwa identyfikacyjna skryptu
        plugins_url( '/accordion.min.js', __FILE__ ), // adres URL skryptu
        array( 'wp-blocks', 'wp-i18n', 'wp-element' ), // zależne skrypty Gutenberg
        filemtime( plugin_dir_path( __FILE__ ) . '/accordion.min.js' ) // wersja skryptu
    );
}
//add_action( 'enqueue_block_assets', 'custom_block_enqueue' );
