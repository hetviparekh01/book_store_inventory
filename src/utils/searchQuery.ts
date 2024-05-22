export const searchQuery = (arr: any[][], searchTerm: any):any => {
     let dynamicquery: any = {
          $match: {},
     };
     
     let andfeilds =arr[0].map(ele =>{
          return ele;
     })
     let orfeilds = arr[1].map(ele=>{
          return ele;
     });
     andfeilds.length>0 ? dynamicquery.$match={
          ...dynamicquery.$match,$and:andfeilds
     }:null;

     searchTerm.search ? dynamicquery.$match={    
          ...dynamicquery.$match,$or:orfeilds
     }:null;
     return dynamicquery;
};
