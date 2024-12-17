export const products = [
  {
    id: "64a654593e91b8e73a351e9b",
    name: "iPhone 14",
    description: "Chiếc smartphone cao cấp với thiết kế hiện đại, hiệu năng mạnh mẽ và camera vượt trội.",
    price: 34900000,
    brand: "Apple",
    category: "Phone",
    inStock: true,
    images: [
      {
        color: "White",
        colorCode: "#FFFFFF",
        image: "https://m.media-amazon.com/images/I/71p-tHQ0u1L._AC_SX679_.jpg",
      },
      {
        color: "Gray",
        colorCode: "#808080",
        image: "https://m.media-amazon.com/images/I/417tEj3iJ8L._AC_.jpg",
      },
    ],
    reviews: [],
  },
  {
    id: "64a4ebe300900d44bb50628a",
    name: "Logitech MX Keys Advanced Wireless Keyboard",
    description: "Bàn phím không dây cao cấp với phím bấm tinh tế, độ chính xác cao và đèn nền thông minh.",
    price: 2390000,
    brand: "Logitech",
    category: "Accessories",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image: "https://m.media-amazon.com/images/I/71gOLg2-kqL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      },
    ],
    reviews: [
      {
        id: "64a65a6158b470c6e06959ee",
        userId: "6475af156bad4917456e6e1e",
        productId: "64a4ebe300900d44bb50628a",
        rating: 5,
        comment: "Rất tốt!",
        createdDate: "2023-07-06T06:08:33.067Z",
        user: {
          id: "6475af156bad4917456e6e1e",
          name: "Charles",
          email: "example@gmail.com",
          image: "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
          role: "ADMIN",
        },
      },
    ],
  },
  {
    id: "648437b38c44d52b9542e340",
    name: "Apple iPhone 13, 64GB",
    description: "Điện thoại tân trang với thiết kế đẹp, hiệu năng ổn định và camera chất lượng cao.",
    price: 19200000,
    brand: "Apple",
    category: "Phone",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image: "https://m.media-amazon.com/images/I/61g+McQpg7L._AC_SX679_.jpg",
      },
      {
        color: "Blue",
        colorCode: "#0000FF",
        image: "https://m.media-amazon.com/images/I/713Om9vCHUL._AC_SX679_.jpg",
      },
      {
        color: "Red",
        colorCode: "#FF0000",
        image: "https://m.media-amazon.com/images/I/61thdjmfHcL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      },
    ],
    reviews: [
      {
        id: "6499b4887402b0efd394d8f3",
        userId: "6499b184b0e9a8c8709821d3",
        productId: "648437b38c44d52b9542e340",
        rating: 4,
        comment: "Camera tốt, giao hàng nhanh.",
        createdDate: "2023-06-26T15:53:44.483Z",
        user: {
          id: "6499b184b0e9a8c8709821d3",
          name: "Chaoo",
          email: "example1@gmail.com",
          image: "https://lh3.googleusercontent.com/a/AAcHTtcuRLwWi1vPKaQOcJlUurlhRAIIq2LgYccE8p32=s96-c",
          role: "USER",
        },
      },
    ],
  },
  {
    id: "64a4e9e77e7299078334019f",
    name: "Logitech MX Master 2S Wireless Mouse",
    description: "Chuột không dây tiện dụng, hỗ trợ đa thiết bị và cuộn siêu nhanh.",
    price: 1610000,
    brand: "Logitech",
    category: "Accessories",
    inStock: true,
    images: [
      {
        color: "Graphite",
        colorCode: "#383838",
        image: "https://m.media-amazon.com/images/I/61ni3t1ryQL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      },
    ],
    reviews: [],
  },
  {
    id: "649d775128b6744f0f497040",
    name: "Smart Watch with Bluetooth Call",
    description: "Đồng hồ thông minh đa năng với tính năng gọi Bluetooth, theo dõi sức khỏe và hơn 100 chế độ thể thao.",
    price: 1150000,
    brand: "Nerunsa",
    category: "Watch",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image: "https://m.media-amazon.com/images/I/71s4mjiit3L.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      },
      {
        color: "Silver",
        colorCode: "#C0C0C0",
        image: "https://m.media-amazon.com/images/I/71zbWSRMaYL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      },
    ],
    reviews: [],
  },
];
