import Container from "../components/container";
import CartClient from "./cartClient";
const Cart = () => {
    return ( 
    <div className="pt-8">
        <Container>
            <CartClient></CartClient>
        </Container>
    </div> );
}
 
export default Cart;