import React from 'react';

import { GetServerSideProps } from 'next';

import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { IAppConfig, getDataConfig } from '../../utils/Content';

/* Helper components moved above page component to satisfy no-use-before-define */
function InfoCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm flex gap-4 items-start">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <div className="text-gray-600 text-sm">{children}</div>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

const TuyendungPage = ({ appConfig }: { appConfig: IAppConfig }) => {
  return (
    <Main
      config={appConfig}
      meta={
        <Meta
          config={appConfig}
          title="Tuyển dụng giáo viên & thực tập sinh – TN7 EDUCATION & SOLUTIONS"
          description="Tuyển dụng giáo viên & thực tập sinh tại TN7EDU. Gia nhập hệ sinh thái giáo dục – nhân sự – quốc tế. Cơ hội nghề nghiệp, lộ trình phát triển và kết nối quốc tế."
        />
      }
    >
      <main className="min-h-screen bg-gray-50 text-gray-800 antialiased">
        {/* Hero */}
        <header className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1525333011462-6f6a1d3f9f3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
              opacity: 0.25,
              filter: 'saturate(0.9) contrast(0.95)',
            }}
            aria-hidden
          />
          <div className="relative z-10 py-24">
            <div className="container mx-auto px-6 lg:px-12 text-center">
              <p className="inline-block bg-gradient-to-r from-orange-400 to-red-400 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide">
                TUYỂN DỤNG
              </p>
              <h1 className="mt-6 text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
                TUYỂN DỤNG – CƠ HỘI NGHỀ NGHIỆP TẠI TN7 EDUCATION & SOLUTIONS
              </h1>
              <p className="mt-4 max-w-3xl mx-auto text-gray-700 text-lg">
                Gia nhập hệ sinh thái TN7: Giáo dục học thuật, Tiếng Anh doanh
                nghiệp, Marketing & Di trú. Chúng tôi tìm kiếm giáo viên chuyên
                nghiệp và thực tập sinh tài năng.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://forms.office.com/pages/responsepage.aspx?id=49VLlcom6kixf9heaFLo2UIRRZSyR75NqgtxZP9bOa9UQ1paWE1KSEhZRERXOURNVDlLNEdDVVdTVi4u&route=shorturl"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold shadow-lg transform hover:-translate-y-0.5 transition"
                >
                  Ứng tuyển giáo viên
                </a>
                <a
                  href="https://forms.office.com/pages/responsepage.aspx?id=49VLlcom6kixf9heaFLo2UIRRZSyR75NqgtxZP9bOa9UN1M1VkZGR1M1SkcyRkg1OFhPMTQzSkpNNy4u&route=shorturl"
                  className="inline-flex items-center px-6 py-3 border-2 border-gray-200 text-gray-900 rounded-lg font-semibold bg-white/80 hover:shadow-md transition"
                >
                  Ứng tuyển thực tập sinh
                </a>
              </div>
            </div>
          </div>

          {/* decorative shapes */}
          <svg
            className="absolute right-10 top-10 opacity-10 w-40 h-40 animate-float"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <circle cx="100" cy="100" r="80" fill="url(#g1)"></circle>
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0" stopColor="#ff7a18" />
                <stop offset="1" stopColor="#af002d" />
              </linearGradient>
            </defs>
          </svg>
        </header>

        {/* Intro */}
        <section className="py-12">
          <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Giới thiệu chung</h2>
            <p className="text-gray-700 leading-relaxed">
              TN7 EDUCATION & SOLUTIONS (TN7EDU) là thành viên chủ lực trong hệ
              sinh thái TN7, hoạt động dựa trên 4 trụ cột chiến lược:
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard number="1" title="Giáo dục học thuật & kỳ thi quốc tế">
                IELTS, Academic English, CELPIP (hợp tác Paragon).
              </InfoCard>
              <InfoCard number="2" title="Tiếng Anh doanh nghiệp & Nhân sự">
                Đào tạo Business English, đồng hành cùng doanh nghiệp.
              </InfoCard>
              <InfoCard number="3" title="Marketing & Truyền thông">
                Giải pháp truyền thông chiến lược, phát triển thương hiệu.
              </InfoCard>
              <InfoCard number="4" title="Di trú & Hợp tác quốc tế">
                Tư vấn định cư và kết nối cơ hội toàn cầu.
              </InfoCard>
            </div>

            <p className="mt-6 text-gray-700">
              TN7EDU giữ vai trò trung tâm với sứ mệnh nâng cao năng lực tiếng
              Anh, phát triển sự nghiệp bền vững và kết nối nhân sự trong nước &
              quốc tế.
            </p>
          </div>
        </section>

        {/* Teachers */}
        <section
          id="teachers"
          className="py-12 bg-gradient-to-b from-white to-gray-50"
        >
          <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-2xl font-bold mb-4">
                  Giáo viên — Cơ hội hợp tác cùng TN7EDU
                </h2>
                <p className="text-gray-700">
                  Chúng tôi tìm kiếm giáo viên nhiệt huyết, có chuyên môn và
                  mong muốn phát triển lộ trình nghề nghiệp rõ ràng.
                </p>

                <h3 className="text-lg font-semibold mt-6">
                  Các hình thức hợp tác
                </h3>
                <ul className="mt-3 space-y-2 text-gray-700">
                  <li>
                    • Full-time / Part-time: Ổn định với chương trình phát triển
                    nghề nghiệp.
                  </li>
                  <li>
                    • Dạy dự án / lớp ngắn hạn: Linh hoạt, theo lịch cá nhân.
                  </li>
                  <li>
                    • Cộng tác viên dài hạn: Hợp đồng chính thức, cơ hội hợp tác
                    xuyên hệ sinh thái.
                  </li>
                </ul>

                <h3 className="text-lg font-semibold mt-6">Lợi ích</h3>
                <ul className="mt-3 space-y-2 text-gray-700">
                  <li>
                    • Mạng lưới nghề nghiệp rộng mở và kết nối chuyên gia quốc
                    tế.
                  </li>
                  <li>
                    • Đào tạo & mentoring nội bộ, lộ trình thăng tiến rõ ràng.
                  </li>
                  <li>
                    • Thu nhập cạnh tranh, minh bạch theo tiêu chuẩn quốc tế.
                  </li>
                </ul>

                <div className="mt-6">
                  <a
                    id="apply-teacher"
                    href="https://forms.office.com/pages/responsepage.aspx?id=49VLlcom6kixf9heaFLo2UIRRZSyR75NqgtxZP9bOa9UQ1paWE1KSEhZRERXOURNVDlLNEdDVVdTVi4u&route=shorturl"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow transform hover:scale-[1.02] transition"
                  >
                    Ứng tuyển ngay (Giáo viên)
                  </a>
                </div>
              </div>

              <div className="lg:w-1/2">
                <div className="rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-1 transition">
                  <img
                    src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Teacher teamwork"
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-6 bg-white">
                    <h4 className="text-lg font-semibold mb-2">
                      Yêu cầu cơ bản
                    </h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>
                        • Tốt nghiệp chuyên ngành liên quan hoặc có chứng chỉ
                        giảng dạy.
                      </li>
                      <li>• Kinh nghiệm giảng dạy/đào tạo (ưu tiên).</li>
                      <li>• Kỹ năng giao tiếp & phản hồi học viên tốt.</li>
                    </ul>
                    <div className="mt-4 text-sm text-gray-500">
                      Bạn muốn biết chi tiết về chế độ & lộ trình?{' '}
                      <a href="#contact" className="text-blue-600 underline">
                        Liên hệ nhân sự
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interns */}
        <section id="interns" className="py-12">
          <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Thực tập sinh — Cơ hội trải nghiệm & phát triển
                </h2>
                <p className="text-gray-700">
                  Đối tượng: Sinh viên từ năm 2 đến cuối đại học thuộc các
                  ngành: Giáo dục, Marketing, Nhân sự, CNTT, Ngôn ngữ, Kinh
                  doanh quốc tế, Truyền thông – Thiết kế, v.v.
                </p>

                <h3 className="text-lg font-semibold mt-6">Lợi ích</h3>
                <ul className="mt-3 space-y-2 text-gray-700">
                  <li>
                    • Đào tạo kỹ năng thực chiến: Content, tuyển dụng, quản lý
                    lớp, CRM, phân tích dữ liệu.
                  </li>
                  <li>
                    • Môi trường chuyên nghiệp – quốc tế: Thực hành theo quy
                    trình doanh nghiệp.
                  </li>
                  <li>
                    • Cơ hội xét tuyển làm việc chính thức tại TN7 hoặc đối tác.
                  </li>
                </ul>

                <div className="mt-6">
                  <a
                    id="apply-intern"
                    href="https://forms.office.com/pages/responsepage.aspx?id=49VLlcom6kixf9heaFLo2UIRRZSyR75NqgtxZP9bOa9UN1M1VkZGR1M1SkcyRkg1OFhPMTQzSkpNNy4u&route=shorturl"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold shadow transform hover:scale-[1.02] transition"
                  >
                    Ứng tuyển ngay (Thực tập sinh)
                  </a>
                </div>
              </div>

              <aside className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg">
                <h4 className="text-lg font-semibold mb-3">
                  Quy trình tuyển dụng
                </h4>
                <ol className="list-decimal ml-6 text-gray-700 space-y-2">
                  <li>Nộp hồ sơ → CV & thư xin việc.</li>
                  <li>Sàng lọc hồ sơ → Phỏng vấn chuyên môn.</li>
                  <li>Thử việc / Training → Đánh giá thực hành.</li>
                  <li>Ký hợp đồng / Thực tập & phát triển.</li>
                </ol>

                <div className="mt-6">
                  <img
                    src="https://i.pinimg.com/736x/6e/ca/56/6eca566ef16d7652ca9efdaf72ee3ec1.jpg"
                    alt="Internship"
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Why choose */}
        <section className="py-12 bg-gradient-to-r from-gray-50 to-white">
          <div className="container mx-auto px-6 lg:px-12 max-w-4xl text-center">
            <h2 className="text-2xl font-bold mb-6">Vì sao chọn TN7EDU?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureCard
                title="Hệ sinh thái mạnh mẽ"
                desc="4 trụ cột chiến lược với mảng Giáo dục là trọng tâm."
              />
              <FeatureCard
                title="Thương hiệu uy tín"
                desc="TN7 EDUCATION & SOLUTIONS Co., Ltd."
              />
              <FeatureCard
                title="Kết nối quốc tế"
                desc="Cơ hội du học, việc làm và định cư cho ứng viên xuất sắc."
              />
              <FeatureCard
                title="Cam kết phát triển"
                desc="Đồng hành cùng nhân sự & học viên trong suốt lộ trình nghề nghiệp."
              />
            </div>
          </div>
        </section>

        {/* CTA / Contact */}
        <section id="contact" className="py-12">
          <div className="container mx-auto px-6 lg:px-12 max-w-3xl text-center">
            <h3 className="text-2xl font-bold mb-4">Sẵn sàng gia nhập TN7?</h3>
            <p className="text-gray-700 mb-6">
              Gửi hồ sơ — chúng tôi sẽ liên hệ sắp xếp phỏng vấn trong thời gian
              sớm nhất.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hr@tn7edu.example"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow"
              >
                Gửi CV qua Email
              </a>
              {/* <a
                href="https://forms.office.com"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold shadow border-2 border-orange-600"
              >
                Ứng tuyển ngay
              </a> */}
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Tuyển dụng giáo viên TN7EDU • Tuyển dụng thực tập sinh TN7EDU • Cơ
              hội nghề nghiệp hệ sinh thái TN7
            </p>
          </div>
        </section>
      </main>

      <style jsx>{`
        .container {
          max-width: 1200px;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* small helpers for subtle fade-in on load */
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        h2,
        h3,
        p,
        a,
        ul,
        ol {
          animation: fadeUp 0.7s ease both;
        }

        /* responsive image rounding */
        img {
          backface-visibility: hidden;
        }
      `}</style>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const appConfig = getDataConfig();
  return { props: { appConfig } };
};

export default TuyendungPage;
