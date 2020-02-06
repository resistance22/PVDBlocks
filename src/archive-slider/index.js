const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, ColorPalette,InspectorControls  } = wp.blockEditor;
const { PanelBody,SelectControl } = wp.components;
const {apiFetch} = wp.apiFetch;
// Import SVG as React component using @svgr/webpack.
// https://www.npmjs.com/package/@svgr/webpack

import { ReactComponent as Logo } from "../bv-logo.svg";


registerBlockType("pvd/archiveslider", {
   title: __("Archive Slider", "podkit"),
   icon: { src: Logo },
   category: "pvd",
   attributes:{
      categories:{
         type:'object'
      },
      selectedCat:{
         type:'string'
      },
      selectedCatName:{
         type:'string'
      }
   },
 
   // https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/
   edit({className,setAttributes,attributes}){
      if( !attributes.categories ){
         wp.apiFetch(
            {
               url: '/wp-json/wp/v2/product_cat'
            }
         ).then((categories)=>{
            setAttributes({categories});
         }).catch((e)=>console.error(e))
      }

      if( !attributes.categories  ){
         return(
            <p>
               Loading...
            </p>
         ) 
        
      }

      if( attributes.categories && attributes.categories.length === 0 && attributes.posts && attributes.posts.length === 0 ){
         return(
            <p>
               No Categories or Posts Found!
            </p>
         ) 
      }
      const catChange = (selectedCat)=>{
         setAttributes({selectedCat})
      }
 
      return[
      <InspectorControls>
         <PanelBody title={__('Categories','pvd')}>
            <div className="components-base-control">
               <div className="components-base-control__field">
                  <label className="components-base-control__label">
                     {__("Category", "podkit")}
                  </label>
                  <SelectControl
                     label={__("Select Category")}
                     value={ attributes.selectedCat }
                     options={        
                        attributes.categories.map((cat)=>{
                           return {label:cat.name,value:cat.id}
                        })
                     }
                     onChange={catChange}
                  />
               </div>
            </div>
         </PanelBody>
      </InspectorControls>,
      <div className={className + ' archive slider'}>
         <h2>
             Test
         </h2>
      </div>
      ]
      
   },
   save(){
      return null;
   }
 });
 //TODO filtering the post on change selected category