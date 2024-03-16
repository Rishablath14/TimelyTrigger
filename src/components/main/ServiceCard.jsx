import React from 'react'

const ServiceCard = ({ icon, title, details }) => {
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3 hover:shadow-lg hover:-translate-y-2 transition-all">
        <div className="mb-9 rounded-[20px] bg-[#0000009f] p-10 shadow-2 hover:shadow-lg dark:bg-dark-2 md:px-7 xl:px-10">
          <div className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary dark:text-white dark:bg-[#0000009f]">
            {icon}
          </div>
          <h4 className="mb-[14px] text-2xl font-semibold text-white dark:text-white">
            {title}
          </h4>
          <p className="text-white dark:text-dark-6">{details}</p>
        </div>
      </div>
  )
}

export default ServiceCard