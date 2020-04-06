const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, MediaUploadCheck,ColorPalette,InspectorControls } = wp.editor;
const { Button,PanelBody } = wp.components;
// Import SVG as React component using @svgr/webpack.
// https://www.npmjs.com/package/@svgr/webpack
import { ReactComponent as Logo } from "../bv-logo.svg";


registerBlockType("pvd/pngimage", {
   title: __("PVD Image", "podkit"),
   icon: { src: Logo },
   category: "pvd",
   attributes:{
      altText:{
         type:'string',
         default:''
      },
      Image : {
         type:'attribute',
         attribute:'src',
      },
      backgroundColor:{
         type:'text'
      }
   },
 
   // https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/
   edit:props => {
      //console.info(props);
      const {className,setAttributes,attributes} = props;
      const styles = {
         backgroundColor : attributes.backgroundColor
      }
		const onBackgroundChange = (backgroundColor)=>{
			setAttributes({backgroundColor})
		}
      const onBGSelect = (imgOBJ)=>{
         setAttributes({Image : imgOBJ.sizes.full.url})
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
      ,
      <div>
         <div style={styles} class="pngImage">
            <img src={attributes.Image} alt={attributes.altText} />
         </div>
         <MediaUploadCheck>
            <MediaUpload
               onSelect={ onBGSelect }
               allowedTypes={ ['image'] }
               value={ attributes.Image }
               render={ ( { open } ) => (
                  <div className="buttonCont">
                     <Button onClick={ open }>
                        {__("Select Image",'pvd')}
                     </Button>
                  </div>
               ) }
            />
         </MediaUploadCheck>
      </div>   
      ];
   },
   save:props=> {

      const {attributes} = props;
      const styles = {
         backgroundColor : attributes.backgroundColor
      }
      return (
         <div style={styles} class="pngImage">
            <img src={attributes.Image} alt={attributes.altText} />
         </div>
     );
   }
 });