const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, MediaUploadCheck } = wp.editor;
const { Button } = wp.components;
// Import SVG as React component using @svgr/webpack.
// https://www.npmjs.com/package/@svgr/webpack
import { ReactComponent as Logo } from "../bv-logo.svg";


registerBlockType("pvd/pvdsingleheader", {
   title: __("Full Header Single", "podkit"),
   icon: { src: Logo },
   category: "pvd",
   attributes:{
      headerTitle:{
         type:'string',
         source:'html',
         selector:'.fullHeader.Title'
      },
      backgroundImage : {
         type:'string',
         default:'https://cdn.hipwallpaper.com/i/43/13/762saF.jpg'
      }
   },
 
   // https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/
   edit:props => {
      //console.info(props);
      const {className,setAttributes,attributes} = props;
      const styles = {
         backgroundImage : "url("+ attributes.backgroundImage +")"
      }
      const onChangeTitle = (headerTitle)=>{
         setAttributes({ headerTitle })
      }
      const onBGSelect = (imgOBJ)=>{
         setAttributes({backgroundImage : imgOBJ.sizes.full.url})
      }
     return (
        <div className="headerTitle">
         <h2 > 
               <RichText 
                  className={className + " fullHeader title" }
                  placholder={__("نام سرتیتر","pvd")} 
                  value={attributes.headerTitle}
                  onChange={onChangeTitle}
               />
         </h2>
         <div class="background" style={ styles }></div>
         <MediaUploadCheck>
            <MediaUpload
               onSelect={ onBGSelect }
               allowedTypes={ ['image'] }
               value={ attributes.headerTitle }
               render={ ( { open } ) => (
                  <div className="buttonCont">
                     <Button onClick={ open }>
                        {__("تغییر تصویر پس زمینه",'pvd')}
                     </Button>
                  </div>
               ) }
            />
         </MediaUploadCheck>
        
        </div>

     );
   },
   save:props=> {

      const {attributes} = props;
      const styles = {
         backgroundImage : "url("+ attributes.backgroundImage +")"
      }
      return (
        <div className="headerTitle">
           <div className="container">
              <div className="row no-gutters">
                 <div className="col-6">
                     <h2 className="fullHeader Title">
                        <RichText.Content 
                           value = {props.attributes.headerTitle} 
                        />
                     </h2>
                 </div>
              </div>
           </div>

         <div class="background" style={ styles }></div>
        </div>

     );
   }
 });