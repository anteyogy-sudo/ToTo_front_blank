import React from 'react';
import Image from 'next/image';
import Files from "@/assets/icons/Files.svg";

const Page = () => {
    return (
        <div className="min-h-96 p-6 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-black mb-6">
                    Лицензии на фармацевтическую деятельность
                </h1>

                <p className="text-black font-semibold mb-8 ml-4">
                    На этой странице вы можете ознакомиться с лицензионными документами нашей компании
                </p>

                <div className="border border-gray-300 rounded-2xl p-4 mb-4 bg-white-500 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="mr-8 w-8 h-8 relative">
                                <Image
                                    src={Files}
                                    alt="Files"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <span className="text-gray-800 font-medium">
                                Лицензия Аптека Антей.pdf
                            </span>
                        </div>
                        <a
                            href="https://cdn.aptekaantey.ru/antey-license.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border-2 border-primary-blue bg-white text-primary-blue font-medium rounded-2xl hover:bg-blue-lightBlue transition-colors duration-200"
                        >
                            Загрузить
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
