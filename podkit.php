<?php

/**
 * Plugin Name: Podkit
 * Plugin URI: https://github.com/LinkedInLearning/WPContentBlocks-Adv-5034179
 * Description: Custom block plugin from the LinkedIn Learning course "WordPress Content Blocks: Advanced".
 * Version: 1.0.0
 * Author: Morten Rand-Hendriksen
 *
 * @package podkit
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load translations (if any) for the plugin from the /languages/ folder.
 * 
 * @link https://developer.wordpress.org/reference/functions/load_plugin_textdomain/
 */
add_action( 'init', 'podkit_load_textdomain' );

function podkit_load_textdomain() {
	load_plugin_textdomain( 'podkit', false, basename( __DIR__ ) . '/languages' );
}

/** 
 * Add custom image size for block featured image.
 * 
 * @link https://developer.wordpress.org/reference/functions/add_image_size/
 */
add_action( 'init', 'podkit_add_image_size' );

function podkit_add_image_size() {
	add_image_size( 'podkitFeatImg', 250, 250, array( 'center', 'center' ) ); 
}

/** 
 * Register custom image size with sizes list to make it available.
 * 
 * @link https://codex.wordpress.org/Plugin_API/Filter_Reference/image_size_names_choose
 */
add_filter( 'image_size_names_choose', 'podkit_custom_sizes' );

function podkit_custom_sizes( $sizes ) {
	return array_merge( $sizes, array(
		'podkitFeatImg' => __('Podkit Featured Image'),
	) );
}

/** 
 * Add custom "Podkit" block category
 * 
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/#managing-block-categories
 */
add_filter( 'block_categories', 'podkit_block_categories', 10, 2 );

function podkit_block_categories( $categories, $post ) {
	/*
	if ( $post->post_type !== 'post' ) {
		return $categories;
	}
	*/
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'pvd',
				'title' => __( 'pvd', 'podkit' ),
			),
		)
	);
}

/**
 * Registers all block assets so that they can be enqueued through the Block Editor in
 * the corresponding context.
 *
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
 */
add_action( 'init', 'podkit_register_blocks' );

function podkit_register_blocks() {

	// If Block Editor is not active, bail.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Retister the block editor script.
	wp_register_script(
		'podkit-editor-script',											// label
		plugins_url( 'build/index.js', __FILE__ ),						// script file
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),		// dependencies
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )		// set version as file last modified time
	);

	// Register the block editor stylesheet.
	wp_register_style(
		'podkit-editor-styles',											// label
		plugins_url( 'build/editor.css', __FILE__ ),					// CSS file
		array( 'wp-edit-blocks' ),										// dependencies
		filemtime( plugin_dir_path( __FILE__ ) . 'build/editor.css' )	// set version as file last modified time
	);

	// Register the front-end stylesheet.
	wp_register_style(
		'podkit-front-end-styles',										// label
		plugins_url( 'build/style.css', __FILE__ ),						// CSS file
		array( ),														// dependencies
		filemtime( plugin_dir_path( __FILE__ ) . 'build/style.css' )	// set version as file last modified time
	);



		// Retister swiper.js.
		wp_register_script(
			'swiper.min.js',											// label
			plugins_url( 'build/dependencies/swiper.min.js', __FILE__ ),						// script file
		);
		// Retister script.js.
		wp_register_script(
			'script.js',											// label
			plugins_url( 'build/dependencies/script.js', __FILE__ ),						// script file
			['swiper.min.js'],
			null,
			true
		);

		wp_register_style(
			'swiper.min.css',										// label
			plugins_url( 'build/dependencies/swiper.min.css', __FILE__ ),						// CSS file
			
		);
	// Array of block created in this plugin.
	$blocks = [
		'pvd/pvdsingleheader',
		'pvd/container',
		'pvd/pngimage',
		'pvd/pvdtitle',
		'pvd/applicationtitle',
		'pvd/fullwidthcontainer',
	];
	
	// Loop through $blocks and register each block with the same script and styles.
	foreach( $blocks as $block ) {
		register_block_type( $block, array(
			'editor_script' => 'podkit-editor-script',					// Calls registered script above
			'editor_style' => 'podkit-editor-styles',					// Calls registered stylesheet above
			'style' => 'podkit-front-end-styles',					// Calls registered stylesheet above	
		) );	  
	}
	register_block_type('pvd/archiveslider',[
		'editor_script' => 'podkit-editor-script',					// Calls registered script above
		'editor_style' => 'podkit-editor-styles',					// Calls registered stylesheet above
		'style' => ['podkit-front-end-styles','swiper.min.css'],					// Calls registered stylesheet above
		'script' => ['script.js'],
		'render_callback' => 'render_posts_slider'	
	]);


	function render_related_posts($attributes){
		$block_content = '<div class="container related-product"><div class="row no-gutters"><div class="col-12"> <h2>'.__('محصولات مرتبط','pvd').'</h2> </div>';
		foreach( $attributes['selectedPosts'] as $ID ){

			$post = get_post($ID);
			// Built out our final output
			$block_content .= sprintf(
					'<div class="col-sm-6 col-md-4 col-lg-3"><a href="%3$s"><div class="p-inner"><div class="product-image"><img src="%2$s" alt="%1$s"></div><h3>%1$s</h3></div></a></div>',
					$post->post_title,
					get_the_post_thumbnail_url( $ID ),
					esc_url( get_permalink( $ID ) )

			);
		}
		$block_content .= '</div></div>';
		
		return $block_content;

	}



	function render_posts_slider($attributes){

		$ID = $attributes['selectedCat'];
		$term = get_term_by('id',$ID,'product_cat');
		$posts = get_posts( [
			'numberposts'      => -1,
			'tax_query'         => [
				[
					'taxonomy' => 'product_cat',
					'field' => 'term_id',
					'terms' => $ID
				]
			],
			'orderby'          => 'date',
			'order'            => 'DESC',
			'post_type'        => 'product'
		]);
		$block_content = sprintf(
			'<div class="col-12">
				<h2>%1$s</h2>
			</div>
			<div class="swiper-container archive-slider">
				<div class="swiper-wrapper">'
		,
		$term->name);
		foreach( $posts as $post ){

			// Built out our final output
			$block_content .= sprintf(
					'<div class="swiper-slide">
						<div class="slider-bg">
							<div class="white-bg"></div>
							<div class="orange-bg"></div>
						</div>
						<a href="%3$s">
							<div class="row no-gutters">
								<div class="col-sm-12 col-md-6 col-lg-7">
									<div class="slider-product-title">
										<h3>%1$s</h3>
									</div>
								</div>
								<div class="col-sm-12 col-md-6 col-lg-5">
									<div class="product-image"><img src="%2$s" alt="%1$s"></div>
								</div>
							</div>
						</a>
					</div>',
					$post->post_title,
					get_the_post_thumbnail_url( $post->ID ),
					esc_url( get_permalink( $post->ID ) )

			);
		}
		
		$block_content .= '</div> <!--swiper wrapper -->
			<!-- If we need pagination -->
			<div class="swiper-pagination"></div>
		</div> <!--swiper container -->';

		//echo '<pre>';
		//print_r($term);
		//echo '</pre>';

		return $block_content;

	}

	
	if ( function_exists( 'wp_set_script_translations' ) ) {
	/**
	 * Adds internationalization support. 
	 * 
	 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/internationalization/
	 * @link https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
	 */
	wp_set_script_translations( 'podkit-editor-script', 'podkit', plugin_dir_path( __FILE__ ) . '/languages' );
	}

}
