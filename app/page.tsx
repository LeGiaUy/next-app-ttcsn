import getProducts, { IProductParams } from "@/actions/getProducts";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import Container from "./components/container";
import HomeBanner from "./components/HomeBanner";
import NullData from "./components/NullData";
import ProductCard from "./components/products/productCard";

// Define the props interface
interface HomeProps {
  products: any[]; // Ensure products is always an array
}

export default async function Home() {
  const searchParams = useSearchParams(); // Get the search params from the URL

  // Handle the case where searchParams might be null
  const params: IProductParams = {
    category: searchParams?.get("category") || null,
    searchTerm: searchParams?.get("searchTerm") || null,
  };

  // Fetch products based on the parameters
  const products = await getProducts(params) || []; // Ensure it's always an array

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
