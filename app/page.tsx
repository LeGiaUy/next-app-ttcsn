import getProducts, { IProductParams } from "@/actions/getProducts";
import Container from "./components/container";
import HomeBanner from "./components/HomeBanner";
import NullData from "./components/NullData";
import ProductCard from "./components/products/productCard";

interface HomeProps {
  searchParams: IProductParams; // Định nghĩa searchParams là một object
}

export default async function Home({ searchParams }: HomeProps) {
  // Fetch dữ liệu sản phẩm
  const products = await getProducts(searchParams);

  // Trả về giao diện rỗng nếu không có sản phẩm
  if (products.length === 0) {
    return <NullData title="Không có sản phẩm, ấn tất cả để xóa bộ lọc" />;
  }

  // Hàm xáo trộn mảng
  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledProducts = shuffleArray(products);

  return (
    <div>
      <Container>
        <HomeBanner />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffledProducts.map((product: any) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
