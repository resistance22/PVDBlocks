const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, ColorPalette,InspectorControls  } = wp.editor;
const { PanelBody } = wp.components;
// Import SVG as React component using @svgr/webpack.
// https://www.npmjs.com/package/@svgr/webpack
import { ReactComponent as Logo } from "../bv-logo.svg";


registerBlockType("pvd/pvdtitle", {
   title: __("PVD Main Title", "podkit"),
   icon: { src: Logo },
   category: "pvd",
   attributes:{
      content:{
			source: 'html',
			selector: 'h1',
      },
      color:{
         type:'text'
      },
      fontSize:{
         type:'text'
      }
   },
 
   // https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/
   edit({className,setAttributes,attributes}){
      const styles = {
         color :  attributes.color
      }
      const onChangeTitle = (content)=>{
         setAttributes({ content })
      }
      const onColorChange = (color)=>{
         setAttributes({color})
      }
     return [
      <InspectorControls>
         <PanelBody title={__('Title settings','pvd')}>
            <div className="components-base-control">
               <div className="components-base-control__field">
                  <label className="components-base-control__label">
                     {__("Text Color", "podkit")}
                  </label>
                  <ColorPalette 
                     value={attributes.color}
                     onChange={onColorChange}
                  />
               </div>
            </div>
         </PanelBody>
      </InspectorControls>
        ,
        <div style={styles} className="pvd-maintitle-cont">
            <RichText 
               tagName = 'h1'
               className={className + " pvd-main-title" }
               placholder={__("نام اصلی","pvd")} 
               value={attributes.content}
               onChange={onChangeTitle}
            />
        </div>

      ];
   },
   save({ attributes }){
      const styles = {
         color :  attributes.color
      }
      return (
         <div style={styles} className="pvd-maintitle-cont">   
            <RichText.Content 
               value = {attributes.content} 
               tagName = 'h1'
            />
         </div>

     );
   }
 });