import getProducts, { IProductParams } from "@/actions/getProducts";
import { useSearchParams } from 'next/navigation'; // Import useSearchParams từ next/navigation
import Container from "./components/container";
import HomeBanner from "./components/HomeBanner";
import NullData from "./components/NullData";
import ProductCard from "./components/products/productCard";

export default async function Home() {
  // Lấy tham số searchParams từ URL
  const searchParams = useSearchParams();

  // Kiểm tra nếu searchParams là null
  if (!searchParams) {
    return <NullData title="Không có tham số tìm kiếm trong URL" />;
  }

  // Chuyển đổi tham số query thành IProductParams
  const params: IProductParams = {
    category: searchParams.get('category') || null,  // Nếu không có category thì null
    searchTerm: searchParams.get('searchTerm') || null,  // Nếu không có searchTerm thì null
  };

  // Fetch dữ liệu sản phẩm
  const products = await getProducts(params);

  // Nếu không có sản phẩm, hiển thị giao diện NullData
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
