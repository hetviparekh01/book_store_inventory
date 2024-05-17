export const searchQuery = (arr: any[][], searchTerm: any):any => {
     let dynamicquery: any = {
          $match: {},
     };
     // console.log(arr);
     let $and:any = [{}];

     let andfeilds =arr[1].map(ele =>{
          return ele;
     })
     let orfeilds = arr[0].map(ele=>{
          return ele;
     });


     // arr[1].length>0?arr[1].forEach(ele=>$and.push(ele)):null
     if(andfeilds.length>0){
          dynamicquery.$match = {
               ...dynamicquery.$match,
               $and:andfeilds
          };
     }
   
     if (searchTerm.search) {
          dynamicquery.$match = {
               ...dynamicquery.$match,
               $or: orfeilds
          };
     }
     return dynamicquery;
};
