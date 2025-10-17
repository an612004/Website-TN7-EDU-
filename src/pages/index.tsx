import React, { useEffect, useRef, useState } from 'react';

import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import {
  IAppConfig,
  PostItems,
  getDataConfig,
  getPostBySlug,
} from '../utils/Content';

// Animation hook
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && setIsVisible(true)),
      { threshold: 0.1, rootMargin: '50px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible] as const;
};

interface IhomeProps {
  config: IAppConfig;
  blogs: PostItems[];
}

const metrics = [
  {
    className: 'from-green-500 to-blue-600 animate-pulsing',
    icon: '🎯',
    value: '96%',
    label: 'Học viên đạt band mục tiêu',
  },
  {
    icon: '🏢',
    value: '150+',
    label: 'Doanh nghiệp đối tác',
  },
  {
    icon: '🏆',
    value: '3,000+',
    label: 'Chứng chỉ quốc tế',
  },
];

const differentiations = [
  {
    icon: '👨‍🏫',
    title: 'Giảng viên đẳng cấp quốc tế',
    desc: 'Đội ngũ chuyên gia CELTA/TESOL, IELTS 8.0+, từng đồng hành hàng nghìn dự án doanh nghiệp, du học, định cư. Truyền cảm hứng, chia sẻ kinh nghiệm thực tiễn, mở ra cánh cửa sự nghiệp mới.',
  },
  {
    icon: '📊',
    title: 'Lộ trình cá nhân hóa & minh bạch',
    desc: 'Mỗi học viên/doanh nghiệp đều có lộ trình riêng biệt, gắn mục tiêu cuối cùng. Dashboard trực tuyến thể hiện rõ tiến độ, KPI, giúp HR và học viên thấy được hành trình phát triển đo lường bằng kết quả thực tế.',
  },
  {
    icon: '🤝',
    title: 'Kết nối HR & hệ sinh thái TN7',
    desc: 'TN7 EDU là cầu nối giữa học tập và sự nghiệp. Học viên tiếp cận mạng lưới HR và doanh nghiệp toàn cầu, được tư vấn định cư, hỗ trợ việc làm, mở rộng con đường thăng tiến.',
  },
  {
    icon: '🌐',
    title: 'Đối tác chiến lược toàn cầu',
    desc: 'Liên kết Paragon (CELPIP), Cambridge, British Council, TN7 Solutions, doanh nghiệp tiêu biểu. Đảm bảo chuẩn quốc tế và cơ hội nghề nghiệp thực chất.',
  },
];

const benefits = [
  {
    icon: '👨‍🎓',
    title: 'Cá nhân',
    desc: 'Lộ trình học tập rõ ràng, chinh phục chứng chỉ quốc tế, mở rộng cơ hội nghề nghiệp/định cư. Tiến bộ minh bạch, tự tin đạt mục tiêu.',
  },
  {
    icon: '🏢',
    title: 'Doanh nghiệp/HR',
    desc: 'Giải pháp toàn diện: đánh giá đầu vào, đào tạo phù hợp, dashboard tiến độ, báo cáo chi tiết giúp HR ra quyết định thăng tiến/tuyển dụng hiệu quả.',
  },
];

const values = [
  'IELTS, APTIS, PET – Chương trình học thuật kết hợp tips thực chiến, giúp học viên chinh phục chứng chỉ quốc tế, khẳng định năng lực và mở rộng cơ hội học tập – nghề nghiệp.',
  'Liên kết Doanh nghiệp & HR – Kết nối trực tiếp với hệ sinh thái công ty đối tác, mang đến cơ hội việc làm thực chất và lộ trình sự nghiệp gắn với đam mê.',
  'CELPIP – Đối tác chiến lược Paragon, tiên phong tại Việt Nam đào tạo CELPIP cho cộng đồng người Việt có mục tiêu định cư Canada.',
  'Tiếng Anh Doanh Nghiệp – Đào tạo thực chiến, nâng chuẩn nhân sự, phù hợp cho người đi làm và doanh nghiệp muốn phát triển đội ngũ toàn cầu.',
];

const partners = [
  { name: 'Cambridge', logo: '/assets/partners/Cambridge.png' },
  { name: 'British Council', logo: '/assets/partners/british-council.png' },
  { name: 'CELPIP Paragon', logo: '/assets/partners/celpip.png' },
  { name: 'TN7 Solutions', logo: '/assets/partners/tn7.png' },
  { name: 'Doanh nghiệp tiêu biểu', logo: '/assets/partners/hb.png' },
];

const courses = [
  {
    icon: '🎓',
    title: 'Học thuật & Chứng chỉ quốc tế',
    subtitle: 'IELTS – APTIS – PET',
    desc: 'IELTS, APTIS, PET mở lối học thuật và sự nghiệp; TN7 EDU với tips, tài liệu sát đề, phương pháp cá nhân hóa giúp học viên chứng minh năng lực quốc tế, tạo khác biệt nghề nghiệp.',
    color: 'from-blue-500 to-purple-600',
    image:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
  },
  {
    icon: '🍁',
    title: 'CELPIP – Định cư Canada',
    subtitle: 'Đối tác chiến lược Paragon',
    desc: 'TN7 EDU – đối tác Paragon, tiên phong luyện thi CELPIP tại Việt Nam, giúp học viên đạt CLB mục tiêu và sở hữu "tấm hộ chiếu ngôn ngữ" mở lối định cư thành công tại Canada.',
    color: 'from-red-500 to-orange-500',
    image:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=250&fit=crop',
  },
  {
    icon: '💼',
    title: 'Tiếng Anh Doanh Nghiệp',
    subtitle: 'Corporate English',
    desc: 'Corporate English TN7 EDU – "phòng tập thực chiến" giúp nhân sự rèn kỹ năng email, thuyết trình, đàm phán, báo cáo, pitching, gắn KPI theo JD/OKR, tối ưu hiệu suất và tạo lợi thế cạnh tranh.',
    color: 'from-green-500 to-teal-500',
    image:
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
  },
];

const successStories = [
  {
    name: 'Lan',
    role: 'Học viên CELPIP',
    story:
      'Tôi đã từng chật vật giữa rào cản ngôn ngữ và nỗi lo định cư. Nhưng tại TN7 EDU, tôi tìm thấy sự dẫn dắt. Từng bước vượt qua thử thách, tôi đã vững tin với điểm CELPIP trong tay, mở ra hành trình Canada đầy hy vọng.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b3c5?w=100&h=100&fit=crop&crop=face',
    achievement: 'CELPIP 9/12',
    course: 'CELPIP Canada',
  },
  {
    name: 'Minh',
    role: 'Học viên IELTS',
    story:
      'Có những tháng ngày tôi miệt mài trong áp lực và đã nhiều lần muốn bỏ cuộc. Nhưng chính sự kiên trì và sự đồng hành sát sao từ TN7 EDU đã đưa tôi đến khoảnh khắc vỡ òa khi band mơ ước thành hiện thực – mở cánh cửa du học và niềm tự hào cho gia đình.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    achievement: 'IELTS 7.5',
    course: 'IELTS Academic',
  },
  {
    name: 'Công ty ABC',
    role: 'Doanh nghiệp',
    story:
      'Chúng tôi đã trải qua những cuộc họp căng thẳng vì rào cản ngoại ngữ. Nhờ chương trình Corporate English và APTIS tại TN7 EDU, cả đội ngũ chúng tôi đã lột xác, tự tin thuyết trình, thương lượng với đối tác quốc tế và gặt hái những hợp đồng đầu tiên trên thị trường toàn cầu.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    achievement: 'Tăng 40% hiệu quả giao tiếp',
    course: 'Corporate English',
  },
];

const faqs = [
  {
    question: 'TN7 EDU đào tạo những khóa học nào?',
    answer:
      'Chúng tôi tập trung vào IELTS, CELPIP, APTIS, PET và Tiếng Anh Doanh nghiệp. Mỗi chương trình được cá nhân hóa theo mục tiêu: du học, định cư, việc làm hay phát triển nghề nghiệp.',
  },
  {
    question: 'Giảng viên tại TN7 EDU có gì khác biệt?',
    answer:
      '100% giảng viên có chứng chỉ quốc tế (CELTA, TESOL, IELTS 8.0+), giàu kinh nghiệm thực chiến, đội ngũ giảng viên Việt Nam có chứng chỉ quốc tế, giàu kinh nghiệm và am hiểu bối cảnh học viên, đảm bảo giảng dạy chuẩn xác nhưng vẫn gần gũi, dễ tiếp thu.',
  },
  {
    question: 'Phương pháp & tài liệu học tập ra sao?',
    answer:
      'Chúng tôi sử dụng giáo trình Paragon (CELPIP), Cambridge (IELTS), Cambridge (PET), British Council (APTIS) cùng tài liệu nội bộ cập nhật sát đề. Phương pháp "practice-driven": 70% luyện đề thực chiến, 30% chiến lược & feedback, áp dụng cho toàn bộ các chương trình từ học thuật đến doanh nghiệp.',
  },
  {
    question: 'APTIS được TN7 EDU triển khai như thế nào?',
    answer:
      'APTIS là kỳ thi tiếng Anh học thuật quốc tế do British Council tổ chức, tương tự IELTS. TN7 EDU hỗ trợ học viên luyện thi 4 kỹ năng và Grammar & Vocabulary, cung cấp mock test sát đề và feedback chi tiết để người học sẵn sàng bước vào kỳ thi và đạt kết quả chứng chỉ quốc tế theo chuẩn CEFR.',
  },
  {
    question: 'Lịch học có linh hoạt không?',
    answer:
      'Hoàn toàn linh hoạt: lớp online Zoom/Teams, nhóm nhỏ dưới 20 học viên hoặc 1–1. Có thể chọn lộ trình tăng tốc 4–8 tuần hoặc dài hạn 12–24 tuần.',
  },
  {
    question: 'Tiếng Anh Doanh nghiệp có gì đặc biệt?',
    answer:
      'Khóa học tập trung email, báo cáo, thuyết trình, đàm phán và pitching. Kết hợp dashboard & KPI minh bạch để HR theo dõi tiến độ.',
  },
  {
    question: 'TN7 EDU khác gì so với trung tâm khác?',
    answer:
      'Chúng tôi tiên phong CELPIP tại Việt Nam (đối tác chính thức của Paragon), đồng thời là một trong số ít trung tâm sở hữu hệ sinh thái toàn diện TN7 Solutions. Học viên không chỉ được đào tạo với giáo trình chuẩn quốc tế và phương pháp thực chiến, mà còn được kết nối trực tiếp với HR, tư vấn định cư và cơ hội việc làm. TN7 EDU cam kết kết quả thực tiễn – ngoại ngữ trở thành chìa khóa mở ra sự nghiệp và tương lai bền vững.',
  },
];

const faqsHR = [
  {
    question: 'Doanh nghiệp có nhận được báo cáo tiến độ nhân sự không?',
    answer:
      'Có. Mỗi khóa học đi kèm dashboard và báo cáo chi tiết theo KPI/OKR, giúp HR dễ dàng đo lường hiệu quả và ra quyết định thăng tiến, tuyển dụng.',
  },
  {
    question:
      'TN7 EDU có hỗ trợ thiết kế chương trình riêng cho từng doanh nghiệp không?',
    answer:
      'Có. Chúng tôi thiết kế chương trình in-house hoặc hybrid, tùy chỉnh nội dung theo ngành nghề và nhu cầu thực tế của doanh nghiệp.',
  },
  {
    question: 'Học phí và chính sách có minh bạch không?',
    answer:
      'Có. Học phí phụ thuộc vào lộ trình, mục tiêu điểm và hình thức học của từng học viên/doanh nghiệp. Mỗi khách hàng sẽ được tư vấn cá nhân hóa, báo giá minh bạch và giải thích rõ ràng về thời gian áp dụng cũng như chính sách ưu đãi. Cam kết đầu ra chỉ áp dụng khi học viên/doanh nghiệp đáp ứng đủ điều kiện chuyên cần và hoàn thành bài tập.',
  },
  {
    question: 'Cam kết đầu ra của TN7 EDU là gì?',
    answer:
      'TN7 EDU cam kết đồng hành hết mình để học viên và doanh nghiệp tiến gần nhất tới mục tiêu đã đăng ký. Cam kết được xây dựng trên sự linh hoạt và minh bạch: lộ trình rõ ràng, tài liệu sát đề và hỗ trợ tối đa. Với doanh nghiệp, chúng tôi bảo đảm báo cáo chi tiết và tiến bộ đo lường được, giúp HR có cơ sở công bằng trong đánh giá và quyết định nhân sự.',
  },
];

const Home = (props: IhomeProps) => {
  // Animation refs
  const [heroRef, heroVisible] = useScrollAnimation();
  const [metricsRef, metricsVisible] = useScrollAnimation();
  const [diffRef, diffVisible] = useScrollAnimation();
  const [benefitRef, benefitVisible] = useScrollAnimation();
  const [aboutRef, aboutVisible] = useScrollAnimation();
  const [partnerRef, partnerVisible] = useScrollAnimation();
  const [courseRef, courseVisible] = useScrollAnimation();
  const [storyRef, storyVisible] = useScrollAnimation();
  const [faqRef, faqVisible] = useScrollAnimation();
  const [faqHRRef, faqHRVisible] = useScrollAnimation();

  // Carousel
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % successStories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openFaqHR, setOpenFaqHR] = useState<number | null>(null);

  return (
    <Main
      config={props.config}
      meta={
        <Meta
          title="TN7 EDU – Tiếng Anh cho sự nghiệp & kết nối nhân sự toàn cầu"
          description="Chúng tôi đào tạo Tiếng Anh Doanh Nghiệp, CELPIP, IELTS, APTIS, PET và kết nối HR – giúp học viên chạm tới mục tiêu ngôn ngữ, nghề nghiệp, định cư và giúp doanh nghiệp nâng chuẩn nhân sự, tăng lợi thế cạnh tranh toàn cầu."
          config={props.config}
        />
      }
    >
      <style jsx global>{`
        .text-gradient {
          background: linear-gradient(
            135deg,
            #667eea 0%,
            #764ba2 50%,
            #f093fb 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes slide-right {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-left {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-right {
          animation: slide-right 1.2s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .animate-slide-left {
          animation: slide-left 1.2s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .hero-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow: hidden;
        }
        .hero-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
          opacity: 0.3;
        }
      `}</style>

      {/* HERO */}
      <section
        ref={heroRef}
        className={`hero-bg min-h-screen flex items-center justify-center transition-all duration-1000 ${
          heroVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-float"></div>
          <div
            className="absolute top-40 right-20 w-20 h-20 bg-purple-300 bg-opacity-20 rounded-full animate-float"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="absolute bottom-32 left-32 w-16 h-16 bg-blue-300 bg-opacity-20 rounded-full animate-float"
            style={{ animationDelay: '4s' }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-24 h-24 bg-pink-300 bg-opacity-20 rounded-full animate-float"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Left */}
            <div className="text-center lg:text-left text-white">
              <div className="mb-6">
                {/* <span className="inline-block bg-white bg-opacity-20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-medium mb-4">
                  🚀 Tiên phong đào tạo CELPIP tại Việt Nam
                </span> */}
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                  TN7 EDU
                </span>
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold mb-6">
                Tiếng Anh cho sự nghiệp & kết nối nhân sự toàn cầu
              </h2>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Kiến tạo tri thức – Kết nối nhân sự – Khai mở tương lai
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-pulse">
                <Link href="https://forms.office.com/pages/responsepage.aspx?id=49VLlcom6kixf9heaFLo2U7609Va1UlOsx04CGxDmHBUM1BFSTVRQTBFSDZHV1VWTVQ1UENQWjFDOCQlQCN0PWcu&route=shorturl">
                  <span className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                    👨‍🎓 Tôi là Học viên
                  </span>
                </Link>
                <Link href="https://forms.office.com/pages/responsepage.aspx?id=49VLlcom6kixf9heaFLo2UIRRZSyR75NqgtxZP9bOa9UM0laS05IVEYzMjg2SUozSjFCOFgyTUhRNS4u&route=shorturl">
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                    🏢 Tôi là Doanh nghiệp
                  </span>
                </Link>
              </div>

              {/* Stats Mini */}
              <div className="flex justify-center lg:justify-start gap-8 text-center ">
                <div>
                  <div className="text-2xl font-bold text-yellow-300">96%</div>
                  <div className="text-sm text-blue-100">Đạt mục tiêu</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-300">150+</div>
                  <div className="text-sm text-blue-100">Đối tác</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-300">3K+</div>
                  <div className="text-sm text-blue-100">Chứng chỉ</div>
                </div>
              </div>
            </div>

            {/* Visual Right */}
            <div className="relative">
              <div className="relative z-10">
                {/* Main Hero Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                    alt="TN7 EDU Learning Environment"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-xl font-bold mb-2">
                      Môi trường học tập hiện đại
                    </h3>
                    <p className="text-sm opacity-90">
                      Cùng TN7 EDU chinh phục mọi mục tiêu
                    </p>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-bounce">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">🎯</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">IELTS 8.0+</div>
                      <div className="text-sm text-gray-600">
                        Giảng viên quốc tế
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 animate-bounce"
                  style={{ animationDelay: '2s' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">🏆</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">CELPIP</div>
                      <div className="text-sm text-gray-600">
                        Đối tác Paragon
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute top-1/2 -right-8 bg-white rounded-2xl shadow-xl p-4 animate-bounce"
                  style={{ animationDelay: '4s' }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      150+
                    </div>
                    <div className="text-sm text-gray-600">Doanh nghiệp</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics - Enhanced */}
      <section
        ref={metricsRef}
        className={`py-20 bg-white transition-all duration-1000 ${
          metricsVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Con số ấn tượng
            </h2>
            <p className="text-xl text-gray-600">
              Minh chứng cho chất lượng đào tạo
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((metric, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-xl card-hover border border-gray-100">
                  <div className="text-6xl mb-4 animate-pulse-slow">
                    {metric.icon}
                  </div>
                  <div className="text-5xl font-extrabold text-gradient mb-2">
                    {metric.value}
                  </div>
                  <p className="text-gray-600 font-medium text-center text-lg">
                    {metric.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses - Enhanced with Images */}
      <section
        ref={courseRef}
        className={`py-20 bg-gradient-to-br from-gray-50 to-blue-50 transition-all duration-1000 ${
          courseVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Khóa học nổi bật
            </h2>
            <p className="text-xl text-gray-600">
              Lựa chọn phù hợp cho mọi mục tiêu
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-xl overflow-hidden card-hover group"
              >
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-80`}
                  ></div>
                  <div className="absolute top-4 left-4">
                    <div className="text-4xl bg-white bg-opacity-20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center">
                      {course.icon}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {course.title}
                    </h3>
                    <div className="text-white opacity-90 font-medium">
                      {course.subtitle}
                    </div>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {course.desc}
                  </p>
                  <Link href="/about-us">
                    <span
                      className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${course.color} text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer`}
                    >
                      Tìm hiểu thêm →
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About TN7 EDU - Enhanced Layout */}
      <section
        ref={aboutRef}
        className={`py-20 bg-white transition-all duration-1000 ${
          aboutVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Left */}
            <div
              className={`transition-all duration-1000 ${
                aboutVisible
                  ? 'animate-slide-right'
                  : 'opacity-0 translate-x-12'
              }`}
            >
              <div className="mb-6">
                <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Về chúng tôi
                </span>
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                TN7 EDU - Đối tác tin cậy cho hành trình phát triển của bạn
              </h2>

              <div className="space-y-6">
                {values.map((value, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {idx + 1}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/pages2/khoahoc">
                  <span className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                    🚀 Bắt đầu ngay
                  </span>
                </Link>
                <Link href="https://forms.office.com/pages/responsepage.aspx?id=49VLlcom6kixf9heaFLo2UIRRZSyR75NqgtxZP9bOa9UM0laS05IVEYzMjg2SUozSjFCOFgyTUhRNS4u&route=shorturl">
                  <span className="inline-flex items-center gap-2 px-8 py-4 border-2 border-purple-500 text-purple-600 font-semibold rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300 cursor-pointer">
                    💼 Doanh nghiệp
                  </span>
                </Link>
              </div>
            </div>

            {/* Visual Right */}
            <div
              className={`relative transition-all duration-1000 ${
                aboutVisible ? 'animate-slide-left' : 'opacity-0 translate-x-12'
              }`}
            >
              <div className="relative">
                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=500&fit=crop"
                    alt="TN7 EDU Team"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-6 animate-bounce">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎓</div>
                    <div className="font-bold text-gray-800">CELTA/TESOL</div>
                    <div className="text-sm text-gray-600">
                      Giảng viên quốc tế
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-8 -left-6 bg-white rounded-2xl shadow-xl p-6 animate-bounce"
                  style={{ animationDelay: '2s' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">🤝</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">
                        Hệ sinh thái TN7
                      </div>
                      <div className="text-sm text-gray-600">
                        Kết nối toàn cầu
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute top-1/2 -left-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl shadow-xl p-4 animate-bounce"
                  style={{ animationDelay: '4s' }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm">Cam kết chất lượng</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiation - Enhanced */}
      <section
        ref={diffRef}
        className={`py-20 bg-gradient-to-br from-blue-50 to-purple-50 transition-all duration-1000 ${
          diffVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Điểm khác biệt của TN7 EDU
            </h2>
            <p className="text-xl text-gray-600">
              Những yếu tố tạo nên sự vượt trội
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentiations.map((point, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative flex flex-col items-center bg-white rounded-2xl shadow-xl p-8 card-hover h-full">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {point.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {point.title}
                  </h3>
                  <p className="text-gray-700 text-center leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories - Enhanced */}
      <section
        ref={storyRef}
        className={`py-20 bg-white transition-all duration-1000 ${
          storyVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Câu chuyện thành công
            </h2>
            <p className="text-xl text-gray-600">
              Hành trình đáng nhớ cùng TN7 EDU
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={successStories[currentStoryIndex].avatar}
                      alt={successStories[currentStoryIndex].name}
                      className="w-24 h-24 rounded-full object-cover shadow-xl"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      ✓ Thành công
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6 leading-relaxed">
                    {successStories[currentStoryIndex].story}
                  </blockquote>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">
                        {successStories[currentStoryIndex].name}
                      </h4>
                      <p className="text-blue-600 font-medium">
                        {successStories[currentStoryIndex].course}
                      </p>
                    </div>

                    <div className="text-center md:text-right">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                        <span>🏆</span>
                        <span>
                          {successStories[currentStoryIndex].achievement}
                        </span>
                      </div>
                      <div className="flex justify-center md:justify-end mt-2 gap-1">
                        {[
                          ...Array(successStories[currentStoryIndex].rating),
                        ].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-xl">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center mt-8 gap-3">
              {successStories.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    idx === currentStoryIndex
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentStoryIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners - Enhanced */}
      <section
        ref={partnerRef}
        className={`py-16 bg-gradient-to-r from-gray-50 to-blue-50 transition-all duration-1000 ${
          partnerVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Chứng nhận & Đối tác
            </h2>
            <p className="text-lg text-gray-600">
              Được tin tưởng bởi các tổ chức hàng đầu
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {partners.map((partner, idx) => (
              <div key={idx} className="flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-lg p-6 card-hover w-full h-24 flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        ref={benefitRef}
        className={`py-20 bg-white transition-all duration-1000 ${
          benefitVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lợi ích theo đối tượng
            </h2>
            <p className="text-xl text-gray-600">
              Giải pháp tối ưu cho từng nhu cầu
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-8 card-hover">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                        {benefit.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {benefit.title}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        ref={faqRef}
        className={`py-20 bg-gradient-to-br from-gray-50 to-blue-50 transition-all duration-1000 ${
          faqVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Câu hỏi thường gặp
            </h2>
            <p className="text-xl text-gray-600">
              Giải đáp mọi thắc mắc của bạn
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
              >
                <button
                  className="w-full text-left p-6 font-semibold text-gray-900 hover:bg-gray-50 transition-colors focus:outline-none flex justify-between items-center"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="text-lg pr-4">{faq.question}</span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center transform transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  >
                    <span className="text-white text-sm">▼</span>
                  </div>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ HR */}
      <section
        ref={faqHRRef}
        className={`py-20 bg-white transition-all duration-1000 ${
          faqHRVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              FAQ – Dành cho Doanh nghiệp/HR
            </h2>
            <p className="text-lg text-gray-600">
              Thông tin chi tiết cho đối tác doanh nghiệp
            </p>
          </div>
          <div className="space-y-4">
            {faqsHR.map((faq, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg overflow-hidden card-hover border border-blue-100"
              >
                <button
                  className="w-full text-left p-6 font-semibold text-gray-900 hover:bg-white hover:bg-opacity-50 transition-colors focus:outline-none flex justify-between items-center"
                  onClick={() => setOpenFaqHR(openFaqHR === idx ? null : idx)}
                >
                  <span className="text-lg pr-4">{faq.question}</span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center transform transition-transform duration-300 ${
                      openFaqHR === idx ? 'rotate-180' : ''
                    }`}
                  >
                    <span className="text-white text-sm">▼</span>
                  </div>
                </button>
                {openFaqHR === idx && (
                  <div className="px-6 pb-6 border-t border-blue-200">
                    <p className="text-gray-700 leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Callout */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <span className="text-6xl mb-4 block animate-pulse-slow">💫</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Mỗi hành trình là khác biệt, nhưng sự đồng hành tận tâm từ TN7 EDU
            luôn nhất quán.
          </h3>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Hãy để chúng tôi đồng hành cùng bạn trên con đường chinh phục mục
            tiêu ngôn ngữ và phát triển sự nghiệp.
          </p>
        </div>
      </section>

      {/* CTA cuối trang */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <span className="inline-block bg-gradient-to-r from-yellow-400 to-pink-400 text-gray-900 px-6 py-3 rounded-full font-bold text-lg">
              🚀 Sẵn sàng bắt đầu?
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Khám phá lộ trình tiếng Anh và cơ hội nghề nghiệp
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Đăng ký nhận tư vấn miễn phí và nhận lộ trình học tập cá nhân hóa
            ngay hôm nay.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="https://tn7solutions.com/#booking">
              <span className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                <span>✨</span>
                <span>Đăng ký tư vấn miễn phí</span>
              </span>
            </Link>
            <Link href="https://forms.office.com/pages/responsepage.aspx?id=49VLlcom6kixf9heaFLo2UIRRZSyR75NqgtxZP9bOa9UM0laS05IVEYzMjg2SUozSjFCOFgyTUhRNS4u&route=shorturl">
              <span className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 cursor-pointer">
                <span>💼</span>
                <span>Giải pháp doanh nghiệp</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8"></h2>
          <div className="grid md:grid-cols-3 gap-8">
            {props.blogs.slice(0, 3).map((blog, idx) => (
              <Link key={idx} href={`/blog/${blog.slug}`}>
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 card-hover cursor-pointer flex flex-col">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-32 w-full object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{blog.description}</p>
                  <span className="text-blue-600 font-semibold mt-auto">
                    Đọc bài viết →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps<IhomeProps> = async () => {
  const config = getDataConfig();
  const posts = config.blogs.slugs
    .map((slug) =>
      getPostBySlug({ slug }, ['slug', 'title', 'description', 'date', 'image'])
    )
    .filter((p) => p !== null);
  return {
    props: {
      config,
      blogs: posts,
    },
  };
};

export default Home;
// ...existing code...
