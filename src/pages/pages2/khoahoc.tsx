import React, { useState, useRef } from 'react';

import { GetServerSideProps } from 'next';
import Image from 'next/image'; // Import Image component của Next.js

// Import components and utils
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { IAppConfig, getDataConfig } from '../../utils/Content';

// Định nghĩa lại CSS cho hiệu ứng fadeIn (Nếu bạn chưa có trong tailwind.config.js)
// Lưu ý: Bạn nên thêm vào file CSS/Config chính thức, không phải trong JSX.
// Nếu bạn đã có Tailwind, nó sẽ tự động nhận.

interface CourseProgram {
  id: string;
  title: string;
  subtitle: string;
  targetAudience: string;
  highlights: string[];
  schedule: string;
  mode: string;
  ctaText: string;
  icon: string; // Đã đổi sang string (Emoji)
  color: string;
}

const KhoaHocPage = ({ appConfig }: { appConfig: IAppConfig }) => {
  const [activeProgram, setActiveProgram] = useState<string>('ielts');
  const heroRef = useRef<HTMLDivElement>(null);

  // Dữ liệu khóa học (Không đổi)
  const programs: CourseProgram[] = [
    {
      id: 'ielts',
      title: 'Học thuật & Chứng chỉ quốc tế',
      subtitle: 'IELTS – APTIS – PET',
      targetAudience:
        'Học sinh, sinh viên, người cần chứng chỉ quốc tế cho du học, học thuật hoặc sự nghiệp.',
      highlights: [
        'IELTS 5.5–7.5+, PET B1, APTIS chuẩn CEFR từ 117+',
        'Phân tích trình độ đầu vào, xây dựng lộ trình cá nhân hóa',
        'Lớp nhỏ dưới 10 học viên, đảm bảo nhiều tương tác và feedback chi tiết',
        '80% luyện tập thực chiến – 20% chiến lược và sửa lỗi cá nhân hóa',
        'Mentor theo sát và mock test định kỳ để theo dõi tiến bộ',
        'Kết nối doanh nghiệp và cơ hội việc làm cho học viên có chứng chỉ quốc tế',
      ],
      schedule: '3 buổi/tuần, 2 giờ/buổi',
      mode: 'Online',
      ctaText: 'TN7 EDU',
      icon: '📚', // Emoji thay thế
      color: 'text-orange-500',
    },
    {
      id: 'celpip',
      title: 'CELPIP – Định cư Canada',
      subtitle: 'Trang bị hành trang ngôn ngữ chuẩn CLB 7–9+',
      targetAudience:
        'Người Việt chuẩn bị hồ sơ định cư Canada (PR/Work Permit).',
      highlights: [
        'Đạt CLB 7–9+ – tiêu chuẩn ngôn ngữ cho hồ sơ định cư',
        'Giáo trình Paragon gốc, đề thi thật, mock test chuẩn giám khảo Canada',
        'Kỹ năng Speaking & Writing gắn liền với ngữ cảnh đời sống và công việc tại Canada',
        'Lớp nhỏ dưới 10 học viên, 3 buổi/tuần để tối ưu hiệu quả',
        'Hệ sinh thái TN7 hỗ trợ: học ngôn ngữ, tư vấn hồ sơ và kết nối doanh nghiệp Canada',
      ],
      schedule: '3 buổi/tuần, 2 giờ/buổi',
      mode: 'Online',
      ctaText: 'Đặt lịch test đầu vào & nhận tư vấn CELPIP miễn phí',
      icon: '🇨🇦', // Emoji thay thế
      color: 'text-green-500',
    },
    {
      id: 'corporate',
      title: 'Tiếng Anh Doanh Nghiệp',
      subtitle: 'Corporate English',
      targetAudience:
        'Nhân sự, quản lý và doanh nghiệp muốn nâng chuẩn ngoại ngữ để nâng cao hiệu quả công việc và hội nhập quốc tế.',
      highlights: [
        'Chương trình thiết kế theo từng phòng ban (Sales, HR, Finance, Marketing)',
        'Học trên chính email, báo cáo, proposal của công ty để ứng dụng ngay',
        'HR Dashboard: theo dõi tiến độ, KPI và ROI đào tạo minh bạch',
        'Mentor doanh nghiệp: luyện tập tình huống thực tế như thuyết trình, đàm phán, pitching',
        'Kết nối trực tiếp với doanh nghiệp đối tác, mở rộng cơ hội thăng tiến và việc làm',
      ],
      schedule: '3 buổi/tuần, 2 giờ/buổi',
      mode: '1:1, Nhóm nhỏ, In-house | Online',
      ctaText:
        'Liên hệ TN7 EDU để nhận chương trình thiết kế riêng & test đầu vào miễn phí',
      icon: '💼',
      color: 'text-yellow-500',
    },
  ];

  const whyChooseUs = [
    { icon: '💡', reason: 'Lộ trình cá nhân hóa cho từng học viên' },
    { icon: '🧑‍🤝‍🧑', reason: 'Lớp nhỏ dưới 10 học viên, mentor theo sát' },
    {
      icon: '🛡️',
      reason: 'Hệ sinh thái TN7: học tập – định cư – kết nối doanh nghiệp',
    },
    {
      icon: '✅',
      reason: 'Cam kết tiến bộ rõ ràng qua mock test và KPI minh bạch',
    },
  ];

  const activeProgramData = programs.find((p) => p.id === activeProgram);

  return (
    <Main
      config={appConfig}
      meta={
        <Meta
          config={appConfig}
          title="Khóa Học | TN7 EDU - English Programs"
          description="Khám phá các chương trình đào tạo tiếng Anh chuyên nghiệp tại TN7 EDU. IELTS, CELPIP, Corporate English với lộ trình cá nhân hóa và cam kết chất lượng."
        />
      }
    >
      <div className="min-h-screen bg-gray-50 antialiased">
        {/* ==================================================================== */}
        {/* HERO SECTION - Thêm hình ảnh và hiệu ứng hiện đại */}
        {/* ==================================================================== */}
        <div
          ref={heroRef}
          className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white overflow-hidden"
        >
          {/* Background image placeholder */}
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/hero-course-placeholder.webp" // **THAY BẰNG HÌNH ẢNH CỦA BẠN**
              alt="Học tiếng Anh với TN7 EDU"
              layout="fill"
              objectFit="cover"
              quality={80}
              priority
            />
          </div>

          <div className="relative container mx-auto px-6 py-24 md:py-32 grid lg:grid-cols-2 items-center gap-10">
            {/* Cột Nội dung */}
            <div className="text-left animate-slideInUp">
              <h1 className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight">
                English Programs
              </h1>
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-blue-200">
                Lộ Trình Tiếng Anh Chiến Lược tại TN7 EDU
              </h2>
              <p className="text-xl leading-relaxed mb-10 text-blue-100 max-w-lg">
                Mỗi khóa học là một bước đệm chiến lược để bạn mở ra cơ hội lớn
                hơn: du học, định cư, phát triển sự nghiệp và hội nhập quốc tế.
                tế.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button
                  onClick={() =>
                    window.open(
                      'https://forms.office.com/pages/responsepage.aspx?id=49VLlcom6kixf9heaFLo2U7609Va1UlOsx04CGxDmHBUNk9GQlRBVDc3S1NWS0FVMjdSMDROQlBHSSQlQCN0PWcu&route=shorturl',
                      '_blank'
                    )
                  }
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  🔥 Đăng ký Test đầu vào
                </button>
                <button
                  onClick={() =>
                    window.open(
                      'https://forms.office.com/pages/responsepage.aspx?id=49VLlcom6kixf9heaFLo2U7609Va1UlOsx04CGxDmHBUNk9GQlRBVDc3S1NWS0FVMjdSMDROQlBHSSQlQCN0PWcu&route=shorturl'
                    )
                  }
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-xl font-bold text-lg transition-colors duration-300 transform hover:-translate-y-1"
                >
                  Nhận Ebook Lộ Trình
                </button>
              </div>
            </div>

            {/* Cột Hình ảnh - Hoặc biểu đồ */}
            <div className="hidden lg:block relative h-full min-h-[400px] flex items-center justify-center">
              {/* Glassmorphism Card Placeholder */}
              <div className="p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 transform hover:scale-[1.02] transition-transform duration-500 animate-fadeInRight max-w-md w-full">
                <p className="text-3xl font-bold mb-2">Thành công của bạn</p>
                <ul className="space-y-3 text-sm font-light text-blue-100">
                  <li>✅ Mục tiêu 100% đạt được</li>
                  <li>✅ Hỗ trợ toàn diện 24/7</li>
                  <li>✅ Kết nối việc làm/định cư</li>
                  <li>✅ Lộ trình học linh hoạt</li>
                </ul>
                <div className="mt-6 flex justify-between">
                  <span className="text-4xl font-extrabold text-orange-400">
                    95%
                  </span>
                  <span className="text-lg text-blue-200">
                    Học viên hài lòng
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* Key Differences Section - Nâng cấp hiệu ứng */}
        {/* ==================================================================== */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center animate-slideInUp">
              <h3 className="text-3xl font-bold text-gray-800 mb-8">
                Khác biệt của TN7 EDU
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Khác biệt của TN7 EDU nằm ở lộ trình cá nhân hóa, lớp học nhỏ
                dưới 10 học viên, lịch học tinh gọn 3 buổi/tuần – 2 giờ/buổi,
                cùng với sự đồng hành từ hệ sinh thái TN7: từ tư vấn học thuật,
                định cư, đến kết nối doanh nghiệp và hỗ trợ việc làm.
              </p>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* Programs Section - Thêm hiệu ứng và style mới */}
        {/* ==================================================================== */}
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-fadeIn">
              <h3 className="text-base text-orange-600 font-semibold uppercase tracking-wider mb-2">
                Chương trình
              </h3>
              <h4 className="text-4xl font-extrabold text-gray-800 mb-4">
                Ba nhóm chương trình chính
              </h4>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Giải quyết đúng nhu cầu cốt lõi của học viên Việt Nam với mục
                tiêu rõ ràng và lộ trình cá nhân hóa.
              </p>
            </div>

            {/* Program Tabs - Thay bằng Card Toggle (Tối ưu hiệu ứng hover) */}
            <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
              {programs.map((program) => {
                const isActive = activeProgram === program.id;
                return (
                  <div
                    key={program.id}
                    onClick={() => setActiveProgram(program.id)}
                    className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-500 transform ${
                      isActive
                        ? 'bg-white border-blue-600 shadow-2xl ring-4 ring-blue-200'
                        : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-lg'
                    } hover:-translate-y-1`}
                  >
                    {/* Dùng span chứa emoji thay thế Icon */}
                    <span
                      className={`text-5xl mb-3 block ${
                        isActive
                          ? 'scale-110 text-blue-600'
                          : 'group-hover:scale-110 text-gray-700'
                      } transition-transform duration-300`}
                    >
                      {program.icon}
                    </span>
                    <h5
                      className={`text-xl font-bold mb-1 ${
                        isActive ? 'text-blue-700' : 'text-gray-800'
                      }`}
                    >
                      {program.title}
                    </h5>
                    <p className="text-sm text-gray-500">{program.subtitle}</p>
                  </div>
                );
              })}
            </div>

            {/* Active Program Content (Thêm key để kích hoạt lại animation) */}
            {activeProgramData && (
              <div
                key={activeProgramData.id}
                className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-5xl mx-auto border-t-4 border-blue-600 **animate-fadeIn**"
              >
                <div className="text-center mb-8">
                  <p className="text-base text-orange-600 font-semibold uppercase">
                    {activeProgramData.subtitle}
                  </p>
                  <h4 className="text-4xl font-extrabold text-gray-800 mt-2 mb-4">
                    {activeProgramData.title}
                  </h4>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 border-t pt-8">
                  {/* Cột 1: Thông tin học */}
                  <div className="lg:col-span-1 border-r pr-6 border-gray-100">
                    <h5 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <span className="text-xl text-blue-600 mr-2">⏰</span>
                      Thông tin & Mục tiêu:
                    </h5>
                    <div className="space-y-4 text-gray-600 text-sm">
                      <p>
                        <strong className="text-gray-800">Đối tượng:</strong>{' '}
                        {activeProgramData.targetAudience}
                      </p>
                      <p>
                        <strong className="text-gray-800">Lịch học:</strong>{' '}
                        {activeProgramData.schedule}
                      </p>
                      <p>
                        <strong className="text-gray-800">Hình thức:</strong>{' '}
                        {activeProgramData.mode}
                      </p>
                    </div>
                  </div>

                  {/* Cột 2 & 3: Giá trị nổi bật */}
                  <div className="lg:col-span-2">
                    <h5 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <span className="text-xl text-orange-600 mr-2">🚀</span>
                      Giá trị nổi bật & Cam kết:
                    </h5>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                      {activeProgramData.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1 flex-shrink-0">
                            ✔️
                          </span>
                          <span className="text-gray-700 text-base">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="text-center mt-12">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-600/50 transition-all duration-300 transform hover:scale-105">
                    {activeProgramData.ctaText}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ==================================================================== */}
        {/* Why Choose Us Section - Nâng cấp hiệu ứng */}
        {/* ==================================================================== */}
        <div className="py-20 bg-blue-900 text-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 animate-slideInUp">
              <h3 className="text-base text-orange-400 font-semibold uppercase tracking-wider mb-2">
                Độc quyền tại TN7 EDU
              </h3>
              <h4 className="text-4xl font-extrabold mb-10">
                Vì sao chọn TN7 EDU?
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {whyChooseUs.map((item, index) => (
                  <div
                    key={index}
                    className="bg-blue-800 p-6 rounded-2xl shadow-xl border-b-4 border-orange-500 transition-all duration-300 hover:bg-blue-700 transform hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <span className="text-5xl text-orange-400 mb-4 block animate-bounceOnce">
                      {item.icon}
                    </span>
                    <p className="text-lg font-semibold leading-relaxed">
                      {item.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* Trust Section - Nâng cấp CTA cuối trang */}
        {/* ==================================================================== */}
        <div className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-base text-gray-500 font-semibold uppercase mb-2">
              TRUSTED
            </h3>
            <h4 className="text-3xl font-bold text-gray-800 mb-6 animate-slideInUp">
              Được tin tưởng bởi học viên và doanh nghiệp hàng đầu
            </h4>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Các chương trình tại TN7 EDU không chỉ giúp học viên đạt chứng chỉ
              và nâng cao năng lực, mà còn mở ra cánh cửa du học, định cư và sự
              nghiệp quốc tế.
            </p>

            {/* Partner logos placeholder - Thiết kế lưới logo hiện đại hơn
            <div className="mb-16">
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-70">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="w-28 h-12 grayscale hover:grayscale-0 transition-all duration-300 flex items-center justify-center text-gray-400 hover:text-blue-500 font-semibold text-lg border-b border-gray-200 hover:border-blue-500"
                  >
                    Đối tác {i}
                  </div>
                ))}
              </div>
            </div> */}

            <div className="space-y-6 max-w-xl mx-auto p-8 bg-blue-50 rounded-2xl shadow-xl border border-blue-200 animate-fadeIn">
              <p className="text-2xl font-extrabold text-blue-700">
                Bạn đã sẵn sàng cho bước tiến mới?
              </p>
              <button
                onClick={() =>
                  window.open(
                    'https://forms.office.com/pages/responsepage.aspx?id=49VLlcom6kixf9heaFLo2U7609Va1UlOsx04CGxDmHBUM1BFSTVRQTBFSDZHV1VWTVQ1UENQWjFDOCQlQCN0PWcu&route=shorturl'
                  )
                }
                className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 rounded-xl font-bold text-xl transition-colors block mx-auto w-full md:w-auto shadow-xl hover:shadow-orange-500/50 transform hover:scale-[1.02]"
              >
                Đăng ký ngay & Bắt đầu hành trình
              </button>
              <p className="text-sm text-gray-500">
                TN7 EDU – học để đi xa hơn: từ chứng chỉ, đến định cư, đến sự
                nghiệp quốc tế.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const appConfig = getDataConfig();

  return {
    props: {
      appConfig,
    },
  };
};

export default KhoaHocPage;
