import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/app/components/container";
import FormWrap from "@/app/components/FormWrap";
import NullData from "@/app/components/NullData";
import AddProductForm from "./AddProductForm";

const AddProducts = async() => {
    const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.role !== 'ADMIN'){
        return <NullData title="Quyền truy cập bị từ chối"/>
    }

    return ( 
    <div className="p-8">
        <Container>
            <FormWrap>
                <AddProductForm/>
            </FormWrap>
        </Container>
    </div> );
}
 
export default AddProducts;