import { getCurrentUser } from "@/actions/getCurrentUser";
import getProducts from "@/actions/getProducts";
import Container from "@/app/components/container";
import NullData from "@/app/components/NullData";
import ManageProductsClient from "./ManageProductsClient";

const MangageProducts = async() => {

    const products = await getProducts({category: null})
    const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.role !== 'ADMIN'){
        return <NullData title="Quyền truy cập bị từ chối"/>
    }

    return ( <div className="pt-8">
        <Container>
            <ManageProductsClient products = {products}/>
        </Container>
    </div> );
}
 
export default MangageProducts;