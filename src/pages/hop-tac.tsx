import React, { FormEvent, useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { IAppConfig, getDataConfig } from '../utils/Content';

interface IPartnershipProps {
  config: IAppConfig;
}
interface ISubmitStatus {
  code: number;
  content?: { [key: string]: string };
}

function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const Partnership = (props: IPartnershipProps) => {
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<ISubmitStatus>({ code: 0 });

  useEffect(() => {
    setLoading(false);
  }, [submitStatus]);

  const partnershipSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const formDict: { [id: string]: string } = {};
      formData.forEach((value, key) => {
        formDict[key] = value as string;
      });

      const checkDict: { [id: string]: any } = {};
      if (!formDict.company || formDict.company.length < 3) {
        checkDict.company = 'Tên công ty phải có ít nhất 3 ký tự';
      }
      if (!formDict.subject || formDict.subject.length < 5) {
        checkDict.subject = 'Chủ đề hợp tác phải có ít nhất 5 ký tự';
      }
      if (!formDict.email || !isValidEmail(formDict.email)) {
        checkDict.email = 'Địa chỉ email không hợp lệ';
      }
      if (!formDict.contact || formDict.contact.length < 2) {
        checkDict.contact = 'Tên người liên hệ phải có ít nhất 2 ký tự';
      }
      if (!formDict.phone || formDict.phone.length < 10) {
        checkDict.phone = 'Số điện thoại hợp lệ là bắt buộc';
      }

      if (Object.keys(checkDict).length > 0) {
        setSubmitStatus({ code: 0, content: checkDict });
        return;
      }

      const response = await fetch('/api/partnership-register', {
        method: 'POST',
        body: JSON.stringify(formDict),
      });

      if (!response.ok) {
        const data = await response.json();
        setSubmitStatus({ code: 0, content: data });
      } else {
        setSubmitStatus({ code: 1 });
      }
    } catch (error) {
      setSubmitStatus({ code: -1 });
    }
  };

  return (
    <Main
      config={props.config}
      meta={
        <Meta
          title="TN7 EDU"
          description="Hợp tác cùng TN7 EDU để mở rộng kết nối, phát triển bền vững và tạo giá trị lâu dài thông qua hợp tác chiến lược."
          config={props.config}
        />
      }
    >
      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(
            90deg,
            #06b6d4 0%,
            #6366f1 50%,
            #f472b6 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glass-effect {
          background: rgba(245, 245, 255, 0.85);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(99, 102, 241, 0.12);
          box-shadow: 0 8px 32px 0 rgba(99, 102, 241, 0.08);
        }
        .form-input {
          transition: box-shadow 0.3s, border-color 0.3s;
          border-radius: 12px;
          border: 1.5px solid #e0e7ff;
          background: #f8fafc;
        }
        .form-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px #a5b4fc;
        }
        .btn-primary {
          background: linear-gradient(90deg, #06b6d4 0%, #6366f1 100%);
          transition: box-shadow 0.3s, transform 0.3s;
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.12);
        }
        .btn-primary:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.18);
        }
        .partnership-card {
          background: linear-gradient(120deg, #f8fafc 60%, #e0e7ff 100%);
          border-radius: 18px;
          box-shadow: 0 4px 24px rgba(6, 182, 212, 0.08);
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .partnership-card:hover {
          transform: translateY(-6px) scale(1.04);
          box-shadow: 0 16px 40px rgba(99, 102, 241, 0.18);
        }
        .map-container {
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(99, 102, 241, 0.1);
        }
        .contact-info {
          background: linear-gradient(90deg, #e0e7ff 0%, #f8fafc 100%);
          border-left: 4px solid #06b6d4;
          box-shadow: 0 2px 8px rgba(6, 182, 212, 0.08);
        }
        .success-animation {
          animation: fadeInUp 0.8s ease-out, float 2s ease-in-out 0.8s infinite;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-500 via-indigo-500 to-pink-400 text-white pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-400 to-indigo-400 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-400 to-pink-400 rounded-full blur-3xl opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-flex items-center px-7 py-3 rounded-full text-base font-semibold bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30 shadow-lg">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                Hợp tác chiến lược
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold mb-8 leading-tight drop-shadow-lg">
              Hợp tác cùng <span className="gradient-text">TN7 EDU</span>
            </h1>
            <p className="text-2xl md:text-3xl mb-10 max-w-3xl mx-auto opacity-95 leading-relaxed font-medium">
              TN7 EDU luôn chào đón các đối tác hợp tác để cùng phát triển, khai
              phá tiềm năng và tạo giá trị bền vững cho thành công lâu dài.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
              <div className="partnership-card p-8 flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-indigo-700 mb-2">
                  Mạng lưới toàn cầu
                </h3>
                <p className="text-gray-600 text-base text-center">
                  Mở rộng kết nối qua hệ sinh thái đối tác quốc tế
                </p>
              </div>
              <div className="partnership-card p-8 flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-cyan-400 rounded-2xl flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-cyan-700 mb-2">
                  Cùng phát triển
                </h3>
                <p className="text-gray-600 text-base text-center">
                  Đồng hành phát triển bền vững, cùng thành công
                </p>
              </div>
              <div className="partnership-card p-8 flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-pink-700 mb-2">
                  Đổi mới sáng tạo
                </h3>
                <p className="text-gray-600 text-base text-center">
                  Cùng kiến tạo giải pháp tiên tiến, đột phá
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <div className="py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Partnership Form */}
            <div>
              <div className="glass-effect rounded-3xl shadow-2xl p-10 lg:p-14">
                <div className="text-center mb-10">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4">
                    Đăng ký hợp tác cùng{' '}
                    <span className="gradient-text">TN7 EDU</span>
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Vui lòng điền thông tin bên dưới để TN7 EDU liên hệ và trao
                    đổi cơ hội hợp tác.
                  </p>
                </div>
                {submitStatus.code === 0 ? (
                  <form onSubmit={partnershipSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-base font-semibold text-gray-700 mb-2"
                        >
                          Tên công ty *
                          {submitStatus.content?.company && (
                            <span className="float-right text-sm text-red-500">
                              {submitStatus.content.company}
                            </span>
                          )}
                        </label>
                        <input
                          type="text"
                          name="company"
                          id="company"
                          placeholder="Tên công ty"
                          className="form-input w-full py-3 px-4 text-gray-700 outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact"
                          className="block text-base font-semibold text-gray-700 mb-2"
                        >
                          Người liên hệ *
                          {submitStatus.content?.contact && (
                            <span className="float-right text-sm text-red-500">
                              {submitStatus.content.contact}
                            </span>
                          )}
                        </label>
                        <input
                          type="text"
                          name="contact"
                          id="contact"
                          placeholder="Họ và tên"
                          className="form-input w-full py-3 px-4 text-gray-700 outline-none"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-base font-semibold text-gray-700 mb-2"
                        >
                          Email *
                          {submitStatus.content?.email && (
                            <span className="float-right text-sm text-red-500">
                              {submitStatus.content.email}
                            </span>
                          )}
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="example@domain.com"
                          className="form-input w-full py-3 px-4 text-gray-700 outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-base font-semibold text-gray-700 mb-2"
                        >
                          Số điện thoại *
                          {submitStatus.content?.phone && (
                            <span className="float-right text-sm text-red-500">
                              {submitStatus.content.phone}
                            </span>
                          )}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          placeholder="Số điện thoại"
                          className="form-input w-full py-3 px-4 text-gray-700 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-base font-semibold text-gray-700 mb-2"
                      >
                        Chủ đề hợp tác *
                        {submitStatus.content?.subject && (
                          <span className="float-right text-sm text-red-500">
                            {submitStatus.content.subject}
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        placeholder="Ví dụ: Hợp tác công nghệ, phân phối, liên doanh..."
                        className="form-input w-full py-3 px-4 text-gray-700 outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-base font-semibold text-gray-700 mb-2"
                      >
                        Nội dung hợp tác
                      </label>
                      <textarea
                        rows={4}
                        name="message"
                        id="message"
                        placeholder="Mô tả đề xuất hợp tác, mục tiêu, cách phối hợp..."
                        className="form-input w-full resize-none py-3 px-4 text-gray-700 outline-none"
                      ></textarea>
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="btn-primary px-12 py-4 text-lg font-semibold text-white rounded-full outline-none flex gap-3 items-center justify-center min-w-[200px]"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-2"></div>
                            Đang gửi...
                          </>
                        ) : (
                          <>
                            Đăng ký hợp tác
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                              />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col items-center gap-6 py-8">
                    {submitStatus.code === 1 ? (
                      <div className="text-center success-animation">
                        <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                          <svg
                            className="w-10 h-10 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          Đăng ký hợp tác thành công!
                        </h3>
                        <blockquote className="max-w-lg text-gray-700 italic text-center leading-relaxed">
                          &quot;TN7 EDU chân thành cảm ơn bạn đã quan tâm, chúng
                          tôi sẽ liên hệ sớm nhất!&quot;
                        </blockquote>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                          <svg
                            className="w-10 h-10 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          Có lỗi xử lý
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Đã xảy ra lỗi khi gửi đăng ký. Vui lòng thử lại!
                        </p>
                        <button
                          onClick={() => setSubmitStatus({ code: 0 })}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
                        >
                          Thử lại
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Office Location & Contact Info */}
            <div>
              <div className="space-y-10">
                <div className="glass-effect rounded-3xl shadow-2xl p-10">
                  <h3 className="text-3xl font-bold text-indigo-700 mb-8">
                    Liên hệ với <span className="gradient-text">TN7 EDU</span>
                  </h3>
                  <div className="space-y-6">
                    <div className="contact-info rounded-xl p-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Địa chỉ văn phòng
                          </div>
                          <div className="text-gray-600">
                            Tầng 8, số 19 Cao Thắng, Phường Bàn Cờ, TP. Hồ Chí
                            Minh
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="contact-info rounded-xl p-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Email
                          </div>
                          <div className="text-gray-600">Contact@tn7.vn</div>
                        </div>
                      </div>
                    </div>
                    <div className="contact-info rounded-xl p-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Số điện thoại
                          </div>
                          <div className="text-gray-600">0763-771-191</div>
                        </div>
                      </div>
                    </div>
                    <div className="contact-info rounded-xl p-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Giờ làm việc
                          </div>
                          <div className="text-gray-600">
                            Thứ 2 - Thứ 6: 8:00 - 17:00, Thứ 7: 8:00 - 12:00
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="glass-effect rounded-3xl shadow-2xl p-10">
                  <h3 className="text-3xl font-bold text-indigo-700 mb-8">
                    Địa chỉ <span className="gradient-text">TN7 EDU</span>
                  </h3>
                  <div className="map-container">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5516554595197!2d106.68036467309652!3d10.768995359334705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f2204d6e68b%3A0xdc7b2a65004b073b!2zMTkgQ2FvIFRo4bqvbmcsIFBoxrDhu51uZyAyLCBRdeG6rW4gMywgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1757085686764!5m2!1svi!2s"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="TN7 EDU Office Location"
                    ></iframe>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <strong>🏢 Đến văn phòng:</strong> Văn phòng TN7 EDU nằm
                      tại trung tâm TP. Hồ Chí Minh, thuận tiện di chuyển. Chúng
                      tôi luôn sẵn sàng đón tiếp và trao đổi hợp tác trực tiếp.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Partnership Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-500 via-indigo-500 to-pink-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Vì sao nên hợp tác với{' '}
              <span className="text-yellow-300">TN7 EDU</span>?
            </h2>
            <p className="text-2xl opacity-95 max-w-3xl mx-auto font-medium">
              Tham gia hệ sinh thái đổi mới, phát triển và hợp tác cùng TN7 EDU
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="text-center glass-effect rounded-2xl p-8 partnership-card">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">
                Tăng trưởng vượt trội
              </h3>
              <p className="text-sm opacity-80 text-black">
                Đẩy nhanh mở rộng kinh doanh với chiến lược hiệu quả
              </p>
            </div>
            <div className="text-center glass-effect rounded-2xl p-8 partnership-card">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">
                Vươn ra toàn cầu
              </h3>
              <p className="text-sm opacity-80 text-black">
                Tiếp cận thị trường quốc tế qua mạng lưới đối tác rộng lớn
              </p>
            </div>
            <div className="text-center glass-effect rounded-2xl p-8 partnership-card">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">
                Trung tâm đổi mới
              </h3>
              <p className="text-sm opacity-80 text-black">
                Hợp tác phát triển giải pháp công nghệ tiên tiến, sáng tạo
              </p>
            </div>
            <div className="text-center glass-effect rounded-2xl p-8 partnership-card">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">
                Tăng trưởng doanh thu
              </h3>
              <p className="text-sm opacity-80 text-black">
                Mở rộng nguồn doanh thu và cơ hội kinh doanh mới
              </p>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps<
  IPartnershipProps
> = async () => {
  const config = getDataConfig();
  return {
    props: {
      config,
    },
  };
};

export default Partnership;
// ...existing code...
