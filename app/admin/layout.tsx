import AdminNav from "../components/admin/AdminNav";

export const metadata = {
    title: 'E-Shop Admin',
    description : "Eshop Admin Dashboard"
};

const AdminLayout = ({children}: {children: React.ReactNode}) => {
    return ( 
    <div>
        <AdminNav></AdminNav>
        {children}
    </div> );
}
 
export default AdminLayout;