import React, { FormEvent, useEffect, useState } from 'react';

const Booking = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    setLoading(false);
  }, [status]);

  const bookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    // setError(null) // Clear previous errors when a new request starts

    try {
      const formData = new FormData(event.currentTarget);
      const formDict: { [id: string]: any } = {};
      formData.forEach((value, key) => {
        formDict[key] = value;
      });
      const response = await fetch('/api/booking/add', {
        method: 'POST',
        body: JSON.stringify(formDict),
      });
      if (!response.ok) {
        // throw new Error('Failed to submit the data. Please try again.')
        setStatus(-1);
        return;
      }
      // Handle response if necessary
      // const data = await response.json()
      setStatus(1);
    } catch (error) {
      setStatus(-1);
      // console.error(error)
    }
  };

  return (
    <div className="w-full lg:w-2/5 lg:border-l border-gray-600 lg:pl-8 py-2">
      {status === 0 ? (
        <form className="w-full" onSubmit={bookingSubmit}>
          <div className="text-white text-3xl font-bold mb-2">Liên hệ</div>
          <div className="flex flex-col justify-center mx-auto sm:max-w-md lg:mx-0 gap-3">
            <input
              type="text"
              name="name"
              className="form-input text-base w-full appearance-none bg-gray-800 rounded border-gray-600 focus:border-gray-600 border-l-4 px-6 py-3 mb-2 sm:mb-0 sm:mr-2 text-white placeholder-gray-500"
              placeholder="Tên của bạn"
              aria-label="Tên của bạn"
              required
            />
            <input
              type="phone"
              name="phone"
              className="form-input text-base w-full appearance-none bg-gray-800 rounded border-gray-600 focus:border-gray-600 border-l-4 px-6 py-3 mb-2 sm:mb-0 sm:mr-2 text-white placeholder-gray-500"
              placeholder="Số điện thoại"
              aria-label="Số điện thoại"
              required
            />
            <input
              type="email"
              name="email"
              className="form-input text-base w-full appearance-none bg-gray-800 rounded border-gray-600 focus:border-gray-600 border-l-4 px-6 py-3 mb-2 sm:mb-0 sm:mr-2 text-white placeholder-gray-500"
              placeholder="Địa chỉ email"
              aria-label="Địa chỉ email"
            />
            <textarea
              name="message"
              className="form-input text-base w-full appearance-none bg-gray-800 rounded border-gray-600 focus:border-gray-600 border-l-4 px-6 py-3 mb-2 sm:mb-0 sm:mr-2 text-white placeholder-gray-500"
              placeholder="Nội dung"
              aria-label="Nội dung"
            ></textarea>
            <label
              htmlFor="booking-form-submit"
              className="btn ml-0 md:mx-auto mt-4 text-center text-base w-40 text-white bg-blue-600 hover:bg-blue-700 shadow py-3 rounded-full flex gap-2 items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
                  Đang gửi
                </>
              ) : (
                'Gửi thông tin'
              )}
            </label>
            <input
              type="submit"
              id="booking-form-submit"
              disabled={loading === true}
              hidden
            />
          </div>
        </form>
      ) : (
        <div className="w-90 mx-auto flex flex-col items-center">
          {status === 1 ? (
            <>
              <svg
                className="fill-current text-green-600 h-16 w-16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
              </svg>
              <p className="py-3 text-base text-center text-gray-300">
                Chúng tôi đã nhận được thông tin của quý khách.
                <br /> Đội ngũ tư vấn sẽ liên lạc với bạn trong thời gian sớm
                nhất.{' '}
              </p>
            </>
          ) : (
            <>
              <svg
                className="fill-current text-red-500 h-12 w-12"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
              </svg>
              <p className="py-3 text-base text-center text-gray-300">
                Lỗi trong lúc xử lý. Vui lòng thử lại!
              </p>
              <div
                className="py-2 text-sm text-red-800 underline hover:cursor-pointer"
                onClick={() => setStatus(0)}
              >
                Thử lại
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Booking;
