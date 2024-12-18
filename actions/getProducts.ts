export interface IProductParams {
    category?: string | null;
    searchTerm?: string | null;
  }
  
  export default async function getProducts(params: IProductParams) {
    // Your existing code for fetching products
    try {
      const { category, searchTerm } = params;
      let searchString = searchTerm || "";
  
      let query: any = {};
      if (category) {
        query.category = category;
      }
  
      const products = await prisma?.product.findMany({
        where: {
          ...query,
          OR: [
            {
              name: {
                contains: searchString,
                mode: 'insensitive'
              }
            },
            {
              description: {
                contains: searchString,
                mode: 'insensitive'
              }
            }
          ]
        },
        include: {
          reviews: {
            include: {
              user: true,
            },
            orderBy: {
              createdDate: 'desc'
            }
          }
        }
      });
  
      return products;
    } catch (error: any) {
      console.error('Error fetching products:', error.message);
      throw new Error(error.message);
    }
  }
  