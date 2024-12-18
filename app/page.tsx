import getProducts, { IProductParams } from "@/actions/getProducts";
import Container from "./components/container";
import HomeBanner from "./components/HomeBanner";
import NullData from "./components/NullData";
import ProductCard from "./components/products/productCard";

// Define props that the Home component expects
interface HomeProps {
  searchParams: IProductParams; // Use the correct type for searchParams
}

export default async function Home({ searchParams }: HomeProps) {
  // Fetch products based on searchParams
  const products = await getProducts(searchParams);

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
