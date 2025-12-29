const Footer = () => {
  return (
    <div className="mt-auto bg-[#26543C] p-10 text-white">
      <div className="flex justify-between flex-wrap gap-[50px]">
        <div className="w-[350px]">
          <div className="h-28 mb-4 overflow-hidden bg-[url(/footer-logo.png)] bg-no-repeat bg-cover bg-center"></div>
          <p className="text-wrap">
            Giấy chứng nhận Đăng ký Kinh doanh số 0309532xxx do Sở Kế hoạch và
            Đầu tư Thành phố Hồ Chí Minh cấp ngày 26/10/2025
          </p>
          <div className="flex gap-4 my-[25px]">
            <a href="#">
              <img
                className="h-8 rounded-[5px]"
                src="/instagram-icon.png"
                alt="Instagram Icon"
              />
            </a>
            <a href="#">
              <img
                className="h-8 rounded-[5px]"
                src="/youtube-icon.png"
                alt="Youtube Icon"
              />
            </a>
            <a href="#">
              <img
                className="h-8 rounded-[5px]"
                src="/tiktok-icon.png"
                alt="Tiktok Icon"
              />
            </a>
            <a href="#">
              <img
                className="h-8 rounded-[5px]"
                src="/zalo-icon.png"
                alt="Zalo Icon"
              />
            </a>
          </div>
          <div>
            Bản quyền thuộc về <span className="text-[#FFD05A] font-bold">Vòng đời mới</span>.
          </div>
        </div>
        <div>
          <h2 className="text-[#FFD05A] font-bold text-[25px]">Chính sách</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href="#"
                className="block hover:translate-x-[10px] transition-transform duration-300"
              >
                Chính sách đổi trả
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block hover:translate-x-[10px] transition-transform duration-300"
              >
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block hover:translate-x-[10px] transition-transform duration-300"
              >
                Điều khoản sử dụng
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-[#FFD05A] font-bold text-[25px]">Hỗ trợ</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href="#"
                className="block hover:translate-x-[10px] transition-transform duration-300"
              >
                Tìm kiếm
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block hover:translate-x-[10px] transition-transform duration-300"
              >
                Giới thiệu
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block hover:translate-x-[10px] transition-transform duration-300"
              >
                Liên hệ
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block hover:translate-x-[10px] transition-transform duration-300"
              >
                Tin tức
              </a>
            </li>
          </ul>
        </div>
        <div className="w-[366px]">
          <h2 className="text-[#FFD05A] font-bold text-[25px]">
            Thông tin liên hệ
          </h2>
          <ul className="mt-4 space-y-2 list-disc ml-5 mb-3">
            <li>
              <b>Hồ Chí Minh:</b> Số 268 Lý Thường Kiệt, Phường Diên Hồng, Thành
              phố Hồ Chí Minh, Việt Nam
            </li>
            <li>
              <b>Hotline:</b> 094.751.3234
            </li>
            <li>
              <b>Email:</b> rehome.support@gmail.com
            </li>
          </ul>
          <img
            src="/footer-fanpage.png"
            alt="Page"
            className="h-[150px] rounded-[10px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
