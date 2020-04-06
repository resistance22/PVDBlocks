const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks,ColorPalette,InspectorControls  } = wp.editor;
const { PanelBody } = wp.components;
// Import SVG as React component using @svgr/webpack.
// https://www.npmjs.com/package/@svgr/webpack
import { ReactComponent as Logo } from "../bv-logo.svg";


registerBlockType("pvd/fullwidthcontainer", {
   title: __("Full Width Container", "podkit"),
   icon: { src: Logo },
	category: "pvd",
	attributes:{
		backgroundColor:{
			type:'text',
			default:'transparent'
		}
	},

 
   // https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/
   edit: props => {
		const {className,attributes,setAttributes} = props;
		const styles = {
			backgroundColor:attributes.backgroundColor
		}
		const onBackgroundChange = (backgroundColor)=>{
			setAttributes({backgroundColor})
		}
		return [
			<InspectorControls>
				<PanelBody title={__('color settings','pvd')}>
					<div className="components-base-control">
						<div className="components-base-control__field">
							<label className="components-base-control__label">
								{__("Background color", "podkit")}
							</label>
							<ColorPalette 
								 value={attributes.backgroundColor}
								 onChange={onBackgroundChange}
							/>
						</div>
					</div>
				</PanelBody>
			</InspectorControls>
			,<div style={styles} className={ className + " fullwidth-container"}>
				<InnerBlocks />
			</div>
		]
	},

	save(props) {
		const {attributes} = props;
		const styles = {
			backgroundColor:attributes.backgroundColor
		}
		return (
			<div style={styles} className=" fullwidth-container">
				<InnerBlocks.Content />
			</div>
		);
	}
 });