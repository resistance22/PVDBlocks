const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, ColorPalette,InspectorControls  } = wp.editor;
const { PanelBody } = wp.components;
// Import SVG as React component using @svgr/webpack.
// https://www.npmjs.com/package/@svgr/webpack
import { ReactComponent as Logo } from "../bv-logo.svg";


registerBlockType("pvd/applicationtitle", {
   title: __("PVD Apllication Title", "podkit"),
   icon: { src: Logo },
   category: "pvd",
   attributes:{
      content:{
			source: 'html',
			selector: 'h3',
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
        <div style={styles} className="ap-title-cont">
            <RichText 
               tagName = 'h3'
               className={className + " ap-title" }
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
         <div style={styles} className="ap-title-cont">   
            <RichText.Content 
               value = {attributes.content} 
               tagName = 'h3'
            />
         </div>

     );
   }
 });