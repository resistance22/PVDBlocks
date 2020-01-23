const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { Button } = wp.components;
// Import SVG as React component using @svgr/webpack.
// https://www.npmjs.com/package/@svgr/webpack
import { ReactComponent as Logo } from "../bv-logo.svg";


registerBlockType("pvd/container", {
   title: __("Bootstrap Container", "podkit"),
   icon: { src: Logo },
   category: "pvd",

 
   // https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/
   edit( { className } ) {
		return (
			<div className={ className + " container"}>
				<InnerBlocks />
			</div>
		);
	},

	save(props) {
      const {className} = props;
		return (
			<div className="container">
				<InnerBlocks.Content />
			</div>
		);
	}
 });