import React, { useState, useRef } from 'react';

import { GetServerSideProps } from 'next';

// Import components
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { IAppConfig, getDataConfig } from '../../utils/Content';

interface PricingCard {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  classType: string;
  features: string[];
  ctaText: string;
  image: string;
  icon: string;
  badge?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

const HocPhiPage = ({ appConfig }: { appConfig: IAppConfig }) => {
  const [activeTab, setActiveTab] = useState<'individual' | 'corporate'>(
    'individual'
  );
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const pricingCards: PricingCard[] = [
    {
      id: 'ielts',
      title: 'Học thuật & Chứng chỉ quốc tế',
      subtitle: 'Chứng chỉ quốc tế – Bước đệm để đi xa hơn',
      duration: '2 giờ/buổi, 3 buổi/tuần',
      classType: 'Nhóm nhỏ <10 học viên | 1:1 theo yêu cầu',
      features: [
        'Lộ trình cá nhân hóa: IELTS 5.5–7.5+, PET B1, APTIS CEFR',
        '80% luyện đề thực chiến – 20% chiến lược học tối ưu',
        'Feedback chi tiết Speaking & Writing',
        'Mock test định kỳ đo lường tiến bộ',
        'Hỗ trợ kết nối doanh nghiệp & giới thiệu việc làm',
      ],

      ctaText: 'Đăng ký test đầu vào',
      image:
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      icon: '🎓',
      badge: 'Phổ biến',
    },
    {
      id: 'celpip',
      title: 'CELPIP – Định cư Canada',
      subtitle: 'CLB 7–9+ – Cánh cửa định cư',
      duration: '2 giờ/buổi, 3 buổi/tuần',
      classType: 'Nhóm nhỏ <10 học viên | 1:1 theo yêu cầu',
      features: [
        'Giáo trình Paragon Official',
        'Luyện 4 kỹ năng & mock test chuẩn giám khảo',
        'Lộ trình tập trung CLB 7–9+ cho PR/Work Permit',
        'Giảng viên chuyên môn cao, chấm chi tiết',
        'Hệ sinh thái hỗ trợ hồ sơ và việc làm Canada',
      ],
      ctaText: 'Đặt lịch test CELPIP',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      icon: '🍁',
      badge: 'Định cư',
    },
    {
      id: 'corporate',
      title: 'Tiếng Anh Doanh Nghiệp',
      subtitle: 'Nâng chuẩn nhân sự – Kết nối doanh nghiệp',
      duration: '2 giờ/buổi, 3 buổi/tuần',
      classType: 'Nhóm nhỏ <10 học viên | 1:1 | In‑house',
      features: [
        'Thiết kế theo phòng ban (Sales, HR, Finance, Marketing)',
        'Học trên email, báo cáo, proposal thật',
        'HR Dashboard & Pre/Post Assessment',
        'Mentor doanh nghiệp: thuyết trình, đàm phán thực chiến',
        'Kết nối mạng lưới doanh nghiệp TN7 EDU',
      ],
      ctaText: 'Chương trình doanh nghiệp',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      icon: '💼',
      badge: 'Doanh nghiệp',
    },
  ];

  const individualFAQs: FAQ[] = [
    {
      question: 'Học phí các khóa học IELTS, CELPIP như thế nào?',
      answer:
        'Học phí thay đổi theo gói (nhóm/1:1) và thời lượng. Liên hệ để nhận báo giá chi tiết và ưu đãi.',
    },
    {
      question: 'Có chính sách hoàn tiền không?',
      answer:
        'Có chính sách hoàn tiền trong 7 ngày đầu theo điều khoản cam kết chất lượng.',
    },
    {
      question: 'Có thể trả góp học phí không?',
      answer:
        'Có, hỗ trợ trả góp linh hoạt 0% cho các khóa dài hạn — liên hệ để biết chi tiết.',
    },
    {
      question: 'Học phí có bao gồm tài liệu không?',
      answer:
        'Có. Học phí bao gồm giáo trình, tài liệu, mock test và quyền truy cập nền tảng học online.',
    },
  ];

  const corporateFAQs: FAQ[] = [
    {
      question: 'Báo giá khóa Corporate English cho doanh nghiệp?',
      answer:
        'Báo giá tùy theo số lượng học viên và thời lượng; có ưu đãi cho hợp đồng dài hạn.',
    },
    {
      question: 'Ưu đãi cho doanh nghiệp?',
      answer:
        'Doanh nghiệp nhận ưu đãi theo quy mô lớp và thời gian hợp tác — liên hệ để nhận bảng giá.',
    },
    {
      question: 'Hình thức thanh toán cho doanh nghiệp?',
      answer:
        'Thanh toán bằng hóa đơn VAT, chuyển khoản; có thể chia nhiều đợt theo thỏa thuận.',
    },
    {
      question: 'TN7 đo lường ROI như thế nào?',
      answer:
        'Sử dụng HR Dashboard, Pre/Post Assessment và KPI đã thỏa thuận để báo cáo ROI đào tạo.',
    },
  ];

  const individualTestimonials: Testimonial[] = [
    {
      name: 'Nguyễn Minh Anh',
      role: 'Sinh viên - IELTS 7.5',
      content:
        'Từ 5.5 lên 7.5 trong 3 tháng. Lộ trình và feedback rất thực tế — xứng đáng.',
      avatar:
        'https://i.pinimg.com/736x/7e/46/c6/7e46c6d2798eff446b365c5246f4c9ca.jpg',
      rating: 5,
    },
    {
      name: 'Trần Văn Hùng',
      role: 'Kỹ sư - CELPIP CLB 8',
      content:
        'Khóa CELPIP giúp tôi đạt CLB 8 và tiến hành hồ sơ định cư thành công.',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
    },
  ];

  const corporateTestimonials: Testimonial[] = [
    {
      name: 'Lê Thị Mai',
      role: 'HR Manager',
      content:
        'HR Dashboard rõ ràng, nhân viên tiến bộ nhanh — ROI đào tạo minh bạch.',
      avatar:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
    },
    {
      name: 'Nguyễn Văn Đức',
      role: 'CEO',
      content:
        'Chương trình Corporate giúp team Sales giao tiếp hiệu quả với khách hàng quốc tế.',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
    },
  ];

  const currentFAQs =
    activeTab === 'individual' ? individualFAQs : corporateFAQs;
  const currentTestimonials =
    activeTab === 'individual' ? individualTestimonials : corporateTestimonials;

  return (
    <Main
      config={appConfig}
      meta={
        <Meta
          config={appConfig}
          title="Học Phí | TN7 EDU - English Programs"
          description="Chi tiết học phí các khóa học tại TN7 EDU. Lộ trình cá nhân hóa, gói linh hoạt."
        />
      }
    >
      <div className="min-h-screen bg-gray-50 text-gray-800 antialiased">
        {/* HERO */}
        <header
          ref={heroRef}
          className="relative overflow-hidden bg-gradient-to-br from-blue-700 to-indigo-800 text-white"
        >
          <div className="container mx-auto px-6 lg:px-12 py-20 flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-7/12">
              <h4 className="text-1xl md:text-4xl font-extrabold leading-tight mb-4">
                HỌC PHÍ — ĐẦU TƯ CHO TƯƠNG LAI
              </h4>
              <p className="text-lg text-blue-100 max-w-3xl mb-6">
                Mức phí minh bạch, lộ trình cá nhân hóa và cam kết đầu ra. Chọn
                gói phù hợp — nhận tư vấn miễn phí ngay hôm nay.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
                >
                  Nhận tư vấn miễn phí
                </a>
                <a
                  href="#packages"
                  className="inline-flex items-center gap-3 border border-white/25 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition"
                >
                  Xem các gói khóa học
                </a>
              </div>
            </div>

            <div className="lg:w-5/12 w-full">
              <div className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl">
                <div className="text-sm text-white/90 font-semibold">
                  Tư vấn miễn phí
                </div>
                <h3 className="text-2xl font-bold mt-2 mb-4">
                  Nhận lộ trình cá nhân hóa
                </h3>
                <p className="text-white/80 mb-6">
                  Điền thông tin để nhận tư vấn và báo giá phù hợp với mục tiêu
                  của bạn.
                </p>
                <button
                  onClick={() =>
                    window.open(
                      'https://forms.office.com/pages/responsepage.aspx?id=49VLlcom6kixf9heaFLo2U7609Va1UlOsx04CGxDmHBUNk9GQlRBVDc3S1NWS0FVMjdSMDROQlBHSSQlQCN0PWcu&route=shorturl',
                      '_blank'
                    )
                  }
                >
                  <a className="block text-center bg-white text-orange-600 font-bold py-3 rounded-lg shadow hover:scale-[1.02] transition">
                    Đăng ký tư vấn
                  </a>
                </button>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover opacity-10"></div>
          </div>
        </header>

        {/* PACKAGES */}
        <section id="packages" className="py-16">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className="text-sm text-orange-600 font-semibold uppercase">
                Chi tiết học phí
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
                Các chương trình tiêu biểu
              </h2>
              <p className="text-gray-600 mt-3">
                Chọn chương trình phù hợp với mục tiêu của bạn — có gói nhóm và
                1:1.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {pricingCards.map((card) => (
                <article
                  key={card.id}
                  className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  <div className="relative h-44 md:h-52 overflow-hidden flex-shrink-0">
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute left-5 bottom-4">
                      <div className="text-3xl">{card.icon}</div>
                      <h3 className="text-xl text-white font-bold leading-tight">
                        {card.title}
                      </h3>
                    </div>
                    {card.badge && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full">
                          {card.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-sm text-blue-600 font-semibold mb-3">
                      {card.subtitle}
                    </p>

                    <div className="flex items-center text-sm text-gray-600 gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <span>⏰</span>
                        <span>{card.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>👥</span>
                        <span>{card.classType}</span>
                      </div>
                    </div>

                    <ul className="grid gap-2 mb-6 text-gray-700 flex-1">
                      {card.features.slice(0, 5).map((f, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-sm leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4">
                      <a
                        href="#contact"
                        className="w-full inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow hover:scale-[1.02] transition"
                      >
                        {card.ctaText}
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ & TESTIMONIALS */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <h3 className="text-2xl font-extrabold mb-4">
                  Câu hỏi thường gặp
                </h3>
                <div className="bg-white rounded-2xl shadow p-6">
                  <div className="flex gap-3 mb-6">
                    <button
                      onClick={() => setActiveTab('individual')}
                      className={`flex-1 py-3 rounded-lg font-semibold ${
                        activeTab === 'individual'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Cá nhân
                    </button>
                    <button
                      onClick={() => setActiveTab('corporate')}
                      className={`flex-1 py-3 rounded-lg font-semibold ${
                        activeTab === 'corporate'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Doanh nghiệp
                    </button>
                  </div>

                  <div>
                    {currentFAQs.map((faq, i) => (
                      <div key={i} className="border-b last:border-b-0 py-4">
                        <button
                          className="w-full text-left flex items-center justify-between font-medium text-gray-800"
                          onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                        >
                          <span>{faq.question}</span>
                          <span
                            className={`transform transition ${
                              openFAQ === i ? 'rotate-180' : ''
                            }`}
                          >
                            ▼
                          </span>
                        </button>
                        {openFAQ === i && (
                          <p className="mt-3 text-gray-600">{faq.answer}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold mb-4">
                  Cảm nhận học viên
                </h3>
                <div className="space-y-4">
                  {currentTestimonials.map((t, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-5 shadow flex gap-4 items-start"
                    >
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{t.name}</h4>
                          <span className="text-sm text-gray-500">
                            {t.role}
                          </span>
                        </div>
                        <p className="text-gray-700 mt-2 italic">{t.content}</p>
                        <div className="mt-2 text-yellow-500">
                          {'★'.repeat(t.rating)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          id="contact"
          className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white"
        >
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
              Nhận lộ trình & tư vấn học phí miễn phí
            </h3>
            <p className="mb-6 text-orange-100">
              Gửi thông tin — chúng tôi sẽ liên hệ và gửi lộ trình cá nhân hóa
              cùng báo giá phù hợp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                className="bg-white text-orange-600 font-bold px-6 py-3 rounded-lg shadow"
                href="tel:+84123456789"
              >
                💬 Hỏi thêm qua Zalo/Hotline
              </a>
              <a
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold"
                href="https://forms.office.com/pages/responsepage.aspx?id=49VLlcom6kixf9heaFLo2U7609Va1UlOsx04CGxDmHBUNk9GQlRBVDc3S1NWS0FVMjdSMDROQlBHSSQlQCN0PWcu&route=shorturl',
                      '_blank"
              >
                Đăng ký tư vấn
              </a>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
        }
        @media (min-width: 1024px) {
          .container {
            max-width: 1180px;
          }
        }
      `}</style>
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

export default HocPhiPage;
