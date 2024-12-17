import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import { Container } from "@mui/material";
import ListRating from "./ListRating";
import ProductDetails from "./ProdeucDetails";

interface IParams {
    productId?: string;
}

const Product = async (props: {params: Promise<IParams>}) => {
    const params = await props.params;
    const product = await getProductById(params)

    if(!product) return <NullData title="Sản phẩm với ID tương ứng không tồn tại"/>

    return (<div className="p-8">
        <Container>
            <ProductDetails product = {product}/>
            <div className="flex flex-col mt-20 gap-4">
                <div>Add Rating</div>
                <ListRating product={product}></ListRating>
            </div>
        </Container>
    </div> );
}
 
export default Product;