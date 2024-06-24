export const paginationQuerySkip = (searchTerm: any) => {
    const limitsize = Number(searchTerm.limit) || 5 ;
    
    const page = Number(searchTerm.page) || 1;
    const skip = (page - 1) * limitsize;

    const paginationQuerySkip = {
        $skip: skip
    };

    return paginationQuerySkip;
};
export const paginationQueryLimit = (searchTerm: any) => {
    const limitsize = Number(searchTerm.limit) || 5;
    const page = Number(searchTerm.page) || 1;
    const skip = (page - 1) * limitsize;

    const paginationQueryLimit = {
        $limit: limitsize
    };

    return paginationQueryLimit;
};
