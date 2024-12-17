// Import Prisma client instance để kết nối và truy vấn cơ sở dữ liệu
import prisma from '@/libs/prismadb';

// Import các tuỳ chọn cấu hình cho NextAuth từ tệp NextAuth API
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// Import hàm `getServerSession` từ `next-auth` để lấy thông tin phiên hiện tại
import { getServerSession } from "next-auth";

/**
 * Hàm lấy phiên (session) hiện tại của người dùng
 * Sử dụng hàm `getServerSession` với cấu hình `authOptions` để xác thực
 * @returns {Promise<Session | null>} Thông tin phiên hiện tại hoặc null nếu không có
 */
export async function getSession() {
    return await getServerSession(authOptions);
}

/**
 * Hàm lấy thông tin người dùng hiện tại
 * @returns {Promise<Object | null>} Thông tin người dùng hiện tại hoặc null nếu không tìm thấy
 */
export async function getCurrentUser() {
    try {
        // Gọi hàm getSession để lấy thông tin session hiện tại
        const session = await getSession();

        // Nếu không có thông tin email trong session, trả về null (chưa đăng nhập)
        if (!session?.user?.email) {
            return null;
        }

        // Truy vấn cơ sở dữ liệu để tìm người dùng dựa trên email từ session
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email, // Email của người dùng từ session
            },
        });

        // Nếu không tìm thấy người dùng trong cơ sở dữ liệu, trả về null
        if (!currentUser) {
            return null;
        }

        // Trả về thông tin người dùng hiện tại (chuyển đổi định dạng ngày giờ sang chuỗi ISO)
        return {
            ...currentUser, // Sao chép toàn bộ thông tin người dùng
            createdAt: currentUser.createdAt.toISOString(), // Chuyển ngày tạo thành chuỗi ISO
            updateAt: currentUser.updateAt.toISOString(), // Chuyển ngày cập nhật thành chuỗi ISO
            emailVerified: currentUser.emailVerified?.toString() || null, // Chuyển email xác thực thành chuỗi hoặc null
        };
    } catch (error: any) {
        // Xử lý lỗi nếu có ngoại lệ xảy ra (ví dụ lỗi cơ sở dữ liệu hoặc logic)
        return null;
    }
}
