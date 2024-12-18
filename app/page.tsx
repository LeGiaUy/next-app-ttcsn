import getProducts, { IProductParams } from '@/actions/getProducts';
import { GetServerSideProps } from 'next';
import Container from './components/container';
import HomeBanner from './components/HomeBanner';
import NullData from './components/NullData';
import ProductCard from './components/products/productCard';

// Define the props interface
interface HomeProps {
  products: any[];
  searchParams: IProductParams;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ query }) => {
  const searchParams: IProductParams = {
    category: query.category as string | null,
    searchTerm: query.searchTerm as string | null,
  };

  const products = await getProducts(searchParams);

  return {
    props: {
      products,
      searchParams,
    },
  };
};

export default function Home({ products, searchParams }: HomeProps) {
  if (products.length === 0) {
    return <NullData title="Không có sản phẩm" />;
  }

  return (
    <div>
      <Container>
        <HomeBanner />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
