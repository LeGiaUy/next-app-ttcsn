import Image from "next/image";
const HomeBanner = () => {
    return ( 
    <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
        <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
            <div className="mb-8 md:mb-0 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Winter Sale</h1>
                <p className="text-lg md:text-xl text-white">Giảm giá cho các mặt hàng được chọn</p>
                <p className="text-2xl md:text-4xl text-yellow-400 font-semibold">Giảm Đến 50%</p>
            </div>
            <div className="w-1/3 relative aspect-video">
            <Image
                src='/banner-image.png' fill alt="banner Image" className="object-contain">  
            </Image>
            </div>
        </div>
    </div> );
}
 
export default HomeBanner;