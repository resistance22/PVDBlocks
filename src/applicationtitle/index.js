const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, ColorPalette,InspectorControls  } = wp.editor;
const { PanelBody } = wp.components;
// Import SVG as React component using @svgr/webpack.
// https://www.npmjs.com/package/@svgr/webpack
import { ReactComponent as Logo } from "../bv-logo.svg";


registerBlockType("pvd/applicationtitle", {
   title: __("Apllications Title", "podkit"),
   icon: { src: Logo },
   category: "pvd",
   attributes:{
      titleText:{
         type:'string',
         source:'html',
      },
      color:{
         type:'text'
      }
   },
 
   // https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/
   edit:props => {
      //console.info(props);
      const {className,setAttributes,attributes} = props;
      const styles = {
         color :  attributes.color
      }
      const onChangeTitle = (titleText)=>{
         setAttributes({ titleText })
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
        <div className="ap-title-cont">
            <h3 style={styles}> 
                  <RichText 
                     className={className + " ap-title" }
                     placholder={__("نام اصلی","pvd")} 
                     value={attributes.titleText}
                     onChange={onChangeTitle}
                  />
            </h3>
        </div>

      ];
   },
   save:props=> {

      const {attributes} = props;
      const styles = {
         color :  attributes.color
      }
      return (
         <div className="ap-title-cont">
               <h3 style={styles}> 
                     <RichText.Content 
                        value = {attributes.titleText} 
                     />
               </h3>
         </div>

     );
   }
 });