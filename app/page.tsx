export const revalidate = 0;

import getProducts, { IProductParams } from "@/actions/getProducts";
import Container from "./components/container";
import HomeBanner from "./components/HomeBanner";
import NullData from "./components/NullData";
import ProductCard from "./components/products/productCard";

// Định nghĩa các props mà Home component nhận được
interface HomeProps {
  searchParams: IProductParams;
  products: any[];  // Bạn có thể thay đổi kiểu dữ liệu này theo yêu cầu
}

// Sử dụng async function để lấy dữ liệu trực tiếp trong page component
export default async function Home({ searchParams }: { searchParams: IProductParams }) {
  // Lấy sản phẩm từ API
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return <NullData title="Không có sản phẩm" />;
  }

  return (
    <div>
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
