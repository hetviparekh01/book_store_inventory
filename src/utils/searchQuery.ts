const searchQuery = (arr: any, searchTerm: any) => {
     let dynamicquery: any = {
          $match: {},
     };
     let regex = { $regex: searchTerm?.search, $options: "i" };
     let $and = [{}];

     if (searchTerm.filter_author) {
          $and.push({ "author_details.name": searchTerm.filter_author });
     }
     if (searchTerm.filter_category) {
          $and.push({ "category_details.name": searchTerm.filter_category });
     }
     dynamicquery.$match = {
          ...dynamicquery.$match,
          $and,
     };
     if (searchTerm.search) {
          dynamicquery.$match = {
               ...dynamicquery.$match,
               $add: [
                    arr.and.map((val: string) => {
                         val: regex;
                    }),
               ],
          };
     }
};
