import React, { useState, useEffect, useRef } from 'react';

import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { IAppConfig, getDataConfig } from '../utils/Content';

// Hiệu ứng chuyển động chuyển trang (page transition)
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.classList.add('page-fade-in');
    }
  }, []);
  return (
    <div ref={ref} className="opacity-0 transition-opacity duration-700">
      {children}
      <style jsx>{`
        .page-fade-in {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

// Animation helper (fade-in)
const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <div
    style={{
      animation: `fadeIn 0.8s cubic-bezier(.4,0,.2,1) ${delay}s both`,
      opacity: 1,
    }}
    className="fade-in"
  >
    {children}
    <style jsx>{`
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(40px) scale(0.98);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }
      .fade-in {
        animation-fill-mode: both;
        animation-name: fadeIn;
      }
    `}</style>
  </div>
);

const partners: { name: string; logo: string; bg: string }[] = [
  {
    name: 'Cambridge',
    logo: '/assets/partners/Cambridge.png',
    bg: 'from-blue-200 via-blue-100 to-blue-300',
  },
  {
    name: 'British Council',
    logo: '/assets/partners/british-council.png',
    bg: 'from-cyan-200 via-cyan-100 to-cyan-300',
  },
  {
    name: 'CELPIP Paragon',
    logo: '/assets/partners/celpip.png',
    bg: 'from-green-200 via-green-100 to-green-300',
  },
  {
    name: 'TN7 Solutions',
    logo: '/assets/partners/tn7.png',
    bg: 'from-purple-200 via-purple-100 to-purple-300',
  },
  {
    name: 'Doanh nghiệp tiêu biểu',
    logo: '/assets/partners/hb.png',
    bg: 'from-yellow-200 via-yellow-100 to-yellow-300',
  },
];

const timeline = [
  {
    label: 'Đánh giá',
    icon: '📊',
    description: 'Test trình độ đầu vào',
  },
  {
    label: 'Lộ trình',
    icon: '🎯',
    description: 'Thiết kế cá nhân hóa',
  },
  {
    label: 'Đào tạo',
    icon: '📚',
    description: 'Học chuẩn quốc tế',
  },
  {
    label: 'Báo cáo',
    icon: '📋',
    description: 'Theo dõi tiến độ',
  },
];

const teachers = [
  {
    name: 'Nguyễn Hoàng Minh',
    role: 'CELPIP Specialist',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    cert: 'TESOL, CELPIP Trainer',
    desc: '5 năm giảng dạy cộng đồng Việt tại Canada. Đồng hành giúp học viên tự tin chinh phục CLB 9+, biến giấc mơ định cư thành hiện thực.',
    achievements: [
      'CLB 9+ Rate: 95%',
      '500+ học viên thành công',
      'Top CELPIP trainer',
    ],
    color: 'from-red-500 to-orange-500',
  },
  {
    name: 'Trần Trinh',
    role: 'IELTS Expert',
    avatar:
      'https://i.pinimg.com/736x/b7/5e/3c/b75e3cc22112eba430210d7d1bd49f7f.jpg',
    cert: 'CELTA, IELTS 8.5',
    desc: '7 năm dìu dắt hàng trăm học viên du học Mỹ, Úc. Phân tích tỉ mỉ, chiến lược rõ ràng giúp học viên bật lên, chạm tới band điểm mơ ước.',
    achievements: [
      'Band 7.0+ Rate: 92%',
      '800+ học viên du học',
      'IELTS Official Trainer',
    ],
    color: 'from-blue-500 to-purple-500',
  },
  {
    name: 'Phạm Quang Huy',
    role: 'Business English Coach',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    cert: 'ThS Ngôn ngữ học, TESOL',
    desc: 'Đồng hành cùng 20+ doanh nghiệp Việt–Canada. Truyền cảm hứng từ tình huống thực tế, giúp học viên ứng dụng ngay vào công việc.',
    achievements: [
      '20+ doanh nghiệp',
      '40% tăng hiệu suất',
      'Corporate trainer',
    ],
    color: 'from-green-500 to-teal-500',
  },
];

const coreValues = [
  {
    icon: '🎯',
    title: 'Minh bạch',
    desc: 'Lộ trình rõ ràng, tiến độ đo lường được, báo cáo chi tiết cho học viên và HR.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '📊',
    title: 'Đo lường',
    desc: 'KPI cụ thể, dashboard real-time, đánh giá khách quan dựa trên kết quả thực tế.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: '🤝',
    title: 'Đồng hành',
    desc: 'Hỗ trợ 24/7, feedback cá nhân hóa, mentor sát sao từng bước tiến.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: '🚀',
    title: 'Cơ hội thật',
    desc: 'Kết nối HR, tư vấn nghề nghiệp, định cư - mở ra những cánh cửa mới.',
    color: 'from-orange-500 to-red-500',
  },
];

const achievements = [
  { number: '96%', label: 'Tỷ lệ đạt mục tiêu', icon: '🎯' },
  { number: '3,000+', label: 'Chứng chỉ quốc tế', icon: '🏆' },
  { number: '150+', label: 'Doanh nghiệp đối tác', icon: '🏢' },
  { number: '5+', label: 'Năm kinh nghiệm', icon: '⭐' },
];

const reviews = [
  {
    name: 'Nguyễn Thị Mai',
    role: 'HR Manager - Công ty ABC',
    avatar:
      'https://i.pinimg.com/736x/cf/3d/47/cf3d47b716f560bf5b1f787c068673c6.jpg',
    text: 'TN7 EDU đã mang đến cho tôi và đội ngũ một công cụ minh bạch để đo lường năng lực nhân sự. Nhờ đó, mỗi quyết định thăng tiến đều công bằng, chính xác.',
    rating: 5,
    category: 'business',
  },
  {
    name: 'Lê Hoàng Long',
    role: 'Team Lead',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    text: 'Sau khóa Corporate English, đội ngũ tự tin thuyết trình, thương lượng với đối tác quốc tế. Cảm giác tự hào và niềm tin vào tương lai thật khó quên.',
    rating: 5,
    category: 'business',
  },
  {
    name: 'Phạm Thảo Nguyên',
    role: 'Học viên CELPIP',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    text: 'Nhờ sự chỉ dẫn chi tiết từ TN7 EDU, tôi đã đạt CLB 9. Giây phút nhận kết quả, tôi biết cánh cửa Canada đã thật sự mở ra.',
    rating: 5,
    category: 'individual',
  },
  {
    name: 'Trần Minh Anh',
    role: 'Sinh viên IELTS',
    avatar:
      'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face',
    text: 'IELTS 7.0 từng là giấc mơ xa vời. Sự đồng hành tận tâm của TN7 EDU đã giúp tôi tự tin bước vào giảng đường quốc tế.',
    rating: 5,
    category: 'individual',
  },
];

const faqs = [
  {
    question: 'TN7 EDU có cam kết đầu ra cho cá nhân không?',
    answer:
      'Có. Lộ trình cá nhân hóa, giáo trình chuẩn quốc tế, báo cáo tiến độ minh bạch và đồng hành đến kết quả thực tế.',
    type: 'individual',
  },
  {
    question: 'Doanh nghiệp/HR nhận được gì khi hợp tác với TN7 EDU?',
    answer:
      'Giải pháp toàn diện: test đầu vào, đào tạo, báo cáo tiến độ, kết nối HR và cơ hội nghề nghiệp thực chất.',
    type: 'business',
  },
  {
    question: 'Giảng viên TN7 EDU có gì đặc biệt?',
    answer:
      '100% sở hữu chứng chỉ quốc tế (CELTA, TESOL, IELTS 8.0+), am hiểu bối cảnh người Việt, giàu kinh nghiệm thực chiến.',
    type: 'individual',
  },
  {
    question: 'Có dashboard báo cáo cho HR không?',
    answer:
      'Có. Dashboard trực tuyến, báo cáo chi tiết theo KPI/OKR, giúp HR đo lường hiệu quả và ra quyết định công bằng.',
    type: 'business',
  },
  {
    question: 'Phương pháp giảng dạy như thế nào?',
    answer:
      '80% thực hành với đề thi thật và tình huống công việc, 20% lý thuyết và chiến lược. Áp dụng Cambridge Communicative Approach.',
    type: 'individual',
  },
  {
    question: 'TN7 EDU có hỗ trợ sau khóa học không?',
    answer:
      'Có. Kết nối việc làm, tư vấn định cư, cộng đồng alumni và cập nhật kiến thức liên tục.',
    type: 'business',
  },
];

interface IhomeProps {
  config: IAppConfig;
}

const AboutUs = (props: IhomeProps) => {
  const [faqType, setFaqType] = useState<'individual' | 'business'>(
    'individual'
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Main
      config={props.config}
      meta={
        <Meta
          title="Giới thiệu TN7 EDU – Đào tạo tiếng Anh, kết nối nhân sự, mở lối sự nghiệp & định cư"
          description="TN7 EDU là cầu nối giữa tri thức – nhân sự – sự nghiệp – định cư. Đào tạo tiếng Anh chuẩn quốc tế, kết nối HR, đồng hành cùng cá nhân & doanh nghiệp chạm tới cột mốc mới."
          config={props.config}
        />
      }
    >
      <PageTransition>
        <style jsx global>{`
          .card-hover:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}</style>

        {/* Hero Section - Enhanced */}
        <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 pt-20 pb-20 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
            <div
              className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-float"
              style={{ animationDelay: '2s' }}
            ></div>
            <div
              className="absolute top-40 right-40 w-48 h-48 bg-purple-300 rounded-full blur-3xl animate-float"
              style={{ animationDelay: '4s' }}
            ></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <FadeIn>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="text-white">
                  <div className="mb-6">
                    {/* <span className="inline-block bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      ✨ Đối tác chiến lược toàn cầu
                    </span> */}
                  </div>

                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    Về chúng tôi
                    <span className="block text-2xl md:text-3xl font-medium mt-3 text-blue-200">
                      Cầu nối tri thức & sự nghiệp toàn cầu
                    </span>
                  </h1>

                  <p className="text-xl md:text-2xl mb-6 text-blue-100 leading-relaxed">
                    TN7 EDU không chỉ đào tạo tiếng Anh, mà còn kết nối cơ hội
                    nghề nghiệp, định cư và phát triển bền vững.
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    {achievements.map((item, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <div className="text-2xl font-bold">{item.number}</div>
                        <div className="text-sm text-blue-200">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/hop-tac">
                      <a className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:bg-blue-50 transition-all duration-300 text-center">
                        Đặt lịch tư vấn 1:1
                      </a>
                    </Link>
                    <Link href="https://zalo.me/0763771191">
                      <a className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 text-center">
                        Chat qua Zalo
                      </a>
                    </Link>
                  </div>
                </div>

                {/* Right Visual */}
                <div className="relative">
                  <div className="relative z-10">
                    <img
                      src="https://i.pinimg.com/736x/9d/97/79/9d97797b02f22d2def9d79c4c7bb282e.jpg"
                      alt="TN7 EDU Team"
                      className="rounded-3xl shadow-2xl w-full object-cover"
                    />

                    {/* Floating stats */}
                    <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-6 shadow-xl animate-float">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          96%
                        </div>
                        <div className="text-sm text-gray-600">
                          Success Rate
                        </div>
                      </div>
                    </div>

                    <div
                      className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl animate-float"
                      style={{ animationDelay: '1s' }}
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          150+
                        </div>
                        <div className="text-sm text-gray-600">Partners</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Giá trị cốt lõi
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Minh bạch – Đo lường – Đồng hành – Cơ hội thật
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <FadeIn key={index} delay={0.1 + index * 0.1}>
                  <div className="text-center card-hover transition-all duration-300">
                    <div
                      className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-3xl flex items-center justify-center text-4xl mb-6 mx-auto shadow-lg`}
                    >
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision - Enhanced Layout */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn delay={0.1}>
                <div className="relative">
                  <img
                    src="https://i.pinimg.com/736x/bf/49/7b/bf497bb6ff4c8ba0c84911bb59ddcece.jpg"
                    alt="TN7 EDU Ecosystem"
                    className="rounded-3xl shadow-2xl w-full object-cover"
                  />

                  {/* Process Timeline Overlay */}
                  <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-xl">
                    <h4 className="font-bold text-gray-900 mb-4">
                      Quy trình 4 bước
                    </h4>
                    <div className="flex gap-4">
                      {timeline.map((step, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-2xl mb-2">{step.icon}</div>
                          <div className="text-xs font-semibold">
                            {step.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                      Sứ mệnh & Tầm nhìn
                    </h2>
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-8 mb-8">
                      <h3 className="text-2xl font-bold mb-4">
                        Kết nối tri thức với cơ hội thực tế
                      </h3>
                      <p className="text-lg leading-relaxed">
                        TN7 EDU là nơi hội tụ đủ những gì bạn đang tìm kiếm:
                        kiến thức, kỹ năng, sự kết nối và cánh cửa để bứt phá ra
                        thế giới.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="text-3xl mb-4">🎯</div>
                      <h4 className="font-bold text-xl mb-2">Sứ mệnh</h4>
                      <p className="text-gray-700">
                        Kết nối đào tạo ngôn ngữ với mục tiêu nghề nghiệp, nhân
                        sự và định cư.
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="text-3xl mb-4">🚀</div>
                      <h4 className="font-bold text-xl mb-2">Tầm nhìn</h4>
                      <p className="text-gray-700">
                        Trở thành đối tác tin cậy của HR trong đánh giá và đào
                        tạo nhân sự toàn cầu.
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="text-3xl mb-4">🌐</div>
                      <h4 className="font-bold text-xl mb-2">Hệ sinh thái</h4>
                      <p className="text-gray-700">
                        TN7 EDU ↔ TN7 Solutions - Giải pháp one-stop toàn diện.
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="text-3xl mb-4">⭐</div>
                      <h4 className="font-bold text-xl mb-2">Cam kết</h4>
                      <p className="text-gray-700">
                        Giáo trình chuẩn quốc tế, minh bạch lộ trình, đồng hành
                        đến kết quả.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Teachers - Enhanced Design */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Đội ngũ giảng viên
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  100% sở hữu chứng chỉ quốc tế, am hiểu bối cảnh học viên Việt
                  Nam
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8">
              {teachers.map((teacher, index) => (
                <FadeIn key={index} delay={0.1 + index * 0.1}>
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden card-hover transition-all duration-300">
                    <div
                      className={`h-48 bg-gradient-to-r ${teacher.color} relative`}
                    >
                      <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="w-32 h-32 rounded-full object-cover absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-6 border-white shadow-xl"
                      />
                    </div>

                    <div className="pt-20 pb-8 px-8 text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {teacher.name}
                      </h3>
                      <p className="text-lg text-gray-600 mb-2">
                        {teacher.role}
                      </p>
                      <p className="text-sm font-semibold text-blue-600 mb-4">
                        {teacher.cert}
                      </p>
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {teacher.desc}
                      </p>

                      <div className="space-y-2">
                        {teacher.achievements.map((achievement, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700"
                          >
                            ✨ {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="mt-12 text-center">
              <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg">
                Chuẩn GV: CELTA/TESOL/IELTS 8.0+
              </div>
            </div>
          </div>
        </section>

        {/* Partners - Redesigned */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Đối tác chiến lược
                </h2>
                <p className="text-lg text-gray-600">
                  Hợp tác với các tổ chức giáo dục hàng đầu thế giới
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
              {partners.map((partner, index) => (
                <FadeIn key={index} delay={0.1 + index * 0.1}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center h-24">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="mt-12 text-center">
              <div className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg">
                Uy tín quốc tế - Chất lượng Việt Nam
              </div>
            </div>
          </div>
        </section>

        {/* Teaching Method */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Phương pháp đào tạo
                </h2>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-8 max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold mb-4">
                    Học để dùng – Luyện để thành công
                  </h3>
                  <p className="text-lg mb-6">
                    Dựa trên Cambridge Communicative Approach & Task-Based
                    Learning
                  </p>
                  <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div>
                      <h4 className="font-bold text-xl mb-3">80% Thực hành</h4>
                      <p>Luyện đề thật, tình huống công việc sát thực tế</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-3">20% Lý thuyết</h4>
                      <p>Chiến lược, phân tích lỗi và feedback cá nhân</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Customer Reviews - Enhanced */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-6xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Cảm nhận khách hàng
                </h2>
                <p className="text-xl text-gray-600">
                  Hành trình thành công của hàng nghìn học viên và doanh nghiệp
                </p>
              </div>
            </FadeIn>

            {/* Featured Review Carousel */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-3xl shadow-xl p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>

                <div className="flex items-center gap-8">
                  <img
                    src={reviews[currentReviewIndex].avatar}
                    alt={reviews[currentReviewIndex].name}
                    className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-blue-100"
                  />

                  <div className="flex-1">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">
                          ⭐
                        </span>
                      ))}
                    </div>

                    <p className="text-lg text-gray-700 italic mb-4 leading-relaxed">
                      {reviews[currentReviewIndex].text}
                    </p>

                    <div>
                      <h4 className="font-bold text-xl text-gray-900">
                        {reviews[currentReviewIndex].name}
                      </h4>
                      <p className="text-gray-600">
                        {reviews[currentReviewIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Navigation */}
              <div className="flex justify-center mt-8 gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentReviewIndex === index
                        ? 'bg-blue-600 w-8'
                        : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentReviewIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* Review Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {reviews.slice(0, 4).map((review, index) => (
                <FadeIn key={index} delay={0.1 + index * 0.1}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg card-hover transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-16 h-16 rounded-full object-cover shadow-lg"
                      />
                      <div className="flex-1">
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-sm">
                              ⭐
                            </span>
                          ))}
                        </div>
                        <h4 className="font-bold text-gray-900">
                          {review.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {review.role}
                        </p>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {review.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ - Enhanced */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Câu hỏi thường gặp
                </h2>
                <p className="text-xl text-gray-600">
                  Giải đáp những thắc mắc phổ biến
                </p>
              </div>
            </FadeIn>

            {/* FAQ Type Toggle */}
            <div className="flex justify-center gap-4 mb-12">
              <button
                className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                  faqType === 'individual'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setFaqType('individual')}
              >
                👨‍🎓 Cá nhân
              </button>
              <button
                className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                  faqType === 'business'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setFaqType('business')}
              >
                🏢 Doanh nghiệp
              </button>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {faqs
                .filter((f) => f.type === faqType)
                .map((faq, idx) => (
                  <FadeIn key={faq.question} delay={0.1 + idx * 0.1}>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg overflow-hidden">
                      <button
                        className="w-full text-left p-6 font-semibold text-gray-900 hover:bg-white hover:bg-opacity-70 transition-colors focus:outline-none flex justify-between items-center"
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      >
                        <span className="text-lg">{faq.question}</span>
                        <span
                          className={`text-2xl transform transition-transform duration-300 ${
                            openFaq === idx ? 'rotate-180' : ''
                          }`}
                        >
                          ⌄
                        </span>
                      </button>
                      {openFaq === idx && (
                        <div className="px-6 pb-6 bg-white bg-opacity-70">
                          <p className="text-gray-700 leading-relaxed text-lg">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  </FadeIn>
                ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          id="booking"
          className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <FadeIn>
              <div className="mb-8">
                <span className="inline-block bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-semibold mb-6 text-lg">
                  ✨ Bắt đầu hành trình của bạn
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Đặt lịch tư vấn 1:1 miễn phí
              </h2>

              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Nhận lộ trình cá nhân hóa, giải pháp doanh nghiệp và cơ hội kết
                nối HR toàn cầu. Chuyên gia TN7 EDU sẽ tư vấn chi tiết cho bạn.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/#booking">
                  <a className="bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:bg-blue-50 transition-all duration-300">
                    Đặt lịch tư vấn ngay
                  </a>
                </Link>
                <Link href="https://zalo.me/0763771191">
                  <a className="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-blue-600 transition-all duration-300">
                    Chat với chuyên gia
                  </a>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </PageTransition>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps<IhomeProps> = async () => {
  const config = getDataConfig();
  return {
    props: {
      config,
    },
  };
};

export default AboutUs;
