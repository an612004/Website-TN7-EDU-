import React, { useEffect, useRef, useState } from 'react';

import { GetServerSideProps } from 'next';

// Import components
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { IAppConfig, getDataConfig } from '../../utils/Content';

interface IFAQProps {
  config: IAppConfig;
}

const FAQPage: React.FC<IFAQProps> = (props) => {
  const observerRef = useRef<IntersectionObserver>();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
    setOpenQuestion(null);
  };

  const toggleQuestion = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  const faqData = {
    individual: [
      {
        id: 'cert-choice',
        question: 'Tôi nên chọn chứng chỉ nào cho mục tiêu của mình?',
        answer: (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 mb-2">
                IELTS (Academic/General)
              </h4>
              <p className="text-gray-700">
                Chuẩn quốc tế phục vụ du học/học thuật và nhiều hồ sơ việc làm;
                đa số tổ chức chấp nhận kết quả trong 2 năm kể từ ngày thi. Phù
                hợp khi bạn nhắm đến trường/nhà tuyển dụng toàn cầu.
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <h4 className="font-semibold text-red-800 mb-2">
                CELPIP (General/General LS)
              </h4>
              <p className="text-gray-700">
                Thiết kế cho Canada. General dùng cho PR/Work Permit; General LS
                (Nghe–Nói) dùng cho quốc tịch. IRCC yêu cầu kết quả &lt; 2 năm
                tại thời điểm nộp hồ sơ. Phù hợp nếu mục tiêu chính là định
                cư/công dân Canada.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-800 mb-2">
                APTIS (ESOL)
              </h4>
              <p className="text-gray-700">
                Đánh giá 4 kỹ năng theo CEFR; phù hợp khi cần chuẩn hóa năng lực
                để xin việc/thăng tiến nội bộ nhanh gọn. Hội đồng Anh (British
                Council) – đơn vị tổ chức kỳ thi – không quy định thời hạn cho
                chứng chỉ này; thời hạn chấp nhận phụ thuộc đơn vị tiếp nhận.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-800 mb-2">
                PET / Cambridge B1 Preliminary
              </h4>
              <p className="text-gray-700">
                Chứng chỉ nền tảng B1 do Đại học Cambridge cấp (không quy định
                thời hạn) – hợp với người mất gốc/cần xây nền trước khi lên
                B2/IELTS.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: 'registration',
        question: 'Đăng ký thi ở đâu? Ai tổ chức?',
        answer: (
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                IELTS
              </span>
              <span className="text-gray-700">
                Đăng ký qua British Council hoặc IDP (có lịch thi rộng khắp tại
                Việt Nam).
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                CELPIP
              </span>
              <span className="text-gray-700">
                Đăng ký trên celpip.ca. Hiện chưa có điểm thi công khai tại Việt
                Nam; thí sinh VN thường chọn Singapore hoặc Manila
                (Philippines). Ngoài ra, thí sinh có thể đăng ký thi trực tiếp
                tại Canada ở các bang như Ontario, British Columbia, Alberta và
                các trung tâm khác tuỳ lịch thi công bố.
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                APTIS
              </span>
              <span className="text-gray-700">
                Đăng ký qua đơn vị phân phối/đối tác Aptis tại Việt Nam. Hội
                đồng Anh (British Council) – đơn vị tổ chức và cấp chứng chỉ –
                không quy định thời hạn cho văn bằng này; thời hạn chấp nhận do
                từng tổ chức sử dụng quyết định.
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                PET/B1
              </span>
              <span className="text-gray-700">
                Đăng ký tại trung tâm ủy quyền của Cambridge (lịch theo từng
                đợt/địa phương).
              </span>
            </div>
          </div>
        ),
      },
      {
        id: 'booking-time',
        question: 'Nên đăng ký trước bao lâu để chắc suất?',
        answer: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-1">IELTS</h4>
              <p className="text-sm text-gray-700">
                Nên giữ chỗ 3–6 tuần (mùa cao điểm nên đặt sớm hơn để chọn ca
                thi thuận tiện).
              </p>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-1">CELPIP</h4>
              <p className="text-sm text-gray-700">
                Chủ động 4–6 tuần để sắp xếp lịch thi tại Singapore/Manila, vé
                máy bay/khách sạn và mốc nộp hồ sơ IRCC.
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-1">APTIS</h4>
              <p className="text-sm text-gray-700">
                Nên đặt 2–3 tuần trước ngày thi để bảo đảm chỗ và thủ tục.
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-1">
                PET/B1 Preliminary
              </h4>
              <p className="text-sm text-gray-700">
                Thường theo đợt – nên đăng ký 6–8 tuần trước hạn chót nộp danh
                sách.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: 'validity-results',
        question: 'Thời hạn hiệu lực & thời gian trả kết quả (tóm tắt nhanh)',
        answer: (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border p-3 text-left font-semibold">
                    Chứng chỉ
                  </th>
                  <th className="border p-3 text-left font-semibold">
                    Thời hạn hiệu lực
                  </th>
                  <th className="border p-3 text-left font-semibold">
                    Thời gian trả kết quả
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3 font-medium text-blue-600">
                    IELTS
                  </td>
                  <td className="border p-3">Tham chiếu 2 năm</td>
                  <td className="border p-3">
                    Tùy hình thức thi (máy tính nhanh hơn)
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3 font-medium text-red-600">
                    CELPIP
                  </td>
                  <td className="border p-3">IRCC chấp nhận &lt; 2 năm</td>
                  <td className="border p-3">
                    Thường trả kết quả 3–4 ngày làm việc
                  </td>
                </tr>
                <tr>
                  <td className="border p-3 font-medium text-green-600">
                    APTIS (ESOL)
                  </td>
                  <td className="border p-3">
                    Thời hạn do bên tiếp nhận quy định
                  </td>
                  <td className="border p-3">
                    Kết quả nhanh (thường trong khoảng 48 giờ theo từng kỳ tổ
                    chức)
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3 font-medium text-purple-600">
                    PET/B1 Preliminary
                  </td>
                  <td className="border p-3">Không hết hạn</td>
                  <td className="border p-3">
                    Công bố điểm theo lịch/đợt của Cambridge & điểm thi
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        id: 'celpip-note',
        question: 'Lưu ý đặc biệt với CELPIP cho học viên Việt Nam',
        answer: (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  CELPIP có mạng lưới quốc tế nhưng hiện gần Việt Nam nhất là
                  Singapore và Manila. Hãy kiểm tra lịch thi sớm, canh mốc &lt;
                  2 năm cho hồ sơ IRCC, và dự trù chi phí di chuyển.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'teachers',
        question: 'Giảng viên tại TN7 EDU có gì khác biệt?',
        answer: (
          <div className="space-y-3">
            <p className="text-gray-700">
              Đội ngũ có chứng chỉ quốc tế (CELTA/TESOL/IELTS 7.0+), từng đồng
              hành với hồ sơ du học, định cư, xin việc. Chúng tôi kết hợp giảng
              viên Việt Nam & quốc tế để đảm bảo kỹ thuật thi chuẩn nhưng vẫn dễ
              hiểu – gần gũi; đặc biệt mạnh ở chấm & sửa Speaking/Writing theo
              tiêu chí thi thật.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="font-semibold text-blue-800">
                  Chứng chỉ quốc tế
                </div>
                <div className="text-sm text-gray-600">
                  CELTA/TESOL/IELTS 7.0+
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="font-semibold text-green-800">
                  Kinh nghiệm thực tế
                </div>
                <div className="text-sm text-gray-600">
                  Du học, định cư, xin việc
                </div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <div className="font-semibold text-purple-800">
                  Chuyên môn sâu
                </div>
                <div className="text-sm text-gray-600">
                  Speaking/Writing theo rubrics
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'materials',
        question: 'Phương pháp & tài liệu có sát đề không?',
        answer: (
          <div className="space-y-3">
            <p className="text-gray-700">
              Sử dụng Paragon Official (CELPIP), Cambridge (IELTS/PET), tài liệu
              APTIS chuẩn cùng ngân hàng nội bộ cập nhật theo đề mới. Phương
              pháp practice‑driven: phần lớn thời lượng là luyện đề thực chiến
              với feedback chi tiết để bạn tiến bộ rõ rệt.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
              <div className="font-semibold text-indigo-800 mb-2">
                📚 Tài liệu chính thức
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Paragon Official (CELPIP)</li>
                <li>• Cambridge (IELTS/PET)</li>
                <li>• Tài liệu APTIS chuẩn</li>
                <li>• Ngân hàng nội bộ cập nhật</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: 'schedule',
        question: 'Lịch học & hình thức tham gia thế nào?',
        answer: (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">
                📅 Lịch học mặc định
              </h4>
              <p className="text-gray-700">
                3 buổi/tuần – 2 giờ/buổi. Học 100% Online (Zoom/Teams).
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">
                🏢 Doanh nghiệp
              </h4>
              <p className="text-gray-700">
                Có thể tổ chức In‑house tại doanh nghiệp hoặc Hybrid (Online +
                On‑site) theo yêu cầu.
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">
                👥 Quy mô lớp
              </h4>
              <p className="text-gray-700">
                Lớp nhỏ &lt;10 để kèm sát; có tùy chọn 1:1 nếu cần tăng tốc.
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">⚠️ Lưu ý</h4>
              <p className="text-gray-700">
                Không triển khai lớp offline đại trà.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: 'personalized',
        question: 'Lộ trình cá nhân hóa được xây dựng ra sao?',
        answer: (
          <div className="space-y-4">
            <p className="text-gray-700">
              Bắt đầu bằng test đầu vào miễn phí để đo sức từng kỹ năng; bạn
              nhận bản đồ học tập (mục tiêu điểm/CLB, mốc thời gian, tài liệu
              trọng tâm). Lộ trình được điều chỉnh theo mock test và tiến độ
              thực tế.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                    1
                  </div>
                  <div className="font-semibold text-blue-800">
                    Test đầu vào
                  </div>
                  <div className="text-sm text-gray-600">
                    Miễn phí đo sức 4 kỹ năng
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                    2
                  </div>
                  <div className="font-semibold text-green-800">
                    Bản đồ học tập
                  </div>
                  <div className="text-sm text-gray-600">
                    Mục tiêu, mốc thời gian, tài liệu
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                    3
                  </div>
                  <div className="font-semibold text-purple-800">
                    Điều chỉnh
                  </div>
                  <div className="text-sm text-gray-600">
                    Theo mock test & tiến độ
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'busy-schedule',
        question: 'Bận rộn có học được không?',
        answer: (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-green-800 mb-2">
                  Có. Chúng tôi có giải pháp linh hoạt:
                </h4>
                <ul className="text-gray-700 space-y-1">
                  <li>• Chọn 1:1 tăng tốc</li>
                  <li>
                    • Bài tập ngắn (micro‑drills) 15&apos;/ngày để giữ nhịp khi
                    lịch dày
                  </li>
                  <li>
                    • Cố vấn học thuật cân chỉnh nội dung theo quỹ thời gian bạn
                    có thể cam kết
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'trial-class',
        question: 'Có học thử không và sau đó là gì?',
        answer: (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Có. TN7 EDU luôn tạo điều kiện:
                </h4>
                <p className="text-gray-700">
                  Học viên được tham gia buổi học thử với mức học phí hợp lý.
                  Bạn sẽ được trải nghiệm phương pháp giảng dạy, nhận feedback
                  cá nhân, rồi mới chốt lộ trình & mốc mục tiêu để bắt đầu một
                  cách tự tin.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'exam-support',
        question: 'TN7 EDU hỗ trợ gì trước kỳ thi?',
        answer: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">
                📝 Mock test sát đề
              </h4>
              <p className="text-sm text-gray-700">
                Chấm & feedback theo rubrics chính thức
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">
                🗣️ Coaching 1:1
              </h4>
              <p className="text-sm text-gray-700">
                Speaking/Writing cá nhân hóa
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">
                ⏰ Quản lý thời gian
              </h4>
              <p className="text-sm text-gray-700">
                Chiến lược làm bài hiệu quả
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">
                🧠 Tâm lý phòng thi
              </h4>
              <p className="text-sm text-gray-700">Chuẩn bị tinh thần tự tin</p>
            </div>
          </div>
        ),
      },
      {
        id: 'offline-classes',
        question: 'TN7 EDU có lớp offline không?',
        answer: (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-red-800 mb-2">Không.</h4>
                <p className="text-gray-700 mb-2">
                  Tất cả khóa học chuẩn của TN7 EDU 100% Online (Zoom/Teams).
                </p>
                <p className="text-gray-700">
                  Chỉ lớp liên kết Doanh nghiệp mới có thể tổ chức In‑house tại
                  doanh nghiệp hoặc Hybrid (Online + On‑site) theo thỏa thuận;
                  không triển khai lớp offline đại trà.
                </p>
              </div>
            </div>
          </div>
        ),
      },
    ],
    business: [
      {
        id: 'biz-cert-choice',
        question: 'Doanh nghiệp nên chọn chứng chỉ nào cho mục tiêu tổ chức?',
        answer: (
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">
                🎯 APTIS ESOL - Tối ưu cho doanh nghiệp
              </h4>
              <p className="text-gray-700">
                Với yêu cầu chuẩn CEFR khi tuyển dụng/đánh giá nội bộ, APTIS
                ESOL là lựa chọn gọn, nhanh, chi phí tối ưu (thi máy, kết quả
                nhanh).
              </p>
            </div>
            <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">
                🍁 CELPIP - Chuyên biệt Canada
              </h4>
              <p className="text-gray-700">
                Với nhu cầu Canada, chọn CELPIP–General (PR/Work Permit) hoặc
                General LS (quốc tịch).
              </p>
            </div>
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">
                🌍 IELTS - Chuẩn toàn cầu
              </h4>
              <p className="text-gray-700">
                Nếu làm việc với đối tác toàn cầu/đa quốc gia, IELTS là chuẩn
                tham chiếu phổ biến.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: 'customization',
        question: 'Chương trình có tùy chỉnh theo phòng ban không?',
        answer: (
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Có. Lộ trình được thiết kế theo vai trò:
                  </h4>
                  <p className="text-gray-700">
                    Sales/HR/Finance/Marketing/Tech. Nhân sự học trên chính tài
                    liệu công việc (email, báo cáo, proposal), nên áp dụng ngay
                    sau buổi học.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
              {['Sales', 'HR', 'Finance', 'Marketing', 'Tech'].map((dept) => (
                <div
                  key={dept}
                  className="bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm"
                >
                  <div className="font-medium text-gray-800">{dept}</div>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: 'effectiveness',
        question: 'Đo lường hiệu quả đào tạo thế nào?',
        answer: (
          <div className="space-y-4">
            <p className="text-gray-700">
              Doanh nghiệp nhận Dashboard HR với KPI/OKR, pre/post assessment,
              chuyên cần, chất lượng bài nộp và minh chứng tiến bộ. Mục tiêu là
              ROI đào tạo minh bạch để HR có căn cứ đánh giá & ra quyết định.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-800 mb-3">
                📊 Dashboard HR bao gồm:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    KPI/OKR tracking
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    Pre/post assessment
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Chuyên cần</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    Chất lượng bài nộp
                  </span>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'biz-schedule',
        question: 'Lịch học cho doanh nghiệp có linh hoạt không?',
        answer: (
          <div className="space-y-4">
            <p className="text-gray-700">
              Mặc định 3 buổi/tuần – 2 giờ/buổi, triển khai 100% Online. Theo
              yêu cầu, có thể In‑house tại doanh nghiệp hoặc Hybrid (Online +
              On‑site), chia ca/kíp hoặc theo dự án. Chúng tôi ưu tiên nhóm nhỏ
              &lt;10 để đảm bảo tương tác và kèm sát mục tiêu từng đội.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="font-semibold text-blue-800 mb-1">
                  🖥️ Online
                </div>
                <div className="text-sm text-gray-600">100% Zoom/Teams</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="font-semibold text-green-800 mb-1">
                  🏢 In-house
                </div>
                <div className="text-sm text-gray-600">Tại doanh nghiệp</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="font-semibold text-purple-800 mb-1">
                  🔄 Hybrid
                </div>
                <div className="text-sm text-gray-600">Online + On-site</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'security',
        question: 'Bảo mật tài liệu nội bộ ra sao?',
        answer: (
          <div className="bg-gray-50 border-l-4 border-gray-500 p-4 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-gray-500 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-gray-700">
                  TN7 EDU áp dụng quy trình bảo mật & NDA, phân quyền truy cập;
                  tài liệu chỉ dùng cho mục đích đào tạo và được lưu trữ theo
                  yêu cầu doanh nghiệp.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'recruitment',
        question: 'Hỗ trợ tuyển dụng/kết nối nhân sự như thế nào?',
        answer: (
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-lg">
            <p className="text-gray-700">
              Thông qua hệ sinh thái TN7, chúng tôi hỗ trợ kết nối doanh nghiệp
              – ứng viên, định hướng tiêu chuẩn ngôn ngữ theo vị trí; mục tiêu
              là đúng người – đúng kỹ năng – đúng nhu cầu.
            </p>
            <div className="flex items-center justify-center mt-4 space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span>Đúng người</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span>Đúng kỹ năng</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span>Đúng nhu cầu</span>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'pricing',
        question: 'Học phí và chính sách có minh bạch không?',
        answer: (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-green-800 mb-2">
                  Có. Hoàn toàn minh bạch:
                </h4>
                <p className="text-gray-700">
                  Học phí phụ thuộc mục tiêu, quy mô, hình thức. Doanh nghiệp
                  nhận đề xuất & báo giá rõ ràng (thời hạn áp dụng, ưu đãi) kèm
                  điều kiện cam kết đầu ra (chuyên cần, hoàn thành bài tập, tham
                  gia mock test).
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'commitment',
        question: 'Cam kết đầu ra cho doanh nghiệp là gì?',
        answer: (
          <div className="space-y-4">
            <p className="text-gray-700">
              Chúng tôi cam kết tiến bộ đo lường được và chuyển hóa vào công
              việc: email/báo cáo tốt hơn, thuyết trình tự tin hơn, giao tiếp
              cuộc họp hiệu quả hơn. Kết quả đến từ tùy chỉnh nội dung, đào tạo
              thực chiến và đồng hành của mentor doanh nghiệp.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">📧</div>
                <div className="font-semibold text-blue-800">Email/Báo cáo</div>
                <div className="text-sm text-gray-600">Tốt hơn</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🎤</div>
                <div className="font-semibold text-green-800">Thuyết trình</div>
                <div className="text-sm text-gray-600">Tự tin hơn</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">💼</div>
                <div className="font-semibold text-purple-800">Giao tiếp</div>
                <div className="text-sm text-gray-600">Hiệu quả hơn</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'collaboration',
        question: 'Quy trình bắt đầu hợp tác?',
        answer: (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                    1
                  </div>
                  <div className="font-semibold text-blue-800 mb-1">
                    Discovery Call
                  </div>
                  <div className="text-sm text-gray-600">
                    Hiểu mục tiêu & ràng buộc vận hành
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                    2
                  </div>
                  <div className="font-semibold text-green-800 mb-1">
                    Đánh giá & Đề xuất
                  </div>
                  <div className="text-sm text-gray-600">
                    Assessment và thiết kế chương trình
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                    3
                  </div>
                  <div className="font-semibold text-purple-800 mb-1">
                    Pilot/POC
                  </div>
                  <div className="text-sm text-gray-600">
                    Thử nghiệm ngắn, sau đó roll-out
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  };

  return (
    <Main
      config={props.config}
      meta={
        <Meta
          title="FAQ - Câu hỏi thường gặp | TN7 EDU"
          description="Tìm câu trả lời cho mọi thắc mắc về các chứng chỉ tiếng Anh quốc tế IELTS, CELPIP, APTIS và chương trình đào tạo tại TN7 EDU"
          config={props.config}
        />
      }
    >
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white pt-20">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            FAQ – CÂU HỎI THƯỜNG GẶP
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-90 mb-8">
            TN7 EDU
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Navigation */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <button
              onClick={() => toggleSection('individual')}
              className={`flex-1 p-6 rounded-xl transition-all duration-300 text-left ${
                openSection === 'individual'
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 shadow-md hover:shadow-lg hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">
                    A. DÀNH CHO CÁ NHÂN
                  </h2>
                  <p className="text-sm opacity-80">(Học viên)</p>
                </div>
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${
                    openSection === 'individual' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            <button
              onClick={() => toggleSection('business')}
              className={`flex-1 p-6 rounded-xl transition-all duration-300 text-left ${
                openSection === 'business'
                  ? 'bg-green-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 shadow-md hover:shadow-lg hover:bg-green-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">
                    B. DÀNH CHO DOANH NGHIỆP
                  </h2>
                  <p className="text-sm opacity-80">(HR)</p>
                </div>
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${
                    openSection === 'business' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
          </div>

          {/* FAQ Items */}
          {openSection && (
            <div className="space-y-4">
              {faqData[openSection as keyof typeof faqData].map(
                (item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                  >
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-4">
                          <span
                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                              openSection === 'individual'
                                ? 'bg-blue-500'
                                : 'bg-green-500'
                            }`}
                          >
                            {index + 1}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-800 pr-4">
                            {item.question}
                          </h3>
                        </div>
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                            openQuestion === item.id ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {openQuestion === item.id && (
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <div className="pt-4 text-gray-700 leading-relaxed">
                          {item.answer}
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          )}

          {!openSection && (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Chọn danh mục câu hỏi
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Vui lòng chọn một trong hai danh mục trên để xem các câu hỏi
                thường gặp tương ứng
              </p>
            </div>
          )}
        </div>
      </section>

      {/* General Info Section */}
      <section className="py-16 bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Thông tin học áp dụng chung tại TN7 EDU
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-3">📅</div>
              <div className="font-semibold text-gray-800 mb-2">
                Lịch học linh hoạt
              </div>
              <div className="text-gray-600">3 buổi/tuần – 2 giờ/buổi</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-3">👥</div>
              <div className="font-semibold text-gray-800 mb-2">Lớp nhỏ</div>
              <div className="text-gray-600">&lt;10 (có 1:1 & in-house)</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-3">💻</div>
              <div className="font-semibold text-gray-800 mb-2">
                100% Online
              </div>
              <div className="text-gray-600">Zoom/Teams + Hybrid cho DN</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
            <h3 className="font-bold text-indigo-800 mb-4">
              🎯 Bắt đầu đúng cách:
            </h3>
            <p className="text-gray-700 mb-4">
              Đăng ký test đầu vào miễn phí, nhận lộ trình cá nhân hóa và kế
              hoạch thi (đặt chỗ, lịch mock test, mốc nộp hồ sơ). Dù bạn chọn
              khóa học nào, TN7 EDU luôn đi kèm hỗ trợ kết nối doanh nghiệp &
              việc làm – đảm bảo học viên đúng ngành, đúng kỹ năng, đúng cơ hội.
            </p>
            <div className="text-center">
              <em className="text-indigo-700 font-medium">
                &quot;Mỗi hành trình là khác biệt; sự đồng hành tận tâm của TN7
                EDU thì luôn nhất quán.&quot;
              </em>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};

// ...existing code...
export const getServerSideProps: GetServerSideProps<IFAQProps> = async () => {
  const config = getDataConfig();
  return {
    props: {
      config,
    },
  };
};

export default FAQPage;
// ...existing code...
