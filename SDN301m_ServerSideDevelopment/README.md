# SDN301m_PE_practice

Đây là bài PE môn SDN301m kiểm tra thử ở trên lớp để chuẩn bị cho bài PE cuối kì.

!!!MỘT SỐ LƯU Ý!!!:

+> Có trường hợp khi vào https://localhost:3443/index.html rồi bấm nút login mà bị lỗi đăng nhập 
"...try again later..." thì cái này là do bạn tạo app trên facebook sai cách chứ kh phải do code, làm theo 
các bước sau để sửa:

  1. Chọn "Tạo ứng dụng" trên trang dev của facebook.
  2. Không chọn mục "Cho phép mọi người đăng nhập bằng tài khoản Facebook" mà thay vào đó chúng ta sẽ chọn
  mục "Khác" ở phía dưới cùng.
  3. Bây giờ ta sẽ tới mục chọn loại ứng dụng, kéo xuống dưới và chọn mục "Không có".
  4. Bây giờ bạn sẽ được đưa vào bảng dashboard của app, nơi đó sẽ có một mục xuất hiện là "Thêm sản phẩm",
  ở đó chúng ta hãy chọn "Đăng nhập vào facebook" bằng cách nhấn nút "Thiết lập".
  5. Làm theo các bước của facebook thì bạn sẽ chạy được bình thường.

+> File config.js đã bị ignore lúc push lên github để bảo đảm là secretKey của facebook app sẽ không bị lộ
nên ai muốn clone project này về hãy nhớ tạo thêm file config.js để đảm bảo là project sẽ chạy bình thường.

+> Ở trong file config.js, bạn nên có clientID và clientSecret để chạy được Facebook OAuth. Ví dụ:

module.exports = {
secretKey: "{blablabla}",
mongoUrl: "mongodb://localhost:27017/{database_name}",
facebook: {
clientId: "{ID ứng dụng}",
clientSecret: "{Khóa bí mật của ứng dụng}",
}
};

=> Hai cái "{ID ứng dụng}" & "{Khóa bí mật của ứng dụng}" lấy ở đâu?
=> Ở trang dev của facebook, tìm tới app facebook bạn dùng cho project này rồi bấm 
vào nó, chọn cài đặt -> Thông tin cơ bản -> Bạn sẽ thấy 2 trường bạn cần tìm ở phía trên cùng, copy 2 cái đó
rồi bỏ vào project thì auto chạy bình thường.